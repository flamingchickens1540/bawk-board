import bodyParser from "body-parser"
import type { TeamData } from "common/types"
import express from "express"
import { Server } from "socket.io"
import type { ClientToServerEvents, ServerToClientEvents, SocketData } from "../common/ws_types"
import Match from "./classes/match"
import Team from "./classes/team"
import { loadMatches, loadTeams, loadTeamsFromData, storeMatches, storeTeams, type TeamDict } from "./data"

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let teams:Team[] = loadTeams()
const matches:Match[] = loadMatches()



app.get("/api/teams", (req, res) => {
    res.send(Object.values(teams))
})


app.get("/api/matches", (req, res) => {
    res.send(matches)
})

app.get("/api/match", (req, res) => {
    res.send(getLatestMatch())
})
app.listen(3000)


export function getMatches(): Match[] {
    return matches
}

export function getLatestMatch(): Match {
    return matches[matches.length - 1]
}


const ws = new Server<ClientToServerEvents, ServerToClientEvents, any, SocketData>(3001, {})

ws.on("connection", (socket) => {
    console.log("new connection")

    socket.on("matchData", (data) => {
        const latestMatch = getLatestMatch()
        if (latestMatch.id == data.id) {
            latestMatch.blueScoreBreakdown = data.blueScoreBreakdown ?? latestMatch.blueScoreBreakdown
            latestMatch.redScoreBreakdown = data.redScoreBreakdown ?? latestMatch.redScoreBreakdown
            latestMatch.blueTeams = data.blueTeams ?? latestMatch.blueTeams
            latestMatch.redTeams = data.redTeams ?? latestMatch.redTeams
        }
        socket.broadcast.emit("matchData", getLatestMatch())
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
        console.log("ws:teamData", data)
        data.forEach((value) => {
            if (value.id == null) {
                return;
            }
            const teamIndex = teams.findIndex((team) => team.id == value.id)
            if (teamIndex == -1) {
                teams.push(new Team(value.id, value.name, value.display_id))
            } else {
                teams[teamIndex].id = value.id
                teams[teamIndex].display_id = value.display_id ?? value.id.toString()
                teams[teamIndex].name = value.name
            }
        })
        socket.broadcast.emit("teamData", teams)
    })
    socket.on("teamRemove", (id) => {
        console.log("ws:teamRemove", id)
        teams = teams.filter((item) => item.id != id)
        ws.emit("teamData", teams)
    })
})

