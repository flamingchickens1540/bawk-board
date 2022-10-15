const dataDir = "./data"
import fs from "fs"
import path from "path"
import Match from "./classes/match"
import Team from "./classes/team"
import simpleGit from "simple-git"
import { origin_url } from "../secrets"


export enum DataFile {
    TEAMS = "teams.json",
    MATCHES = "matches.json"
}

type TeamData = {[key:number]:Team}

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
setupGit()


async function storeFile(file:DataFile, data:Object):Promise<void> {
    
    const fileName = path.join(dataDir, file)
    try {
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2))
        await git.add(file)
        await git.commit(new Date().toLocaleString(), {
            "--no-verify":null
        })
        await git.push("origin", "main")
        
    } catch (e){
        console.error("Could not save to", fileName, e)
    }
}

export function loadFile(file:DataFile):Object {
    const fileName = path.join(dataDir, file)
    if (fs.existsSync(fileName)) {
        return JSON.parse(fs.readFileSync(fileName, "utf-8"))
    } else {
        fs.writeFileSync(fileName, "{}")
        return {}
    }
}

export function loadTeams():TeamData {
    const data = loadFile(DataFile.TEAMS)
    Object.entries(data).forEach(([key, value]) => {
        data[key] = Object.assign(new Team(-1, ""), value)
    })
    return data as TeamData
}

export function loadMatches():Match[] {
    const data = Object.values(loadFile(DataFile.MATCHES))
    data.forEach((value, index) => {
        data[index] = Object.assign(new Match([],[],-1,-1), value)
    })
    return data
}

export const storeTeams = (teams:TeamData) => {storeFile(DataFile.TEAMS, teams)}
export const storeMatches = (matches:Match[]) =>         {storeFile(DataFile.MATCHES, matches)}
