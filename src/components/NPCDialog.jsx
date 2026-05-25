import { motion } from 'framer-motion'

export default function NPCDialog({ text }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-50">
      
      {/* Caixa de diálogo estilo RPG retro */}
      <div className="bg-white border-4 border-pink-400 rounded-2xl p-4 shadow-[6px_6px_0px_#97266d] flex gap-4 items-center relative">
        
        {/* Avatar animado do NPC */}
        <motion.div 
          animate={{ y: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="shrink-0 w-16 h-16 bg-pink-100 rounded-full border-4 border-pink-400 flex items-center justify-center text-3xl shadow-inner"
        >
          🧚
        </motion.div>

        {/* Texto do NPC */}
        <div className="flex-1">
          <p className="text-pink-900 font-bold text-xs md:text-sm leading-relaxed tracking-wide">
            {text}
          </p>
        </div>

        {/* Setinha indicadora de continuar estilo retro */}
        <motion.div 
          animate={{ opacity: [1, 0, 1] }} 
          transition={{ repeat: Infinity, duration: 1 }}
          className="absolute bottom-2 right-4 text-pink-400 text-xl"
        >
          ▼
        </motion.div>

      </div>
    </div>
  )
}