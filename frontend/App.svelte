<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import Counter from './lib/Counter.svelte'

  import Upper from './components/Upper.svelte'
  import Lower from './components/Lower.svelte'
  
  var redScore = 0;
  var blueScore = 0;

</script>

<main>
  <div id="red_1">
    <svelte:component this={Upper} alliance="red"/>
    <svelte:component this={Lower} alliance="red"/>
  </div>
  <div id="red_1">
    <svelte:component this={Upper} alliance="red"/>
    <svelte:component this={Lower} alliance="red"/>
  </div>

  <div id="blue_1">
    <svelte:component this={Upper} alliance="blue"/>
    <svelte:component this={Lower} alliance="blue"/>
  </div>
  <div id="blue_2">
    <svelte:component this={Upper} alliance="blue"/>
    <svelte:component this={Lower} alliance="blue"/>
  </div>

  <p>
    The total score for red is: {redScore}
    The total score for blue is: {blueScore}
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>