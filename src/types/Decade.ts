const decades = ["1980's", "1990's", "2000's", "2010's", "2020's"] as const

type Decade = typeof decades[number]

export {type Decade} 