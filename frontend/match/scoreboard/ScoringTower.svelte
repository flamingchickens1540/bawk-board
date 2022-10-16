<script lang=ts>
	import { Alliance } from "./Scoreboard.svelte";
	import ScoringTowerCorner from "./ScoringTowerCorner.svelte";

    export let name:string;
    export let index:number
    let indexStart = index*6
</script>

<h2>{name}</h2>
<table>
	<thead>
		<tr>
			<th/>
			<th>Upper</th>
			<th>Inner</th>
			<th>Outer</th>
		</tr>
	</thead>
	<tbody>
		<td class="label red" rowspan="3">Red</td>
		<ScoringTowerCorner index={indexStart} alliance={Alliance.RED} />
		<ScoringTowerCorner index={indexStart+1} alliance={Alliance.RED} />
		<td class="label blue" rowspan="3">Blue</td>
		<ScoringTowerCorner index={indexStart} alliance={Alliance.BLUE} />
		<ScoringTowerCorner index={indexStart+1} alliance={Alliance.BLUE} />
	</tbody>
</table>

<style lang="scss">
	table {
		border-collapse: collapse;
        // border:1px solid #333;
        font-size:20px;
	}
    th {
        text-align:center;
        padding-bottom:5px;
    }
	td.label {
		padding: 15px;
	}

</style>
