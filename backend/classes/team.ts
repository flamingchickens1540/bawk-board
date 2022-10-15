import { getMatches } from ".."
import Match, { MatchResult } from "./match"

export default class Team {
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
        public readonly id:number, 
        public readonly name:string,
        public readonly display_id:string = id.toString()
    ) {}

    addMatchResults(match:Match) {
        this.matches.push(match)
    }

    getScore(match:Match) {
        return match.getTeamScore(this.id);
    }
}