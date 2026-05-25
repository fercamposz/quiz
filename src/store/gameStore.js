import { create } from 'zustand'

const saved = JSON.parse(
  localStorage.getItem('treasure-game')
)

export const useGameStore = create((set) => ({

  unlocked:
    saved?.unlocked || [1],

  clues:
    saved?.clues || [],

  solvedQuiz:
    saved?.solvedQuiz || [],

  hearts:
    saved?.hearts || 3,

  // =========================
  // DESBLOQUEAR
  // =========================

  unlockPoint: (id) =>

    set((state) => {

      const updated = {

        ...state,

        unlocked: [
          ...new Set([
            ...state.unlocked,
            id
          ])
        ]

      }

      localStorage.setItem(
        'treasure-game',
        JSON.stringify(updated)
      )

      return updated

    }),

  // =========================
  // PISTAS
  // =========================

  addClue: (clue) =>

    set((state) => {

      const updated = {

        ...state,

        clues: [
          ...state.clues,
          clue
        ]

      }

      localStorage.setItem(
        'treasure-game',
        JSON.stringify(updated)
      )

      return updated

    }),

  // =========================
  // QUIZ
  // =========================

  completeQuiz: (id) =>

    set((state) => {

      const updated = {

        ...state,

        solvedQuiz: [
          ...new Set([
            ...state.solvedQuiz,
            id
          ])
        ]

      }

      localStorage.setItem(
        'treasure-game',
        JSON.stringify(updated)
      )

      return updated

    }),

  // =========================
  // PERDER VIDA
  // =========================

  loseHeart: () =>

    set((state) => {

      const newHearts =
        state.hearts - 1

      const updated = {

        ...state,

        hearts:
          newHearts <= 0
            ? 0
            : newHearts

      }

      localStorage.setItem(
        'treasure-game',
        JSON.stringify(updated)
      )

      return updated

    }),

  // =========================
  // RESET
  // =========================

  resetGame: () => {

    const reset = {

      unlocked: [1],
      clues: [],
      solvedQuiz: [],
      hearts: 3

    }

    localStorage.setItem(
      'treasure-game',
      JSON.stringify(reset)
    )

    set(reset)

  }

}))