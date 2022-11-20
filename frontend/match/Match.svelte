<script lang="ts">
	import Teams from "./components/teams/Teams.svelte";

    import {isDoneLoading, matchID, matchStartTime, matchState, timer} from "../store"
	import { socket } from "../socket";
	import { SimpleTimer } from "../../common/timer";
	import match_start from "../assets/audio/match_start.wav"
	import match_teleop from "../assets/audio/match_teleop.wav"
	import match_end from "../assets/audio/match_end.wav"
  import { MatchState } from "../../common/types";
	

	setInterval(() => document.getElementById("match-time").innerText = timer.elapsedTimeFormatted, 100)
	isDoneLoading.then(() => {
		if ($matchState == MatchState.IN_PROGRESS) {
			setButtonStop()
			timer.startWithTime($matchStartTime)
		} else {
			setButtonStart()
		}
	})
	socket.on("matchTeleop", () => {
		new Audio(match_teleop).play()
	})
	socket.on("matchStart", (data) => {
		new Audio(match_start).play()
		setButtonStop()
	})
	socket.on("matchEnd", (data) => {
		new Audio(match_end).play()
		timer.reset()
		setButtonStart()
	})
	function startMatch() {
		socket.emit("matchStart", $matchID)
	}
	function abortMatch() {
		socket.emit("matchAbort", $matchID)
	}

	function setButtonStart() {
		document.getElementById("match-control").innerText = "Start"
		document.getElementById("match-control").classList.remove("red")
		document.getElementById("match-control").classList.add("green")
		document.getElementById("match-control").onclick = startMatch
	}
	function setButtonStop() {
		document.getElementById("match-control").innerText = "Abort"
		document.getElementById("match-control").classList.remove("green")
		document.getElementById("match-control").classList.add("red")
		document.getElementById("match-control").onclick = abortMatch
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
		<div class=row>
			<button id=match-control class="green">Start</button>
		</div>
		<h3 id=match-time>0:00</h3>
	</div>
</main>

<style lang="scss">
	.row {
		display:grid;
		grid-auto-flow: row;
		
	}
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
</style>
