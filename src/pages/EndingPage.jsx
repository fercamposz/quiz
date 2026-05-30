import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import kuromiGif from '../assets/pixel/kuromigif.gif'
import premioJpg from '../assets/pixel/premio.jpg'
import starPink from '../assets/pixel/star.svg'

export default function EndingPage() {
  const navigate = useNavigate()
  const { resetGame } = useGameStore()

  /* Reinicia todo o progresso salvo e volta para a tela inicial do jogo. */
  function playAgain() {
    resetGame()
    navigate('/')
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#ffd1e4] px-4 py-8 font-mono text-[#35112f] select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,.95)_0_8%,transparent_9%),radial-gradient(circle_at_76%_18%,rgba(255,255,255,.9)_0_7%,transparent_8%),linear-gradient(#ffd1e4,#fbcfe8)]" />
      <div className="absolute bottom-0 h-1/4 w-full border-t-8 border-[#86efac] bg-gradient-to-b from-[#4ade80] to-[#15803d]" />
      <motion.img src={kuromiGif} alt="" animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }} className="absolute bottom-16 left-3 w-24 drop-shadow-xl sm:left-10 sm:w-36 md:left-24" />
      <motion.img src={kuromiGif} alt="" animate={{ y: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 2.6, delay: 0.3, ease: 'easeInOut' }} className="absolute bottom-20 right-3 w-24 scale-x-[-1] drop-shadow-xl sm:right-10 sm:w-36 md:right-24" />
      <motion.section initial={{ opacity: 0, scale: 0.84 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.45 }} className="relative z-10 flex w-full max-w-3xl flex-col items-center border-[8px] border-[#2a1028] bg-white p-6 text-center shadow-[10px_10px_0_#f9a8d4]">
        <div className="absolute -top-6 flex gap-1">{[0, 1, 2].map((item) => <img key={item} src={starPink} alt="" className="h-10 w-10" />)}</div>
        {/* Mostra o premio final desbloqueado depois que a palavra-chave abre o portal. */}
        <motion.div animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 2.2 }} className="relative mt-5 flex w-full max-w-sm items-center justify-center">
          <motion.span animate={{ scale: [1, 2, 1], opacity: [0.2, 0.9, 0.2] }} transition={{ repeat: Infinity, duration: 1.2 }} className="absolute h-full w-full bg-[#f9a8d4]/60 blur-xl" />
          <img src={premioJpg} alt="Premio final desbloqueado" className="relative max-h-72 w-full border-4 border-[#2a1028] object-contain shadow-[6px_6px_0_#831843]" />
        </motion.div>
        <h1 className="mt-3 text-4xl font-black uppercase leading-none tracking-widest text-[#db2777] sm:text-6xl md:text-7xl" style={{ textShadow: '3px 3px 0 #fbcfe8' }}>Premio aberto</h1>
        <div className="relative mt-7 max-w-xl border-4 border-[#b6b6b6] bg-[#fff1f7] p-5 text-base font-black leading-7 shadow-[6px_6px_0_#f9a8d4] sm:text-lg">
          <div className="absolute -bottom-5 left-14 h-5 w-10 border-b-4 border-l-4 border-[#b6b6b6] bg-[#fff1f7]" />
          Voce encontrou o certificado de mestre do tesouro. Todas as fases foram vencidas e a palavra-chave abriu o bau final.
        </div>
        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <button onClick={() => navigate('/map')} className="w-full border-4 border-[#2a1028] bg-white px-5 py-4 text-sm font-black uppercase tracking-widest text-[#db2777] shadow-[4px_4px_0_#f9a8d4] transition-transform active:translate-y-1">Mapa</button>
          <button onClick={playAgain} className="w-full border-4 border-[#2a1028] bg-[#ec4899] px-5 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[4px_4px_0_#831843] transition-transform active:translate-y-1">Novo jogo</button>
        </div>
      </motion.section>
    </main>
  )
}
