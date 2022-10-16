<script lang=ts>
    import { redAlliance, blueAlliance} from "../../store";

    export let index;
</script>

<tr>
    <td class=red><input bind:value={$redAlliance[index]} list=teams/></td>
    <td class=blue><input bind:value={$blueAlliance[index]} list=teams/></td>
</tr>

<style>
    td {
        padding:5px;
    }
    input {
        width:60px;
    }
</style>