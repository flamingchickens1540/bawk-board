<script lang="ts">
      import { prettyTeamNumber, blueAlliance, redAlliance, timer } from "../store";


    let count = [0,1,2];

    setInterval(() => {
        (document.getElementsByClassName("timer")[0] as HTMLElement).innerText = timer.remainingTimeFormatted
        document.getElementById("progress-bar").style.width = ((timer.remainingTimePercent)*100)+"%"
    }, 10)
</script>

<title>yEEETSDJFOSADJFKZMKDSLJKJ</title>

<div class="topwhite"></div>
<div class="top"></div>
<div class="topmask"></div>
​
<div class="feed"></div>
<div class="bottom">
    <div class="progress-bar-container">
		<div class=progress-bar id=progress-bar></div>
	</div>

    <div class="alliance redcontainer" id="redcontainer">
        {#each count as _div}
            <div class=team></div>
        {/each}
    </div>

    <div class="timer">
        <span class="dot"></span>
        <span class="dot dot2"></span>
        <span>1:43</span>
​
    </div>
    <div class="alliance bluecontainer" id="bluecontainer">
        {#each count as _div}
            <div class=team>{Math.round(Math.random()*3000)}</div>
        {/each}
    </div>
    <div class="footer"></div>
​
</div>

​
<style lang="">
/* @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap'); */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap');
​
body, html{
    display: flex;
    flex-flow:column nowrap;
    height:100%;
    width:100%;
    margin:0;
    overflow: hidden;
}
​
html{
​
    background-image: url(https://i.ytimg.com/vi/7EW2_jJuMCo/maxresdefault.jpg);
    background-size: contain;
    background-position: center;
    background-repeat:no-repeat;    
}
​
.top {
    z-index: 2;
    display:flex;
    width:100w; 
    background-color: rgb(111, 255, 0);
    height:30px;
    background-image: linear-gradient(to right, rgb(255, 58, 58),rgb(229, 255, 0), rgb(63, 251, 119));
}
.topmask {
    position: absolute;
    z-index: 3;
    display:flex;
    align-self:flex-end;
    right:0;
    width:30vw; 
    background-color: white;
    height:32px;
}
.topwhite {
    z-index: 1;
    display:flex;
    position:absolute;
    top:0;
    width:100vw; 
    background-color: white;
    height:32px;
}
.footer{
    height:3vw;
    background-color: white;
    width:100%;
    position: absolute;
    bottom:0;
    z-index: -3;
}
.feed {
    display:flex;
​
    /* background-color: white; */
    flex-grow: 1;
}
.bottom {
    display:flex;
    flex-flow:row nowrap;
    justify-content: center;
    /* justify-content: space-evenly; */
    height:5vw;
    /* background-color: white; */
}

.alliance{
    display:flex;
    /* flex-grow:1; */
    border-radius:1.6vw;
    margin:0.3vw;
    justify-content: center;
    /* box-shadow: inset 0 0 .2vw 0.2vw #ffffff; */
    box-shadow: 0 0 0.4vw 0.2vw var(--color);
    background-color: var(--color);
​
​
}
.redcontainer{
    --color:red;
    padding-right:4vw;
    /* box-shadow: inset 0 0 20px #ffb938; */
    /* box-shadow: inset 0 0 15px 5px #ffffff; */
    border-top-right-radius: 0;
​
    /* background-image: linear-gradient(to bottom, rgb(197, 3, 0) , rgb(255, 0, 0)); */
​
}
.redcontainer::before{
    /* padding-right:100px; */
    position:absolute;
    width:50vw;
    height:100%;
​
}
.bluecontainer{
    --color:blue;
    padding-left:4vw;
    border-top-left-radius: 0;
​
    /* box-shadow: inset 0 0 .2vw 0.2vw #ffffff; */
    /* background-image: linear-gradient(to bottom, rgb(0, 11, 160) ,rgb(39, 0, 237)); */
​
}
.team{
    display: flex;
    /* border-radius: 1vw; */
    flex-flow:row nowrap;
    /* margin:0.7vw; */
    /* background-color: white; */
    color:white;
    align-items: center;
​
    font-family: 'Poppins', sans-serif;
    font-size: 4vw;
    font-weight: bold;
    padding:1.4vw;
​
}
vl {
    border-left: 2px solid rgba(0, 0, 0, 0.313);
    height: 3vw;
}
​
.team:first-child ~ .team{
border-left: 0.2vw solid rgba(0, 0, 0, 0.313);
height:0.4vw;
align-self: center  ;
​
}
​
.timer{
    color:rgb(38, 0, 27);
    font-size: 5vw;
    font-family: 'Poppins', sans-serif;
    align-self: center;
    z-index: 1;
​
}
​
/* this yoinked from here https://www.w3schools.com/howto/howto_css_circles.asp */
.dot {
    position:absolute;
    /* position:fixed; */
    /* z-index: -1; */
    height: 20vw;
    width: 20vw;
    transform: translate(-5.5vw);
    z-index: -1;
    /* background-color: #bbb; */
    background-image: linear-gradient(to top, rgb(253, 255, 253),rgb(253, 255, 253), rgb(63, 251, 119));
​
    border-radius: 50%;
    display: inline-block;
    /* box-shadow: inset 0 0 .2vw 0.2vw #ffffff; */
}
.dot2{
    transform: translate(-5.5vw) scale(1.07);
    background:rgba(101, 255, 101, 0.555);
    z-index: -2;
}
​
</style>