import { ref } from 'vue'
import { type ResponseData } from '@/types/ResponseData'

const fetchData = async (fetch_url: URL) => {
  const data = ref<ResponseData[] | null>(null)
  const fetch_error = ref<Error | null>(null)
  const controller = new AbortController()
  
  try {
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
    data.value = queried_data.results
  } catch (err) {
    if (err instanceof Error) {
      fetch_error.value = err
      console.error(fetch_error.value)
    }
  } 

  return { data, fetch_error,}
}

export default fetchData