<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import type { PropType } from 'vue'
import type { AlbumData } from '@/types/AlbumData';
import type { GameStep } from '@/types/GameStep';


export default defineComponent ({
  name: 'GameControl',
  props: {
    selected_album: {
      required: true,
      type: Object as PropType<AlbumData>
    },
    refreshSettings: {
      required: true,
      type: Function
    }
  },
  setup(props) {
    const game_init = { step: 5, blurlevel: "25px"}
    const gameStep = ref<GameStep>(game_init)
    const points = ref<number>(0)
    const album_guess = ref<string>('')
    const artist_guess = ref<string>('')
    const album_correct = ref<boolean>(false)
    const artist_correct = ref<boolean>(false)


    const blur_styling = computed(() => {
      return "filter: blur(" + gameStep.value.blurlevel + ")"
    })

    const nextStep = () => {
      if (gameStep.value.step > 0) {
        gameStep.value = {step: gameStep.value.step - 1, blurlevel: `${(gameStep.value.step - 1) * 5}px`}
      }
    }

    const newGame = () => {
      gameStep.value = game_init
      props.refreshSettings()
    }

    const normalizeString = (str: string): string => {
      const str_no_innerspaces = str.replace(/\s+/g, "")
      const str_no_outerspaces = str_no_innerspaces.trim()
      const str_upper = str_no_outerspaces.toUpperCase()
      return str_upper
    }
    

    return { gameStep, nextStep, blur_styling, points, album_guess, artist_guess, newGame, album_correct, artist_correct, }
  }
})

</script>
<template>
  <div class="game-info">
    <div>Blur level: {{ gameStep.step * 20 }}%</div>
    <div>Guesses remaining: {{ gameStep.step }}</div>
  </div>
  <div class="image-container">
    <img class="main-image" src="@/assets/mj.jpg" alt="Blurred" width="240" :style="blur_styling" />  
    <!-- Above to be changed once data is fetched -->
  </div>
  <div class="genre-year">
    <div class="genre">Genre: {{ selected_album.genre }}</div>
    <div class="year">Year: {{ selected_album.year }}</div>
  </div>
  <div class="points">Points: {{ points }}</div>
  <div class="entry-forms">
    <form>
      Album Name: 
      <input type="text" name="album_name" v-model="album_guess" :disabled="album_correct">
    </form>
    <form>
      Artist Name: 
      <input type="text" name="artist_name" v-model="artist_guess" :disabled="artist_correct">
    </form>
  </div>
  <div class="game-buttons">
    <div>
      <button @click="nextStep">Guess</button>
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
  padding: 5px 0 15px 0;
}
.image-container {
  width: 240px;
  height: 240px;
  overflow: hidden;
  border: 2px solid;
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
input:disabled {
  background-color: rgb(94, 153, 36);
  color: linen;
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

