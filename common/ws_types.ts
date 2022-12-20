import type { Server, Socket } from "socket.io";
import type { AudienceScreen, MatchData, MatchID, TeamData } from "./types";
import type { PlayoffAlliance } from './alliances';

export interface ServerToClientEvents {
    matchData: (data:MatchData) => void;
    loadMatch: (data:MatchData) => void;
    newMatch: (data:MatchData[]) => void;
    teamData: (data:TeamData[]) => void;
    
    reAuth: () => void;
    matchStart: (data:MatchData) => void;
    matchTeleop: (data:MatchData) => void;
    matchEnd: (data:MatchData) => void;
    showScreen: (screen:AudienceScreen) => void;
}

export interface ClientToServerEvents {
    matchData: (data:Partial<MatchData>) => void;
    teamData: (data:TeamData[]) => void;
    loadMatch: (id:MatchID) => void;
    teamRemove: (id:number) => void;
    matchStart: () => void;
    matchAbort: () => void;
    matchCommit: () => void;
    showScreen: (screen:AudienceScreen) => void;
    getAlliance(alliance:PlayoffAlliance, cb:(teams: number[]) => void)
    getAllianceForTeams(teams:number[], cb:(alliance:PlayoffAlliance) => void)
}

export type ThisSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
export type ThisServer = Server<ClientToServerEvents, ServerToClientEvents>;