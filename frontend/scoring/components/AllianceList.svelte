<script lang=ts>
	import { blueAlliance, prettyTeamNumber, redAlliance } from "../../store";
	import { Alliance } from "./ScoringTower.svelte";

	export let alliance: Alliance;
	export let style: string;

	let headerName = alliance == Alliance.RED ? "Red" : "Blue";
	let teams = alliance == Alliance.RED ? redAlliance : blueAlliance;
</script>

<div class={style}>
	<table>
		<th><h2>{headerName}</h2></th>
		{#each $teams as team} 
      <tr><td>{prettyTeamNumber(team)}</td></tr>
    {/each}
	</table>
</div>

