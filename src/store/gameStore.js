import { create } from 'zustand'

const scrambleOrder = [4, 1, 8, 3, 10, 6, 2, 9, 5, 7]
const initialGame = { unlocked: [1], clues: [], solvedQuiz: [], hearts: 3, letterOrder: [] }
const saved = JSON.parse(localStorage.getItem('treasure-game') || 'null')
const persist = (state) => localStorage.setItem('treasure-game', JSON.stringify({ unlocked: state.unlocked, clues: state.clues, solvedQuiz: state.solvedQuiz, hearts: state.hearts, letterOrder: state.letterOrder }))

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
    const nextClues = [...state.clues, clue]
    const nextOrder = [...new Set([...(state.letterOrder || []), clue.id])].sort((a, b) => scrambleOrder.indexOf(a) - scrambleOrder.indexOf(b))
    const updated = { ...state, clues: nextClues, letterOrder: nextOrder }
    persist(updated)
    return updated
  }),
  setLetterOrder: (letterOrder) => set((state) => {
    const updated = { ...state, letterOrder }
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
