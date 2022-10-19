<script lang="ts">
	import { towers } from "../store";
	import type { TowerName } from "../types";
	const currentTowerName = new URL(window.location.href).searchParams.get("tower")as TowerName;
    if (currentTowerName == null) {
        window.location.search = "tower=near"
    }
	const currentTower = towers[currentTowerName];
	
	import AllianceList from "./components/AllianceList.svelte";
	import tower_img from "../assets/field.png";
	import ScoringCorner from "./components/scores/ScoringCorner.svelte";
	import { Alliance } from "../../common/types";
	
	const index = currentTower.index * 2;

    function switchTower() {
        if (currentTowerName == "near") {
            window.location.search = "tower=far"
        } else [
            window.location.search = "tower=near"
        ]
    }
</script>

<main>
	<h1>{currentTower.name}</h1>
    <button on:click={switchTower}>Switch Tower</button>
	<AllianceList style="red sidebar-l" alliance={Alliance.RED} />
	<div class="tower-grid">
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
	</div>

	<AllianceList style="blue sidebar-r" alliance={Alliance.BLUE} />
</main>

<style lang="scss">
    button {
        margin-bottom:10px;
    }
	.tower-grid {
		display: grid;
		grid-template-columns: 25vw 400px 25vw;
		grid-template-rows: auto auto;
		margin-top: auto;
		margin-bottom: auto;
	}
	.scoring-item {
		width: 90%;
		height: 100%;
		margin-left: auto;
		margin-right: auto;
	}
	#blue1 {
		grid-row: 1;
		grid-column: 1;
	}
	#blue2 {
		grid-row: 2;
		grid-column: 3;
	}
	#red1 {
		grid-row: 2;
		grid-column: 1;
	}
	#red2 {
		grid-row: 1;
		grid-column: 3;
	}
	#tower-img {
		grid-row: 1 / span 2;
		grid-column: 2;
	}
	img {
		max-width: 100%;
		max-height: 100%;
	}
</style>
