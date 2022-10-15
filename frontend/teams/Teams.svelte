<script lang="ts">
    import Team from "./components/Team.svelte";
    let teams:{id:string, display_id:string, name:string}[]
    async function getTeams() {
        const res = await fetch("//localhost:3000/api/teams")
        teams = await res.json()
    }
    async function updateTeams() {
        await fetch("//localhost:3000/api/teams", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({teams})
        }).then(res => console.log(res))
    }
    let doneLoading = false;
    getTeams().then(() => doneLoading = true)
</script>

<main>
    <h1>Teams</h1>
    <table>
        <thead>
            <tr>
                <th title="The team number (1540)">Number</th>
                <th title="The team number to display (1540C)">Display</th>
                <th title="The team name (the Flaming Chickens)">Name</th>
            </tr>
        </thead>
        <tbody>
            {#if doneLoading}
                {#each teams as team}
                    <svelte:component this={Team} team={team}/>
                {/each}
            {/if}
        </tbody>
        <tfoot>
            <tr>
                <td><button on:click={() => teams.push({id:"0",display_id:"",name:""})}>Add Team</button></td>
                <td></td>
                <td><button on:click={() => updateTeams()}>Update</button></td>
            </tr>
        </tfoot>
    </table>
    
</main>

<style>
    table {
        border-collapse: collapse;
    }
    
    table, table * {
        border-bottom: 1px solid gray;
        padding-bottom:10px
    }
</style>
