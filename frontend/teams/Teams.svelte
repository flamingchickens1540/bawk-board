<script lang="ts">
    import {writable} from "svelte/store"
    import Team from "./components/Team.svelte";
    let teams:{id:string, display_id:string, name:string}[]
    const teamsStore = writable(teams)
    
    async function getTeams() {
        const res = await fetch("//localhost:3000/api/teams")
        $teamsStore = await res.json()
    }
    
    function addTeam() {
        teamsStore.update((items) => [...items, {display_id:null, id:null, name:null}])
    }
    async function updateTeams() {
        $teamsStore = $teamsStore.filter((team) => team.id)
        const res = await fetch("//localhost:3000/api/teams", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({teams:$teamsStore})
        })
        $teamsStore = await res.json();
    }
    let doneLoading = false;
    getTeams().then(() => doneLoading = true)
    
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
            {#if doneLoading}
            {#each $teamsStore as team, i }
            <svelte:component this={Team} teams={teamsStore} index={i} team={team}/>
            {/each}
            {/if}
        </tbody>
    </table>
    <br>
    <table id=buttons>
        <tr>
            <button on:click={addTeam}>Add Team</button>
            <td><button on:click={updateTeams}>Update</button></td>
        </tr>
    </table>
</main>

<style lang="scss">
    table {
        &#teamlist {
                border-collapse: collapse;
                padding-bottom:10px
        }
        &#buttons {
            td {
                padding: 0px 10px;
            }
        }
    }
</style>
