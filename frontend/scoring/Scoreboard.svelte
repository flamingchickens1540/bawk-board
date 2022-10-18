<script>
	import AllianceList from "./components/AllianceList.svelte";
import ScoringTower, { Alliance } from "./components/ScoringTower.svelte";
</script>

<main>
    <h1>Scoring</h1>
    <div class=vcenter>
        <ScoringTower/>
    </div>
	<AllianceList style="red sidebar-l" alliance={Alliance.RED}/>
    <AllianceList style="blue sidebar-r" alliance={Alliance.BLUE}/>
</main>

<style>
    .vcenter {
        margin-top:auto;
        margin-bottom:auto;
        width:65vw;
    }

</style>
