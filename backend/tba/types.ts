export type RankingBody = {
    breakdowns: string[],
    rankings: Ranking[]
}

export type InfoBody = {
    first_code?:string|null
    playoff_type?:number
    webcasts?:{url:string}[]
    remap_teams: {[key:string]:string}
}
export type Ranking = {
    team_key: string,
    rank: number,
    wins: number,
    losses: number,
    ties: number,
    played: number,
    dqs: number,
    rp: number
}