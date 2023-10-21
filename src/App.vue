<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import HeaderBar from './components/HeaderBar.vue'
import GameControl from './components/GameControl.vue'
import Modal from './components/ModalFrame.vue'
import HowtoPlayModal from './components/HowtoPlayModal.vue'
import StatsModal from './components/StatsModal.vue'
import SettingsModal from './components/SettingsModal.vue'
import ToggleSwitch from './components/ToggleSwitch.vue'
import { genres, type Genre } from './types/Genre'
import { decades, type Decade } from './types/Decade'
import { type GameHistory } from './types/GameHistory'

import useDiscogs from './composables/useDiscogs'

export default defineComponent({
  name: 'App',
  components: { HeaderBar, GameControl, Modal, HowtoPlayModal, StatsModal, SettingsModal, ToggleSwitch },
  setup() {
    const { error: errorA, selected_album: selected_album_a, fetchAlbum: fetchAlbumA } = useDiscogs()
    const { error: errorB, selected_album: selected_album_b, fetchAlbum: fetchAlbumB } = useDiscogs()

    const show_how = ref<boolean>(false)
    const show_stats = ref<boolean>(false)
    const show_settings = ref<boolean>(false)
    const genre = ref<Genre | undefined>()
    const decade = ref<Decade | undefined>()
    const game_history = ref<GameHistory[]>([])
    const dev_mode = ref<boolean>(false)
    const hard_mode = ref<boolean>(false)

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

    const toggleDevMode = () => {
      dev_mode.value = !dev_mode.value
    }

    const toggleHardMode = () => {
      hard_mode.value = !hard_mode.value
    }

    //push new game to game_history, show stats at end of every game
    const addGameHistory = (game: GameHistory) => {
      game_history.value.push(game)
      toggleShowStats()
    }

    const getRandomGenre = () => {
      const genre_index = Math.floor(Math.random() * genres.length)
      return genres[genre_index]
    }

    const getRandomDecade = () => {
      const decade_index = Math.floor(Math.random() * decades.length)
      return decades[decade_index]
    }

    const refreshSettings = async (options?: { genre?: Genre; decade?: Decade }) => {
      decade.value = options?.decade ?? getRandomDecade()
      genre.value = options?.genre ?? getRandomGenre()
      await fetchAlbumA(genre.value, decade.value)
      await fetchAlbumB(genre.value, decade.value)
    }

    onMounted(async () => {
      await refreshSettings()
    })

    return {
      genre, decade, genres, decades, selected_album_a, selected_album_b,
      refreshSettings, game_history, addGameHistory, errorA, errorB, show_how, show_stats, 
      show_settings, toggleShowHow, toggleShowStats, toggleShowSettings, dev_mode, 
      hard_mode, toggleDevMode, toggleHardMode
    }
  }
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

    <div class="error-message" v-if="errorA">{{ errorA.message }}</div>
    <GameControl v-else-if="selected_album_a !== null" :selected_album="selected_album_a" :refreshSettings="refreshSettings"
      :addGameHistory="addGameHistory" :hard_mode="hard_mode" />
    <div v-if="dev_mode" class="dev-answers">
      <p v-if="selected_album_a">Album - {{ selected_album_a.name }}</p>
      <p v-if="selected_album_a">Artist - {{ selected_album_a.artist }}</p>
    </div>

    <div class="error-message" v-if="errorB">{{ errorB.message }}</div>
    <GameControl v-else-if="selected_album_b !== null" :selected_album="selected_album_b" :refreshSettings="refreshSettings"
      :addGameHistory="addGameHistory" :hard_mode="hard_mode" />
    <div v-if="dev_mode" class="dev-answers">
      <p v-if="selected_album_b">Album - {{ selected_album_b.name }}</p>
      <p v-if="selected_album_b">Artist - {{ selected_album_b.artist }}</p>
    </div>
</div>


  <div v-if="show_how">
      <Modal @closemodal="toggleShowHow">
        <HowtoPlayModal />
      </Modal>
    </div>

    <div v-if="show_stats">
      <Modal @closemodal="toggleShowStats">
        <StatsModal :gameHistory="game_history" />
      </Modal>
    </div>

    <div v-if="show_settings">
      <Modal @closemodal="toggleShowSettings">
        <SettingsModal>
            <template #devSwitch>
              <ToggleSwitch :value="dev_mode" @updateValue="toggleDevMode"/> 
            </template>
            <template #modeSwitch>
              <ToggleSwitch :value="hard_mode" @updateValue="toggleHardMode"/>
            </template>
        </SettingsModal>
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

  .error-message {
    color: crimson;
    font-weight: 600;
    padding-top: 50px;
    font-size: 30px
  }
}
.dev-answers {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dev-answers p {
  margin: 0
}
</style>
