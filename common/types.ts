export type MatchData = {
    id:number
    redTeams?:number[]
    blueTeams?:number[]
    redScoreBreakdown?:MatchScoreBreakdown
    blueScoreBreakdown?:MatchScoreBreakdown
};
export type TeamData = {
    id:number,
    display_id:string,
    name:string
};

export type MatchScoreBreakdown = {
    normal:number
    upper:number
    normalBunny:number
    upperBunny:number
    autoBonuses:number
}