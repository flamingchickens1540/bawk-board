<script type="ts">
    import { teams } from "../store"
    
    //TODO: get list of alliances and teams in each alliance
    //TODO: display them dynamically
    //See Ryan's design for reference
    //Each robot is it's own team
    let countArray = [1,2,3,4];
</script>

<header></header>
<div id="alliance-display">
    {#each countArray as alliance} <!--alliances-->
    <div id="alliance-square" class="rounded-box">   
        <h1>Alliance {countArray}</h1>
        {#each $teams as team} <!--teams in alliance-->
            <div id="team-square" class="rounded-box">
                <!--display team-->
                <h3>{team.name}</h3>
            </div>
        {/each}
    </div>
    {/each}
</div>

<div id="team-rankings">
    <div>
        {#each $teams as team} <!--order them by score-->
            <div class="rounded-box">
                <h3>{team}</h3>
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