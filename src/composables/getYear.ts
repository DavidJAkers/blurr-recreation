import { type Decade} from '@/types/Decade'

const getYear = (decade: Decade) => {
  const parsed = parseFloat(decade)
  const current_year = new Date().getFullYear()
  const decade_nums: number[] = []
  let year_index = null
  for (let i = parsed; i < parsed + 10; i++) {
    decade_nums.push(i)
  }
  if (parsed !== 2020) {
    year_index = Math.floor(Math.random() * 10)
  } else {
    year_index = Math.floor(Math.random() * ((current_year % 10) +1))
  }
  const year = decade_nums[year_index]

  return year
}

export default getYear