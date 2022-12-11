<script lang="ts">
  import { socket } from "../../socket";
  import type { AudienceScreen } from "../../../common/types";
  import {audienceScreen} from "../../store"

    function setAudienceScreen() {
		socket.emit("showScreen", screen)
        console.log($audienceScreen)
        console.log(screen)
        console.log($audienceScreen == screen)
	}

    function areEqual(a:AudienceScreen, b:AudienceScreen) {
        if (a == undefined || b== undefined) {return false}

        return a.layout == b.layout && a.match == b.match
    }
    export let screen:AudienceScreen
    export let text:string
</script>

<button class="green" on:click={setAudienceScreen} disabled={areEqual($audienceScreen, screen)}>{text}</button>