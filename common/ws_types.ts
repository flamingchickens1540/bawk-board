import type { MatchData, TeamData } from "./types";

export interface ServerToClientEvents {
    matchData: (data:MatchData) => void;
    newMatch: (data:MatchData) => void;
    teamData: (data:TeamData[]) => void;
    reAuth: () => void;
    matchStart: (data:MatchData) => void;
}

export interface ClientToServerEvents {
    matchData: (data:MatchData) => void;
    teamData: (data:TeamData[]) => void;
    newMatch: (id:number) => void;
    teamRemove: (id:number) => void;
    matchStart: (id:number) => void;
}
