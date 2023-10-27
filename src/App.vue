<script setup lang="ts">
import { onMounted, ref } from 'vue'
import GameControl from './components/GameControl.vue'
import HeaderBar from './components/HeaderBar.vue'
import HowtoPlayModal from './components/HowtoPlayModal.vue'
import Modal from './components/ModalFrame.vue'
import SettingsModal from './components/SettingsModal.vue'
import StatsModal from './components/StatsModal.vue'
import { decades } from './types/Decade'
import { genres } from './types/Genre'

import useDiscogs from './composables/useDiscogs'
import useGameHistory from './composables/useGameHistory'
import useSettings from './composables/useSettings'


const { error, selected_album } = useDiscogs()
const { addGameHistory } = useGameHistory()
const { genre, decade, refreshSettings, dev_mode, toggleDevMode, toggleHardMode } = useSettings()

const show_how = ref<boolean>(false)
const show_stats = ref<boolean>(false)
const show_settings = ref<boolean>(false)


const toggleShowHow = () => {
  show_how.value = !show_how.value
  console.log('clicked')
}
const toggleShowStats = () => {
  show_stats.value = !show_stats.value
}
const toggleShowSettings = () => {
  show_settings.value = !show_settings.value
}

onMounted(async () => {
  await refreshSettings()
})

</script>
<template>
  <div class="main">
    <HeaderBar v-bind="{ toggleShowHow, toggleShowStats, toggleShowSettings }" />

    <div class="setting-titles">
      <p>Genre</p>
      <p>Decade</p>
    </div>

    <div class="setting-select">
      <select v-model="genre" @change="refreshSettings({ genre })">
        <option v-for="(genre, index) in genres" :value="genre" :key="index">{{ genre }}</option>
      </select>
      <select v-model="decade" @change="refreshSettings({ decade })">
        <option v-for="(decade, index) in decades" :key="index">{{ decade }}</option>
      </select>
    </div>

    <GameControl @addGameHistory="(game) => { addGameHistory(game), toggleShowStats() }" />

    <div class="error-message" v-if="error">
      <div v-if="dev_mode">
        {{ error.message }}
      </div>
      <div v-else>
        Error loading occured
      </div>
      <button @click="refreshSettings()">
        Try Again
      </button>
    </div>

  </div>
  <div v-if="dev_mode" class="dev-answers">
    <p v-if="selected_album">Album - {{ selected_album.name }}</p>
    <p v-if="selected_album">Artist - {{ selected_album.artist }}</p>
  </div>

  <div v-if="show_how">
    <Modal @closemodal="toggleShowHow">
      <HowtoPlayModal />
    </Modal>
  </div>

  <div v-if="show_stats">
    <Modal @closemodal="toggleShowStats">
      <StatsModal />
    </Modal>
  </div>

  <div v-if="show_settings">
    <Modal @closemodal="toggleShowSettings">
      <SettingsModal @toggleDevMode="toggleDevMode" @toggleHardMode="toggleHardMode" />
    </Modal>
  </div>
</template>

<style scoped>
select {
  color: white;
  background-color: rgb(73, 73, 73);
  border-radius: 6px;
  border: 1px solid white;
  padding: 4px 14px;
  font-size: 16px;
  width: 150px;
  text-align-last: center;
  cursor: pointer;
}

.setting-titles {
  display: flex;
  gap: 4rem;

}

.setting-titles p {
  width: 100px;
  text-align: center;
  font-size: 20px;
  margin: 0;
}

.setting-select {
  display: flex;
  gap: 1rem;
}

.main {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error-message {
  color: crimson;
  font-weight: 600;
  padding-top: 50px;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error-message button {
  color: white;
  background-color: rgb(73, 73, 73);
  border-radius: 6px;
  border: 2px solid white;
  padding: 4px 14px;
  font-size: 16px;
  width: 150px;
  font-weight: 600;
  margin-top: 10px;
}

.error-message button:hover {
  color: black;
  background-color: white;
  cursor: pointer;
}

.error-message button:active {
  color: white;
  background-color: black;
}

.dev-answers {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dev-answers p {
  margin: 0;
}
</style>
