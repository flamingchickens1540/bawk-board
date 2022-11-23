<script type="ts">
    import { prettyTeamNumber } from "../store";
    import { teams } from "../store"
    //TODO: get list of alliances and teams in each alliance
    //TODO: display them dynamically
    //See Ryan's design for reference
    //Each robot is it's own team

</script>

<header></header>
<div id="alliance-display">
    {#each} <!--alliances-->
    <div id="alliance-square">   
        <h1>Alliance {teamCount}</h1>
        {#each} <!--teams in alliance-->
        <!--my knowledge of bawk board isn't great enough for me to figure out the issue here-->
        <div id="team-square">
            <!--display team-->
            <h3>{teamName}</h3>
        </div>
        {/each}
    </div>
    {/each}
</div>

<div id="team-rankings">
    <div>
        
        {#each $teams as team} <!--order them by score-->
            <h3>{prettyTeamNumber(team)}</h3>
        {/each}
    </div>
</div>
<footer></footer>