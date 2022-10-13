<script lang="ts">
    import app from '../Scoreboard.svelte'
    import {redScore} from '../../score.js';
    import {blueScore} from '../../score.js';

    let score;
    let displayScore = score*2;
    let alliance = "";

    if(alliance=="red"){
        const unsubscribe = redScore.subscribe(value => {
		score = value;
	});
    }else if(alliance=="blue"){
        const unsubscribe = blueScore.subscribe(value => {
		score = value;
	});
    }
    
</script>

<label id="upperScore">
    <input type="number" value={score} min=0 max=100>
</label>

<p>{displayScore}</p>   

<style>
    #upperScore{
        background-color: orangered;
    }
    p{
        text-decoration-color: orange;
    }
</style>