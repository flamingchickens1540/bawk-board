<script lang=ts>
    import { isPlayoffLevel } from "../../../../common/alliances";
    import { derived } from "svelte/store";
    import { matchID, teams } from "../../../store";
    import TeamPair from "./TeamPair.svelte";
    import AllianceBox from "./Alliance.svelte";
    import { Alliance } from "../../../../common/types";
    const isPlayoff = derived(
        matchID,
        $matchID => isPlayoffLevel($matchID)
    )
</script>

<table>
    <tr>
        <th class=red>Red</th>
        <th class=blue>Blue</th>
    </tr>
    
    <TeamPair index={0}/>
    <TeamPair index={1}/>
    <TeamPair index={2}/>
    <TeamPair index={3}/>
    {#if $isPlayoff} 
    <tr>
        <td class=red><AllianceBox alliance_name={Alliance.RED}/></td>
        <td class=blue><AllianceBox alliance_name={Alliance.BLUE}/></td>
    </tr>
    {/if}
</table>

<datalist id="teams">
    {#each $teams as team}
        <option value={team.display_id}>{team.display_id}</option>
    {/each}
</datalist>

<style>
    th {
        font-size:20px;
        height:30px;
    }
    table {
        border-collapse: collapse;
        width:100%;
        position: relative;
    }

</style>