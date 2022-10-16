<script lang=ts>
    import { Alliance } from "./Scoreboard.svelte";
    import ScoringZone from "./ScoringZone.svelte";
    export let alliance:Alliance
    export let index:number
    let indexStart = index*3;
    let colorClass = alliance == Alliance.RED ? "red" : "blue"
</script>

<tr class={colorClass}>
    <td><ScoringZone isUpper={true} index={indexStart} alliance={alliance}/></td>
    <td><ScoringZone isUpper={false} index={indexStart+1} alliance={alliance}/></td>
    <td><ScoringZone isUpper={false} index={indexStart+2} alliance={alliance}/></td>
</tr>

<style lang="scss">
    td {
        padding:10px 0px;
    }
</style>

