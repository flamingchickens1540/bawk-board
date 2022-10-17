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
	import ScoringRow from "./ScoringRow.svelte";
</script>

<h2>Tower</h2>
<table>
	<thead>
		<tr>
			<th></th>
			<th class=red>Red</th>
			<th class=blue>Blue</th>
		</tr>
	</thead>
	<tbody>
		<ScoringRow title=Lower attribute=normal/>
		<ScoringRow title=Upper attribute=upper/>
		<ScoringRow title="Lower Bunny" attribute=normalBunny/>
		<ScoringRow title="Upper Bunny" attribute=upperBunny/>
		<ScoringRow title="Hybrid Tubes" attribute=autoBonuses/>
		<ScoringRow title="Fouls" attribute=foulPoints/>
	</tbody>
</table>

<style type="scss">
	table {
		border-collapse: collapse;
        padding:5px;
		background-color: #444444;
        font-size:20px;
	}
    th {
        text-align:center;
        padding:5px;
    }
</style>
