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

export default class Match {
    readonly winningAlliance:Alliance;
    get winningScore() {
        return this.getAllianceScore(this.winningAlliance)
    }
    get losingScore() {
        return this.getAllianceScore(this.winningAlliance == Alliance.RED ? Alliance.BLUE : Alliance.RED)
    }
    constructor(
        readonly redTeams:number[], 
        readonly blueTeams:number[], 
        readonly redScore:number, 
        readonly blueScore:number
    ){
        if (redScore > blueScore) {
            this.winningAlliance = Alliance.RED
        } else if (blueScore > redScore) {
            this.winningAlliance = Alliance.BLUE
        } else {
            this.winningAlliance = Alliance.NONE
        }
    }

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
}