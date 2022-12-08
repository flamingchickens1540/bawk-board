import type { PlayoffAlliance } from "./alliances";

export type CompLevel = "qm" | "qf" | "sf" | "f"
export type MatchID = `${CompLevel}${number}`
export type MatchData = {
    id: MatchID
    redTeams:number[]
    blueTeams:number[]
    redScoreBreakdown:MatchScoreBreakdown
    blueScoreBreakdown:MatchScoreBreakdown
    matchState: MatchState
    matchStartTime:number
    winningAlliance:Alliance;
};
export type TeamData = {
    playoffAlliance:PlayoffAlliance
    id:number,
    matchIDs:MatchID[]
    display_id:string,
    name:string,
    matchWins:number;
    matchLosses:number;
    matchTies:number;
    rankingPoints:number;
};
export type EventData = {
    currentMatchID:MatchID
}

export type MatchScoreBreakdown = {
    zones: MatchScoreZone[]
    autoTubes:number
    foulPoints:number
}
export class MatchScoreZone {
    constructor(
        public isUpper:boolean,
        public hasBunny:boolean,
        public tubeCount:number
    ){}

    get multiplier() {
        return (this.isUpper?2:1)*(this.hasBunny?2:1)
    }
    get points() {
        return this.multiplier*this.tubeCount
    }
    static from(data:MatchScoreZone) {
        return new MatchScoreZone(data.isUpper, data.hasBunny, data.tubeCount)
    }
}
export enum Alliance {
    RED,
    BLUE,
    NONE
}
export enum MatchResult {
    WIN,
    LOSS,
    DRAW
}

export enum MatchState {
    PENDING,
    IN_PROGRESS,
    COMPLETED,
    POSTED
}