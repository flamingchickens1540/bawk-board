<script lang=ts>
  import type { MatchScoreBreakdown } from "common/types";
  import { Alliance } from "./ScoringTower.svelte";
  import ScoringZone from "./ScoringZone.svelte";


    export let attribute: keyof MatchScoreBreakdown
    export let title:string
    export let alwaysWrite:boolean=false
</script>

<tr>
    <td class=red><ScoringZone alwaysWrite={alwaysWrite} attribute={attribute} alliance={Alliance.RED}/></td>
    <td>{title}</td>
    <td class=blue ><ScoringZone alwaysWrite={alwaysWrite} attribute={attribute} alliance={Alliance.BLUE}/></td>
</tr>

<style>
    td {
        padding:5px 10px;
    }
    td {
        border-top:1px solid #00000025;
    }
</style>