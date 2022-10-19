export type MatchData = {
    id:number
    redTeams?:number[]
    blueTeams?:number[]
    redScoreBreakdown?:MatchScoreBreakdown
    blueScoreBreakdown?:MatchScoreBreakdown
    matchState?: MatchState
};
export type TeamData = {
    id:number,
    display_id:string,
    name:string
};

export type MatchScoreBreakdown = {
    zones: MatchScoreZone[]
    autoBonuses:number
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
    COMPLETED
}