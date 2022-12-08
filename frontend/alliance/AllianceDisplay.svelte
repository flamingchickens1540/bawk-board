<script lang="ts">
  import type { TeamData } from "../../common/types";
  import { writable, type Writable } from "svelte/store";
  import { teams } from "../store";

    let alliances:Writable<TeamData[][]> = writable([])
    fetch("/api/alliances").then(async (data) => {
        $alliances = await data.json();
    })
    //TODO: Debug alliance-display issue: api/alliances typeError
    
</script>

<header></header>
<div id="bigdiv">
    {#each $alliances as alliance}
    <div id="alliance-square" class="rounded-box">   
        <h1>Alliance</h1>
        {#each alliance as team} 
            <div id="team-square" class="rounded-box">
                <h3>{team.name} {team.display_id}</h3>
            </div>
        {/each}
    </div>
    {/each}
</div>

<div id="team-display">
    <div>
        <h1>Team</h1>
        {#each $teams as team} 
            <div class="team-box">
                <h3>{team.display_id} {team.name}</h3>
            </div>
        {/each}
    </div>
</div>
<footer></footer>

<style>
    .team-box{
        border-radius: 25px;
        padding: 20px;
        width: 40%;
        display: flex;
        position: relative;
        background-color: #f7dc99;
        border-radius: 5px;
        justify-content: center;
        height: 22%;

    }

    .rounded-box{
        display: flex;
        border-radius: 5px;
        padding: 20%;
        border-radius:  25px;
        background-color: #f7dc99;
        width: 20%;
        height: 10%;
        position: fixed;

    }

    #team-display{
        right: 0%;
        position: fixed;
    }

    #bigdiv {
        left:0%;
        margin-left: 1%;
        margin-top: 1%;
        margin-bottom: 1%;
        flex-wrap: wrap;
        justify-content: space-around;
        flex-direction: column;
        display: flex;
        height: 96%;
        background-color: #eea19c;
        width: 60%;
        border-radius: 20px;
        position: fixed;
        align-content: space-around;
    }
 
    .rounded-box{
        width: 44%;
        height: 95%;
    }

</style>