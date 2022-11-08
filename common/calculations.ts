import { MatchScoreZone, type MatchScoreBreakdown } from "./types";

export function calculateScore(breakdown:MatchScoreBreakdown) {
    if (breakdown == null) {
        return 0
    }
    let zoneSum:number = 0
    breakdown.zones.forEach((zone) => {
        zoneSum += MatchScoreZone.from(zone).points
    })
    return zoneSum+breakdown.autoTubes*10+breakdown.foulPoints
}