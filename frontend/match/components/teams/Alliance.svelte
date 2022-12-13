<script lang="ts">
  import { socket } from "../../../socket";
  import { blueAlliance, redAlliance } from "../../../store";
  import { writable, type Writable } from "svelte/store";
  import { PlayoffAlliance } from "../../../../common/alliances";
  import { Alliance } from "../../../../common/types";


    export let alliance_name:Alliance;
    const selectedAlliance = writable(PlayoffAlliance.NONE)
    let teams:Writable<number[]>
    selectedAlliance.subscribe((value) => {
        socket.emit("getAlliance", value, (allianceMembers) => {
            console.log(allianceMembers)
            teams.set(allianceMembers)
        })
    })

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
</script>
<select name={alliance_name}Alliance bind:value={$selectedAlliance}>
    <option default value={PlayoffAlliance.NONE}>None</option>
    <option value={PlayoffAlliance.ALLIANCE_1}>Alliance 1</option>
    <option value={PlayoffAlliance.ALLIANCE_2}>Alliance 2</option>
    <option value={PlayoffAlliance.ALLIANCE_3}>Alliance 3</option>
    <option value={PlayoffAlliance.ALLIANCE_4}>Alliance 4</option>
</select>