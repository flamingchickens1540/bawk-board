import express from "express"
import { createServer } from "http";
import bodyParser from 'body-parser';
import cors from "cors"
import { getCurrentMatch, getTeams, getMatches, findMatch } from ".";
import { port } from "secrets";
import { getAlliances } from "./alliances";
import type { MatchID } from "common/types";

const app = express()
const httpServer = createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.get("/api/teams", (req, res) => {
    res.send(getTeams().sort((a, b) => a.display_id.localeCompare(b.display_id)))
})

app.get("/api/matches", (req, res) => {
    res.send(getMatches())
})

app.get("/api/match", (req, res) => {
    res.send(getCurrentMatch())
})
app.get("/api/match/:id", (req, res) => {
    res.send(findMatch(req.params.id as MatchID))
})

app.get("/api/alliances", (req, res) => {
    res.send(getAlliances())
})

app.use(express.static("dist/frontend"))

export function startHttpServer() {
    httpServer.listen(port)
}

export function getHttpServer() {
    return httpServer
}