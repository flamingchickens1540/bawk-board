import { calculateScore, getHybridScore } from '../../common/calculations';
import { Alliance, MatchResult, MatchState, type MatchData, type MatchID, type MatchScoreBreakdown } from "../../common/types";



export default class Match implements MatchData{
    public matchState = MatchState.PENDING
    public matchStartTime:number = 0


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

    get _redHybridScore() {return getHybridScore(this.redScoreBreakdown)}
    get _blueHybridScore() {return getHybridScore(this.blueScoreBreakdown)}

    constructor(
        public id:MatchID,
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
    getTeamHybridScore(team:number):number {
        return this.getAllianceHybridScore(this.getTeamAlliance(team));
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

    getAllianceHybridScore(alliance:Alliance) {
        switch (alliance) {
            case Alliance.RED:
                return this._redHybridScore
            case Alliance.BLUE:
                return this._blueHybridScore
            default:
                return 0
        }
    }

    start(startTime:number) {
        this.matchState = MatchState.IN_PROGRESS
        this.matchStartTime = startTime
    }
    end(state:MatchState) {
        this.matchState = state
    }

    static new(id:MatchID):Match {
        return new Match(id, [],[],nullMatchData,nullMatchData)
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
      static createFrom(data:MatchData):Match {
        const match = new Match("qf0",[],[],null,null)
        match.id = data.id;
        match.redTeams = data.redTeams;
        match.blueTeams=data.blueTeams;
        match.redScoreBreakdown = data.redScoreBreakdown;
        match.blueScoreBreakdown = data.blueScoreBreakdown;
        match.matchState = data.matchState;
        match.matchStartTime = data.matchStartTime;
        return match
    }
}

const nullMatchData:MatchScoreBreakdown = {
    zones:[],
    autoTubes:0,
    foulPoints:0
}
