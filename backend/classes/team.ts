import { PlayoffAlliance } from "common/alliances"
import { getMatches } from ".."
import { MatchResult, type TeamData } from "../../common/types"
import type Match from "./match"

export default class Team implements TeamData {
    private matchIDs:number[]
    

    get matches() {
        const matches = getMatches()
        return this.matchIDs.map((id) => matches[id])
    }
    get matchWins() { return this.matches.filter((match) => {match.getMatchResult(this.id) == MatchResult.WIN}).length}
    get matchLosses() { return this.matches.filter((match) => {match.getMatchResult(this.id) == MatchResult.LOSS}).length}
    get matchTies() { return this.matches.filter((match) => {match.getMatchResult(this.id) == MatchResult.DRAW}).length}
    get matchCount() {return this.matches.length}
    get rankingPoints() {
        let rankingPoints = 0;
        this.matches.forEach((match) => {
            switch (match.getMatchResult(this.id)) {
                case MatchResult.WIN:
                    rankingPoints += match.redScore + match.blueScore
                case MatchResult.LOSS:
                    rankingPoints += match.getTeamScore(this.id)
                case MatchResult.DRAW:
                    rankingPoints += match.getTeamScore(this.id)
            }
        })
        return rankingPoints
    }

    constructor(
        public id:number, 
        public name:string,
        public display_id:string = id.toString(),
        public playoffAlliance:PlayoffAlliance = PlayoffAlliance.NONE
    ) {}

    addMatchResults(match:Match) {
        this.matchIDs.push(match.id)
    }

    getScore(match:Match) {
        return match.getTeamScore(this.id);
    }
}