<script lang="ts">
	import AllianceList from "./components/AllianceList.svelte";
	import tower_img from "../assets/field.png";
    import ScoringCorner from "./components/scores/ScoringCorner.svelte";
    import { Alliance } from "../../common/types";
</script>

<main>
	<h1>Scoring</h1>
	<div class="tower-grid">
        <div id=blue1><ScoringCorner alliance={Alliance.BLUE} index={0}/></div>
        <div id=blue2><ScoringCorner alliance={Alliance.BLUE} index={1}/></div>
        <div id=red1><ScoringCorner alliance={Alliance.RED} index={0}/></div>
        <div id=red2><ScoringCorner alliance={Alliance.RED} index={1}/></div>
		<img alt=tower id=tower-img src={tower_img}>
	</div>
	<AllianceList style="red sidebar-l" alliance={Alliance.RED} />
	<AllianceList style="blue sidebar-r" alliance={Alliance.BLUE} />
</main>

<style lang="scss">
	.tower-grid {
		display: grid;
		grid-template-columns: 40% 200px 40%;
		grid-template-rows: 40% 200px 40%; 
        margin-top:auto;
        margin-bottom:auto;
	}
    #blue1{
        grid-row:1;
        grid-column:1;
    }
    #blue2{
        grid-row:3;
        grid-column:3;
    }
    #red1{
        grid-row:3;
        grid-column:1;
    }
    #red2{
        grid-row:1;
        grid-column:3;
    }
    #tower-img {
        grid-row:2;
        grid-column: 2;
    }
    img {
        max-width:100%;
        max-height:100%;
    }
</style>
