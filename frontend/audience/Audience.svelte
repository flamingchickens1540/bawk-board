<script lang="ts">
	import { AudienceScreenLayout, type MatchID } from "../../common/types";
	import match_end from "../assets/audio/match_end.wav";
	import match_start from "../assets/audio/match_start.wav";
	import match_teleop from "../assets/audio/match_teleop.wav";
	import { audienceScreen, matchID } from "../store";
	import GreenScreen from "./components/GreenScreen.svelte";
	import Match from "./components/Match.svelte";
	import Scores from "./components/Scores.svelte";
	import Win from "./components/Win.svelte";
	
	import { fade } from "svelte/transition";
	import { socket } from "../socket";

    const match_end_sound = new Audio(match_end);
	const match_start_sound = new Audio(match_start);
	const match_teleop_sound = new Audio(match_teleop);

	let element: typeof Match;
	let previousMatchID: MatchID;
	audienceScreen.subscribe((value) => {
		value ??= { layout: AudienceScreenLayout.BLANK, match: $matchID };
		if (previousMatchID != value.match) {
			element = null;
			setTimeout(() => switchLayout(value.layout), 10); // Doesn't update if you change in same event loop
		} else {
			switchLayout(value.layout);
		}
		previousMatchID = value.match;
	});
	socket.on("matchTeleop", () => {
		match_teleop_sound.play();
	});
	socket.on("matchStart", () => {
		match_start_sound.play();
	});
	socket.on("matchEnd", () => {
		match_end_sound.play();
	});
	function switchLayout(layout: AudienceScreenLayout) {
		switch (layout) {
			case AudienceScreenLayout.BLANK:
				element = GreenScreen;
				break;
			case AudienceScreenLayout.MATCH:
				element = Match;
				break;
			case AudienceScreenLayout.WIN:
				element = Win;
				break;
			case AudienceScreenLayout.SCORES:
				element = Scores;
				break;
			default:
				element = Win;
		}
	}
</script>

<div in:fade>
	<svelte:component this={element} />
</div>
