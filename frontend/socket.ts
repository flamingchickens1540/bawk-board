
import { io, type Socket } from "socket.io-client";
import { get } from "svelte/store";
import { getCookie } from 'typescript-cookie';
import type { ClientToServerEvents, ServerToClientEvents } from "../common/ws_types";
import { backend_url, port } from "../secrets";
import { socketStore } from "./socketStore";
import { areUpdatesBlocked, blueAlliance, blueScore, matchID, redAlliance, redScore, teams, timer, updateMatchData } from './store';



export const socket:Socket<ServerToClientEvents, ClientToServerEvents> = io(backend_url || window.location.origin, {
    auth: {
        key: getCookie("auth")
    }
})

export function addMatchDataPublishers() {
    redScore.subscribe((value) => {
        if (get(areUpdatesBlocked)) return;
        console.log("emitting rsb")
        socket.emit("matchData", {id:get(matchID), redScoreBreakdown: value})
    })
    blueScore.subscribe((value) => {
        if (get(areUpdatesBlocked)) return;
        console.log("emitting bsb")
        socket.emit("matchData", {id:get(matchID), blueScoreBreakdown: value})
    })
    redAlliance.subscribe((value) => {
        if (get(areUpdatesBlocked)) return;
        console.log("emitting rt")
        socket.emit("matchData", {id:get(matchID), redTeams: value.filter(Number)})
    })
    blueAlliance.subscribe((value) => {
        if (get(areUpdatesBlocked)) return;
        console.log("emitting bt")
        socket.emit("matchData", {id:get(matchID), blueTeams: value.filter(Number)})
    })
}

socket.on("teamData", (data) => {
    teams.set(data)
})
socket.on("matchData", (data) => {
    updateMatchData(data)
})



socket.on("matchStart", (data) => {
    timer.startWithTime(data.matchStartTime)
})
socket.on("matchEnd", updateMatchData)

socket.on("reAuth", () => {
    window.location.assign("/auth/")
})

export function updateTeams() {
    socket.emit("teamData", get(teams))
}

const matchDataStore = socketStore("matchData", (data) => data,"matchData", (data) => data, "getMatch", (data) => data)
matchDataStore.subscribe((value) => {
    console.log("NEW MATCH DATA", value)
})
window["getData"] = () => get(matchDataStore)