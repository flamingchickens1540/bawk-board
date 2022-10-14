<script lang="ts">
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
</style>