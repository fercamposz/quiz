import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { finalPassword } from '../data/treasures'
import starPink from '../assets/pixel/star.svg'
import heartSvg from '../assets/pixel/coracao.svg'

export default function InventoryPage() {
  const navigate = useNavigate()
  const { clues, solvedQuiz } = useGameStore()
  const passwordUnlocked = solvedQuiz.includes(10)

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#ffd1e4] px-4 py-6 font-mono text-[#35112f] select-none sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,.95)_0_8%,transparent_9%),radial-gradient(circle_at_76%_18%,rgba(255,255,255,.9)_0_7%,transparent_8%),linear-gradient(#ffd1e4,#fbcfe8)]" />
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl flex-col">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button onClick={() => navigate('/map')} className="w-full border-4 border-[#2a1028] bg-white px-5 py-3 text-sm font-black uppercase tracking-widest text-[#db2777] shadow-[4px_4px_0_#f9a8d4] transition-transform active:translate-y-1 sm:w-auto">Voltar</button>
          <div className="relative border-4 border-[#2a1028] bg-white px-6 py-4 text-center shadow-[6px_6px_0_#f9a8d4]">
            <div className="absolute -top-5 left-1/2 flex -translate-x-1/2 gap-1">{[0, 1, 2].map((item) => <img key={item} src={starPink} alt="" className="h-8 w-8" />)}</div>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-widest text-[#db2777] sm:text-4xl" style={{ textShadow: '2px 2px 0 #fbcfe8' }}>Inventario</h1>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.24em] text-[#831843]">{solvedQuiz.length} pistas encontradas</p>
          </div>
        </header>
        <div className="mb-5 border-4 border-[#b6b6b6] bg-white p-4 shadow-[5px_5px_0_#f9a8d4]">
          <div className="flex items-center gap-4">
            <motion.img src={heartSvg} alt="" animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="h-14 w-14" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#be185d]">Bolsa de pistas</p>
              <p className="text-sm font-bold leading-6">{passwordUnlocked ? `A senha ${finalPassword} esta guardada. O portal ja pode abrir.` : 'Leia as pistas em ordem para descobrir a palavra final.'}</p>
            </div>
          </div>
        </div>
        <div className="grid flex-1 gap-4 sm:grid-cols-2">
          {clues.length === 0 ? (
            <div className="col-span-full flex min-h-[360px] flex-col items-center justify-center border-[6px] border-[#2a1028] bg-white p-8 text-center shadow-[8px_8px_0_#f9a8d4]">
              <img src={starPink} alt="" className="mb-5 h-24 w-24 opacity-60 grayscale" />
              <p className="max-w-sm text-base font-black leading-7 sm:text-lg">Nenhuma pista foi desbloqueada ainda. Volte ao mapa e venca o primeiro desafio.</p>
            </div>
          ) : (
            clues.map((clue, index) => (
              <motion.article key={clue.id} initial={{ opacity: 0, y: 18, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} whileHover={{ y: -4, rotate: index % 2 ? 1 : -1 }} transition={{ delay: index * 0.04 }} className="relative flex gap-4 border-4 border-[#b6b6b6] bg-white p-4 shadow-[6px_6px_0_#f9a8d4]">
                <div className="absolute -bottom-4 left-10 h-4 w-7 border-b-4 border-l-4 border-[#b6b6b6] bg-white" />
                <div className="flex h-16 w-16 shrink-0 items-center justify-center border-4 border-[#2a1028] bg-[#fff1f7]">
                  <img src={clue.id === 10 ? heartSvg : starPink} alt="" className="h-10 w-10" />
                </div>
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-[#be185d]">Pista {index + 1}</p>
                  <p className="text-sm font-bold leading-6 sm:text-base">{clue.clue}</p>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
