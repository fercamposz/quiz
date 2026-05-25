import { motion } from 'framer-motion'
import heartSvg from '../assets/pixel/coracao.svg'

export default function GameOverModal({ onRestart }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#100716]/80 p-4 backdrop-blur-md">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-sm border-[6px] border-white bg-[#fff1f7] p-6 text-center text-[#35112f] shadow-[10px_10px_0_#831843]">
        <motion.img src={heartSvg} alt="" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} className="mx-auto mb-4 h-20 w-20 grayscale" />
        <h1 className="text-4xl font-black uppercase tracking-widest text-[#db2777]" style={{ textShadow: '2px 2px 0 #fff' }}>Game Over</h1>
        <p className="my-6 text-base font-bold leading-7">Voce perdeu todas as vidas. Reinicie para tentar de novo desde a primeira estrela.</p>
        <button onClick={onRestart} className="w-full border-4 border-white bg-[#ec4899] px-6 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[4px_4px_0_#831843] transition-transform active:translate-y-1">Jogar novamente</button>
      </motion.div>
    </div>
  )
}
