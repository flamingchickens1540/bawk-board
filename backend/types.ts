export class Team {
    public rank:number = 0;
    public rankingPoints:number = 0;
    constructor(
        public readonly id:number, 
        public readonly display_id:string = id.toString()
    ) {}

    addMatchResults(match:Match) {
        if (match.didTeamWin(this.id)) {
            this.rankingPoints += match.winningScore + match.losingScore
        }
    }

    getScore(match:Match) {
        return match.getTeamScore(this.id);
    }
}

export enum Alliance {
    RED,
    BLUE
}

export class Match {
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
        this.winningAlliance = redScore > blueScore ? Alliance.RED : Alliance.BLUE
    }

    getTeamAlliance(team:number):Alliance {
        if (this.redTeams.includes(team)) {
            return Alliance.RED
        } else {
            return Alliance.BLUE
        }
    }
    
    didTeamWin(team:number):boolean {
        return this.getTeamAlliance(team) == this.winningAlliance
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
        }
    }
}