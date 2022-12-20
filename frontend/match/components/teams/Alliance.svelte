<script lang="ts">
	import { socket } from "../../../socket";
	import { blockSubscribers, blueAlliance, redAlliance } from "../../../store";
	import { writable, type Writable } from "svelte/store";
	import { PlayoffAlliance } from "../../../../common/alliances";
	import { Alliance } from "../../../../common/types";

	export let alliance_name: Alliance;
	let teams: Writable<number[]>;
	switch (alliance_name) {
		case Alliance.RED:
			teams = redAlliance;
			break;
		case Alliance.BLUE:
			teams = blueAlliance;
			break;
		default:
			console.error(alliance_name);
	}

	const selectedAlliance = writable($teams[0]);
	socket.emit("getAllianceForTeams", $teams, (alliance) => {
		selectedAlliance.set(alliance);
		setTimeout(() => {
            console.log("running")
			selectedAlliance.subscribe((value) => {
				socket.emit("getAlliance", value, (allianceMembers) => {
                    let alreadySet = true;
                    $teams.forEach(element => {
                        if (!allianceMembers.includes(element)) {
                            alreadySet = false;
                        }
                    });
                    if (!alreadySet) {
                        teams.set(allianceMembers);
                    }
					
				});
			});
        }, 1000)
	});
</script>

<select name="{alliance_name}Alliance" bind:value={$selectedAlliance}>
	<option value={PlayoffAlliance.NONE}>None</option>
	<option value={PlayoffAlliance.ALLIANCE_1}>Alliance 1</option>
	<option value={PlayoffAlliance.ALLIANCE_2}>Alliance 2</option>
	<option value={PlayoffAlliance.ALLIANCE_3}>Alliance 3</option>
	<option value={PlayoffAlliance.ALLIANCE_4}>Alliance 4</option>
</select>
