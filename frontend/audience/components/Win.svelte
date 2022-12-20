<svelte:head>
    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
    <script lang="ts" src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
</svelte:head>

<script lang="ts">
    
    import {confetti} from '@neoconfetti/svelte';
    import { fade } from 'svelte/transition';
    import { Alliance } from '../../../common/types';
    import {winningAlliance} from "../../store"
    import woosh from "../../assets/audio/woosh.wav"
    let displayWinner = "";
    let colors = []
    switch ($winningAlliance) {
        case Alliance.RED: 
            displayWinner = "Red Alliance Won!";
            colors = ['var(--red)']
            break;
        case Alliance.BLUE:
            displayWinner = "Blue Alliance Won!";
            colors = ['var(--blue)'];
            break;
        case Alliance.NONE:
            displayWinner = "It's a Tie!"
            colors = ['var(--red)', 'var(--blue)'];
            break;
    }
    new Audio(woosh).play()
</script>

<div use:confetti={{particleCount: 500, force: 0.5, particleSize: 20, particleShape:'mix', duration: 5000, colors, stageWidth:window.outerWidth, stageHeight:window.outerHeight}}>
    
</div>
<div in:fade={{delay:1000, duration:1000}} class="wind_box">
    <h1 class="win_message">{displayWinner}</h1>
</div>

<style lang="scss">
    // .win_message{
    //     text-align:center;
    //     margin:0;
    //     width:auto;
    //     top: 0;
    //     left: 0;
    //     right: 0;   
    //     position: sticky;
    //     float: left;
    //     margin-left: 0;
    //     margin-right: 0;
    // }
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
    .win_message {
        text-align:center;
        color:#676767;
        font-family: 'Poppins';
        font-weight:600;
        font-size:100px;
        position:absolute;
        top:0;
        line-height:90vh;
        bottom:0;
        left:0;
        right:0;
        overflow:hidden;
        vertical-align: middle;
        
    }
    
</style>