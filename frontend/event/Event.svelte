<script lang="ts">
    import {teams} from "../store"
    import {updateTeams} from "../socket"
    import Team from "./components/Team.svelte";
    import { PlayoffAlliance } from "../../common/alliances";

    function addTeam() {
        teams.update((items) => [...items, {display_id:null, id:null, name:null, playoffAlliance:PlayoffAlliance.NONE, matchIDs: [], matchLosses:0, matchTies:0, matchWins:0, rankingPoints:0}])
    }
</script>

<main>
    <h1>Teams</h1>
    <table id=teamlist>
        <thead>
            <tr>
                <th></th>
                <th title="The team number (1540)">Number</th>
                <th title="The team number to display (1540C)">Display</th>
                <th title="The team name (the Flaming Chickens)">Name</th>
                <th title="The playoff alliance">Alliance</th>
            </tr>
        </thead>
        <tbody>
            {#each $teams as team, i }
            <Team team={team}/>
            {/each}
        </tbody>
    </table>
    <br>
    <table id=buttons>
        <tr>
            <button on:click={addTeam}>Add Team</button>
            <button on:click={updateTeams}>Save</button>
        </tr>
    </table>
</main>

<style lang="scss">
    table {
        &#teamlist {
                border-collapse: collapse;
                padding-bottom:10px
        }
    }
</style>
