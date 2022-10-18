<script lang="ts">
	import { Alliance, parseMath} from "./ScoringTower.svelte";
	import { redScore, blueScore } from "../../store.js";
	import { writable, type Writable } from "svelte/store";
    import type { MatchScoreBreakdown } from "common/types";
	
	export let attribute: keyof MatchScoreBreakdown;
	export let alliance: Alliance;
	let value:number
	let shouldUpdate = writable(false)
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
		$allianceScores[attribute] = value
	}

	allianceScores.subscribe((scores) => {
		if (scores==null)return;
		value = scores[attribute]  
	})
</script>

<div class="inputgroup">
	{#if alliance == Alliance.BLUE}
		<input type="checkbox" class="checkbox-l" title="Doing" bind:checked={$shouldUpdate}/>
	{/if}
	<div class="inputs">
		<button on:click={() => {value++; updateScore()}} disabled={!$shouldUpdate}>+</button>
		<input type="number" title="Count" disabled={!$shouldUpdate} on:change={updateScore} bind:value={value}/>
		<button on:click={() => {value--; updateScore()}} disabled={!$shouldUpdate}>-</button>
	</div>
	{#if alliance == Alliance.RED}
		<input type="checkbox" class="checkbox-r" title="Doing" bind:checked={$shouldUpdate}/>
	{/if}
</div>

<style lang=scss>
	input[type=checkbox] {
		&.checkbox-r {
			margin-left:auto;
		}
		&.checkbox-l {
			margin-right:auto;
		}
		
		height:30px;
		width:30px;
		align-self:center;
	}
	input[type=number] {
		height:40px;
		margin:5px;
		font-size:15px;
		text-align:center;
		width:60px;
	}

	.inputs {
		display:block;
		margin-left:auto;
		margin-right:auto;
	}

	.inputgroup {
		touch-action:manipulation;
		display:flex;
		align-items: center;
	}
	button {
		background-color:#333;

	}
	button:disabled {
		background-color:#222;
	}
</style>


