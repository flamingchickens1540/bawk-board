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
    <strong><h1 id="alliances-header">Alliances</h1></strong>
    {#each $alliances as alliance, i}
        {#if i+1 % 2 != 0}
            <div id="alliance-square" class="rounded-box">
                <strong><h4>Alliance {i+1}</h4></strong>
                    {#each alliance as team} 
                        <div id="team-square" class="rounded-box">
                            <h6>{team.name} {team.display_id}</h6>
                        </div>

                    {/each}
            </div>
        {:else}
            <div id="alliance-square" class="rounded-box">
                <strong><h4>Alliance {i+1}</h4></strong>
                {#each alliance as team}
                    <div id="team-square" class="rounded-box">
                        <h6>{team.name} {team.display_id}</h6>
                    </div>
                {/each}
            </div>
        {/if}
    {/each}
</div>

<div id="team-display">
    <div>
        <h1>Teams</h1>
        {#each $teams as team, i} 
            <div class="team-box">
                <h4>{i+1}.){team.display_id} {team.name}</h4>
            </div>
        {/each}
    </div>
</div>
<footer></footer>

<style>
    .team-box{
        padding: 20px;
        width: 40%;
        display: flex;
        position: relative;
        border-radius: 25px;
        justify-content: center;
        height: 22%;
        margin: 2%;
        margin-left: auto;
        margin-right: auto;
        
    }

    #alliance-square{
        display: flex;
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

    #alliance-square{
        display: flex;
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
        display: flex;
        border-radius: 5px;
        padding: 20px;
        border-radius: 25px;
        width: 30%;
        height: 10%;
        background-color: #2cd68a;
        justify-content: center;
        text-justify: center;
        position: relative;
    }

    #team-display{
        right: 0%;
        margin: 1%;
        margin-bottom: 1%;
        height: 94%;
        position: fixed;
        text-justify: auto;
        background-color: #f7dc99;
        justify-content:center;
        border-radius: 25px;
        align-items:center;
        
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
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }
 
    .rounded-box{
        width: 44%;
        height: 95%;
    }
    #alliances-header{
        vertical-align: top;
        position: relative;
        margin: 1%;
        margin-left:auto;
        margin-right: auto;
    }

    h4{
        color: black;
    }

    h6{
        color: black;
    }

    h4{
        color:black;
    }

    h1{
        color:black;
    }
</style>