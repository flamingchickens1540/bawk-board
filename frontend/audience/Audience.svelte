<script lang="ts">
    import { slide } from "svelte/transition";
    import Scores from "./components/Scores.svelte";
    import Match from "./components/Match.svelte";
    import Win from "./components/Win.svelte";
    import GreenScreen from "./components/GreenScreen.svelte";
    import { matchState } from "../store";
    import { MatchState } from "../../common/types";
    let element: typeof Match;
    matchState.subscribe((value) => {
        switch (value) {
            case MatchState.PENDING: element=Match; break
            case MatchState.IN_PROGRESS: element=Match; break
            case MatchState.COMPLETED: element=Win; break
            case MatchState.POSTED: 
                element=Scores;
                // setTimeout(() => element=Scores, 5000)
                break;
            default:
                element = null
        }
    })
    console.log(matchState)
</script>
<svelte:component this={element}></svelte:component>