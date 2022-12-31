import { writable, get, type Writable, readable, type Readable } from 'svelte/store'
import type { MatchState, MatchData, MatchScoreBreakdown, TeamData, MatchID, Alliance } from '../common/types';
import type { TowerName, Tower } from './types'
import { socket } from './socket'
import { SimpleTimer } from '../common/timer';
import { backend_url } from '../secrets';
import type { AudienceScreen } from '../common/types';
import type { BawkMatchStore } from './bawkStore';
import { bawkMatchStore, bawkDataStore } from './bawkStore';



export const redScore = bawkMatchStore("redScoreBreakdown")
export const blueScore = bawkMatchStore("blueScoreBreakdown")
export const redAlliance = bawkMatchStore("redTeams")
export const blueAlliance = bawkMatchStore("blueTeams")
export const matchID = bawkMatchStore("id")
export const winningAlliance = bawkMatchStore("winningAlliance")
export const matchState = bawkMatchStore("matchState")
export const matchStartTime = bawkMatchStore("matchStartTime")


export const teams = bawkDataStore(null, (data: TeamData[]) => data, "teamData", (data) => [data])

export const timer: SimpleTimer = new SimpleTimer();

export const areUpdatesBlocked = writable(false)




const matchResponse: Promise<any> = fetch(backend_url + "/api/match").then((res) => res.json())
export const matches: Readable<MatchData[]> = readable([], (set) => {
    const matchesData = writable([])
    matchesData.subscribe(set)
    fetch(backend_url + "/api/matches").then(async (res) => {
        const data = await res.json()
        matchesData.set(data)
    })
    const newMatchCallbackWrapper = (data: MatchData[]) => matchesData.set(data)
    const matchDataCallbackWrapper = (data: MatchData) => {
        const index = get(matchesData).findIndex((item) => { item.id == data.id })
        if (index >= 0) {
            matchesData.update((value) => {
                value[index] = data
                return value;
            })
        }
    }
    socket.on("newMatch", newMatchCallbackWrapper)
    socket.on("matchData", matchDataCallbackWrapper)
    return () => socket.off("newMatch", newMatchCallbackWrapper)
})


export const audienceScreen: Readable<AudienceScreen> = readable(undefined, (set) => {
    const callbackWrapper = (data: AudienceScreen) => set(data)
    socket.on("showScreen", callbackWrapper)
    return () => socket.off("showScreen", callbackWrapper)
})



async function init() {
    await fetch(backend_url + "/api/teams").then(async (res) => {
        teams.updateLocal(await res.json())
    })
    await fetch(backend_url + "/api/match").then(async (res) => {
        const data = await res.json() as MatchData
        updateMatchData(data)
    })
    await matchResponse
}


export function blockSubscribers(callback: () => void): void {
    areUpdatesBlocked.set(true)
    callback()
    areUpdatesBlocked.set(false)
}
const matchDataStores: BawkMatchStore<any>[] = [redScore, blueScore, redAlliance, blueAlliance, matchID, winningAlliance, matchState, matchStartTime]
export function updateMatchData(data: MatchData) {
    matchDataStores.forEach((store) => {
        store.updateLocal(data)
    })
    timer.startWithTime(data.matchStartTime)
}

export function updateTeamData(data: TeamData[]) {
    teams.updateLocal(data)
}


export const initializer = init()
export let isDoneLoading = false
initializer.then(() => isDoneLoading = true)

export function prettyTeamNumber(number: number) {
    return (get(teams).find((team) => team.id == number) ?? { display_id: "" }).display_id
}
export function realTeamNumber(prettyNumber: string) {
    return (get(teams).find((team) => team.display_id == prettyNumber) ?? { id: 0 }).id
}



export const towers: { [key in TowerName]: Tower } = {
    near: { name: "Near Tower", index: 0 },
    far: { name: "Far Tower", index: 1 }
}