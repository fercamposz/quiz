import { motion } from 'framer-motion'
import starPink from '../assets/pixel/star.svg'

export default function LoadingScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#17091d] font-mono text-[#35112f]">
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="border-[6px] border-white bg-[#fff1f7] p-8 text-center shadow-[8px_8px_0_#831843]">
        <img src={starPink} alt="" className="mx-auto mb-4 h-16 w-16" />
        <h1 className="text-sm font-black uppercase leading-8 tracking-widest">Carregando</h1>
      </motion.div>
    </main>
  )
}
