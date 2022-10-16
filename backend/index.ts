import express from "express"
import bodyParser from "body-parser"
import Team from "./classes/team"
import Match from "./classes/match"
import {DataFile, loadFile, loadMatches, loadTeams, storeTeams} from "./data"

const app = express()
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

let teams = loadTeams()
const matches = loadMatches()


const sendTeams = (req, res) => {
    res.send(Object.values(teams).sort((a, b) => a.display_id.localeCompare(b.display_id)))
}
app.get("/api/teams", sendTeams)
app.post("/api/teams", (req, res) => {
    const newTeams:any[] = req.body["teams"].filter((a) => a.id)
    teams = newTeams.map((team) => new Team(team.id, team.name, team.display_id ?? team.id))
    storeTeams(teams)
    sendTeams(req, res)
})
app.listen(3000)


export function getMatches():Match[] {
    return matches
}