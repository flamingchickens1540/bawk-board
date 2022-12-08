<script lang="ts">
	import { teams } from "../store";
	const sortFunction = (a, b) => b.rankingPoints - a.rankingPoints
	let teamsSorted = $teams.sort(sortFunction)
	teams.subscribe((value) => {
		teamsSorted = value.sort(sortFunction)
	})
	
</script>


<h1 class="Title">Team Rankings</h1>

<main>
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
			{#each teamsSorted as team, i}
			<tr class="allianceLeader">
				<td>{i}</td>
				<td>{team.display_id}</td>
				<td>{team.name}</td>
				<td>{team.rankingPoints}</td>
				<td>{team.matchWins}-{team.matchLosses}-{team.matchTies}</td>
			</tr>
			{/each}
		</tbody>
	</table>
</main>

<style>
	main {
		width:100vw;
		height:100vh;
		color:black;
		padding-bottom:20px;
	}
	.Title {
		font-family: arial;
		margin-left: 500;
		margin-right: 500;
	}
	
	table {
		font-family: arial;
		margin-left: auto;
		margin-right: auto;
		margin-top: -30px;
		width: 95%;
		border-collapse: collapse;
		border-spacing:0;
	}
	
	td, th {
		/* border: 1px solid #989898; */
		text-align: center;
		padding: 8px;
	}
	
	tr:nth-child(odd) {
		background-color:hsl(34, 57%, 70%);
	}
	tr:nth-child(even) {
		background-color:hsl(34, 57%, 60%);
	}
	thead tr {
		background-color:hsl(34, 57%, 55%) !important;
	}
</style>