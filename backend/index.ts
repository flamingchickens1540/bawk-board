import { NotifyTimer } from "common/timer"
import { MatchState } from "common/types"
import { auth_secret } from "secrets"
import { Server } from "socket.io"
import type { ClientToServerEvents, ServerToClientEvents } from "../common/ws_types"
import Match from "./classes/match"
import Team from "./classes/team"
import { loadMatches, loadTeams, storeMatches, storeTeams } from "./data"
import { startHttpServer } from './router';
import { updateEventInfo } from "./tba"



let teams:Team[] = loadTeams()
const matches:Match[] = loadMatches()

let matchTimer:NotifyTimer;

startHttpServer()

export function getTeams():Team[] {
    return teams
}
export function getMatches(): Match[] {
    return matches
}

export function getLatestMatch(): Match {
    return matches[matches.length - 1]
}


const ws = new Server<ClientToServerEvents, ServerToClientEvents>(3001, {})



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
        const latestMatch = getLatestMatch()
        if (latestMatch.id == data.id) {
            latestMatch.blueScoreBreakdown = data.blueScoreBreakdown ?? latestMatch.blueScoreBreakdown
            latestMatch.redScoreBreakdown = data.redScoreBreakdown ?? latestMatch.redScoreBreakdown
            latestMatch.blueTeams = data.blueTeams ?? latestMatch.blueTeams
            latestMatch.redTeams = data.redTeams ?? latestMatch.redTeams
        } else {
            console.warn("wrong ID")
        }
        socket.broadcast.emit("matchData", getLatestMatch())
        storeMatches(matches)
    })

    socket.on("newMatch", (id) => {
        const latestMatch = getLatestMatch() ?? {id:-1}
        if (latestMatch.id == id) {
            storeMatches(matches)
            matches.push(Match.new(id+1))
            ws.emit("newMatch", getLatestMatch())
        }
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
                teams.push(new Team(value.id, value.name, display_id))
            } else {
                teams[teamIndex].id = value.id
                teams[teamIndex].display_id = display_id
                teams[teamIndex].name = value.name
            }
        })
        storeTeams(teams)
        updateEventInfo(teams)
        socket.broadcast.emit("teamData", teams)
    })
    socket.on("teamRemove", (id) => {
        teams = teams.filter((item) => item.id != id)
        ws.emit("teamData", teams)
    })

    socket.on("matchStart", (id) => {
        const latestMatch = getLatestMatch()
        matchTimer = new NotifyTimer(() => ws.emit("matchTeleop", getLatestMatch()), endMatch)
        matchTimer.start()
        latestMatch.start(matchTimer.startTime)
        
        ws.emit("matchStart", getLatestMatch())
        ws.emit("matchData", getLatestMatch())
    })
    socket.on("matchAbort", (id) => {
        endMatch()
    })
})

function endMatch() {
    ws.emit("matchEnd", getLatestMatch())
    getLatestMatch().end()
    ws.emit("matchData", getLatestMatch())
}

