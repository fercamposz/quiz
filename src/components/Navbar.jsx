import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <header className="fixed top-0 w-full flex justify-center items-center p-4 gap-4 z-50 bg-gradient-to-b from-pink-300/80 to-transparent backdrop-blur-sm">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95, y: 2, boxShadow: "0px 0px 0px #97266d" }}
        onClick={() => navigate('/map')}
        className="bg-white text-pink-500 font-black py-2 px-4 rounded-xl border-4 border-pink-400 shadow-[0px_4px_0px_#97266d] text-xs md:text-sm tracking-widest transition-all"
      >
        MAP
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95, y: 2, boxShadow: "0px 0px 0px #97266d" }}
        onClick={() => navigate('/inventory')}
        className="bg-white text-pink-500 font-black py-2 px-4 rounded-xl border-4 border-pink-400 shadow-[0px_4px_0px_#97266d] text-xs md:text-sm tracking-widest transition-all"
      >
        INVENTORY
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95, y: 2, boxShadow: "0px 0px 0px #97266d" }}
        onClick={() => navigate('/final')}
        className="bg-white text-pink-500 font-black py-2 px-4 rounded-xl border-4 border-pink-400 shadow-[0px_4px_0px_#97266d] text-xs md:text-sm tracking-widest transition-all"
      >
        FINAL
      </motion.button>
    </header>
  )
}