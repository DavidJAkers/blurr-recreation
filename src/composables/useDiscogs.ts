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

const selectedAlbum = ref<AlbumData | null>(null)
const error = ref<Error | null>(null)

export default function useDiscogs() {
  function getFetchUrl(genre: Genre, year: number) {
    const url = new URL('https://api.discogs.com/database/search')
    url.searchParams.set('type', 'master')
    url.searchParams.set('genre', genre)
    url.searchParams.set('year', year.toString())
    url.searchParams.set('per_page', `${FETCH_COUNT}`)
    url.searchParams.set('page', '1')
    return url
  }

  function formatAlbumData(data: ResponseData[], genre: Genre, year: number) {
    const fetchIndex = Math.floor(Math.random() * FETCH_COUNT)

    // Fetch returns title as artist - album title, this splits it into two strings
    const albumArtist = data[fetchIndex].title.split('-')

    const albumData: AlbumData = {
      name: albumArtist[1],
      artist: albumArtist[0],
      year: year,
      genre: genre,
      image: data[fetchIndex].cover_image
    }

    return albumData
  }

  async function fetchAlbum(genre: Genre, decade: Decade) {
    try {
      // Get year from decade
      const year = getYear(decade)

      const fetchUrl = getFetchUrl(genre, year)
      const response = await fetch(fetchUrl, {
        headers: {
          Authorization: 'Discogs key=SJdGocnZCcCymeDLaWgC, secret=hVVwFIdXbknmrXffmLCdvFUKiQSHaQvf'
        }
      })
      if (!response.ok) {
        throw Error('Error retrieving album data')
      }

      const queriedData = await response.json()
      const responseData = queriedData.results as ResponseData[]
      selectedAlbum.value = formatAlbumData(responseData, genre, year)
    } catch (err) {
      if (err instanceof Error) {
        error.value = err
        console.error(err)
      }
    }
  }

  return {
    selectedAlbum: readonly(selectedAlbum),
    error: readonly(error),

    fetchAlbum
  }
}
