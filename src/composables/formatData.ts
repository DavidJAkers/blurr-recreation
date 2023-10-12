
import type { AlbumData } from "@/types/AlbumData"
import type { Genre } from "@/types/Genre"
import type { ResponseData } from "@/types/ResponseData"

const formatData = (data: ResponseData[], fetch_index: number, genre: Genre, year: number) => {
  // Fetch returns title as artist - album title, this splits it into two strings
  const album_artist = data[fetch_index].title.split("-")

  const album_data: AlbumData = {
    name: album_artist[1],
    artist: album_artist[0],
    year: year,
    genre: genre,
    image: data[fetch_index].cover_image
  }
  
  return { album_data }
}

export default formatData