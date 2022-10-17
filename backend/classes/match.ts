import { calculateScore } from "../../common/calculations";
import type { MatchData, MatchScoreBreakdown } from "../../common/types";

export enum Alliance {
    RED,
    BLUE,
    NONE
}
export enum MatchResult {
    WIN,
    LOSS,
    DRAW
}

export default class Match implements MatchData {
    get winningAlliance() {
        if (this.redScore > this.blueScore) {
            return Alliance.RED
        } else if (this.blueScore > this.redScore) {
            return Alliance.BLUE
        } else {
            return Alliance.NONE
        }
    }
    get winningScore() {
        return this.getAllianceScore(this.winningAlliance)
    }
    get losingScore() {
        return this.getAllianceScore(this.winningAlliance == Alliance.RED ? Alliance.BLUE : Alliance.RED)
    }

    get redScore() {return calculateScore(this.redScoreBreakdown)}
    get blueScore() {return calculateScore(this.blueScoreBreakdown)}

    constructor(
        public id:number,
        public redTeams:number[], 
        public blueTeams:number[], 
        public redScoreBreakdown:MatchScoreBreakdown, 
        public blueScoreBreakdown:MatchScoreBreakdown
    ){}

    getTeamAlliance(team:number):Alliance {
        if (this.redTeams.includes(team)) {
            return Alliance.RED
        } else {
            return Alliance.BLUE
        }
    }
    
    getMatchResult(team:number):MatchResult {
        switch (this.winningAlliance) {
            case Alliance.NONE:
                return MatchResult.DRAW
            case this.getTeamAlliance(team):
                return MatchResult.WIN
            default:
                return MatchResult.LOSS
        }
    }

    getTeamScore(team:number):number {
        return this.getAllianceScore(this.getTeamAlliance(team));
    }

    getAllianceScore(alliance:Alliance) {
        switch (alliance) {
            case Alliance.RED:
                return this.redScore
            case Alliance.BLUE:
                return this.blueScore
            default:
                return 0
        }
    }

    static new(id:number):Match {
        return new Match(id, [],[],nullMatchData,nullMatchData)
    }
}

const nullMatchData:MatchScoreBreakdown = {
    upperBunny:0,
    upper:0,
    normal:0,
    normalBunny:0,
    autoBonuses:0,
    foulPoints:0
}
