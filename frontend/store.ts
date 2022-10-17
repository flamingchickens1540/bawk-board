import {writable, get, type Writable} from 'svelte/store'
import type {MatchData, MatchScoreBreakdown, TeamData} from "../common/types"
import type {ServerToClientEvents, ClientToServerEvents} from "../common/ws_types"
import {io, type Socket} from "socket.io-client"

export const socket:Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001/")

export const redScore:Writable<MatchScoreBreakdown> = writable();
export const blueScore:Writable<MatchScoreBreakdown> = writable();
export const redAlliance:Writable<number[]> = writable([])
export const blueAlliance:Writable<number[]> = writable([])
export const matchID:Writable<number> = writable(0)
export const teams:Writable<TeamData[]> = writable([])

fetch("//localhost:3000/api/teams").then(async (res) => {
    teams.set(await res.json())
})
fetch("//localhost:3000/api/match").then(async (res) => {
    matchID.set((await res.json() as MatchData).id)
})






socket.on("teamData", (data) => {
    teams.set(data)
})


export function updateTeams() {
    socket.emit("teamData", get(teams))
}

redScore.subscribe((value) => {
    socket.emit("matchData", {id:get(matchID), redScoreBreakdown: value})
})
blueScore.subscribe((value) => {
    socket.emit("matchData", {id:get(matchID), blueScoreBreakdown: value})
})
redAlliance.subscribe((value) => {
    socket.emit("matchData", {id:get(matchID), redTeams: value})
})
blueAlliance.subscribe((value) => {
    socket.emit("matchData", {id:get(matchID), blueTeams: value})
})
