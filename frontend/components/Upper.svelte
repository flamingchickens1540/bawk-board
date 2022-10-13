<script lang="ts">
    import app from '../App.svelte'
    import {redScore} from '../score.js';
    import {blueScore} from '../score.js';
    let score = 0;
    let displayScore = score*2;
    let alliance = "";
    if(alliance=="red"){
        redScore = displayScore;
    }else if(alliance=="blue"){
        blueScore = displayScore;
    }
    
</script>

<label id="upperScore">
    <input type="number" value={score} min=0 max=100>
</label>

<p>{displayScore}</p>

<style>
    #upperScore{
        
    }
</style>