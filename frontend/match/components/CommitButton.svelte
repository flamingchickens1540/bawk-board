<script lang="ts">
    import { socket } from "../../socket";
    
    import { MatchState } from "../../../common/types";
    import { matchState } from "../../store";
  import { onDestroy, onMount } from "svelte";
    function commitMatch() {
		socket.emit("matchCommit")
	}
    onMount(() => {
    const unsubscribe = matchState.subscribe(() => {
        if($matchState == MatchState.POSTED) {
        document.getElementById("commit").innerText = "Recommit"
		document.getElementById("commit").classList.remove("green")
		document.getElementById("commit").classList.add("yellow")
    } else {
        document.getElementById("commit").innerText = "Commit"
		document.getElementById("commit").classList.remove("yellow")
		document.getElementById("commit").classList.add("green")
    }
    })
    onDestroy(unsubscribe)
})
</script>


<button id=commit disabled={$matchState == MatchState.IN_PROGRESS || $matchState == MatchState.PENDING} on:click={commitMatch} class="green">Commit</button>