import { ref } from 'vue'

import { genres, type Genre } from '../types/Genre'
import { decades, type Decade } from '../types/Decade'

import useDiscogs from './useDiscogs'

const genre = ref<Genre | undefined>()
const decade = ref<Decade | undefined>()

export default function useSettings() {
  const { fetchAlbum } = useDiscogs()

  const getRandomGenre = () => {
    const genre_index = Math.floor(Math.random() * genres.length)
    return genres[genre_index]
  }

  const getRandomDecade = () => {
    const decade_index = Math.floor(Math.random() * decades.length)
    return decades[decade_index]
  }

  //options optional, if genre provided, set to genre, if decade provided, set to decade
  const refreshSettings = async (options?: { genre?: Genre; decade?: Decade }) => {
    decade.value = options?.decade ?? getRandomDecade()
    genre.value = options?.genre ?? getRandomGenre()
    await fetchAlbum(genre.value, decade.value)
  }

  return {
    genre,
    decade,

    refreshSettings
  }
}
