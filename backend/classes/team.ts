import { PlayoffAlliance } from "common/alliances"
import { getMatches } from ".."
import { MatchResult, type MatchID, type TeamData } from "../../common/types"
import type Match from "./match"


export default class Team implements TeamData {
    public matchIDs:MatchID[] = []
    

    get _matches() {
        const matches = getMatches()
        return this.matchIDs.map((id) => matches.find((match) => match.id == id))
    }
    get matchWins() { return this._matches.filter((match) =>match.getMatchResult(this.id) == MatchResult.WIN).length}
    get matchLosses() { return this._matches.filter((match) => match.getMatchResult(this.id) == MatchResult.LOSS).length}
    get matchTies() { return this._matches.filter((match) => match.getMatchResult(this.id) == MatchResult.DRAW).length}
    get matchCount() {return this._matches.length}
    get rankingPoints() {
        let rankingPoints = 0;
        this._matches.forEach((match) => {
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


    static createFrom(data:TeamData):Team {
        const team = new Team(-1, "")
        team.id = data.id;
        team.display_id = data.display_id;
        team.name=data.name;
        team.playoffAlliance = data.playoffAlliance;
        team.matchIDs = data.matchIDs;
        return team
    }

    addMatchResults(match:Match) {
        if (match.redTeams.includes(this.id) || match.blueTeams.includes(this.id) ) {
            this.matchIDs.push(match.id)
        }
    }

    getScore(match:Match) {
        return match.getTeamScore(this.id);
    }

    toJSON() {
        const proto = Object.getPrototypeOf(this);
        const jsonObj: any = Object.assign({}, this);
      
        Object.entries(Object.getOwnPropertyDescriptors(proto))
          .filter(([key, descriptor]) => typeof descriptor.get === 'function')
          .map(([key, descriptor]) => {
            if (descriptor && key[0] !== '_') {
              try {
                const val = (this as any)[key];
                jsonObj[key] = val;
              } catch (error) {
                console.error(`Error calling getter ${key}`, error);
              }
            }
          });
      
        return jsonObj;
      }
}