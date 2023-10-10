import { ref } from 'vue' 
import { type Genre} from '@/types/Genre'
import { type Decade} from '@/types/Decade'


const getSettings = (genre_list: Genre[], decade_list: Decade[]) => {
  const genre = ref<Genre | null>(null)
  const decade = ref<Decade | null>(null)
  const fetch_index = ref<number | null>(null)

  const genre_index = Math.floor(Math.random() * genre_list.length)
  const decade_index = Math.floor(Math.random() * decade_list.length)

  genre.value = genre_list[genre_index]
  decade.value = decade_list[decade_index]
  fetch_index.value = Math.floor(Math.random() * 8)
  return { genre, decade, fetch_index }
}

export default getSettings