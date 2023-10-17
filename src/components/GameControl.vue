<script setup lang="ts">
import { computed, ref, watchEffect, watch } from 'vue';
import type { AlbumData } from '@/types/AlbumData';
import type { GameStep } from '@/types/GameStep';
import normalizeString from '@/composables/normalizeString'

const props = defineProps<{selected_album: AlbumData; refreshSettings: Function; addGameHistory: Function; hard_mode: boolean}>()

const {refreshSettings, addGameHistory} = props
const selected_album = computed(() => {
  return props.selected_album
})
const hard_mode = computed(() => {
  return props.hard_mode
})
const game_init = { step: 5, blurlevel: "20px"}
const gameStep = ref<GameStep>(game_init)
const points = ref<number>(0)
const album_guess = ref<string>('')
const artist_guess = ref<string>('')
const album_correct = ref<boolean>(false)
const artist_correct = ref<boolean>(false)

const blur_styling = computed(() => {
  return "filter: blur(" + gameStep.value.blurlevel + ")"
})

watchEffect(()=> console.log('Hard mode in game-control', hard_mode.value))

const nextStep = () => {
  if (gameStep.value.step > 0) {
    gameStep.value = {step: gameStep.value.step - 1, blurlevel: `${(gameStep.value.step - 1) * 4}px`}
  }
}

const newGame = () => {
  gameStep.value = game_init
  refreshSettings()
  points.value = 0
  album_correct.value = false
  artist_correct.value = false
}

watch(hard_mode, () => {
      newGame()
      album_guess.value = ''
      artist_guess.value = ''
    })

const handleGuessEntry = () => {
  //Handle hard-mode
  if (hard_mode.value === true) {
    if (album_guess.value.length || artist_guess.value.length) {
      if (normalizeString(album_guess.value) === normalizeString(selected_album.value.name) &&
      normalizeString(artist_guess.value) === normalizeString(selected_album.value.artist)) {

          points.value = gameStep.value.step * 2
        addGameHistory({
          game_won: true,
          game_points: points.value,
          game_album_name: selected_album.value.name,
          game_artist_name: selected_album.value.artist,
          game_blur_level: `${gameStep.value.step * 20}%`,
          game_type: 'hard',
          game_image: selected_album.value.image
        })
      }
      else {
        addGameHistory( {
          game_won: false,
          game_points: points.value,
          game_album_name: selected_album.value.name,
          game_artist_name: selected_album.value.artist,
          game_blur_level: `${gameStep.value.step * 20}%`,
          game_type: 'hard',
          game_image: selected_album.value.image
        })
      }
      newGame()
      album_guess.value = ''
      artist_guess.value = ''

    } else if (gameStep.value.step === 1){
      addGameHistory( {
          game_won: false,
          game_points: points.value,
          game_album_name: selected_album.value.name,
          game_artist_name: selected_album.value.artist,
          game_blur_level: `${gameStep.value.step * 20}%`,
          game_type: 'hard',
          game_image: selected_album.value.image
        })
        newGame()
    } else {
      nextStep()
    }
  }
  else {
  if (normalizeString(album_guess.value) === normalizeString(selected_album.value.name)) {
    if (album_correct.value === false) {
      points.value += gameStep.value.step
      album_correct.value = true
    }
  }
  if (normalizeString(artist_guess.value) === normalizeString(selected_album.value.artist)) {
    if (artist_correct.value === false) {
      points.value += gameStep.value.step
      artist_correct.value = true
    }
  }
  if (album_correct.value === true && artist_correct.value === true) {
    addGameHistory({
      game_won: true,
      game_points: points.value,
      game_album_name: selected_album.value.name,
      game_artist_name: selected_album.value.artist,
      game_blur_level: `${gameStep.value.step * 20}%`,
      game_type: 'standard',
      game_image: selected_album.value.image

    })
    newGame()
  }
  else if (gameStep.value.step === 1) {
    addGameHistory({
      game_won: false,
      game_points: points.value,
      game_album_name: selected_album.value.name,
      game_artist_name: selected_album.value.artist,
      game_blur_level: `${gameStep.value.step * 20}%`,
      game_type: 'standard',
      game_image: selected_album.value.image
    })
    newGame()
  }
  else {
    nextStep()
  }
}
  album_guess.value = ''
  artist_guess.value = ''
}

    
</script>
<template>
  <div class="game-info">
    <div>Blur level: {{ gameStep.step * 20 }}%</div>
    <div v-if="!hard_mode">Guesses remaining: {{ gameStep.step }}</div>
    <div v-else>Guesses remaining: 1</div>
  </div>
  <div class="image-container">
    <img class="main-image" :src="selected_album.image" alt="Blurred" width="240" :style="blur_styling" />  
    <!-- Above to be changed once data is fetched -->
  </div>
  <div class="genre-year">
    <div class="genre">Genre: {{ selected_album.genre }}</div>
    <div class="year">Year: {{ selected_album.year }}</div>
  </div>
  <div class="points">Points: {{ points }}</div>
  <div class="entry-forms">
    <form autocomplete="off" v-on:submit.prevent>
      Album Name: 
      <input type="text" name="album_name" v-model="album_guess" :disabled="album_correct" @keyup.enter="handleGuessEntry" :placeholder="album_correct ?selected_album.name : ''" autofocus>
    </form>
    <form autocomplete="off" v-on:submit.prevent>
      Artist Name: 
      <input type="text" name="artist_name" v-model="artist_guess" :disabled="artist_correct" @keyup.enter="handleGuessEntry">
    </form>
  </div>
  <div class="game-buttons">
    <div>
      <button @click="handleGuessEntry" :style="hard_mode === true && (album_guess.length || artist_guess.length) ? 'background: red' : ''">Guess</button>
    </div>
    <div>
      <button @click="newGame">New Game</button>
    </div>
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
}
  button:active {
    color: white;
    background-color: black;
  }
</style>

