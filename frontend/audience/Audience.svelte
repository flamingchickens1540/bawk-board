<script lang="ts">
    import Scores from "./components/Scores.svelte";
    import Match from "./components/Match.svelte";
    import Win from "./components/Win.svelte";
    import GreenScreen from "./components/GreenScreen.svelte";
    import { audienceScreen, matchID } from "../store";
    import { AudienceScreenLayout, type MatchID } from "../../common/types";
  import { fade } from "svelte/transition";
    let element: typeof Match;
    let previousMatchID:MatchID;
    audienceScreen.subscribe((value) => {
        value ??= {layout:AudienceScreenLayout.BLANK, match:$matchID}
        if (previousMatchID != value.match) {
            element=null;
            setTimeout(() => switchLayout(value.layout), 10) // Doesn't update if you change in same event loop
        } else {
            switchLayout(value.layout)
        }
        previousMatchID = value.match;
        
    })

    function switchLayout(layout:AudienceScreenLayout) {
        switch (layout) {
            case AudienceScreenLayout.BLANK: element=GreenScreen; break
            case AudienceScreenLayout.MATCH: element=Match; break
            case AudienceScreenLayout.WIN: element=Win; break
            case AudienceScreenLayout.SCORES: element=Scores; break
            default:
                element = Win
        }
    }
</script>
<div in:fade>
<svelte:component this={element}></svelte:component>
</div>