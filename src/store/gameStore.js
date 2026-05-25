import { create } from 'zustand'

const initialGame = { unlocked: [1], clues: [], solvedQuiz: [], hearts: 3 }
const saved = JSON.parse(localStorage.getItem('treasure-game') || 'null')
const persist = (state) => localStorage.setItem('treasure-game', JSON.stringify({ unlocked: state.unlocked, clues: state.clues, solvedQuiz: state.solvedQuiz, hearts: state.hearts }))

export const useGameStore = create((set) => ({
  ...initialGame,
  ...saved,
  unlockPoint: (id) => set((state) => {
    if (state.unlocked.includes(id)) return state
    const updated = { ...state, unlocked: [...state.unlocked, id] }
    persist(updated)
    return updated
  }),
  addClue: (clue) => set((state) => {
    if (state.clues.some((item) => item.id === clue.id)) return state
    const updated = { ...state, clues: [...state.clues, clue] }
    persist(updated)
    return updated
  }),
  completeQuiz: (id) => set((state) => {
    if (state.solvedQuiz.includes(id)) return state
    const updated = { ...state, solvedQuiz: [...state.solvedQuiz, id] }
    persist(updated)
    return updated
  }),
  loseHeart: () => {
    let nextHearts = 0
    set((state) => {
      nextHearts = Math.max(state.hearts - 1, 0)
      const updated = { ...state, hearts: nextHearts }
      persist(updated)
      return updated
    })
    return nextHearts
  },
  resetGame: () => {
    persist(initialGame)
    set(initialGame)
  }
}))
