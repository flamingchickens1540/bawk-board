<script lang=ts>
  import type { MatchScoreBreakdown } from "common/types";
  import { Alliance } from "./ScoringTower.svelte";
  import ScoringZone from "./ScoringZone.svelte";


    export let attribute: keyof MatchScoreBreakdown
    export let title:string
</script>

<tr>
    <td class=red><ScoringZone attribute={attribute} alliance={Alliance.RED}/></td>
    <td>{title}</td>
    <td class=blue ><ScoringZone attribute={attribute} alliance={Alliance.BLUE}/></td>
</tr>

<style>
    td {
        padding:5px 10px;
    }
    td {
        border-top:1px solid #00000025;
    }
</style>