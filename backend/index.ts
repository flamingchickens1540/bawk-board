import { NotifyTimer } from "common/timer"
import { MatchState, type MatchID } from "common/types"
import { auth_secret } from "secrets"
import { Server } from "socket.io"
import type { ClientToServerEvents, ServerToClientEvents, ThisServer, ThisSocket } from "../common/ws_types"
import Match from "./classes/match"
import Team from "./classes/team"
import { loadEventData, loadMatches, loadTeams, storeEventData, storeMatches, storeTeams } from "./data"
import { startHttpServer, getHttpServer } from './router';
import { updateAlliances, updateEventInfo, updateMatches, updateRankings } from "./tba"
import { type AudienceScreen, AudienceScreenLayout } from '../common/types';
import type { Socket } from "socket.io-client"
import type { DefaultEventsMap } from "socket.io/dist/typed-events"
import { getAlliances } from "./alliances"
import { decodeMatchID } from '../common/calculations';
import { PlayoffAlliance } from "common/alliances"



let teams:Team[] = loadTeams()
const matches:Match[] = loadMatches()
let currentMatchID=loadEventData().currentMatchID ?? "qm1m1"
let matchTimer:NotifyTimer;
let currentScreen:AudienceScreen = {
    layout: AudienceScreenLayout.BLANK,
    match: currentMatchID
}
startHttpServer()
updateRankings(teams);
updateMatches(matches);
updateAlliances(teams)
export function getTeams():Team[] {
    return teams
}
export function getMatches(): Match[] {
    return matches
}
export function getCurrentMatchID() {
    return currentMatchID
}
export function getCurrentMatch(): Match {
    return findMatch(currentMatchID)
}
export function findMatch(id:MatchID): Match {
    return matches.find((match) => match.id == id)
}


const ws = new Server<ClientToServerEvents, ServerToClientEvents>(getHttpServer(), {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
})



ws.on("connection", (socket) => {
    if (socket.handshake.auth.key != auth_secret) {
        socket.emit("reAuth")
        return;
    }
    socket.use((event, next) => {
        try {
            console.log(new Date().toLocaleTimeString(), "ws:"+event[0])
            Object.entries(event[1]).forEach(([key, value]) => {console.log("|", key+":", value)})
        } catch (e) {
        } finally {
            next();
        }
    })
    socket.on("matchData", (data) => {
        const latestMatch = getCurrentMatch()
        if (data == null) {
            console.warn("Empty match payload")
            return;
        }
        if (latestMatch.id == data.id) {
            latestMatch.blueScoreBreakdown = data.blueScoreBreakdown ?? latestMatch.blueScoreBreakdown
            latestMatch.redScoreBreakdown = data.redScoreBreakdown ?? latestMatch.redScoreBreakdown
            latestMatch.blueTeams = data.blueTeams ?? latestMatch.blueTeams
            latestMatch.redTeams = data.redTeams ?? latestMatch.redTeams
        } else {
            console.warn("wrong ID")
            socket.emit("loadMatch", getCurrentMatch())
            return
        }
        socket.broadcast.emit("matchData", getCurrentMatch())
        storeMatches(matches)
    })

    socket.on("loadMatch", (id) => {
        currentMatchID = id
        storeEventData({currentMatchID})
        storeMatches(matches)
        const matchIndex = matches.findIndex((match) => match.id == id)
        if (matchIndex == -1) {
            matches.push(Match.new(id))
            ws.emit("newMatch", matches)
        }
        ws.emit("matchData", getCurrentMatch())
    })

    socket.on("teamData", (data) => {
        data.forEach((value) => {
            if (value.id == null) {
                return;
            }
            const teamIndex = teams.findIndex((team) => team.id == value.id)
            const display_id = value.display_id || value.id.toString()
            console.log(value, display_id, teamIndex)
            if (teamIndex == -1) {
                teams.push(new Team(value.id, value.name, display_id, value.playoffAlliance))
            } else {
                teams[teamIndex].id = value.id
                teams[teamIndex].display_id = display_id
                teams[teamIndex].name = value.name
                teams[teamIndex].playoffAlliance = value.playoffAlliance
            }
        })
        teams.sort((a,b) => a.display_id.localeCompare(b.display_id))
        storeTeams(teams)
        updateEventInfo(teams)
        updateAlliances(teams)
        socket.broadcast.emit("teamData", teams)
    })
    socket.on("teamRemove", (id) => {
        teams = teams.filter((item) => item.id != id)
        ws.emit("teamData", teams)
    })

    socket.on("matchStart", () => {
        const latestMatch = getCurrentMatch()
        matchTimer = new NotifyTimer(() => ws.emit("matchTeleop", getCurrentMatch()), () => endMatch(MatchState.COMPLETED))
        matchTimer.start()
        latestMatch.start(matchTimer.startTime)
        ws.emit("matchStart", getCurrentMatch())
        ws.emit("matchData", getCurrentMatch())
    })
    socket.on("matchAbort", () => {
        getCurrentMatch().matchStartTime = 0
        endMatch(MatchState.PENDING)
        matchTimer.cancel()
    })
    socket.on("matchCommit", () => {
        const currentMatch = getCurrentMatch();
        currentMatch.matchState = MatchState.POSTED
        
        ws.emit("matchData", currentMatch)
        const decodedID = decodeMatchID(currentMatch.id)
        if (decodedID.level != "p") {
            teams.forEach((team) => team.processMatchResults(currentMatch))
            updateMatches(matches)
            updateRankings(teams)
        }
        
        
        storeTeams(teams)
        storeMatches(matches)
        ws.emit("teamData", teams)
        const match = currentMatchID
        updateAudienceScreen({layout:AudienceScreenLayout.WIN, match})
        setTimeout(() => updateAudienceScreen({layout:AudienceScreenLayout.SCORES, match}), 7000)
    })

    socket.on("showScreen", (screen) => {
        updateAudienceScreen(screen)
    })
    socket.on("getAlliance", (alliance, cb) => {
        const alliances = getAlliances()
        cb((alliances[alliance-1]??[]).map((team) => team.id).slice(0,4))

    })
    socket.on("getAllianceForTeams", (inputTeams, cb) => {
        let alliance:PlayoffAlliance = null
        teams.forEach((team) => {
            if (inputTeams.includes(team.id)) {
                if (alliance == null) {
                    alliance = team.playoffAlliance;
                } else if (alliance != team.playoffAlliance) {
                    alliance = PlayoffAlliance.NONE;
                }
            }
        })
        cb(alliance)
    })
    socket.on("getMatch", (cb) => {
        cb(getCurrentMatch())
    })
    socket.on("getMatches", (cb) => {
        cb(matches)
    })
    socket.on("getTeams", (cb) => {
        cb(teams)
    })

    updateAudienceScreen(currentScreen, socket)
})

function updateAudienceScreen(screen:AudienceScreen, socket:ThisSocket|ThisServer = ws) {
    currentScreen = screen
    socket.emit("showScreen", currentScreen)
}



function endMatch(state:MatchState) {
    ws.emit("matchEnd", getCurrentMatch())
    getCurrentMatch().end(state)
    ws.emit("matchData", getCurrentMatch())
}

