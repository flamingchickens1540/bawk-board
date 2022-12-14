export type TbaEventInfo = {
    first_code?:string|null
    playoff_type?:number
    webcasts?:{url:string}[]
    remap_teams: {[key:string]:string}
}
export type TbaTeamNumber = string;
export interface TbaMatch {
    comp_level: "qm"|"ef"|"qf"|"sf"|"f"
    set_number: number;
    match_number: number;
    alliances: { [key in "red" | "blue"]: TbaAlliance};
    score_breakdown?: { [key: string]: { [key: string]: any}};
    time_string?: string;
    time_utc?: string;
    display_name?: string;
}
export class TbaAlliance {
    teams: TbaTeamNumber[];
    surrogates: TbaTeamNumber[] = [];
    dqs: string[] = [];
    score?: number;
    
    constructor(teams:TbaTeamNumber[], score?:number) {
        this.teams = teams;
        this.score = score;
    }
}

export interface TbaRanking {
    team_key: TbaTeamNumber;
    rank: number;
    wins: number;
    losses: number;
    ties: number;
    dqs: number;
    played: number;
}
export interface TbaRankings {
    breakdowns: string[];
    rankings: TbaRanking[];
}
