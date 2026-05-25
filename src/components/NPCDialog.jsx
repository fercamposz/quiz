import { AnimatePresence, motion } from 'framer-motion'
import kuromiGif from '../assets/pixel/kuromigif.gif'

export default function NPCDialog({ text, npcName = 'Guia', avatar = kuromiGif, show = true }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 80 }} transition={{ type: 'spring', stiffness: 120, damping: 15 }} className="fixed bottom-4 left-1/2 z-50 w-[92%] max-w-2xl -translate-x-1/2 pointer-events-none">
          <div className="relative flex items-start gap-4 overflow-hidden border-[5px] border-white bg-[#fff1f7] p-4 text-[#35112f] shadow-[8px_8px_0_#831843] backdrop-blur-md sm:p-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center border-4 border-[#f9a8d4] bg-white sm:h-20 sm:w-20">
              <img src={avatar} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="flex-1">
              <div className="mb-3 inline-block border-2 border-white bg-[#ec4899] px-4 py-1 text-xs font-black uppercase tracking-widest text-white shadow-[3px_3px_0_#831843]">{npcName}</div>
              <p className="text-sm font-bold leading-7 sm:text-base">{text}</p>
            </div>
            <div className="absolute bottom-3 right-4 h-3 w-3 animate-pulse bg-[#ec4899]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
