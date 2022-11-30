<script lang="ts">
	import Teams from "./components/teams/Teams.svelte";
	
	import {isDoneLoading, matches, matchID, matchStartTime, matchState, timer} from "../store"
	import { socket } from "../socket";
	import { SimpleTimer } from "../../common/timer";
	import match_start from "../assets/audio/match_start.wav"
	import match_teleop from "../assets/audio/match_teleop.wav"
	import match_end from "../assets/audio/match_end.wav"
	import { MatchState, type MatchData } from "../../common/types";
	
	
	setInterval(() => document.getElementById("match-time").innerText = $matchState == MatchState.COMPLETED ? "Complete" : timer.elapsedTimeFormatted, 100)
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
	function loadMatch(id) {
		socket.emit("loadMatch", id)
	}
	
	function getColorClass(match:MatchData, i:number) {
		if (match.matchState == MatchState.COMPLETED) {
			return getColorValue(100,200,100,i%2==0?0.5:0.3)
		}
	}
	function getBackgroundColor(i:number) {
			return getColorValue(100,100,100,i%2==0?0.5:0.3)
	}
	function getColorValue(r:number, g:number, b:number, alpha:number) {
		return `rgba(${r},${g},${b},${alpha})`
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
		<h2>Matches</h2>
		<div id=matchGrid>
			{#each $matches as match,i}
			<div class="matchEntry" style="background-color:{getBackgroundColor(i)}">
				<svg height="16px" width=16px class="statusicon">
					<circle cx="8" cy="08" r="8"  stroke-width="0" fill="{getColorClass(match, i)}" />
				</svg> 
				<span>Match {match.id}</span>
				<button disabled={match.id == $matchID} class="loadButton" on:click={() => loadMatch(match.id)}>Load</button>
			</div>
			{/each}
		</div>
	</div>
	<div class="sidebar-r">
		<h2>Match {$matchID} Controls</h2>
		<div class=row>
			<button id=match-control class="green">Start</button>
		</div>
		<h3 id=match-time>0:00</h3>
		<br>
		<br>
		<p>Teams</p>
		<Teams />
	</div>
</main>

<style lang="scss">
	.sidebar-l {
		padding:10px;
	}
	#matchGrid {
		display:grid;
		grid-template-columns: 100%;
		grid-auto-flow: row;
		
	}
	.matchEntry {
		background-color: rgba(100,100,100,0.5);
		box-sizing: border-box;
		display:block;
		width:100%;
		padding:10px 40px;
		align-items: center;
		
		button {
			padding: 0.2em 0.7em;
			margin-left:10px;
			background-color: #1a1a1af0;
		}
		.statusicon {
			margin-top:auto;
			margin-bottom:auto;
		}
	}
	tr {
		margin-bottom:50px;
	}
	.row {
		display:grid;
		grid-auto-flow: row;
		
	}
	#header {
		left: 0px;
		right: 0px;
		text-align: center;
		padding: 10px;
	}
	
	input {
		width: 20px;
	}
</style>
