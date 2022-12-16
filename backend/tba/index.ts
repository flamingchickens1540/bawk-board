import axios, { AxiosError } from "axios";
import type Match from "backend/classes/match";
import crypto from "crypto"
import { tba_secret, tba_secret_id } from "secrets";
import type Team from "../classes/team";
import type { TbaEventInfo, TbaMatch, TbaRanking, TbaRankings, TbaTeamNumber } from './types';
import { TbaAlliance } from './types';
import { decodeMatchID, prettyMatchID } from '../../common/calculations';
import { MatchState, type MatchID } from "common/types";
import { map } from "jquery";


const baseUrl = "https://www.thebluealliance.com"
const eventCode = "2022orbb"

const http_client = axios.create({
    baseURL: baseUrl,
    headers: {
        'X-TBA-Auth-Id': tba_secret_id,
    }
})

function isTBATeamNumber(obj:unknown):obj is TbaTeamNumber{
    return obj.toString().startsWith("frc")
}
function getTBATeamNumber(teamNumber: number | string):TbaTeamNumber {
    return "frc" + teamNumber
}

interface Endpoints{
    "info/update": TbaEventInfo;
    "alliance_selections/update":never;
    "awards/update":never;
    "matches/update":TbaMatch[];
    "matches/delete":MatchID[];
    "rankings/update":TbaRankings;
    "team_list/update":TbaTeamNumber[];
    "media/add":never;
}

async function post<E extends keyof Endpoints>(endpoint:E, body:Endpoints[E]) {
    const path = `/api/trusted/v1/event/${eventCode}/${endpoint}`
    const signature = crypto.createHash('md5').update(tba_secret + path + JSON.stringify(body)).digest('hex')
    let response;
    try {
        response = await http_client.post(path, body, {
            headers: {
                'X-TBA-Auth-Sig': signature
            }
        })
        console.log(response.status, response.statusText, path, body)
    } catch (e) {
        console.error("Request to", path, "failed.", e.response.status, e.response.statusText, e.response.data)    
    }
    
}

export async function updateEventInfo(teams: Team[]) {
    const remap_teams = {}
    teams.forEach(({ id, display_id }) => {
        if (id.toString() != display_id && !display_id.endsWith("A")) {
            remap_teams[getTBATeamNumber(id)] = getTBATeamNumber(display_id)
        }
    })

    const body:TbaEventInfo = {
        first_code: null,
        webcasts: [{url: "https://www.youtube.com/watch?v=gu1z2s3G15A"}],
        remap_teams
    }

    await post("info/update", body)
    await updateEventTeams(teams)
}

async function updateEventTeams(teams: Team[]) {
    const body:TbaTeamNumber[] = teams.map(({ id }) => getTBATeamNumber(id))
    await post("team_list/update", body)
}

export async function updateRankings(teams:Team[]) {
    teams.sort((a, b) => b.rankingPoints - a.rankingPoints)
    const rankings:TbaRanking[] = teams.map((team, index) => ({
        team_key: getTBATeamNumber(team.id),
        rank:index+1,
        wins: team.matchWins,
        losses: team.matchLosses,
        ties: team.matchTies,
        played: team.matchCount,
        qual_average:0,
        dqs:0,
        "Ranking Score":team.rankingPoints/team.matchCount,
        "Avg Match": team.matchAvg,
        "Avg Hangar": 0,
        "Avg Taxi + Auto Cargo": team.hybridAvg
    }))

    const body:TbaRankings = {
        "breakdowns": [
            "Ranking Score",
            "Avg Match",
            "Avg Hangar",
            "Avg Taxi + Auto Cargo"
          ],
        rankings
    }
    console.log(body)
    await post("rankings/update", body)
}

export async function updateMatches(matches:Match[]) {
    const data:TbaMatch[] = matches
        .filter((match) => match.matchState == MatchState.POSTED && decodeMatchID(match.id).level != "p")
        .map((match) => ({
            comp_level: decodeMatchID(match.id).level as "qf"|"sf"|"f"|"qm",
            set_number:1,
            match_number: decodeMatchID(match.id).id,
            alliances: {
                red: new TbaAlliance(match.redTeams.map((team) => getTBATeamNumber(team)), match.redScore),
                blue: new TbaAlliance(match.blueTeams.map((team) => getTBATeamNumber(team)), match.blueScore)
            },
            score_breakdown: {red:{}, blue:{}},
            time_string: new Date(match.matchStartTime).toLocaleTimeString("en-us", {hour:"numeric", minute:"2-digit", timeZone:"America/Los_Angeles"}),
            // time_utc: new Date(match.matchStartTime).toISOString(),
            // time_utc:"2008-01-02T10:30:00.000Z",
            display_name: prettyMatchID(match.id)
        }))
    
    // console.log(data)
    resetMatches(matches)
    // await post("matches/update", data)
}
export async function resetRankings() {
    const body:TbaRankings = {
        breakdowns: [],
        rankings:[]
    }
    await post("rankings/update", body)
}
export async function resetMatches(matches:Match[]) {

    await post("matches/delete", matches.map((match) =>match.id))
}