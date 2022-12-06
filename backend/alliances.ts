import type Team from "./classes/team";
import { getTeams } from '.';

function categorizeTeams(teams: Team[] ){
    const alliances:Team[][] = [];
    for(let i = 0; i<teams.length;i++){
        switch(teams[i].playoffAlliance){
            case 0:
                continue;
            case 1:
                alliances[0].push(teams[i]);
            case 2:
                alliances[1].push(teams[i]);
            case 3:
                alliances[2].push(teams[i]);
            case 4:
                alliances[3].push(teams[i]);    
        }
    }
    return alliances;
}


function mergeSortTeams(alliances: Team[][]){
    let teamsList:Team[];
    for(let i = 0; i<alliances.length;i+=2){
        teamsList.push(alliances[i].concat[i+1]);
    }
    return teamsList.sort((a,b) => a.rankingPoints - b.rankingPoints);
}

export function getAlliances():Team[] {
    const alliances = categorizeTeams(getTeams());
    return mergeSortTeams(alliances);
}