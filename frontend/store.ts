import {writable, get, type Writable} from 'svelte/store'
import type {MatchData, MatchScoreBreakdown, TeamData} from "../common/types"
import type {ServerToClientEvents, ClientToServerEvents} from "../common/ws_types"
import {io, type Socket} from "socket.io-client"
import { getCookie } from 'typescript-cookie'
import type { TowerName, Tower } from './types'

export const socket:Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001/", {
    auth: {
        key: getCookie("auth")
    }
})

export const redScore:Writable<MatchScoreBreakdown> = writable();
export const blueScore:Writable<MatchScoreBreakdown> = writable();
export const redAlliance:Writable<number[]> = writable([])
export const blueAlliance:Writable<number[]> = writable([])
export const matchID:Writable<number> = writable(0)
export const teams:Writable<TeamData[]> = writable([])


const blockUpdates = writable(false)

async function init() {
    await fetch("//localhost:3000/api/teams").then(async (res) => {
        teams.set(await res.json())
    })
    await fetch("//localhost:3000/api/match").then(async (res) => {
        const data = await res.json() as MatchData
        updateMatchData(data)
    })
}

function updateMatchData(data:MatchData) {
    blockUpdates.set(true)
    
    matchID.set(data.id)
    redScore.set(data.redScoreBreakdown)
    blueScore.set(data.blueScoreBreakdown)
    redAlliance.set(data.redTeams)
    blueAlliance.set(data.blueTeams)

    blockUpdates.set(false)
}

function addMatchDataPublishers() {
    redScore.subscribe((value) => {
        if (get(blockUpdates)) return;
        socket.emit("matchData", {id:get(matchID), redScoreBreakdown: value})
    })
    blueScore.subscribe((value) => {
        if (get(blockUpdates)) return;
        socket.emit("matchData", {id:get(matchID), blueScoreBreakdown: value})
    })
    redAlliance.subscribe((value) => {
        if (get(blockUpdates)) return;
        socket.emit("matchData", {id:get(matchID), redTeams: value.filter(Number)})
    })
    blueAlliance.subscribe((value) => {
        if (get(blockUpdates)) return;
        socket.emit("matchData", {id:get(matchID), blueTeams: value.filter(Number)})
    })
}

export const isDoneLoading = init().then(addMatchDataPublishers)

export function prettyTeamNumber(number:number) {
    return (get(teams).find((team) => team.id == number) ?? {display_id:""}).display_id
}
export function realTeamNumber(prettyNumber:string) {
    return (get(teams).find((team) => team.display_id == prettyNumber) ?? {id:0}).id
}

socket.on("teamData", (data) => {
    teams.set(data)
})
socket.on("matchData", (data) => {
    updateMatchData(data)
})

socket.on("reAuth", () => {
    window.location.assign("/auth.html")
})

export function updateTeams() {
    socket.emit("teamData", get(teams))
}


export const towers:{[key in TowerName]:Tower} = {
    near: {name:"Near Tower", index:0},
    far:  {name:"Far Tower", index:1}
}