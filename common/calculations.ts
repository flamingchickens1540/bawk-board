import { MatchScoreZone, type MatchScoreBreakdown } from "./types";

export function calculateScore(breakdown:MatchScoreBreakdown) {
    if (breakdown == null) {
        return 0
    }

    return getHybridScore(breakdown)+getTeleopScore(breakdown)+getFoulPoints(breakdown)
}
export const getHybridScore = (breakdown:MatchScoreBreakdown) => breakdown.autoTubes*10
export const getTeleopScore = (breakdown:MatchScoreBreakdown) => {
    let zoneSum:number = 0
    breakdown.zones.forEach((zone) => {
        zoneSum += MatchScoreZone.from(zone).points
    })
    return zoneSum;
}
export const getFoulPoints = (breakdown:MatchScoreBreakdown) => breakdown.foulPoints