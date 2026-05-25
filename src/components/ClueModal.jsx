import { AnimatePresence, motion } from 'framer-motion'
import { finalPassword } from '../data/treasures'
import starPink from '../assets/pixel/star.svg'
import heartSvg from '../assets/pixel/coracao.svg'

export default function ClueModal({ clue, onClose }) {
  if (!clue) return null

  const isPrize = clue.id === 10

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#100716]/75 p-4 backdrop-blur-md">
        <motion.div initial={{ opacity: 0, scale: 0.82, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.82 }} transition={{ type: 'spring', bounce: 0.35 }} className="relative w-full max-w-md overflow-hidden border-[6px] border-[#2a1028] bg-white p-5 text-center text-[#35112f] shadow-[10px_10px_0_#f9a8d4] sm:p-6">
          <div className="absolute left-5 top-5 h-3 w-3 bg-[#f9a8d4]" />
          <div className="absolute right-7 top-12 h-2 w-2 bg-[#ec4899]" />
          <div className="absolute bottom-24 left-8 h-2 w-2 bg-[#f9a8d4]" />
          <motion.div animate={isPrize ? { rotate: [0, 180, 360], scale: [1, 1.45, 1.12] } : { y: [-5, 5, -5], rotate: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: isPrize ? 2 : 1.8 }} className="relative mx-auto mb-4 flex h-28 w-28 items-center justify-center">
            <motion.span animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.8, 0.2] }} transition={{ repeat: Infinity, duration: 1.4 }} className="absolute h-full w-full bg-[#f9a8d4]/50 blur-xl" />
            <img src={isPrize ? heartSvg : starPink} alt="" className="relative h-20 w-20 drop-shadow-lg" />
          </motion.div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#be185d]">{isPrize ? 'Premio encontrado' : 'Nova pista'}</p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-widest text-[#db2777]" style={{ textShadow: '2px 2px 0 #fbcfe8' }}>{isPrize ? 'Tesouro' : 'Liberada'}</h2>
          <div className="relative my-6 border-4 border-[#b6b6b6] bg-[#fff1f7] p-5 shadow-[6px_6px_0_#f9a8d4]">
            <div className="absolute -bottom-5 left-12 h-5 w-8 border-b-4 border-l-4 border-[#b6b6b6] bg-[#fff1f7]" />
            <p className="text-base font-black leading-7 sm:text-lg">{isPrize ? `Voce achou a ultima pista. A senha do portal foi revelada: ${finalPassword}.` : clue.clue}</p>
          </div>
          {isPrize && <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-5 grid grid-cols-7 gap-2">{finalPassword.split('').map((letter) => <span key={letter} className="border-4 border-[#2a1028] bg-[#f9a8d4] py-2 text-lg font-black text-white shadow-[3px_3px_0_#831843]">{letter}</span>)}</motion.div>}
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} onClick={onClose} className="w-full border-4 border-[#2a1028] bg-[#ec4899] py-4 text-base font-black uppercase tracking-widest text-white shadow-[4px_4px_0_#831843] transition-colors hover:bg-[#f472b6]">{isPrize ? 'Ir ao portal depois' : 'Continuar'}</motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
