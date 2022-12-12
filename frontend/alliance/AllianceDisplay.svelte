<script lang="ts">
    import type { TeamData } from "../../common/types";
    import { writable, type Writable } from "svelte/store";
    import { teams } from "../store";

    let alliances:Writable<TeamData[][]> = writable([])
    fetch("/api/alliances").then(async (data) => {
        $alliances = await data.json();
    })

    function mergeSortTeams(alliances: TeamData[][]){
    const teamsList:TeamData[] = [];
    for(let i = 0; i<alliances.length;i+=2){
        teamsList.push(alliances[i].concat[i+1]);
    }
    return teamsList.sort((a,b) => a.rankingPoints - b.rankingPoints);
    let teamList:TeamData[] = mergeSortTeams(teams)
}
</script>

<header></header>
<div>
    <strong><h1 id="alliances-header">Alliances</h1></strong>
</div>
<div id="bigdiv">
    {#each $alliances as alliance, i}
            <div id="alliance-square" class="rounded-box">
                <strong><h2>Alliance {i+1}</h2></strong>
                {#each alliance as team}
                    <div id="team-square" class="rounded-box">
                        <h4>{team.name} {team.display_id}</h4>
                    </div>
                {/each}
            </div>
    {/each}
</div>

<div id="team-display">
    <div>
        <strong><h1>Teams</h1></strong>
        {#each $teams as team, i} 
            <div class="team-box">
                <h4><strong>{i+1}.)</strong> {team.display_id} {team.name}</h4>
            </div>
        {/each}
    </div>
</div>
<footer></footer>
<style>
    .team-box{
        padding: 20px;
        width: auto;
        display: grid;
        position: relative;
        border-radius: 25px;
        justify-content: center;
        height: auto;
        margin: 2%;
        margin-left: auto;
        margin-right: auto;
        
    }

    #alliance-square{
        display: grid;
        border-radius: 5px;
        padding: 20px;
        border-radius: 25px;
        width: auto;
        background-color: #f7dc99;
        justify-content: center;
        position: relative;
        height: auto;
        align-items: center;
        vertical-align: middle;

    }

    #team-square{
        display: grid;
        border-radius: 5px;
        padding: 20px;
        border-radius: 25px;
        width: auto;
        height: auto;
        background-color: #f7dc99;
        justify-content: center;
        text-justify: center;
        position: relative;
    }

    #team-display{
        right: 0%;
        top: 0%;
        margin: 1%;
        margin-bottom: 1%;
        height: 94%;
        position: fixed;
        text-justify: auto;
        background-color: #f7dc99;
        justify-content:center;
        border-radius: 25px;
        align-items:center;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 15px;
        
    }

    #bigdiv{
        left:1%;
        top: 0%;
        bottom: 0%;
        flex-wrap: wrap;
        justify-content: center;
        flex-direction: column-reverse;
        display: flex;
        height: 84%;
        background-color: #eea19c;
        width: 50%;
        border-radius: 20px;
        position: fixed;
        align-content: space-around;
        padding: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 15px;
        margin: 6px;
        padding-top: 6%;
    }
 
    .rounded-box{
        width: 44%;
        height: 95%;
    }
    #alliances-header{
        vertical-align: top;
        left: 20%;
        top: .1px;
        z-index: 99 !important;
        position: absolute;
        margin: 1%;
        margin-left: auto;
        margin-right: auto;
    }

    h4{
        color: black;
    }

    h2{
        color:black;
    }

    h1{
        color:black;
    }
</style>