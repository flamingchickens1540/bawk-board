import {writable, get, type Writable} from 'svelte/store'
import {MatchState, type MatchData, type MatchScoreBreakdown, type TeamData} from "../common/types"
import type { TowerName, Tower } from './types'
import { addMatchDataPublishers } from './socket'


export const redScore:Writable<MatchScoreBreakdown> = writable();
export const blueScore:Writable<MatchScoreBreakdown> = writable();
export const redAlliance:Writable<number[]> = writable([])
export const blueAlliance:Writable<number[]> = writable([])
export const matchID:Writable<number> = writable(0)
export const teams:Writable<TeamData[]> = writable([])
export const matchState:Writable<MatchState> = writable(MatchState.PENDING)
export const matchStartTime:Writable<number> = writable(0)

export const areUpdatesBlocked = writable(false)

async function init() {
    await fetch("//localhost:3000/api/teams").then(async (res) => {
        teams.set(await res.json())
    })
    await fetch("//localhost:3000/api/match").then(async (res) => {
        const data = await res.json() as MatchData
        updateMatchData(data)
    })
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
    matchState.set(data.matchState)
    matchStartTime.set(data.matchStartTime)
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