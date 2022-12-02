<script lang="ts">
  import { prettyTeamNumber, blueAlliance, redAlliance, timer } from "../../store";

    setInterval(() => {
        document.getElementById("match-time").innerText = timer.remainingTimeFormatted
        document.getElementById("progress-bar").style.width = ((timer.remainingTimePercent)*100)+"%"
    }, 10)
</script>

<div class="grid">
	<div class="progress-bar-container">
		<div class=progress-bar id=progress-bar></div>
	</div>
	<div class="alliance-info-red"><p>{$redAlliance.map((team) => prettyTeamNumber(team)).join(" ")}</p></div>
	<div class="alliance-info-blue"><p>{$blueAlliance.map((team) => prettyTeamNumber(team)).join(" ")}</p></div>
	<div class="match-info"><p id=match-time>0:00</p></div>
</div>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
    $info-height:10vh;
	.grid {
        font-family:"Poppins";
        overflow:hidden;
        position:absolute;
        left:0;
        top:0;
		display: grid;
		grid-template-columns:
			[redTeams] 40vw
			[timer] 20vw
			[blueTeams] 40vw;
		grid-template-rows:
			[progressBar] 3vh
			85vh
			[info] 12vh;
		width: 100vw;
		height: 100vh;
	}
	.progress-bar-container {
		background-color: #bfbfbf;
		grid-column: redTeams/span 3;
		grid-row: progressBar;
        .progress-bar {
            width:80%;
            background-color:#777777;
            height:100%;
            border-radius: 0 9px 9px 0;
			// transition:0.1s;
        }
	}


	@mixin infoBox($column) {
		grid-row: info;
		grid-column: $column;
        border: solid black;
        border-width:10px 5px;
        & p {
            line-height:$info-height;
            margin:0;
            word-spacing: 35px;
            font-size:45px;
        }
	}

	.alliance-info {
        
		&-red {
			@include infoBox(redTeams);
            background-color: var(--red);
            font-weight:600;
		}
		&-blue {
			@include infoBox(blueTeams);
            background-color: var(--blue);
            font-weight:600;
		}
	}
	.match-info {
		@include infoBox(timer);
		background-color: gray;
        position:relative;
        
        p {
            font-size:75px; 
        }
	}
</style>
