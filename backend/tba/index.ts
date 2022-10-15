import axios, { AxiosInstance } from "axios";
import crypto from "crypto"
import Team from "../classes/team";
import type { InfoBody, Ranking, RankingBody } from "./types";

function formatTeamNumber(teamNumber: number | string) {
    return "frc" + teamNumber
}


export class TbaClient {
    private http_client: AxiosInstance;
    constructor(
        private readonly secret: string,
        private readonly secret_id: string,
        public readonly event_code: string,
        public readonly baseUrl: string = "https://www.thebluealliance.com"
    ) {
        this.http_client = axios.create({
            baseURL: baseUrl,
            headers: {
                'X-TBA-Auth-Id': secret_id,
            }
        })
    }

    public async post(body:Object, endpoint: string) {
        const path = `/api/trusted/v1/event/${this.event_code}/${endpoint}`
        const signature = crypto.createHash('md5').update(this.secret + path + JSON.stringify(body)).digest('hex')
        const response = await this.http_client.post(path, body, {
            headers: {
                'X-TBA-Auth-Sig': signature
            }
        })
        console.log(response.status, response.statusText, path, body)
    }

    public async updateTeamMap(teams: Team[]) {
        const remap_teams = {}
        teams.forEach(({ id, display_id }) => {
            if (id.toString() != display_id) {
                remap_teams[formatTeamNumber(id)] = formatTeamNumber(display_id)
            }
        })

        const body:InfoBody = {
            first_code: null,
            remap_teams
        }

        await this.post(body, "info/update")
        await this.updateTeamList(teams)
    }

    public async updateTeamList(teams: Team[]) {
        const body = teams.map(({ id }) => formatTeamNumber(id))
        await this.post(body, "team_list/update")
    }

    public async updateRankings(teams:Team[]) {
        teams.sort((a, b) => a.rankingPoints - b.rankingPoints)
        const rankings:Ranking[] = teams.map((team, index) => ({
            team_key: formatTeamNumber(team.id),
            rank:index+1,
            wins: team.matchWins,
            losses: team.matchLosses,
            ties: team.matchTies,
            played: team.matchCount,
            dqs:0,
            rp: team.rankingPoints
        }))

        const body:RankingBody = {
            breakdowns: ["rp"],
            rankings
        }
        await this.post(body, "rankings/update")
    }

}