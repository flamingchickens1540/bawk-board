<script lang="ts">
	import type { Writable } from "svelte/store";
	
	export let team;
	export let index: number;
	export let teams: Writable<any[]>;
</script>

<tr>
	<td class="buttonwidth">
		<button
		on:click={() =>
			teams.update((items) => [
			...items.slice(0, index),
			...items.slice(index + 1),
			])}>X</button
			>
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
				width:10px;
				padding-left:10px;
				padding-right:0px;
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
			background:darkred
		}
		
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
		
		/* Firefox */
		input[type=number] {
			-moz-appearance: textfield;
		}
	</style>
	