import { motion } from 'framer-motion'

export default function TreasureCard({ unlocked, onClick }) {
  return (
    <motion.button
      whileHover={unlocked ? { scale: 1.1, y: -2 } : {}}
      whileTap={unlocked ? { scale: 0.9, y: 4, boxShadow: "0px 0px 0px transparent" } : {}}
      onClick={onClick}
      disabled={!unlocked}
      className={`
        absolute w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl rounded-xl border-4 transition-colors duration-300
        ${unlocked 
          ? 'bg-pink-400 border-white shadow-[4px_4px_0px_#97266d] cursor-pointer' 
          : 'bg-gray-300 border-gray-400 shadow-[4px_4px_0px_#6b7280] cursor-not-allowed opacity-80'
        }
      `}
    >
      {/* Adiciona um efeito de pulo suave contínuo se estiver liberado */}
      <motion.div 
        animate={unlocked ? { y: [-2, 2, -2] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {unlocked ? '🎁' : '🔒'}
      </motion.div>
    </motion.button>
  )
}