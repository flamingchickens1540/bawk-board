<script lang="ts">
	export let teamNumber: string;
	export let displayNumber: string;
	export let teamName: string;
</script>

<tr>
	<td>
		<input type="number" bind:value={teamNumber} />
	</td>
	<td>
		<input type="string" bind:value={displayNumber} />
	</td>
	<td>
		<input type="string" bind:value={teamName} />
	</td>
</tr>

<style>
</style>
