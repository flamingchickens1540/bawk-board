    <title>YAYAYAYAYAYYAYAYAYAYAYAYYAYYAYA</title>
    <link rel="stylesheet" href="win.css">
    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
    <script lang="ts" src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js">
        import {confetti} from '@neoconfetti/svelte';
  import { calculateScore } from '../../../common/calculations';
        import {redScore, blueScore} from "../../store"
        import { Alliance } from "../../../common/types";
        


        
        let displayWinner = "";
        if (calculateScore($redScore) > calculateScore($blueScore)){
                displayWinner = "Blue";
        } else if (calculateScore($redScore) < calculateScore($blueScore)){
                displayWinner = "Red"
        } else {
            displayWinner = "Tie"
        }
    </script>

<div use:confetti={{particleCount: 200, force: 0.3, particleSize: 20, particleShape:'rectangles', duration: 5000, colors: ['var(--blue)', 'var(--red)', '#1227e3', '#e32012']}}>
        <div class="wind_box">
            <h1 class="win_message">{displayWinner} Alliance has won the match!</h1>
        </div>
        

</div>

<style lang="scss">
    @import "win.css";
    .win_message{

        text-align:center;
        margin:0;
        width:auto;
        top: 0;
        left: 0;
        right: 0;   
        position: fixed;
        float: left;
        margin-left: 0;
        margin-right: 0;
    }
</style>