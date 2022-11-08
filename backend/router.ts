import express from "express"
import bodyParser from 'body-parser';
import { getLatestMatch, getTeams, getMatches } from ".";


const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/teams", (req, res) => {
    res.send(Object.values(getTeams()))
})


app.get("/api/matches", (req, res) => {
    res.send(getMatches())
})

app.get("/api/match", (req, res) => {
    res.send(getLatestMatch())
})

export function startHttpServer() {
    app.listen(3000)
}

