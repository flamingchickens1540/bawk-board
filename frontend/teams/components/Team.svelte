<script lang="ts">
    export let team;
</script>

<tr>
	<td>
		<input type="number" bind:value={team.id} />
	</td>
	<td>
		<input type="string" bind:value={team.display_id} />
	</td>
	<td>
		<input type="string" bind:value={team.name} />
	</td>
</tr>

<style>
    td {
        padding: 10px 20px;
    }
    tr {
        
        border-color:aquamarine;
        border-bottom-width:5px !important;
    }
</style>
