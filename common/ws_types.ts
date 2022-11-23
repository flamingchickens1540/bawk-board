import type { MatchData, TeamData } from "./types";

export interface ServerToClientEvents {
    matchData: (data:MatchData) => void;
    loadMatch: (data:MatchData) => void;
    teamData: (data:TeamData[]) => void;
    reAuth: () => void;
    matchStart: (data:MatchData) => void;
    matchTeleop: (data:MatchData) => void;
    matchEnd: (data:MatchData) => void;
}

export interface ClientToServerEvents {
    matchData: (data:Partial<MatchData>) => void;
    teamData: (data:TeamData[]) => void;
    loadMatch: (id:number) => void;
    teamRemove: (id:number) => void;
    matchStart: (id:number) => void;
    matchAbort: (id:number) => void;
}
