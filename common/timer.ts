export class NotifyTimer {
    private readonly timer:SimpleTimer = new SimpleTimer()
    private ranTeleopCB:boolean = false;
    private ranEndCB:boolean = false;
    get startTime() {return this.timer.startTime}
    constructor(private readonly teleop_cb:(timer:NotifyTimer) => void, private readonly end_cb:(timer:NotifyTimer) => void) {
    }
    private runCallbacks():void {
        if (this.timer.stage == Period.TELEOP && !this.ranTeleopCB) {
            this.teleop_cb(this)
            this.ranTeleopCB = true;
        } else if (this.timer.stage == Period.POST && !this.ranEndCB) {
            this.end_cb(this)
            this.ranEndCB = true;
        }
    }
    
    public start() {
        this.timer.start()
        setInterval(() => this.runCallbacks(), 100)
    }
}

export class SimpleTimer {
    public startTime:number = 0
    private get realStartTime() {
        return this.startTime || Date.now()
    }
    get elapsedTimeMS() {return Date.now() - this.realStartTime}
    get elapsedTimeFormatted() {
        const date = new Date(this.elapsedTimeMS)
        return `${date.getMinutes()}:${date.getSeconds().toString().padStart(2, "0")}`
    }
    get elapsedTime() {return Math.ceil(this.elapsedTimeMS/1000)}
    get stage():Period {
        if      (transitions.HYBRID.contains(this.elapsedTimeMS/1000)) return Period.HYBRID
        else if (transitions.TELEOP.contains(this.elapsedTimeMS/1000)) return Period.TELEOP
        else return Period.POST;
    }
    get remainingTimeMS() {
        return (transitions[this.stage] ?? {end:this.elapsedTime}).end*1000 - this.elapsedTimeMS
    }
    get remainingTimePercent() {
        return ((this.remainingTimeMS)/(transitions[this.stage].end*1000))
    }
    get remainingTimeFormatted() {
        const date = new Date(this.remainingTimeMS)
        return `${date.getMinutes()}:${date.getSeconds().toString().padStart(2, "0")}`
    }
    public start() {
        this.startTime = Date.now()
    }
    public reset() {
        this.startTime = 0;
    }
    public startWithTime(startTime:number) {
        this.startTime = startTime
    }
}

class Range {
    constructor (readonly start:number, readonly end:number) {}
    contains(value:number) {
        return value < this.end && value >= this.start;
    }
}
enum Period {
    PRE = "PRE",
    HYBRID = "HYBRID",
    TELEOP = "TELEOP",
    POST = "POST"
}
const transitions:{[key:string]:Range} = {
    HYBRID:new Range(0, 10),
    TELEOP:new Range(10, 150),
}

