<script lang="ts">
    import logo from "../../assets/logo.png"
    import { onMount } from "svelte";
    import {prettyTeamNumber, audienceScreen} from "../../store"
    import {getHybridScore, getTeleopScore, getFoulPoints, calculateScore} from "../../../common/calculations"
  import { backend_url } from "../../../secrets";
  import type { MatchData } from "common/types";
  import { fade } from "svelte/transition";
    let ready = 0;
    let startTime = 0;
    onMount(() => {ready++; startTime = Date.now()});
    let matchData:MatchData
    fetch(backend_url+"/api/match/"+$audienceScreen.match).then(async (data) => {
        matchData = await data.json()
        ready++
    })
    
    function showBanners(element:HTMLElement) {
        console.log("SHOW BANNERS")
        return {
            duration:3000,
            delay:startTime+1500-Date.now(),
            css: (t) => `clip-path:inset(0 0 ${(1-t.toFixed(5))*100}% 0)`,
        }
    }
    
</script>


<main in:fade={{delay:0, duration:1000}}>
<div class="image-container">
    <div><img src={logo} alt=logo id="logo" style="width:351px;height:auto;" class="center" /></div>
</div>
{#if ready >= 2}
<div id="grid" in:showBanners>
        <div class="banner-container-red"></div>
        <div class="banner-container-blue"></div>
        
        
        <h1 class="total label-red wide">{calculateScore(matchData.redScoreBreakdown)}</h1>
        <h1 class="teams label-red wide">{matchData.redTeams.map((team) => prettyTeamNumber(team)).join(" ")}</h1>
        
        <h2 class="hybrid label-red">Hybrid</h2>
        <h2 class="teleop label-red">Teleop</h2>
        <h2 class="penalty label-red">Blue Penalty</h2>
        
        <h2 class="hybrid value-red">{getHybridScore(matchData.redScoreBreakdown)}</h2>
        <h2 class="teleop value-red">{getTeleopScore(matchData.redScoreBreakdown)}</h2>
        <h2 class="penalty value-red">{getFoulPoints(matchData.redScoreBreakdown)}</h2>
        
        
        <h1 class="total label-blue wide">{calculateScore(matchData.blueScoreBreakdown)}</h1>
        <h1 class="teams label-blue wide">{matchData.blueTeams.map((team) => prettyTeamNumber(team)).join(" ")}</h1>
        
        <h2 class="hybrid label-blue">Hybrid</h2>
        <h2 class="teleop label-blue">Teleop</h2>
        <h2 class="penalty label-blue">Red Penalty</h2>
        
        <h2 class="hybrid value-blue">{getHybridScore(matchData.blueScoreBreakdown)}</h2>
        <h2 class="teleop value-blue">{getTeleopScore(matchData.blueScoreBreakdown)}</h2>
        <h2 class="penalty value-blue">{getFoulPoints(matchData.blueScoreBreakdown)}</h2>
    </div>    
    {/if}
</main>
    <style lang="scss">
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
        .center {
            position: absolute;
            text-align: center;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
        }
        #grid {
            // clip-path: inset(0 0 100% 0);
            overflow-y: hidden;
            // transition: all 3s ease-out;
            font-family: 'Poppins';
            z-index: 4;
            height: 100%;
            position: absolute;
            left: 0px;
            top: 0px;
            width: 100vw;
            display: grid;
            grid-template-columns: 5%
            [redLabels] 20% 
            [redNums] 10% 
            30% 
            [blueLabels] 20%
            [blueNums] 10%
            5%;
            grid-template-rows: 10% 
            [total] 25% 
            [teams] 10% 
            5%
            [score1] 7% 
            [score2] 7% 
            [score3] 7%
            17% 
            10%;
        }
        h1 {
            &.total {
                grid-row: total;
                font-size: 200px;
                font-weight: 700;
            }
        }
        @mixin label($startColumn) {
            text-align: right;
            padding: 10px;
            margin-top: auto;
            margin-bottom: auto;
            font-weight: 600;
            font-size: 40px;
            grid-column-start:$startColumn;
        }
        .label {
            &-red {@include label(redLabels)}
            &-blue {@include label(blueLabels)}
        }
        @mixin value($startColumn) {
            text-align: left;
            padding: 10px;
            margin-top: auto;
            margin-bottom: auto;
            font-weight: 300;
            font-size: 40px;
            grid-column-start:$startColumn;
        }
        .value {
            &-red {@include value(redNums)}
            &-blue {@include value(blueNums)}
        }
        .wide {
            grid-column-end: span 2;
            text-align: center;
        }
        .teams {
            grid-row: teams;
            word-spacing: 20px;
            font-weight: 500;
        }
        .hybrid {
            grid-row: score1;
        }
        .teleop {
            grid-row: score2;
        }
        .penalty {
            grid-row: score3;
        }
        @mixin bannerContainer($column) {
            grid-row: total / span 7;
            grid-column: $column / span 2;
            position: relative;
            overflow-y: hidden;
            z-index: -1;
            filter: drop-shadow(5px 5px 10px #555555);
            
            --mask: conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) 50%/10% 100%;
            -webkit-mask: var(--mask);
            mask: var(--mask);
        }
        .banner-container {
            &-red{@include bannerContainer(redLabels); background-color:var(--red)}
            &-blue{@include bannerContainer(blueLabels); background-color:var(--blue)}
        }
        
        #logo {
            z-index: 3;
        }
        :global {body {
            background-color: #d9d9d9 ;
        }}
    </style>