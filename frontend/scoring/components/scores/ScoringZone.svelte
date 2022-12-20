<script lang="ts">
	import { Alliance, MatchScoreZone } from "../../../../common/types";
	import { redScore, blueScore, isDoneLoading } from "../../../store";
	import { writable, type Writable } from "svelte/store";
    import type { MatchScoreBreakdown } from "common/types";
  import { socket } from "../../../socket";

	export let isUpper: boolean;
	export let alliance: Alliance;
	export let index:number;
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
	let tubeCount: Writable<number> = writable(0);
	const updateZone = () => {
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
			if ($tubeCount < 0) {
				$tubeCount = 0;
			}
			$allianceScores.zones[index].tubeCount = $tubeCount
		}
		allianceScores.subscribe((value) => {
			hasBunny.set(value.zones[index].hasBunny)
			tubeCount.set(value.zones[index].tubeCount)
		})
	}
	isDoneLoading.then(updateZone)
	socket.on("loadMatch", updateZone)
</script>


<td><input type="checkbox" title="Bunny" bind:checked={$hasBunny} /></td>
<td>
	<div class=inputgroup>
		<button on:click={() => $tubeCount--}>-</button>
		<input class=number-input type="number" title="Tubes" bind:value={$tubeCount} min=0 max="100"/>
		<button on:click={() => $tubeCount++}>+</button>
	</div>
</td>

<style>
	input[type="checkbox"] {
		height: 100%;
		transform: scale(1.5);

		border: none;
		outline: none;
	}
	button {
		touch-action: manipulation;
	}
</style>