<script lang="ts">
import { defineComponent, watchEffect, ref, computed,} from 'vue';
import HeaderBar from './components/HeaderBar.vue'
import GameControl from './components/GameControl.vue'
import getSettings from './composables/getSettings'
import { type Genre} from './types/Genre'
import { type Decade } from './types/Decade'
import { type AlbumData} from './types/AlbumData'
import { type GameHistory } from './types/GameHistory';
import getYear from './composables/getYear';

export default defineComponent({
  name: 'App',
  components: { HeaderBar, GameControl },
  setup() {
    const genre = ref<Genre | null>(null)
    const decade = ref<Decade | null>(null)
    //const fetch_index = ref<number | null>(null)

    const genre_list = ["Pop", "Rock", "Electronic"] as Genre[]
    const decade_list = ["1980's", "1990's", "2000's", "2010's", "2020's"] as Decade[]
    const game_history = ref<GameHistory[]>([])

    const { genre_val, decade_val, /*fetch_index*/ } = getSettings(genre_list, decade_list)
    genre.value = genre_val
    decade.value = decade_val

    const year = ref<number | null>(null)
    //calculates and assigns year value for the decade whenever decade updates and on load
    watchEffect(() => {
      if (decade.value) year.value = (getYear(decade.value))
    } )
    
    const genre_selected = ref<boolean>(false)
    const decade_selected = ref<boolean>(false)

    const genreSelectChange = () => {
      genre_selected.value = true
    }
    const decadeSelectChange = () => {
      decade_selected.value = true
    }


    const refreshSettings = () => {
      const {genre_val, decade_val /*fetch_index_val*/} = getSettings(genre_list, decade_list)
      if (!genre_selected.value) genre.value = genre_val
      if (!decade_selected.value) decade.value = decade_val
      
      //Changes year even if decade is selected (and thus doesn't change on setting refresh)
      if ( decade_selected.value) {
        if (decade.value) year.value = getYear(decade.value)
      }
    }
    
    const fetch_url = computed(() => {
      return 'https://api.discogs.com/database/search?type=master&genre=' + genre.value + '&year=' + year.value + '&per_page=9&page=1'})

    watchEffect(() => {
      console.log(fetch_url.value)
      //will turn into data fetch from composable
    })

    const addGameHistory = (game: GameHistory) => {
      game_history.value.push(game)
    }

    watchEffect(() => {
      if (game_history.value.length) console.log(game_history.value)
    })

    const selected_album = ref<AlbumData | null>(null)

    selected_album.value = {name: 'Thriller', artist: 'Michael Jackson', year: 1982, genre: 'Pop', image: 'mj.jpg'}

    return { genre, decade, genre_list, decade_list, selected_album,
       refreshSettings, genre_selected, decade_selected, genreSelectChange, 
       decadeSelectChange, addGameHistory}

  },

  }
);
</script>
<template>
  <div class="main">
  <HeaderBar />
    <div class="setting-titles">
      <p>Genre</p>
      <p>Decade</p>
    </div>
    <div class="setting-select">
    <select v-model="genre" @change="genreSelectChange">
      <option v-for="(genre, index) in genre_list" :value="genre" :key="index">{{ genre }}</option>
    </select>
    <select v-model="decade" @change="decadeSelectChange">
      <option v-for="(decade, index) in decade_list" :key="index">{{ decade }}</option>
    </select>
  </div>
    <GameControl v-if="selected_album !== null" :selected_album="selected_album" :refreshSettings="refreshSettings" :addGameHistory="addGameHistory"/>
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
}
</style>
