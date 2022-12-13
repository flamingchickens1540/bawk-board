<script lang="ts">
	import type { TeamData } from "../../common/types";
	import { derived, type Readable } from "svelte/store";
	import { teams } from "../store";
	import * as animateScroll from "svelte-scrollto";
  import { onMount } from "svelte";
	const sortFunction = (a, b) => b.rankingPoints - a.rankingPoints;
	let teamsSorted: Readable<TeamData[]> = derived(teams, ($teams) =>
		$teams.sort(sortFunction)
	);
	animateScroll.setGlobalOptions({container:".tableContainer"})
	function resetScroll() {
		animateScroll.scrollToTop({onDone:() => {
			animateScroll.scrollToBottom({duration:($teamsSorted.length-15)*2000, onDone:resetScroll})
		}})
		
	}
	onMount(resetScroll)
</script>

<main>
	<h1 class="Title">Team Rankings</h1>
	<div class="tableContainer">
		<table>
			<thead>
				<tr>
					<th>Rank</th>
					<th>Robot Number</th>
					<th>Team Name</th>
					<th>Qualification Points</th>
					<th>W-L-T</th>
				</tr>
			</thead>
			<tbody>
				{#each $teamsSorted as team, i}
					<tr>
						<td>{i + 1}</td>
						<td>{team.display_id}</td>
						<td>{team.name}</td>
						<td>{team.rankingPoints}</td>
						<td>{team.matchWins}-{team.matchLosses}-{team.matchTies}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>

<style lang="scss">
	.tableContainer {
		height: 80vh;
		overflow-y: auto;
		scrollbar-width:none;
	}
	main {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		color: black;
	}
	.Title {
		color: white;
		font-family: arial;
		margin-left: 500;
		margin-right: 500;
	}

	table {
		font-family: arial;
		margin-left: auto;
		margin-right: auto;
		width: 95%;
		border-collapse: collapse;
		border-spacing: 0;
	}

	td,
	th {
		/* border: 1px solid #989898; */
		text-align: center;
		padding: 8px;
	}
	tbody {
		tr:nth-child(0) {
			padding-top: 30px;
		}
		tr:nth-child(odd) {
			background-color: hsl(34, 57%, 70%);
		}
		tr:nth-child(even) {
			background-color: hsl(34, 57%, 60%);
		}
	}
	thead tr {
		background-color: hsl(34, 57%, 55%) !important;
		position: sticky;
		top: 0;
	}

</style>
