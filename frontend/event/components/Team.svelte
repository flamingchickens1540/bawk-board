<script lang="ts">
	import type { TeamData } from "../../../common/types";
	import { socket } from "../../socket";
	export let team: TeamData;
</script>

<tr>
	<td class="buttonwidth">
		<button on:click={() => socket.emit("teamRemove", team.id)}>
			X
		</button>
	</td>
	<td class="numberwidth">
		<input type="number" bind:value={team.id} />
	</td>
	<td class="numberwidth">
		<input type="string" bind:value={team.display_id} />
	</td>
	<td class="namewidth">
		<input type="string" bind:value={team.name} />
	</td>
</tr>

<style lang="scss">
	$input_background: #303030;
	$row_background: #292929;

	td {
		&.buttonwidth {
			width: 10px;
			padding-left: 10px;
			padding-right: 0px;
		}
		&.namewidth {
			width: 400px;
			> input {
				width: 400px;
			}
		}
		&.numberwidth {
			width: 70px;
			text-align: center;
			> input {
				width: 70px;
				text-align: center;
			}
		}
	}
	td {
		padding: 10px 20px;
	}
	input {
		border-radius: 5px;
		background-color: $input_background;
	}
	tr {
		&:nth-child(odd) {
			background-color: $row_background;
		}
	}
	button {
		padding: 3px 8px;
		text-align: center;
		background: darkred;
	}
</style>
