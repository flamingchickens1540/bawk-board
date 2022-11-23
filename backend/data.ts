const dataDir = "./data"
import type { EventData, MatchData, TeamData } from "common/types"
import { CronJob } from "cron"
import fs from "fs"
import path from "path"
import process from "process"
import simpleGit from "simple-git"
import { getMatches, getTeams } from "."
import { origin_url } from "../secrets"
import Match from "./classes/match"
import Team from "./classes/team"


process.on("exit", (code) => {
    console.warn("Erroring, saving files")
    try {
        storeTeams(getTeams())
        storeMatches(getMatches())
    } catch (e) {
        console.error("could not save files")
    }
})

export enum DataFile {
    TEAMS = "teams.json",
    MATCHES = "matches.json",
    EVENT = "event.json"
}

export type TeamDict = {[key:number]:Team}

const git = simpleGit({
    baseDir: dataDir,
    config: [
        "user.name=Scoreboard",
        "user.email=robotics@catlin.edu",
        "commit.gpgsign=false"
    ]
})

async function setupGit() {
    await git.init()
    const remotes = await git.getRemotes()
    if (remotes.length == 0) {
        await git.addRemote("origin", origin_url)
    }
}
if (origin_url.length > 0) {
    setupGit()
}


async function storeFile(file:DataFile, data:Object):Promise<void> {
    const fileName = path.join(dataDir, file)
    try {
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2))
    } catch (e){
        console.error("Could not save to", fileName, e)
    }
}

export function loadFile(file:DataFile):Object {
    const fileName = path.join(dataDir, file)
    if (fs.existsSync(fileName)) {
        return JSON.parse(fs.readFileSync(fileName, "utf-8"))
    } else {
        fs.writeFileSync(fileName, "[]")
        return {}
    }
}

export function loadTeams():Team[] {
    const data = loadFile(DataFile.TEAMS) as TeamData[]
    return loadTeamsFromData(data)
}
export function loadTeamsFromData(data:TeamData[]):Team[] {
    return data.map((value) => Object.assign(new Team(-1, ""), value))
}

export function loadMatches():Match[] {
    const data = Object.values(loadFile(DataFile.MATCHES))
    if (data.length == 0) {
        data.push(Match.new(1))
    }
    return loadMatchesFromData(data)

}
export function loadEventData():EventData {
    return loadFile(DataFile.EVENT) as EventData;
}

export function loadMatchesFromData(data:MatchData[]):Match[] {
    return data.map((value) => Object.assign(Match.new(-1), value))
}

export const storeTeams = (teams:TeamData[]) => {storeFile(DataFile.TEAMS, teams)}
export const storeMatches = (matches:MatchData[]) => {storeFile(DataFile.MATCHES, matches)}
export const storeEventData = (data:EventData) => {storeFile(DataFile.EVENT, data)}


new CronJob({
    cronTime: "* * * * *",
    onTick: async () => {
        if (origin_url.length == 0) {
            return;
        }
        try {
            for (const file of Object.values(DataFile)) {
                await git.add(file)
            }
            await git.commit(new Date().toLocaleString(), {"--no-verify":null})
            await git.push("origin", "main")
        } catch (e) {
            console.error(e)
        }
    },
    start:true,
    runOnInit: true
})