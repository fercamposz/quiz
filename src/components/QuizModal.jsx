import { motion } from 'framer-motion'
import starPink from '../assets/pixel/star.svg'
import kuromiGif from '../assets/pixel/kuromigif.gif'

export default function QuizModal({ quiz, onAnswer }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#100716]/75 p-4 backdrop-blur-md">
      <motion.div initial={{ scale: 0.8, opacity: 0, y: 28 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: 'spring', bounce: 0.35 }} className="relative w-full max-w-md overflow-hidden border-[8px] border-[#2a1028] bg-white p-5 text-[#35112f] shadow-[10px_10px_0_#f9a8d4] sm:p-6">
        <div className="absolute -top-1 left-1/2 flex -translate-x-1/2 gap-1">{[0, 1, 2].map((item) => <img key={item} src={starPink} alt="" className="h-8 w-8" />)}</div>
        <motion.img src={kuromiGif} alt="" animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 1.8 }} className="mx-auto mt-5 h-20 w-20 object-contain" />
        <p className="mb-2 mt-2 text-xs font-black uppercase tracking-[0.28em] text-[#be185d]">Desafio {quiz.id}</p>
        <h2 className="text-2xl font-black uppercase tracking-widest text-[#db2777] sm:text-3xl" style={{ textShadow: '2px 2px 0 #fbcfe8' }}>Comecar</h2>
        <div className="relative mb-7 mt-5 border-4 border-[#b6b6b6] bg-[#fff1f7] p-4 shadow-[5px_5px_0_#f9a8d4]">
          <div className="absolute -bottom-4 left-10 h-4 w-7 border-b-4 border-l-4 border-[#b6b6b6] bg-[#fff1f7]" />
          <p className="text-base font-black leading-7 sm:text-lg">{quiz.question}</p>
        </div>
        <div className="flex flex-col gap-3">
          {quiz.answers.map((answer) => <motion.button key={answer} whileHover={{ scale: 1.02, x: 4 }} whileTap={{ scale: 0.97 }} onClick={() => onAnswer(answer)} className="border-4 border-[#2a1028] bg-[#f9a8d4] px-5 py-4 text-left text-sm font-black uppercase tracking-widest text-white shadow-[4px_4px_0_#831843] transition-colors hover:bg-[#ec4899] sm:text-base">{answer}</motion.button>)}
        </div>
      </motion.div>
    </div>
  )
}
