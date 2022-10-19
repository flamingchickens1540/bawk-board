<script lang="ts">
	import { Alliance } from "../../../../common/types";

	import ScoringZone from "./ScoringZone.svelte";
	export let alliance: Alliance;
	export let index: number;
	let indexStart = index * 3;
	let colorClass = alliance == Alliance.RED ? "red" : "blue";
</script>

<table class={colorClass}>
    <tr>
        <th></th>
        <th>Bunny?</th>
        <th>Tubes</th>
    </tr>
	<tr>
        <td>Upper</td>
		<ScoringZone isUpper={true}  index={indexStart}     {alliance} />
	</tr>
    <tr>
        <td>Inner</td>
        <ScoringZone isUpper={false} index={indexStart + 1} {alliance} />
    </tr>
    <tr>
        <td>Outer</td>
        <ScoringZone isUpper={false} index={indexStart + 2} {alliance} />
    </tr>
</table>

<style lang="scss">
	td {
		padding: 10px 0px;
	}
    table {
        width:100%;
        height:100%
    }
</style>
