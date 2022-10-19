export class Timer {
    private startTime:number

    get elapsedTimeMS() {return Date.now() - this.startTime}
    get elapsedTime() {return Math.floor(this.elapsedTimeMS/1000)}
    constructor() {
        this.startTime = Date.now()
    }

    

}


enum PERIOD_DURATIONS {
    HYBRID=10,
    TELEOP=140,
}

enum PERIOD_ENDS {
    HYBRID=10,
    TELEOP=140,
}