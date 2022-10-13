<script lang="ts">
    import Team from "./components/Team.svelte";
</script>

<main>
    <h1>Teams</h1>
    <table>
        <tr>
            <th title="The team number (1540)">Number</th>
            <th title="The team number to display (1540C)">Display</th>
            <th title="The team name (the Flaming Chickens)">Name</th>
        </tr>
	    <svelte:component this={Team} teamName="The Flaming Chickens" displayNumber="1540C" teamNumber=1540  />
    </table>
</main>

<style>
</style>
