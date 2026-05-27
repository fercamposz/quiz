import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { finalPassword } from '../data/treasures'
import starPink from '../assets/pixel/star.svg'
import heartSvg from '../assets/pixel/coracao.svg'

function getLetter(clue) {
  return clue.letter || finalPassword[clue.id - 1] || '?'
}

export default function FinalPuzzle() {
  const navigate = useNavigate()
  const { clues, letterOrder, solvedQuiz } = useGameStore()
  const [opening, setOpening] = useState(false)

  const orderedClues = useMemo(() => {
    const ids = clues.map((clue) => clue.id)
    return (letterOrder || []).filter((id) => ids.includes(id)).map((id) => clues.find((clue) => clue.id === id)).filter(Boolean)
  }, [clues, letterOrder])

  const assembledWord = orderedClues.map(getLetter).join('')
  const hasAllLetters = clues.length >= finalPassword.length
  const canOpen = hasAllLetters && assembledWord === finalPassword

  function openPortal() {
    if (!canOpen || opening) return
    setOpening(true)
    window.setTimeout(() => navigate('/ending'), 1800)
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#ffd1e4] px-4 py-8 font-mono text-[#35112f] select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,.95)_0_8%,transparent_9%),radial-gradient(circle_at_76%_18%,rgba(255,255,255,.9)_0_7%,transparent_8%),linear-gradient(#ffd1e4,#fbcfe8)]" />
      <motion.section initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-2xl border-[8px] border-[#2a1028] bg-white p-5 text-center shadow-[10px_10px_0_#f9a8d4] sm:p-7">
        <div className="absolute -top-6 left-1/2 flex -translate-x-1/2 gap-1">{[0, 1, 2].map((item) => <img key={item} src={starPink} alt="" className="h-10 w-10" />)}</div>
        <motion.div animate={opening ? { rotate: [0, 180, 360, 540], scale: [1, 1.4, 1.9, 14], opacity: [1, 1, 0.95, 0] } : { rotate: [0, 7, -7, 0], scale: [1, 1.08, 1] }} transition={{ repeat: opening ? 0 : Infinity, duration: opening ? 1.8 : 2 }} className="relative mx-auto mb-5 mt-5 flex h-28 w-28 items-center justify-center">
          <motion.span animate={{ scale: [1, 1.9, 1], opacity: [0.2, 0.8, 0.2] }} transition={{ repeat: Infinity, duration: 1.3 }} className="absolute h-full w-full bg-[#f9a8d4]/60 blur-xl" />
          <img src={canOpen ? starPink : heartSvg} alt="" className="relative h-24 w-24 drop-shadow-lg" />
        </motion.div>
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#be185d]">Portal final</p>
        <h1 className="mt-2 text-3xl font-black uppercase tracking-widest text-[#db2777] sm:text-5xl" style={{ textShadow: '2px 2px 0 #fbcfe8' }}>Abrir estrela</h1>
        <div className="mx-auto mt-6 max-w-xl border-4 border-[#b6b6b6] bg-[#fff1f7] p-5 shadow-[5px_5px_0_#f9a8d4]">
          <p className="text-sm font-black leading-7 sm:text-base">{canOpen ? 'A palavra-chave esta certinha. O portal reconheceu o brilho.' : hasAllLetters ? 'A palavra ainda esta fora de ordem. Volte ao inventario e arraste as letras.' : `Faltam ${finalPassword.length - clues.length} letras para o portal acordar.`}</p>
        </div>

        <div className="my-6 grid grid-cols-5 gap-2 sm:grid-cols-10">
          {Array.from({ length: finalPassword.length }).map((_, index) => (
            <span key={index} className={`flex aspect-square items-center justify-center border-4 text-xl font-black shadow-[3px_3px_0_#f9a8d4] sm:text-2xl ${orderedClues[index] ? 'border-[#2a1028] bg-[#f9a8d4] text-white' : 'border-[#b6b6b6] bg-[#fff1f7] text-[#f9a8d4]'}`}>
              {orderedClues[index] ? getLetter(orderedClues[index]) : ''}
            </span>
          ))}
        </div>

        <div className="mb-6 border-4 border-[#f9a8d4] bg-white p-3 text-xs font-bold uppercase tracking-[0.18em] text-[#831843]">
          {solvedQuiz.length}/{finalPassword.length} estrelas completas
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button onClick={() => navigate('/inventory')} className="w-full border-4 border-[#2a1028] bg-white px-5 py-4 text-sm font-black uppercase tracking-widest text-[#db2777] shadow-[4px_4px_0_#f9a8d4] transition-transform active:translate-y-1">Inventario</button>
          <button onClick={openPortal} disabled={!canOpen || opening} className="w-full border-4 border-[#2a1028] bg-[#ec4899] px-5 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[4px_4px_0_#831843] transition-all active:translate-y-1 disabled:cursor-not-allowed disabled:grayscale disabled:opacity-50">{opening ? 'Abrindo' : 'Abrir portal'}</button>
        </div>
      </motion.section>
    </main>
  )
}
