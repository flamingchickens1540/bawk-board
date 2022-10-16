<script lang=ts>
    import type { TeamData } from "common/types";
    import { redAlliance, blueAlliance, redScore, blueScore } from "../../store";
  import TeamPair from "./TeamPair.svelte";
    const promise = fetch("//localhost:3000/api/teams").then(teams => teams.json()) as Promise<TeamData[]>


	function sum(values: number[]): number {
		let sum = 0;
		values.forEach((value) => {
			sum += value;
		});
		return sum;
	}
</script>

<table>
    <tr>
        <th class=red>Red: {sum($redScore)}</th>
        <th class=blue>Blue: {sum($blueScore)}</th>
    </tr>
    
    <TeamPair index=0/>
    <TeamPair index=1/>
    <TeamPair index=2/>
    <TeamPair index=3/>
    
</table>

<datalist id="teams">
    {#await promise then teams}
    {#each teams as team}
        <option value={team.display_id}>{team.display_id}</option>
    {/each}
    {/await}
</datalist>

<style>
    table {
        border-collapse: collapse;
    }

</style>