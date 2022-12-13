import type { MatchID } from "./types";
import { decodeMatchID } from './calculations';

export enum PlayoffAlliance {
    NONE,
    ALLIANCE_1,
    ALLIANCE_2,
    ALLIANCE_3,
    ALLIANCE_4
}

export function isPlayoffLevel(id:MatchID):boolean {
    const parsed = decodeMatchID(id)
    return parsed.level != "qm"
}