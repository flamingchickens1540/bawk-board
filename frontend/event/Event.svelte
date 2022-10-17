<script lang="ts">
    import {teams, updateTeams} from "../store"
    import Team from "./components/Team.svelte";

    function addTeam() {
        teams.update((items) => [...items, {display_id:null, id:null, name:null}])
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
