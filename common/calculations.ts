import { MatchScoreZone, type CompLevel, type MatchID, type MatchScoreBreakdown } from './types';

export function calculateScore(breakdown:MatchScoreBreakdown) {
    if (breakdown == null) {
        return 0
    }

    return getHybridScore(breakdown)+getTeleopScore(breakdown)+getFoulPoints(breakdown)
}
export const getHybridScore = (breakdown:MatchScoreBreakdown) => {
    if (breakdown == null) {
        return 0
    }
    return breakdown.autoTubes*10
}
export const getTeleopScore = (breakdown:MatchScoreBreakdown) => {
    let zoneSum:number = 0
    breakdown.zones.forEach((zone) => {
        zoneSum += MatchScoreZone.from(zone).points
    })
    return zoneSum;
}
export const getFoulPoints = (breakdown:MatchScoreBreakdown) => breakdown.foulPoints

export const decodeMatchID = (id:MatchID) => {
    const parsed = id.match(/(\w{1,2})(\d{1,2})/)
    return {
        level:parsed[1] as CompLevel,
        id:parseInt(parsed[2])
    }
}

export const prettyMatchID = (id:MatchID) => {
    const decoded = decodeMatchID(id)
    const text:{[key in CompLevel]:string}= {
        qm: "Quals",
        qf:"Quarter-Finals",
        sf:"Semi-Finals",
        f:"Finals",
        p: "Practice"
    }
    return text[decoded.level]+" "+decoded.id
}