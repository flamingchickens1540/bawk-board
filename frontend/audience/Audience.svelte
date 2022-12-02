<script lang="ts">
    import { slide } from "svelte/transition";
    import Scores from "./components/Scores.svelte";
    import Match from "./components/Match.svelte";
    import Win from "./components/Win.svelte";
    import { matchState } from "../store";
    import { MatchState } from "../../common/types";
    let element;
    matchState.subscribe((value) => {
        switch (value) {
            case MatchState.PENDING: element=Match; break
            case MatchState.IN_PROGRESS: element=Match; break
            case MatchState.COMPLETED: element=null; break
            case MatchState.POSTED: 
                element=Win;
                setTimeout(() => element=Scores, 5000)
                break;
            default:
                element = null
        }
    })
</script>

<svelte:component this={element}></svelte:component>