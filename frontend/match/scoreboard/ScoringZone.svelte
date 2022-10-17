<script lang="ts">
	import { Alliance } from "./Scoreboard.svelte";
	import { redScore, blueScore } from "../../store.js";
	import { writable, type Writable } from "svelte/store";
    import type { MatchScoreBreakdown } from "common/types";

	export let index: number;
	export let isUpper: boolean;
	export let alliance: Alliance;
	
	let allianceScores: Writable<MatchScoreBreakdown>;

	switch (alliance) {
		case Alliance.RED:
			allianceScores = redScore;
			break;
		case Alliance.BLUE:
			allianceScores = blueScore;
			break;
	}

	let hasBunny: Writable<boolean> = writable(false);
	let hasHybridBonus: Writable<boolean> = writable(false);
	let tubeCount: Writable<number> = writable();

	tubeCount.subscribe(updateScore);
	hasBunny.subscribe(updateScore);
	hasHybridBonus.subscribe(updateScore)
	function updateScore() {
		$allianceScores[index] = ($tubeCount ?? 0)
			* ($hasBunny ? 2 : 1)
			* (isUpper ? 2 : 1)
			+ ($hasHybridBonus ? 10:0);
	}
</script>

<div class="inputgroup">
	<input type="checkbox" title="Bunny" bind:checked={$hasBunny} />
	<input type="checkbox" title="Hybrid Bonus" bind:checked={$hasHybridBonus} />
	<input type="number" title="Tubes" bind:value={$tubeCount} min="0" max="100" />
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
