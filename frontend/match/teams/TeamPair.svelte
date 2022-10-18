<script lang=ts>
  import { Alliance } from "../../scoring/components/ScoringTower.svelte";
    import { redAlliance, blueAlliance} from "../../store";
  import Team from "./Team.svelte";

    export let index:number;
</script>

<tr>
    <td class=red><Team {index} alliance_name={Alliance.RED}/></td>
    <td class=blue><Team {index} alliance_name={Alliance.BLUE}/></td>
</tr>

<style>
    td {
        padding:5px;
    }

</style>