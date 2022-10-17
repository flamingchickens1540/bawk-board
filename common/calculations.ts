import type { MatchScoreBreakdown } from "./types";

export function calculateScore(breakdown:MatchScoreBreakdown) {
    return breakdown.normal
        +breakdown.autoBonuses*10
        +breakdown.normalBunny*2
        +breakdown.upper*2
        +breakdown.upperBunny*4
}