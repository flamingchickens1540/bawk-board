<script lang="ts">
	import { Alliance, MatchScoreZone } from "../../../../common/types";
	import { redScore, blueScore, isDoneLoading } from "../../../store";
	import { writable, type Writable } from "svelte/store";
    import type { MatchScoreBreakdown } from "common/types";

	export let isUpper: boolean;
	export let alliance: Alliance;
	export let index:number
	let allianceScores: Writable<MatchScoreBreakdown>;

	switch (alliance) {
		case Alliance.RED:
			allianceScores = redScore;
			break;
		case Alliance.BLUE:
			allianceScores = blueScore;
			break;
	}
	let hasBunny: Writable<boolean> = writable();
	let tubeCount: Writable<number> = writable();
	isDoneLoading.then(() => {
		if ($allianceScores.zones[index] == null) {
			$allianceScores.zones[index] = new MatchScoreZone(isUpper, $hasBunny, $tubeCount)
		} else {
			hasBunny.set($allianceScores.zones[index].hasBunny)
			tubeCount.set($allianceScores.zones[index].tubeCount)
		}
		
		tubeCount.subscribe(updateScore);
		hasBunny.subscribe((value) => $allianceScores.zones[index].hasBunny = value);
		$allianceScores.zones[index].isUpper = isUpper
		function updateScore() {
			$allianceScores.zones[index].tubeCount = $tubeCount
		}
	})
</script>


<td><input type="checkbox" title="Bunny" bind:checked={$hasBunny} /></td>
<td><input type="number" title="Tubes" bind:value={$tubeCount} min="0" max="100" /></td>

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
</style>