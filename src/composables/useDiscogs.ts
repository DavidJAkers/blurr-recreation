import { readonly, ref } from 'vue'
import { type ResponseData } from '@/types/ResponseData'
import { genres, type Genre } from '@/types/Genre'
import { decades, type Decade } from '@/types/Decade'
import type { AlbumData } from '@/types/AlbumData'

import getYear from './getYear'

const FETCH_COUNT = 9

const selected_album = ref<AlbumData | null>(null)
const error = ref<Error | null>(null)

export default function useDiscogs() {
  const getRandomGenre = () => {
    const genre_index = Math.floor(Math.random() * genres.length)
    return genres[genre_index]
  }

  const getRandomDecade = () => {
    const decade_index = Math.floor(Math.random() * decades.length)
    return decades[decade_index]
  }

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

  const getAlbumDataFromResponse = (data: ResponseData[], genre: Genre, year: number) => {
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

  const fetchAlbums = async (genre: Genre, year: number) => {
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

    return queried_data.results as ResponseData[]
  }

  /**
   * Loads a new album into `selected_album`. If any option is not specified
   * it is chosen randomly from all its options.
   *
   * @param options fetch options
   */
  const refreshAlbum = async (options: { genre?: Genre; decade?: Decade } = {}) => {
    let { genre, decade } = options

    if (!genre) genre = getRandomGenre()
    if (!decade) decade = getRandomDecade()

    // Get year from decade
    const year = getYear(decade)

    try {
      const responseData = await fetchAlbums(genre, year)
      selected_album.value = getAlbumDataFromResponse(responseData, genre, year)
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

    getRandomDecade,
    getRandomGenre,
    refreshAlbum
  }
}
