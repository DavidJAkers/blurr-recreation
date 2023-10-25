import { readonly, ref } from 'vue'
import { type Decade } from '@/types/Decade'
import { type Genre } from '@/types/Genre'
import { type ResponseData } from '@/types/ResponseData'

import getYear from '../utils/getYear'

type AlbumData = {
  name: string
  artist: string
  year: number
  genre: string
  image: string
}

const FETCH_COUNT = 9

const selected_album = ref<AlbumData | null>(null)
const error = ref<Error | null>(null)

export default function useDiscogs() {
  const get_fetch_url = (genre: Genre, year: number) => {
    const url = new URL('https://api.discogs.com/database/search')
    url.searchParams.set('type', 'master')
    url.searchParams.set('genre', genre)
    url.searchParams.set('year', year.toString())
    url.searchParams.set('per_page', `${FETCH_COUNT}`)
    url.searchParams.set('page', '1')
    return url
    //'?type=master&genre=' + genre.value + '&year=' + year.value + '&per_page=9&page=1'
  }

  const formatAlbumData = (data: ResponseData[], genre: Genre, year: number) => {
    const fetch_index = Math.floor(Math.random() * FETCH_COUNT)

    // Fetch returns title as artist - album title, this splits it into two strings
    const album_artist = data[fetch_index].title.split('-')

    const album_data: AlbumData = {
      name: album_artist[1],
      artist: album_artist[0],
      year: year,
      genre: genre,
      image: data[fetch_index].cover_image
    }

    return album_data
  }

  const fetchAlbum = async (genre: Genre, decade: Decade) => {
    try {
      // Get year from decade
      const year = getYear(decade)

      const controller = new AbortController()

      const fetch_url = get_fetch_url(genre, year)
      const response = await fetch(fetch_url, {
        headers: {
          Authorization: 'Discogs key=SJdGocnZCcCymeDLaWgC, secret=hVVwFIdXbknmrXffmLCdvFUKiQSHaQvf'
        },
        signal: controller.signal
      })
      if (!response.ok) {
        throw Error('Error retrieving album data')
      }

      const queried_data = await response.json()
      const responseData = queried_data.results as ResponseData[]
      selected_album.value = formatAlbumData(responseData, genre, year)
    } catch (err) {
      if (err instanceof Error) {
        error.value = err
        console.error(err)
      }
    }
  }

  return {
    selected_album: readonly(selected_album),
    error: readonly(error),

    fetchAlbum
  }
}
