<script lang="ts">
	import { writable, type Writable } from "svelte/store";
	import { Alliance } from "../../../../common/types";
	import {
		redAlliance,
		blueAlliance,
		isDoneLoading,
		prettyTeamNumber,
		realTeamNumber,
		blockSubscribers,
	} from "../../../store";

	export let alliance_name: Alliance;
	export let index: number;
	let alliance: Writable<number[]>;
	switch (alliance_name) {
		case Alliance.RED:
			alliance = redAlliance;
			break;
		case Alliance.BLUE:
			alliance = blueAlliance;
			break;
		default:
			console.error(alliance);
	}
	isDoneLoading.then(() => {
		blockSubscribers(() => {
			team.set(prettyTeamNumber($alliance[index]));
		})
	});
	
	let team = writable("");
	alliance.subscribe((value) => blockSubscribers(() => {
		team.set(prettyTeamNumber(value[index]));
	}))

	team.subscribe((value) => {
		const teamNumber = realTeamNumber(value);
		if (teamNumber == 0) {
			if (value.length == 0) {
				$alliance[index] = null
			}
		} else {
			$alliance[index] = teamNumber;
		}
	});
</script>

<input bind:value={$team} list="teams" />

<style>
	input {
		width: 80px;
		height:30px;
		font-size:20px;
		text-align:center
	}
</style>
