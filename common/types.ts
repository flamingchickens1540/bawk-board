export type MatchData = {
    id:number
    redTeams:number[]
    blueTeams:number[]
    redScoreBreakdown:MatchScoreBreakdown
    blueScoreBreakdown:MatchScoreBreakdown
    matchState: MatchState
    matchStartTime:number
};
export type TeamData = {
    id:number,
    display_id:string,
    name:string
};

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
    COMPLETED
}