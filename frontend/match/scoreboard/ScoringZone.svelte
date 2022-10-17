<script lang="ts">
	import { Alliance, parseMath} from "./Scoreboard.svelte";
	import { redScore, blueScore } from "../../store.js";
	import type { Writable } from "svelte/store";
    import type { MatchScoreBreakdown } from "common/types";
	
	export let attribute: keyof MatchScoreBreakdown;
	export let alliance: Alliance;
	let value:number
	let allianceScores: Writable<MatchScoreBreakdown>;

	switch (alliance) {
		case Alliance.RED:
			allianceScores = redScore;
			break;
		case Alliance.BLUE:
			allianceScores = blueScore;
			break;
		default:
			console.warn(alliance)
	}

	function updateScore() {
		console.log($allianceScores)
		$allianceScores[attribute] = parseMath(value)
	}

	allianceScores.subscribe((scores) => {
		if (scores==null)return;
		value = scores[attribute]  
	})
</script>

<div class="inputgroup">
	<input type="string" title="Count" on:change={updateScore} bind:value={value}/>
</div>


