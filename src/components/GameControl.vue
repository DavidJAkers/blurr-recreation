<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { GameStep } from '@/types/GameStep';
import normalizeString from '@/utils/normalizeString'

import useDiscogs from '@/composables/useDiscogs';
import useSettings from '@/composables/useSettings';

import { IonItem, IonSpinner } from '@ionic/vue'

const emit = defineEmits(['addGameHistory'])

const { selectedAlbum } = useDiscogs()
const { refreshSettings, hardMode } = useSettings()

const GAME_INIT = { step: 5, blurLevel: "20px" }

const gameStep = ref<GameStep>(GAME_INIT)
const points = ref<number>(0)
const albumGuess = ref<string>('')
const artistGuess = ref<string>('')
const albumCorrect = ref<boolean>(false)
const artistCorrect = ref<boolean>(false)

const blurStyling = computed(() => {
  return "filter: blur(" + gameStep.value.blurLevel + ")"
})

//Assigns gameStep state to next step values
function nextStep() {
  if (gameStep.value.step > 0) {
    gameStep.value = { step: gameStep.value.step - 1, blurLevel: `${(gameStep.value.step - 1) * 4}px` }
  }
}

//Sets state for new game
function newGame() {
  gameStep.value = GAME_INIT
  refreshSettings()
  points.value = 0
  albumCorrect.value = false
  artistCorrect.value = false
}

// Handles state events based on state, including hard mode and non-hard mode handling
function handleGuessEntry() {
  if (!selectedAlbum.value) return

  //Handle hard-mode
  if (hardMode.value) {
    if (albumGuess.value.length || artistGuess.value.length) {
      if (normalizeString(albumGuess.value) === normalizeString(selectedAlbum.value.name) &&
        normalizeString(artistGuess.value) === normalizeString(selectedAlbum.value.artist)) {

        points.value = gameStep.value.step * 2
        emit('addGameHistory', {
          gameWon: true,
          gamePoints: points.value,
          gameAlbumName: selectedAlbum.value.name,
          gameArtistName: selectedAlbum.value.artist,
          gameBlurLevel: `${gameStep.value.step * 20}%`,
          gameType: 'hard',
          gameImage: selectedAlbum.value.image
        })
      }
      else {
        emit('addGameHistory', {
          gameWon: false,
          gamePoints: points.value,
          gameAlbumName: selectedAlbum.value.name,
          gameArtistName: selectedAlbum.value.artist,
          gameBlurLevel: `${gameStep.value.step * 20}%`,
          gameType: 'hard',
          gameImage: selectedAlbum.value.image
        })
      }
      newGame()
      albumGuess.value = ''
      artistGuess.value = ''

    } else if (gameStep.value.step === 1) {
      emit('addGameHistory', {
        gameWon: false,
        gamePoints: points.value,
        gameAlbumName: selectedAlbum.value.name,
        gameArtistName: selectedAlbum.value.artist,
        gameBlurLevel: `${gameStep.value.step * 20}%`,
        gameType: 'hard',
        gameImage: selectedAlbum.value.image
      })
      newGame()
    } else {
      nextStep()
    }
  }
  //Non-hard mode
  else {
    if (normalizeString(albumGuess.value) === normalizeString(selectedAlbum.value.name)) {
      if (!albumCorrect.value) {
        points.value += gameStep.value.step
        albumCorrect.value = true
      }
    }
    if (normalizeString(artistGuess.value) === normalizeString(selectedAlbum.value.artist)) {
      if (!artistCorrect.value) {
        points.value += gameStep.value.step
        artistCorrect.value = true
      }
    }
    if (albumCorrect.value && artistCorrect.value) {
      emit('addGameHistory', {
        gameWon: true,
        gamePoints: points.value,
        gameAlbumName: selectedAlbum.value.name,
        gameArtistName: selectedAlbum.value.artist,
        gameBlurLevel: `${gameStep.value.step * 20}%`,
        gameType: 'standard',
        gameImage: selectedAlbum.value.image

      })
      newGame()
    }
    else if (gameStep.value.step === 1) {
      emit('addGameHistory', {
        gameWon: false,
        gamePoints: points.value,
        gameAlbumName: selectedAlbum.value.name,
        gameArtistName: selectedAlbum.value.artist,
        gameBlurLevel: `${gameStep.value.step * 20}%`,
        gameType: 'standard',
        gameImage: selectedAlbum.value.image
      })
      newGame()
    }
    else {
      nextStep()
    }
  }
  albumGuess.value = ''
  artistGuess.value = ''
}

//Makes new game whenever hardMode is changed
watch(hardMode, () => {
  newGame()
  albumGuess.value = ''
  artistGuess.value = ''
})


</script>
<template>
  <div v-if="selectedAlbum">
    <div class="game-info">
      <div>Blur level: {{ gameStep.step * 20 }}%</div>
      <div v-if="!hardMode">Guesses remaining: {{ gameStep.step }}</div>
      <div v-else>Guesses remaining: 1</div>
    </div>

    <div class="image-container">
      <img class="main-image" :src="selectedAlbum.image" alt="Blurred" width="240" :style="blurStyling" />
      <!-- Above to be changed once data is fetched -->
    </div>

    <div class="genre-year">
      <div class="genre">Genre: {{ selectedAlbum.genre }}</div>
      <div class="year">Year: {{ selectedAlbum.year }}</div>
    </div>

    <div class="points">Points: {{ points }}</div>

    <div class="entry-forms">
      <form autocomplete="off" v-on:submit.prevent>
        Album Name:
        <input type="text" name="albumName" v-model="albumGuess" :disabled="albumCorrect" @keyup.enter="handleGuessEntry"
          :placeholder="albumCorrect ? selectedAlbum.name : ''" autofocus>
      </form>
      <form autocomplete="off" v-on:submit.prevent>
        Artist Name:
        <input type="text" name="artistName" v-model="artistGuess" :disabled="artistCorrect"
          @keyup.enter="handleGuessEntry">
      </form>
    </div>

    <div class="game-buttons">
      <div>
        <button @click="handleGuessEntry"
          :style="hardMode === true && (albumGuess.length || artistGuess.length) ? 'background: red' : ''">Guess</button>
      </div>

      <div>
        <button @click="newGame">New Game</button>
      </div>
    </div>
  </div>
  <!-- Show Spinner while album not selected -->
  <div v-else>
    <ion-item>
      <ion-spinner name="circles"></ion-spinner>
    </ion-item>
  </div>
</template>

<style scoped>
.game-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 10px 0;
}

.image-container {
  width: 240px;
  height: 240px;
  overflow: hidden;
  border: 2px solid white;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.genre-year {
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding-top: 5px;
}

.points {
  display: flex;
  justify-content: center;
  font-size: 20px;
  padding: 10px 0 10px 0;
}

.entry-forms {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.entry-forms input {
  border: none;
  outline: none;
}

.entry-forms input:disabled {
  background-color: rgb(94, 153, 36);
}

.entry-forms input::placeholder {
  color: white;
  font-weight: 600;
  opacity: 1;
}

.game-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding: 10px;
}

button {
  color: white;
  background-color: rgb(73, 73, 73);
  border-radius: 6px;
  border: 1px solid white;
  padding: 4px 14px;
  font-size: 16px;
  width: 150px;
  text-align-last: center;
  font-weight: 600;
}

button:hover {
  color: black;
  background-color: white;
  cursor: pointer;
}

button:active {
  color: white;
  background-color: black;
}

ion-spinner {
  width: 100px;
  height: 100px;
  margin-top: 120px;
}
</style>

