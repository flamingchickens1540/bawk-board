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
    const newTeams:any[] = req.body["teams"].filter((a) => a.id)
    teams = newTeams.map((team) => new Team(team.id, team.name, team.display_id ?? team.id))
    storeTeams(teams)
    res.send(Object.values(teams))
})

app.get("/api/matches", (req, res) => {
    res.send(matches)
})

app.get("/api/match", (req, res) => {
    
    res.send(matches)
})
app.listen(3000)


export function getMatches():Match[] {
    return matches
}