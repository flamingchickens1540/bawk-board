<script lang="ts">
    import type Team from "../../backend/classes/team";
    import { getTeams } from "../../backend/index"
    
    //TODO: Setup and test AllianceDisplay routing
    function categorizeTeams(teams: Team[] ){
        let alliances:Team[][] = [];
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

    export let alliances = categorizeTeams(getTeams());
    function mergeSortTeams(alliances: Team[][]){
        let teamsList:Team[];
        for(let i = 0; i<alliances.length;i+=2){
            teamsList.push(alliances[i].concat[i+1]);
        }
        return teamsList.sort((a,b) => a.rankingPoints - b.rankingPoints);
    }
    export const teamsList: Team[] = mergeSortTeams(alliances);

    
</script>

<header></header>
<div id="alliance-display">
    {#each alliances as alliance}
    <div id="alliance-square" class="rounded-box">   
        <h1>Alliance</h1>
        {#each alliance as team} 
            <div id="team-square" class="rounded-box">
                <h3>{team.name}</h3>
            </div>
        {/each}
    </div>
    {/each}
</div>

<div id="team-rankings">
    <div>
        {#each teamsList as team} 
            <div class="rounded-box">
                <h3>{team.name}</h3>
            </div>
            
        {/each}
    </div>
</div>
<footer></footer>

<style>
.rounded-box{
    border-radius: 25px;
    background: #73AD21;
    padding: 20px;
}
</style>