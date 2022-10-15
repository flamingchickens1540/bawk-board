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

app.get("/api/teams", (req, res) => {
    res.send(Object.values(teams))
})
app.post("/api/teams", (req, res) => {
    const newTeams = req.body["teams"]
    teams = newTeams.map((team) => new Team(team.id, team.name, team.display_id))
    storeTeams(teams)
})
app.listen(3000)


export function getMatches():Match[] {
    return matches
}