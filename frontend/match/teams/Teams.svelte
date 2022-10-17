<script lang=ts>
    import {calculateScore} from "../../../common/calculations"
    import { teams, redScore, blueScore } from "../../store";
    import TeamPair from "./TeamPair.svelte";

</script>

<table>
    <tr>
        <th class=red>Red: {calculateScore($redScore)}</th>
        <th class=blue>Blue: {calculateScore($blueScore)}</th>
    </tr>
    
    <TeamPair index=0/>
    <TeamPair index=1/>
    <TeamPair index=2/>
    <TeamPair index=3/>
    
</table>

<datalist id="teams">
    {#each $teams as team}
        <option value={team.display_id}>{team.display_id}</option>
    {/each}
</datalist>

<style>
    table {
        border-collapse: collapse;
    }

</style>