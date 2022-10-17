<script lang=ts>
  import type { MatchScoreBreakdown } from "common/types";
  import { Alliance } from "./Scoreboard.svelte";
  import ScoringZone from "./ScoringZone.svelte";


    export let attribute: keyof MatchScoreBreakdown
    export let title:string
</script>

<tr>
    <td>{title}</td>
    <td class=red><ScoringZone attribute={attribute} alliance={Alliance.RED}/></td>
    <td class=blue ><ScoringZone attribute={attribute} alliance={Alliance.BLUE}/></td>
</tr>

<style>
    td {
        padding:5px 10px;
    }
</style>