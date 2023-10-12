import {watchEffect, ref} from 'vue'

const fetchData = (fetch_url: string) => {
  const data = ref<Promise<any> | null>(null)
  const error =ref<string | null>(null)

  
  watchEffect(() => {
    console.log(fetch_url)

    const load = async() => {
      try {
        const data = await fetch(fetch_url, {headers: {Authorization: "Discogs key=SJdGocnZCcCymeDLaWgC, secret=hVVwFIdXbknmrXffmLCdvFUKiQSHaQvf"}})
        if (!data.ok) {
          throw Error('Fetch error')
        }
         return await data.json()

      } catch (err) {
        if (err instanceof Error) {
        error.value = err.message
        }
    }
  }
  data.value = load()

})
    return { data, error}
}

export default fetchData