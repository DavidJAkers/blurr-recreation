<script lang="ts">
import { defineComponent, watchEffect, computed } from 'vue';
import type { PropType } from 'vue'
import type { Genre } from '@/types/Genre';

export default defineComponent ({
  props: {
    genre: {
      required: true,
      type: String as PropType<Genre>
    },
    year: {
      required: true,
      type: Number
    },
    fetch_index: {
      required: true,
      type: Number
    }
  },
  setup(props) {
    const fetch_url = computed(() => {
      return 'https://api.discogs.com/database/search?type=master&genre=' + props.genre + '&year=' + props.year + '&per_page=9&page=1'})

    watchEffect((() => {
      console.log(fetch_url.value)
    }))
  }
})

</script>
<template>
  <h1> Props - {{ genre }} - {{ year }} - {{ fetch_index }} </h1>
</template>


