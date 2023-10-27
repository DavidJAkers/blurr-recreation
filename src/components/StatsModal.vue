<script setup lang="ts">
import useGameHistory from '../composables/useGameHistory'

const { lastGame, calculateStats } = useGameHistory()

</script>

<template>
  <h2>Statistics</h2>
  <div v-if="lastGame" class="stats-page">
    <div class="victory-message">
      <h3 style="color: crimson" v-if="!lastGame.gameWon">You Lost - {{ lastGame.gamePoints }} points </h3>
      <h3 style="color: green" v-else>You Won - {{ lastGame.gamePoints }} points</h3>
    </div>

    <div class="stats-image">
      <img :src="lastGame.gameImage" alt="Album Image" width="150" height="150">
    </div>

    <div class="stats-album-details">
      {{ lastGame.gameAlbumName }} - {{ lastGame.gameArtistName }}
    </div>

    <h2>Game History</h2>
    <div class="game-stats">
      <ul>
        <li>
          <div class="stat-value">{{ calculateStats().played }}</div>
          <div class="stat-label">Played</div>
        </li>
        <li>
          <div class="stat-value"> {{ calculateStats().won }}</div>
          <div class="stat-label">Won</div>
        </li>
        <li>
          <div class="stat-value"> {{ calculateStats().winPercent }}</div>
          <div class="stat-label">Win%</div>
        </li>
        <li>
          <div class="stat-value"> {{ calculateStats().streak }}</div>
          <div class="stat-label">Max Streak</div>
        </li>
      </ul>
    </div>
  </div>

  <div v-else class="no-history-message">
    No game history recorded. Try playing a game!
  </div>
</template>

<style scoped>
.stats-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stats-image {
  padding-bottom: 15px;

}

.stats-album-details {

  font-weight: 600;
  padding-bottom: 15px;
  border-bottom: 1px solid #3a3a3c;
}

.no-history-message {

  font-size: 22px;
}

.game-stats {
  display: flex;
  width: 100%;
}

ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px 0 20px;

}

.stat-value {
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>