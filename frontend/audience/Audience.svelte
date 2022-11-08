<script lang="ts">
    import { socket } from "../socket";
    import { slide } from "svelte/transition";
    import Scores from "./components/Scores.svelte";
    import Match from "./components/Match.svelte";
    let element = Match;
    socket.on("matchEnd", () => {element = Scores;})
    socket.on("matchStart", () => {element = Match;})
</script>

<svelte:component transition={slide} this={element}></svelte:component>