import { ref } from 'vue'

type GameHistory = {
  game_won: boolean
  game_points: number
  game_album_name: string
  game_artist_name: string
  game_blur_level: string
  game_type: string
  game_image: string
}

const game_history = ref<GameHistory[]>([])

export default function useGameHistory() {
  let last_game = null
  if (game_history.value.length) {
    last_game = game_history.value[game_history.value.length - 1]
  }

  //push new game to game_history
  const addGameHistory = (game: GameHistory) => {
    game_history.value.push(game)
  }

  //calculates and returns 4 values based on game_history, played: # of games played, won: # of games won, streak: longest win streak in
  // game history, and win_percent: % of games won
  const calculateStats = () => {
    let games_played = 0
    let games_won = 0
    let win_streak = 0
    let max_streak = 0

    for (let i = game_history.value.length - 1; i >= 0; i--) {
      games_played += 1
      if (game_history.value[i].game_won) {
        games_won += 1
        win_streak += 1
        if (win_streak > max_streak) {
          max_streak = win_streak
        }
      } else {
        win_streak = 0
      }
    }

    return {
      played: games_played,
      won: games_won,
      streak: max_streak,
      win_percent: Math.floor((games_won / games_played) * 100)
    }
  }

  return {
    game_history,
    last_game,

    calculateStats,
    addGameHistory
  }
}
