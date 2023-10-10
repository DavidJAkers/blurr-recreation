<script lang="ts">
import { defineComponent, watchEffect, ref } from 'vue';
import HeaderBar from './components/HeaderBar.vue'
import GameControl from './components/GameControl.vue'
import getSettings from './composables/getSettings'
import { type Genre} from './types/Genre'
import { type Decade } from './types/Decade'
import getYear from './composables/getYear';

export default defineComponent({
  name: 'App',
  components: { HeaderBar, GameControl },
  setup() {

    const genre_list = ["Pop", "Rock", "Electronic"] as Genre[]
    const decade_list = ["1980's", "1990's", "2000's", "2010's", "2020's"] as Decade[]


    const { genre, decade, fetch_index } = getSettings(genre_list, decade_list)

    const year = ref<number | null>(null)
    //calculates and assigns year value for the decade whenever decade updates and on load
    watchEffect(() => {
      if (decade.value) year.value = (getYear(decade.value))
      console.log(year.value)
    } )
    
    return {genre, decade, genre_list, decade_list, fetch_index, year}
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
    <select v-model="genre">
      <option v-for="(genre, index) in genre_list" :key="index">{{ genre }}</option>
    </select>
    <select v-model="decade">
      <option v-for="(decade, index) in decade_list" :key="index">{{ decade }}</option>
    </select>
  </div>
    <GameControl v-if="genre !== null && year !== null && fetch_index !== null" :genre="genre" :year="year" :fetch_index="fetch_index"/>
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
