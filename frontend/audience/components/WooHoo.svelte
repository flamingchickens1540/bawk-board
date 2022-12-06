<head>
    <title>YAYAYAYAYAYYAYAYAYAYAYAYYAYYAYA</title>
    <link rel="stylesheet" href="win.css">
    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
    <script lang="ts">
    import {confetti} from 'canvas-confetti';
    require('canvas-confetti');
    
    function makeItRain() {
        var end = Date.now() + (1 * 1000);
  
    var colors = ['#0066B3', '#ED1C24'];
    
    function frame() {
        confetti({
        particleCount: 4,
        ticks:100,  
        gravity:3,
        scalar:randomInRange(1.5,3.5),
        spread: randomInRange(-30,-70),
        origin: { x: 0.66,y:1 },
        colors: colors,
        startVelocity:randomInRange(80,120)
        });    
        confetti({
            particleCount: 4,
            ticks:100,
            gravity:3,
            scalar:randomInRange(1.5,3.5),
            spread: randomInRange(-30,-70),
            origin: { x: 0.33,y:1 },
            colors: colors,
            startVelocity:randomInRange(80,120)
        });

    
        if (Date.now() < end) {
        requestAnimationFrame(frame);
        }

    };
        frame();
    }
    
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    function createConfetti() {
        makeItRain();
    }

    function myFunction() {
        const banner = document.getElementById("grid").style.clipPath = "inset(0 0 0% 0)"
    }

    function minutesTillBB() {
        const startTime = new Date('December 17, 2022 10:0:0 GMT-08:00').getTime();
        let nowTime = Date.now()
        let diffTime = Math.ceil((startTime - nowTime) / 60000)
        document.getElementById("timer").innerHTML = "STARTING IN " + "<br>" + diffTime + " MINUTES."
    }
    function minutesTillBreakOver() {
    const startTime = new Date('December 17, 2022 10:0:0 GMT-08:00').getTime();
    let nowTime = Date.now()
    let diffTime = Math.ceil((startTime - nowTime) / 60000)
    document.getElementById("timer").innerHTML = "STARTING IN " + "<br>" + diffTime + " MINUTES."
}
    </script>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
</head>

<body>
        <h1 class="win_message">Blue Alliance has won the match!</h1>
        <img alt="winBanner" class= "banner" src="win screen (2).png "/> 
        
</body>

<body on:load={makeItRain}></body>
