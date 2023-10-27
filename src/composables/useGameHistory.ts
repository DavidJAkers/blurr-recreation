import { ref } from 'vue'

type GameHistory = {
  gameWon: boolean
  gamePoints: number
  gameAlbumName: string
  gameArtistName: string
  gameBlurAmount: string
  gameType: string
  gameImage: string
}

const gameHistory = ref<GameHistory[]>([])

export default function useGameHistory() {
  let lastGame = null
  if (gameHistory.value.length) {
    lastGame = gameHistory.value[gameHistory.value.length - 1]
  }

  //push new game to gameHistory
  function addGameHistory(game: GameHistory) {
    gameHistory.value.push(game)
  }

  //calculates and returns 4 values based on gameHistory, played: # of games played, won: # of games won, streak: longest win streak in
  // game history, and winPercent: % of games won
  function calculateStats() {
    let gamesPlayed = 0
    let gamesWon = 0
    let winStreak = 0
    let maxStreak = 0

    for (let i = gameHistory.value.length - 1; i >= 0; i--) {
      gamesPlayed += 1
      if (gameHistory.value[i].gameWon) {
        gamesWon += 1
        winStreak += 1
        if (winStreak > maxStreak) {
          maxStreak = winStreak
        }
      } else {
        winStreak = 0
      }
    }

    return {
      played: gamesPlayed,
      won: gamesWon,
      streak: maxStreak,
      winPercent: Math.floor((gamesWon / gamesPlayed) * 100)
    }
  }

  return {
    gameHistory,
    lastGame,

    calculateStats,
    addGameHistory
  }
}
