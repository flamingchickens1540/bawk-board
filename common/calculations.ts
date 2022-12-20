import { MatchScoreZone, type CompLevel, type MatchID, type MatchScoreBreakdown } from './types';

export function calculateScore(breakdown: MatchScoreBreakdown) {
    if (breakdown == null) {
        return 0
    }

    return getHybridScore(breakdown) + getTeleopScore(breakdown) + getFoulPoints(breakdown)
}
export const getHybridScore = (breakdown: MatchScoreBreakdown) => {
    if (breakdown == null) {
        return 0
    }
    return breakdown.autoTubes * 10
}
export const getTeleopScore = (breakdown: MatchScoreBreakdown) => {
    let zoneSum: number = 0
    breakdown.zones.forEach((zone) => {
        zoneSum += MatchScoreZone.from(zone).points
    })
    return zoneSum;
}
export const getFoulPoints = (breakdown: MatchScoreBreakdown) => breakdown.foulPoints

export const decodeMatchID = (id: MatchID) => {
    const parsed = id.match(/(\w{1,2})(\d{1,2})m(\d{1,2})/)
    return {
        level: parsed[1] as CompLevel,
        set: parseInt(parsed[2]),
        match: parseInt(parsed[3])
    }
}
export const encodeMatchID = (level: CompLevel, set: number, match: number): MatchID => {
    return `${level}${set}m${match}`;
}

export const prettyMatchID = (id: MatchID) => {
    const decoded = decodeMatchID(id)
    let matchText;
    if (decoded.level == "sf") {
        matchText = `${decoded.set}-${decoded.match}`
    } else {
        matchText = decoded.match
    }
    const text: { [key in CompLevel]: string } = {
        qm: "Quals",
        sf: "Semi-Finals",
        f: "Finals",
        p: "Practice"
    }

    return text[decoded.level] + " " + matchText
}

export function nextMatchID(id:MatchID):MatchID {
    const decoded = decodeMatchID(id)
    let level=decoded.level;
    let match = decoded.match
    let set = decoded.set;
    if (decoded.level == "sf") {
        if (decoded.match == 1) {
            match++
            
        } else if (decoded.match == 3) {
            set++
            match = 1;
        }
        if (set > 2) {
            set=1
            match=1
            level="f"
        }
    } else {
        match++
    }
    return encodeMatchID(level, set, match)
}

