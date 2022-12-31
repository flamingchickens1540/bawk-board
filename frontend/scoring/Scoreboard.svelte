<script lang="ts">
	import { matchID, towers } from "../store";
	import type { TowerName } from "../types";
	const currentTowerName = new URL(window.location.href).searchParams.get(
		"tower"
	) as TowerName;
	if (currentTowerName == null) {
		window.location.search = "tower=near";
	}
	const currentTower = towers[currentTowerName];

	import AllianceList from "./components/AllianceList.svelte";
	import tower_img from "../assets/field.png";
	import ScoringCorner from "./components/scores/ScoringCorner.svelte";
	import { Alliance } from "../../common/types";
  import { prettyMatchID } from "../../common/calculations";

	const index = currentTower.index * 2;

	function switchTower() {
		if (currentTowerName == "near") {
			window.location.search = "tower=far";
		} else [(window.location.search = "tower=near")];
	}
	
</script>

<main class="grid-container">
	<div class="header">
		<h1>{currentTower.name} - {prettyMatchID($matchID ?? "qm0m0")}</h1>
		<button on:click={switchTower}>Switch Tower</button>
	</div>
	<AllianceList style="red red-banner" alliance={Alliance.RED} />
	<div class="scoring-item" id="blue1">
		<ScoringCorner alliance={Alliance.BLUE} {index} />
	</div>
	<div class="scoring-item" id="blue2">
		<ScoringCorner alliance={Alliance.BLUE} index={index + 1} />
	</div>
	<div class="scoring-item" id="red1">
		<ScoringCorner alliance={Alliance.RED} {index} />
	</div>
	<div class="scoring-item" id="red2">
		<ScoringCorner alliance={Alliance.RED} index={index + 1} />
	</div>
	<img alt="tower" id="tower-img" src={tower_img} />

	<AllianceList style="blue blue-banner" alliance={Alliance.BLUE} />
</main>

<style lang="scss">
	button {
		margin-bottom: 10px;
	}
	.grid-container {
		display: grid;
		grid-template-columns: 10vw 30vw auto 30vw 10vw;
		grid-template-rows: auto auto auto auto;
		margin-top: auto;
		margin-bottom: auto;
		width: 100%;
		height: auto;
	}
	.header {
		grid-row:1;
		grid-column: 2/span 3;
	}
	.scoring-item {
		width: 90%;
		height: 100%;
		margin-left: auto;
		margin-right: auto;
	}

	#blue1 {
		grid-row: 2;
		grid-column: 2;
	}
	#blue2 {
		grid-row: 3;
		grid-column: 4;
	}
	#red1 {
		grid-row: 3;
		grid-column: 2;
	}
	#red2 {
		grid-row: 2;
		grid-column: 4;
	}
	#tower-img {
		grid-row: 2 / span 2;
		grid-column: 3;
	}
	img {
		max-width: 100%;
		max-height: 100%;
		margin-top: auto;
		margin-bottom: auto;
	}
</style>
