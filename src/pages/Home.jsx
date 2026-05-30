import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import kuromiGif from '../assets/pixel/kuromigif.gif'
import fundo from '../assets/pixel/fundo.jpg'
import heartSvg from '../assets/pixel/coracao.svg'

const sparkles = [
  { left: '8%', top: '26%', size: 'h-1.5 w-1.5', delay: 0 },
  { left: '18%', top: '41%', size: 'h-2 w-2', delay: 0.4 },
  { left: '31%', top: '22%', size: 'h-1.5 w-1.5', delay: 0.8 },
  { left: '46%', top: '34%', size: 'h-3 w-3', delay: 0.2 },
  { left: '62%', top: '24%', size: 'h-1.5 w-1.5', delay: 1 },
  { left: '76%', top: '39%', size: 'h-2 w-2', delay: 0.6 },
  { left: '88%', top: '28%', size: 'h-3 w-3', delay: 1.2 },
  { left: '14%', top: '58%', size: 'h-1.5 w-1.5', delay: 1.5 },
  { left: '70%', top: '57%', size: 'h-1.5 w-1.5', delay: 1.8 }
]

export default function Home() {
  const navigate = useNavigate()
  /* ialogos iniciais que apresentam a missao antes do jogador entrar no mapa */
  const dialogs = ['Bem-vinda ao Pixelia.', 'Responda perguntas sobre o mundo para liberar estrelas.', 'Cada estrela entrega uma letra da palavra-chave.', 'No inventario, arraste as letras baguncadas para abrir o portal.']
  const [step, setStep] = useState(0)
  const finished = step >= dialogs.length

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f9a8d4] font-mono text-white select-none">
      <img src={fundo} alt="Cenario pixelado rosa do jogo" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffd6e9]/80 via-[#f9a8d4]/45 to-transparent" />
      <div className="absolute left-0 top-0 h-28 w-full bg-white/90 [clip-path:polygon(0_0,100%_0,100%_68%,92%_62%,84%_80%,74%_63%,64%_78%,53%_62%,42%_80%,30%_63%,18%_82%,0_70%)] sm:h-32" />
      <div className="absolute bottom-0 h-[30vh] w-full border-t-8 border-[#a7f3a7] bg-gradient-to-b from-[#73d766]/95 to-[#37942f]/95" />
      <div className="absolute bottom-[22vh] left-0 h-12 w-full bg-white/80 [clip-path:polygon(0_55%,8%_35%,17%_58%,26%_30%,37%_60%,48%_34%,60%_62%,72%_32%,84%_58%,94%_36%,100%_55%,100%_100%,0_100%)]" />
      {sparkles.map((spark) => <motion.span key={`${spark.left}-${spark.top}`} animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.8, 1], rotate: [0, 90, 180] }} transition={{ repeat: Infinity, duration: 2.2, delay: spark.delay }} className={`absolute bg-white shadow-[0_0_14px_white] ${spark.size}`} style={{ left: spark.left, top: spark.top }} />)}
      <div className="absolute left-4 top-5 z-10 flex gap-1 sm:left-8 sm:top-7">
        {[0, 1, 2].map((item) => <motion.img key={item} src={heartSvg} alt="" animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 1.6, delay: item * 0.18 }} className="h-8 w-8 sm:h-10 sm:w-10" />)}
      </div>
      <div className="absolute left-1/2 top-7 z-10 hidden h-5 w-44 -translate-x-1/2 border-4 border-[#5f162d] bg-[#4b1025] p-0.5 sm:block">
        <motion.div animate={{ width: ['35%', '76%', '35%'] }} transition={{ repeat: Infinity, duration: 3 }} className="h-full bg-[#ec4899]" />
      </div>
      <div className="relative z-20 flex min-h-screen items-center justify-center px-5 pb-28 pt-24">
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.section key="dialog" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex w-full max-w-xl flex-col items-center">
              <motion.img src={kuromiGif} alt="Logo Pixelia" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="w-36 drop-shadow-[0_14px_18px_rgba(236,72,153,.5)] sm:w-48" />
              <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative w-full border-4 border-[#b6b6b6] bg-white p-5 text-center text-[#35112f] shadow-[7px_7px_0_#f9a8d4]">
                <div className="absolute -bottom-5 left-12 h-5 w-10 border-b-4 border-l-4 border-[#b6b6b6] bg-white" />
                <p className="text-base font-black leading-7 sm:text-lg">{dialogs[step]}</p>
                <button onClick={() => setStep((value) => value + 1)} className="mt-6 border-4 border-[#8a1742] bg-[#ec4899] px-8 py-3 text-sm font-black uppercase tracking-widest text-white shadow-[4px_4px_0_#8a1742] transition-transform active:translate-y-1">Continuar</button>
              </motion.div>
            </motion.section>
          ) : (
            <motion.section key="start" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="relative flex w-full max-w-5xl flex-col items-center text-center">
              <div className="relative">
                <motion.h1 initial={{ y: 20 }} animate={{ y: 0 }} className="text-5xl font-black uppercase leading-[0.88] tracking-widest text-[#f9a8d4] sm:text-7xl md:text-8xl" style={{ WebkitTextStroke: '3px #8a1742', textShadow: '5px 5px 0 #fff, 9px 9px 0 #db2777' }}>Pixelia</motion.h1>
                <motion.div animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2.1 }} className="absolute -right-6 -top-8 hidden h-16 w-16 items-center justify-center border-4 border-[#8a1742] bg-white text-3xl font-black text-[#ec4899] shadow-[5px_5px_0_#db2777] sm:flex">A</motion.div>
              </div>
              <p className="mt-5 max-w-lg border-4 border-white bg-[#ec4899]/90 px-5 py-3 text-xs font-black uppercase tracking-[0.22em] text-white shadow-[5px_5px_0_#8a1742] sm:text-sm">Colete letras, arraste no inventario e descubra a palavra-chave</p>
              <div className="mt-6 grid w-full max-w-xl grid-cols-3 gap-2 px-2 sm:gap-3">
                {['M', 'A', '?'].map((letter, index) => (
                  <motion.div key={`${letter}-${index}`} initial={{ opacity: 0, y: 18, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: index === 1 ? 2 : -2 }} transition={{ delay: index * 0.12, type: 'spring', bounce: 0.35 }} className="relative flex aspect-square items-center justify-center overflow-hidden border-4 border-[#8a1742] bg-white text-3xl font-black text-[#db2777] shadow-[5px_5px_0_#f9a8d4] sm:text-5xl" style={{ textShadow: '2px 2px 0 #fbcfe8' }}>
                    <span className="absolute inset-x-3 top-3 h-2 bg-[#fff1f7]" />
                    <span>{letter}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-5 flex w-full max-w-xl items-end justify-center gap-4">
                <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.7, ease: 'easeOut' }} className="hidden h-4 max-w-32 border-4 border-[#8a1742] bg-white sm:block">
                  <div className="h-full w-2/3 bg-[#ec4899]" />
                </motion.div>
                <motion.img src={kuromiGif} alt="" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-28 drop-shadow-xl sm:w-36" />
                <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.7, ease: 'easeOut' }} className="hidden h-4 max-w-32 border-4 border-[#8a1742] bg-white sm:block">
                  <div className="h-full w-1/2 bg-[#f9a8d4]" />
                </motion.div>
              </div>
              <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94, y: 5 }} onClick={() => navigate('/map')} className="mt-6 border-4 border-[#8a1742] bg-[#ec4899] px-12 py-4 text-xl font-black uppercase tracking-widest text-white shadow-[6px_6px_0_#8a1742] transition-colors hover:bg-[#f472b6] sm:px-16 sm:text-2xl">Start</motion.button>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
      {finished && (
        <div className="fixed bottom-6 left-0 z-30 flex w-full justify-center gap-4 px-5 sm:justify-start sm:px-10">
          <button onClick={() => setStep(0)} className="border-4 border-[#8a1742] bg-[#ec4899] px-8 py-3 text-lg font-black uppercase tracking-widest text-white shadow-[5px_5px_0_#8a1742] transition-transform active:translate-y-1 sm:px-10">Back</button>
        </div>
      )}
    </main>
  )
}
