<script lang="ts">
	import { Alliance } from "./Scoreboard.svelte";
	import { redScore } from "../../score.js";
	import { blueScore } from "../../score.js";
	import { writable, type Writable } from "svelte/store";

	export let index: number;
	export let isUpper: boolean;
	export let alliance: Alliance;
	
	let allianceScores: Writable<number[]>;

	switch (alliance) {
		case Alliance.RED:
			allianceScores = redScore;
			break;
		case Alliance.BLUE:
			allianceScores = blueScore;
			break;
	}

	let hasBunny: Writable<boolean> = writable(false);
	let tubeCount: Writable<number> = writable(allianceScores[index]);

	tubeCount.subscribe(updateScore);
	hasBunny.subscribe(updateScore);
	function updateScore() {
		$allianceScores[index] = $tubeCount * ($hasBunny ? 2 : 1) * (isUpper ? 2 : 1);
	}
</script>

<div class="inputgroup">
	<input type="checkbox" bind:checked={$hasBunny} />
	<input type="number" bind:value={$tubeCount} min="0" max="100" />
</div>

<style>
	input[type="number"] {
		width: 60px;
	}
	input[type="checkbox"] {
		height: 100%;
		transform: scale(1.5);

		border: none;
		outline: none;
	}
	.inputgroup {
		margin-right: 20px;
	}
</style>
