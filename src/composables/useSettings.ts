import { ref } from 'vue'
import { decades, type Decade } from '../types/Decade'
import { genres, type Genre } from '../types/Genre'

import useDiscogs from './useDiscogs'

const genre = ref<Genre | undefined>()
const decade = ref<Decade | undefined>()
const devMode = ref<boolean>(false)
const hardMode = ref<boolean>(false)

export default function useSettings() {
  const { fetchAlbum } = useDiscogs()

  function toggleDevMode() {
    devMode.value = !devMode.value
  }

  function toggleHardMode() {
    hardMode.value = !hardMode.value
  }

  function getRandomGenre() {
    const genreIndex = Math.floor(Math.random() * genres.length)
    return genres[genreIndex]
  }

  function getRandomDecade() {
    const decadeIndex = Math.floor(Math.random() * decades.length)
    return decades[decadeIndex]
  }

  //options optional, if genre provided, set to genre, if decade provided, set to decade
  async function refreshSettings(options?: { genre?: Genre; decade?: Decade }) {
    decade.value = options?.decade ?? getRandomDecade()
    genre.value = options?.genre ?? getRandomGenre()
    await fetchAlbum(genre.value, decade.value)
  }

  return {
    genre,
    decade,
    devMode,
    hardMode,

    toggleDevMode,
    toggleHardMode,
    refreshSettings
  }
}
