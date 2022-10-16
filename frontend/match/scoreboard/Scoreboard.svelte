<script context="module" lang="ts">
	export enum Alliance {
		RED = "red",
		BLUE = "blue",
	}
</script>

<script lang="ts">
	import { blueScore, redScore } from "../../score";
	import ScoringTower from "./ScoringTower.svelte";

	function sum(values: string[]): number {
		let sum = 0;
		values.forEach((value) => {
			let numericValue = parseInt(value);
			if (!isNaN(numericValue)) {
				sum += numericValue;
			}
		});
		return sum;
	}
</script>

<table>
	<tr>
		<td class="pad"><ScoringTower index={0} name="Close Tower" /></td>
	</tr>
	<tr>
		<td class="pad"><ScoringTower index={1} name="Far Tower" /></td>
	</tr>
</table>

<style type="scss">
	td.pad {
		padding: 0 50px;
	}
</style>
