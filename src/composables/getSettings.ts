//import { ref } from 'vue' 
import { type Genre} from '@/types/Genre'
import { type Decade} from '@/types/Decade'


const getSettings = (genre_list: Genre[], decade_list: Decade[]) => {
  const genre_index = Math.floor(Math.random() * genre_list.length)
  const decade_index = Math.floor(Math.random() * decade_list.length)

  const genre_val = genre_list[genre_index]
  const decade_val = decade_list[decade_index]
  const fetch_index_val = Math.floor(Math.random() * 9)
  return { genre_val, decade_val, fetch_index_val }
}

export default getSettings