<script lang="ts">
    import { slide } from "svelte/transition";
    import Scores from "./components/Scores.svelte";
    import Match from "./components/Match.svelte";
    import { matchState } from "../store";
    import { MatchState } from "../../common/types";
    let element = Scores;
    // matchState.subscribe((value) => {
    //     switch (value) {
    //         case MatchState.PENDING: element=Match; break
    //         case MatchState.IN_PROGRESS: element=Match; break
    //         case MatchState.COMPLETED: element=Scores; break
    //     }
    // })
</script>

<svelte:component this={element}></svelte:component>