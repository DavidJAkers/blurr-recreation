<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'HowtoPlayModal'
  })
</script>

<template>
  <h2>How to Play</h2>
    <h3>Guess the Album Based on the Blurred Image</h3>
    <p>Each guess will get progressively easier, but will also reward less points. 
      To get the maximum points, guess the album name and artist first try. 
      If you don't have a guess, you can press 'Guess' anyways, and it will move on to the next stage.</p>
    <h3>Guess both the Album Name and Artist to Win</h3>
    <p>If you can guess the name and artist of the album before you run out of guesses, you win. 
      If you don't guess both, you lose.</p>
    <h3>Change the Genre and Decade of the Chosen Album</h3>
    <p>By default, the album will be chosen among all genre's and decades. 
      You can choose the genre and decade to your liking using the drop-down menu's at the top of the page. </p>
    <h3>See your Game Statistics and Change your Game Settings with the Menu</h3>
    <p>With the menu icons in the top right, you can see your statistics and change your settings,
      including a dev mode to see the answers, and a hard mode, which reduces your number of guesses down to one.
      In hard mode, you can still lower the blur level by pressing 'Guess'.
    </p>
</template>

<style scoped>
  h3 {
    font-weight: 600;
    font-size: 18px;
    padding-top: 5px;
  }
  p {
    font-size: 16px;
    color: #dfdfdf;
  }
</style>