const genres = ["Pop", "Rock", "Electronic"] as const

type Genre = typeof genres[number]

export {type Genre, genres} 