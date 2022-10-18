<script lang=ts>
	import { blueAlliance, redAlliance } from "../../store";
	import { Alliance } from "./ScoringTower.svelte";

	export let alliance: Alliance;
	export let style: string;

	let headerName = alliance == Alliance.RED ? "Red" : "Blue";
	let teams = alliance == Alliance.RED ? redAlliance : blueAlliance;
</script>

<div class={style}>
	<table>
		<th><h2>{headerName}</h2></th>
		<tr><td>{$teams[0] ?? ""}</td></tr>
		<tr><td>{$teams[1] ?? ""}</td></tr>
		<tr><td>{$teams[2] ?? ""}</td></tr>
		<tr><td>{$teams[3] ?? ""}</td></tr>
	</table>
</div>

