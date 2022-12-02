import {writable, get, type Writable, readable, type Readable} from 'svelte/store'
import type { MatchState,  MatchData,  MatchScoreBreakdown,  TeamData,  MatchID } from '../common/types';
import type { TowerName, Tower } from './types'
import { addMatchDataPublishers, socket } from './socket'
import { SimpleTimer } from '../common/timer';


export const  redScore:Writable<MatchScoreBreakdown> = writable();
export const blueScore:Writable<MatchScoreBreakdown> = writable();
export const redAlliance:Writable<number[]> = writable([])
export const blueAlliance:Writable<number[]> = writable([])
export const matchID:Writable<MatchID> = writable("qm0")
export const teams:Writable<TeamData[]> = writable([])

export const timer:SimpleTimer = new SimpleTimer();

export const areUpdatesBlocked = writable(false)

const matchResponse:Promise<any> = fetch("//localhost:8008/api/match").then((res) => res.json())
export const matches:Readable<MatchData[]> = readable([], (set) => {
    const matchesData = writable([])
    matchesData.subscribe(set)
    fetch("//localhost:8008/api/matches").then(async (res) => {
        const data = await res.json()
        matchesData.set(data)
    })
    const newMatchCallbackWrapper = (data:MatchData[]) => matchesData.set(data)
    const matchDataCallbackWrapper = (data:MatchData) => {
        const index = get(matchesData).findIndex((item) => {item.id == data.id})
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

export const matchState:Readable<MatchState> = readable(undefined, (set) => {
    matchResponse.then(async (data:MatchData) => {
        set(data.matchState)
    })
    const callbackWrapper = (data:MatchData) => set(data.matchState)
    socket.on("matchData", callbackWrapper)
    return () => socket.off("matchData", callbackWrapper)
})

export const matchStartTime:Readable<number> = readable(0, (set) => {
    matchResponse.then(async (data:MatchData) => {
        set(data.matchStartTime)
    })
    const callbackWrapper = (data) => set(data.matchStartTime)
    socket.on("matchData", callbackWrapper)
    return () => socket.off("matchData", callbackWrapper)
})


async function init() {
    await fetch("//localhost:8008/api/teams").then(async (res) => {
        teams.set(await res.json())
    })
    await fetch("//localhost:8008/api/match").then(async (res) => {
        const data = await res.json() as MatchData
        updateMatchData(data)
    })
    await matchResponse
}


export function blockSubscribers(callback: ()=>void):void {
    areUpdatesBlocked.set(true)
    callback()
    areUpdatesBlocked.set(false)
}

export function updateMatchData(data:MatchData) {
    areUpdatesBlocked.set(true)
    console.log("blocking")
    matchID.set(data.id)
    redScore.set(data.redScoreBreakdown)
    blueScore.set(data.blueScoreBreakdown)
    redAlliance.set(data.redTeams)
    blueAlliance.set(data.blueTeams)
    timer.startWithTime(data.matchStartTime)
    console.log("unblocking")
    areUpdatesBlocked.set(false)
}


export const isDoneLoading = init().then(() => blockSubscribers(addMatchDataPublishers))

export function prettyTeamNumber(number:number) {
    return (get(teams).find((team) => team.id == number) ?? {display_id:""}).display_id
}
export function realTeamNumber(prettyNumber:string) {
    return (get(teams).find((team) => team.display_id == prettyNumber) ?? {id:0}).id
}



export const towers:{[key in TowerName]:Tower} = {
    near: {name:"Near Tower", index:0},
    far:  {name:"Far Tower", index:1}
}