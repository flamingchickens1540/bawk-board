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
    {#each $alliances as alliance, i}
        {#if i+1 % 2 != 0}
            <div id="alliance-square" class="rounded-box">
                <h4>Alliance {i+1}</h4>
                    {#each alliance as team} 
                        <div id="team-square" class="rounded-box">
                            <h6>{team.name} {team.display_id}</h6>
                        </div>
                    {/each}
            </div>
        {:else}
            <div id="alliance-square" class="rounded-box">
                <h4>Alliance {i+1}</h4>
                {#each alliance as team}
                    <div id="team-square" class="rounded-box">
                        <h6>{team.name} {team.display_id}</h6>
                    </div>
                {/each}
            </div>
        {/if}
    {/each}
    <h1 id="alliances-header">Alliances</h1>
</div>

<div id="team-display">
    <div>
        <h1>Teams</h1>
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
        background-color: #99f7cd;
        border-radius: 5px;
        justify-content: center;
        height: 22%;
        margin: 2%;

    }

    #alliance-square{
        display: flex;
        border-radius: 5px;
        padding: 20px;
        border-radius: 25px;
        width: 100%;
        background-color: #f7dc99;
        justify-content: center;
        position: relative;
        height: 50%;
        align-items: center;
        vertical-align: middle;

    }

    #team-square{
        display: flex;
        border-radius: 5px;
        padding: 20px;
        border-radius: 25px;
        width: 30%;
        height: 10%;
        background-color: #40a075;
        justify-content: center;
        text-justify: center;
        position: relative;
    }

    #team-display{
        right: 0%;
        margin: 1%;
        position: fixed;
        text-justify: auto;
        background-color: #f7dc99;
        justify-content: center;
        border-radius: 25px;
        align-items: center;
        
    }

    #bigdiv{
        left:0%;
        margin-left: 1%;
        margin-top: 1%;
        margin-bottom: 4%;
        flex-wrap: wrap-reverse;
        justify-content: center;
        flex-direction: column-reverse;
        display: flex;
        height: auto;
        background-color: #eea19c;
        width: auto;
        border-radius: 20px;
        position: fixed;
        align-content: space-around;
        padding: 30px;
        margin: 2%;
    }
 
    .rounded-box{
        width: 44%;
        height: 95%;
    }
    #alliances-header{
        vertical-align: top;
        position: relative;
        margin: 1%;
    }
</style>