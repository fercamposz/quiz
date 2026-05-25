import { motion } from 'framer-motion'
import starGray from '../assets/pixel/stargray.svg'
import starPink from '../assets/pixel/star.svg'

export default function TreasureCard({ unlocked, solved = false, level, onClick }) {
  return (
    <motion.button whileHover={unlocked ? { scale: 1.08, y: -2 } : {}} whileTap={unlocked ? { scale: 0.92, y: 4 } : {}} onClick={onClick} disabled={!unlocked} className={`relative flex h-16 w-16 items-center justify-center transition-opacity sm:h-20 sm:w-20 ${unlocked ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-55 grayscale'}`}>
      <motion.img src={solved ? starPink : starGray} alt="" animate={unlocked && !solved ? { y: [-2, 2, -2] } : {}} transition={{ repeat: Infinity, duration: 2 }} className="h-full w-full drop-shadow-xl" />
      {level && <span className="absolute inset-0 flex items-center justify-center text-xl font-black text-white drop-shadow-lg sm:text-2xl">{level}</span>}
    </motion.button>
  )
}
