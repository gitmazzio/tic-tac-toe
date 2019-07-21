<template>
  <div class="container">
    <ScorePoint />
    <Grid />
    <GamePlayed />
    <RetryButton />
  </div>
</template>

<script>
import ScorePoint from "~/components/ScorePoint.vue";
import Grid from "~/components/Grid.vue";
import GamePlayed from "~/components/GamePlayed.vue";
import RetryButton from "~/components/RetryButton.vue";

export default {
  components: {
    ScorePoint,
    Grid,
    GamePlayed,
    RetryButton
  },
  data: () => {
    return {};
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
