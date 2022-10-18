<script context="module" lang="ts">
	export enum Alliance {
		RED = "red",
		BLUE = "blue",
	}

	export function parseMath(s):number {
		return parseInt((s.replace(/\s/g, '').match(/[+\-]?([0-9\.]+)/g) || [])
			.reduce(function(sum, value) {
				return parseFloat(sum) + parseFloat(value);
			}));
	}
</script>

<script lang="ts">
	import { calculateScore } from "../../../common/calculations";
	import { redScore, blueScore } from "../../store";
	import ScoringRow from "./ScoringRow.svelte";
	export let alwaysWrite:boolean
</script>

<table>
	<thead>
		<tr>
			<th class=red>Red: {calculateScore($redScore)}</th>
			<th></th>
			<th class=blue>Blue: {calculateScore($blueScore)}</th>
		</tr>
	</thead>
	<tbody>
		<ScoringRow {alwaysWrite} title="Lower Tubes" attribute=normal/>
		<ScoringRow {alwaysWrite} title="Upper Tubes" attribute=upper/>
		<ScoringRow {alwaysWrite} title="Lower Bunny Tubes" attribute=normalBunny/>
		<ScoringRow {alwaysWrite} title="Upper Bunny Tubes" attribute=upperBunny/>
		<ScoringRow {alwaysWrite} title="Hybrid Tubes" attribute=autoBonuses/>
		<ScoringRow {alwaysWrite} title="Fouls" attribute=foulPoints/>
	</tbody>
</table>

<style type="scss">
	table {
		border-collapse: collapse;
        padding:5px;
		background-color: #444444;
        font-size:20px;
		width:100%;
	}
    th {
        text-align:center;
        padding:5px;
    }
</style>
