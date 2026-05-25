import { motion } from 'framer-motion'
import starPink from '../assets/pixel/star.svg'

export default function CompletedModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#100716]/75 p-4 backdrop-blur-md">
      <motion.div initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm border-[6px] border-white bg-[#fff1f7] p-6 text-center text-[#35112f] shadow-[10px_10px_0_#9d174d]">
        <motion.img src={starPink} alt="" animate={{ rotate: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 1.5 }} className="mx-auto mb-4 h-20 w-20" />
        <h2 className="text-3xl font-black uppercase tracking-widest text-[#db2777]" style={{ textShadow: '2px 2px 0 #fff' }}>Completo</h2>
        <p className="my-5 text-base font-bold leading-7">Esta estrela ja foi concluida. Escolha outra fase no mapa.</p>
        <button onClick={onClose} className="w-full border-4 border-white bg-[#ec4899] py-4 text-sm font-black uppercase tracking-widest text-white shadow-[4px_4px_0_#831843] transition-transform active:translate-y-1">Fechar</button>
      </motion.div>
    </div>
  )
}
