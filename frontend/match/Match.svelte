<script>
	import Teams from "./components/teams/Teams.svelte";

    import {matchID, socket} from "../store"

	function startMatch() {
		socket.emit("matchStart", $matchID)
	}
	function stopMatch() {

	}
</script>

<main>
	<div id="header">
		<p>Bunnybots Scoreboard</p>
	</div>
	<h2>Scoring</h2>
	<div class="sidebar-l">
        <label for="match_number">Match #</label>
		<input id="match_number" bind:value={$matchID} type="number" />
        <br>
        <br>
		<p>Teams</p>
		<Teams />
	</div>
	<div class="sidebar-r">
		<h2>Match {$matchID} Controls</h2>
		<table>
			<tr>
				<button on:click={startMatch} class="green">Start</button>
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

	input {
		width: 20px;
	}
    tr > *{
        margin-bottom:5px;
    }
</style>
