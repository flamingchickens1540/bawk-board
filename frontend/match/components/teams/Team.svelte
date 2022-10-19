<script lang="ts">
	import { writable, type Writable } from "svelte/store";
	import { Alliance } from "../../../../common/types";
	import {
		redAlliance,
		blueAlliance,
		teams,
		isDoneLoading,
		prettyTeamNumber,
		realTeamNumber,
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
		team.set(prettyTeamNumber($alliance[index]));
	});

	let team = writable("");

	team.subscribe((value) => {
		const teamNumber = realTeamNumber(value);
		if (teamNumber == 0) {
			return;
		}
		$alliance[index] = teamNumber;
	});
</script>

<input bind:value={$team} list="teams" />

<style>
	input {
		width: 60px;
	}
</style>
