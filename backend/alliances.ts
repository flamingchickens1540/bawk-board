import type Team from "./classes/team";
import { getTeams } from '.';

export function categorizeTeams(teams: Team[] ){
    const alliances:Team[][] = [[],[],[],[]];
    for(let i = 0; i<teams.length;i++){
        switch(teams[i].playoffAlliance){
            case 0:
                continue;
            case 1:
                alliances[0].push(teams[i]);
                break;
            case 2:
                alliances[1].push(teams[i]);
                break;
            case 3:
                alliances[2].push(teams[i]);
                break;
            case 4:
                alliances[3].push(teams[i]);    
                break;
        }
    }
    alliances.forEach((alliance) => {
        alliance.sort((a,b) => a.rankingPoints - b.rankingPoints)
    })
    return alliances;
}

//Unused code, potentially important later
function mergeSortTeams(alliances: Team[][]){
    const teamsList:Team[] = [];
    for(let i = 0; i<alliances.length;i+=2){
        teamsList.push(alliances[i].concat[i+1]);
    }
    return teamsList.sort((a,b) => a.rankingPoints - b.rankingPoints);
}

export function getAlliances():Team[][] {
    const alliances = categorizeTeams(getTeams());
    return alliances;
}
