<script lang="ts">
	import {
		blueAlliance,
		blueScore,
		isDoneLoading,
		prettyTeamNumber,
		redAlliance,
		redScore,
	} from "../../store";
	import { Alliance, type MatchScoreBreakdown } from "../../../common/types";
	import { writable, type Writable } from "svelte/store";
	import { calculateScore } from "../../../common/calculations";

	export let alliance: Alliance;
	export let style: string;
	let headerName = alliance == Alliance.RED ? "Red" : "Blue";

	let teams: Writable<number[]>;
	let allianceScores: Writable<MatchScoreBreakdown>;

	switch (alliance) {
		case Alliance.RED:
			allianceScores = redScore;
			teams = redAlliance;
			break;
		case Alliance.BLUE:
			allianceScores = blueScore;
			teams = blueAlliance;
			break;
	}
	let penalty = writable(0)
	let autoTubes = writable(0)
	isDoneLoading.then(() => {
		$penalty = $allianceScores.foulPoints;
		penalty.subscribe((value) => ($allianceScores.foulPoints = value));

		$autoTubes = $allianceScores.autoTubes;
		autoTubes.subscribe((value) => ($allianceScores.autoTubes = value));
	});
</script>

<div class={style}>
	<h2>{headerName}: {calculateScore($allianceScores)}</h2>
	<div id="teams" class="pad">
		{#each $teams as team}
			<span>{prettyTeamNumber(team)}</span>
		{/each}
	</div>

	<span class="inputheader">Penalty</span>
	<input class="number-input" type="number" bind:value={$penalty} />

	<span class="inputheader">Hybrid Tubes</span>
	<input class="number-input" type="number" bind:value={$autoTubes} />
</div>

<style>
	.inputheader {
		font-weight:700;
	}
	input {
		display: block;
		margin-left: auto;
		margin-right: auto;
	}
	.pad {
		padding-bottom: 20px;
	}
	#teams {
		display: grid;
		grid-template-rows: auto auto auto;
		grid-template-columns: 100%;
		grid-auto-flow: row;
		margin-left: auto;
		margin-right: auto;
		text-align: center;
	}
	.red-banner {
		grid-row: 1 / span 5;
		grid-column: 1;
		width: 100%;
		height: 100vh;
	}
	.blue-banner {
		grid-row: 1 / span 5;
		grid-column: 5;
		width: 100%;
		height: 100vh;
	}
</style>
