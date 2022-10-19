import type { MatchScoreBreakdown } from "./types";

export function calculateScore(breakdown:MatchScoreBreakdown) {
    if (breakdown == null) {
        return 0
    }
    let zoneSum:number = 0
    breakdown.zones.forEach((zone) => {
        zoneSum += zone.points
    })
    return zoneSum+breakdown.autoBonuses*10+breakdown.foulPoints
}