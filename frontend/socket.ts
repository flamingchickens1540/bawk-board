
import { io, type Socket } from "socket.io-client";
import { get } from "svelte/store";
import { getCookie } from 'typescript-cookie';
import type { ClientToServerEvents, ServerToClientEvents } from "../common/ws_types";
import { backend_url, port } from "../secrets";

import { areUpdatesBlocked, updateTeamData, timer, updateMatchData } from './store';



export const socket:Socket<ServerToClientEvents, ClientToServerEvents> = io(backend_url || window.location.origin, {
    auth: {
        key: getCookie("auth")
    }
})


socket.on("teamData", (data) => {
    updateTeamData(data)
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


