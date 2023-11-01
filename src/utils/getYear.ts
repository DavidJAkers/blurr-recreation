import { type Decade } from '@/types/Decade'

export default function getYear(decade: Decade) {
  const parsed = parseFloat(decade)
  const currentYear = new Date().getFullYear()
  const decadeNums: number[] = []
  let yearIndex = null
  for (let i = parsed; i < parsed + 10; i++) {
    decadeNums.push(i)
  }
  if (parsed !== 2020) {
    yearIndex = Math.floor(Math.random() * 10)
  } else {
    yearIndex = Math.floor(Math.random() * ((currentYear % 10) + 1))
  }
  const year = decadeNums[yearIndex]

  return year
}
