<script>
	import Scoreboard from "./scoreboard/Scoreboard.svelte";
	import Teams from "./teams/Teams.svelte";

    import {matchID} from "../store"
</script>

<main>
	<div id="header">
		<p>Bunnybots Scoreboard</p>
	</div>
	<Scoreboard />
	<div id="sidebar-l">
        <label for="match_number">Match #</label>
		<input id="match_number" bind:value={$matchID} type="number" />
        <br>
        <br>
		<p>Teams</p>
		<Teams />
	</div>
	<div id="sidebar-r">
		<h2>Match {$matchID} Controls</h2>
		<table>
			<tr>
				<button class="green">Start</button>
				<button class="red">Stop</button>
			</tr>
		</table>
	</div>
</main>

<style lang="scss">
	#header {
		left: 0px;
		right: 0px;
		text-align: center;
		// background-color: #444;
		padding: 10px;
	}

	#sidebar-r {
		position: absolute;
		right: 0px;
		top: 0px;
		padding: 40px;
		bottom: 0px;
		background-color: #303030;
	}
	#sidebar-l {
		position: absolute;
		left: 0px;
		top: 0px;
		padding: 20px;
		bottom: 0px;
		background-color: #303030;
	}
	input {
		width: 20px;
	}
    tr > *{
        margin-bottom:5px;
    }
</style>
