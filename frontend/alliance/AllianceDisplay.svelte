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
<div id="alliance-display">
    {#each $alliances as alliance}
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
        {#each $teams as team} 
            <h1>Team</h1>
            <div class="rounded-box">
                <h3>{team.display_id} {team.name}</h3>
            </div>
        {/each}
    </div>
</div>
<footer></footer>

<style>
.rounded-box{
    border-radius: 25px;
    background: red;
    padding: 20px;
    width: 285%;
}

#team-rankings{
    position: absolute;
    right:25%;
}

#alliance-display{
    position: absolute;
    left:25%;
}
</style>