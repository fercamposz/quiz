import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { treasures } from '../data/treasures'
import { quizzes } from '../data/quizzes'
import { useGameStore } from '../store/gameStore'
import QuizModal from '../components/QuizModal'
import ClueModal from '../components/ClueModal'
import CompletedModal from '../components/CompletedModal'
import GameOverModal from '../components/GameOverModal'
import heartSvg from '../assets/pixel/coracao.svg'
import starGray from '../assets/pixel/stargray.svg'
import starPink from '../assets/pixel/star.svg'
import kuromiGif from '../assets/pixel/kuromigif.gif'
import mapBg from '../assets/pixel/mapa.svg'

const pathCoordinates = [
  { bottom: '7%', left: '42%' },
  { bottom: '16%', left: '66%' },
  { bottom: '25%', left: '31%' },
  { bottom: '34%', left: '72%' },
  { bottom: '43%', left: '46%' },
  { bottom: '53%', left: '22%' },
  { bottom: '63%', left: '62%' },
  { bottom: '74%', left: '36%' },
  { bottom: '84%', left: '75%' },
  { bottom: '90%', left: '50%' }
]

function TrapModal({ heartsLeft, onClose }) {
  const messages = ['Pegadinha fofa: essa estrela trocou a resposta de lugar.', 'Quase. A Kuromi piscou e confundiu o caminho.', 'Ops. Essa pista era uma isca rosa.']
  const message = messages[Math.max(0, (3 - heartsLeft) % messages.length)]

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#100716]/75 p-4 backdrop-blur-md">
      <motion.div initial={{ opacity: 0, scale: 0.82, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} className="relative w-full max-w-sm border-[6px] border-[#b6b6b6] bg-white p-5 text-center text-[#35112f] shadow-[8px_8px_0_#f9a8d4]">
        <motion.div animate={{ x: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 0.35 }} className="mx-auto mb-4 h-16 w-20 border-4 border-[#f9a8d4] bg-[#fce7f3]">
          <div className="mx-auto mt-4 h-6 w-8 bg-[#ec4899]" />
        </motion.div>
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#be185d]">Resposta surpresa</p>
        <p className="my-5 text-base font-black leading-7">{message}</p>
        <p className="mb-5 text-sm font-bold text-[#831843]">Vidas restantes: {heartsLeft}</p>
        <button onClick={onClose} className="w-full border-4 border-white bg-[#ec4899] px-5 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[4px_4px_0_#831843] transition-transform active:translate-y-1">Continuar</button>
      </motion.div>
    </div>
  )
}

export default function MapPage() {
  const navigate = useNavigate()
  const mapRef = useRef(null)
  const isDragging = useRef(false)
  const startY = useRef(0)
  const scrollTop = useRef(0)
  const { unlocked, unlockPoint, addClue, completeQuiz, solvedQuiz, resetGame, hearts, loseHeart } = useGameStore()
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [showClue, setShowClue] = useState(null)
  const [showCompleted, setShowCompleted] = useState(false)
  const [showGameOver, setShowGameOver] = useState(false)
  const [trap, setTrap] = useState(null)
  const progress = Math.round((solvedQuiz.length / treasures.length) * 100)
  const currentIndex = Math.min(solvedQuiz.length, pathCoordinates.length - 1)
  const kuromiPos = pathCoordinates[currentIndex]

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const bottomPercent = Number.parseFloat(kuromiPos.bottom)
    const maxScroll = map.scrollHeight - map.clientHeight
    const target = maxScroll * (1 - bottomPercent / 100) + map.clientHeight * 0.18
    map.scrollTop = Math.max(0, Math.min(maxScroll, target))
  }, [kuromiPos.bottom])

  function startDrag(pageY) {
    isDragging.current = true
    startY.current = pageY - mapRef.current.offsetTop
    scrollTop.current = mapRef.current.scrollTop
  }

  function moveDrag(pageY) {
    if (!isDragging.current) return
    const y = pageY - mapRef.current.offsetTop
    mapRef.current.scrollTop = scrollTop.current - (y - startY.current) * 2
  }

  function handleTreasure(id) {
    if (!unlocked.includes(id)) return
    if (solvedQuiz.includes(id)) {
      setShowCompleted(true)
      return
    }
    const quiz = quizzes.find((item) => item.id === id)
    if (quiz) setActiveQuiz(quiz)
  }

  function answerQuiz(answer) {
    if (!activeQuiz) return
    if (answer === activeQuiz.correct) {
      completeQuiz(activeQuiz.id)
      const clue = treasures.find((item) => item.id === activeQuiz.id)
      if (clue) {
        addClue(clue)
        setShowClue(clue)
      }
      if (activeQuiz.id < treasures.length) unlockPoint(activeQuiz.id + 1)
    } else {
      const nextHearts = loseHeart()
      if (nextHearts <= 0) setShowGameOver(true)
      else setTrap(nextHearts)
    }
    setActiveQuiz(null)
  }

  function restartGame() {
    resetGame()
    setShowGameOver(false)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#ffd1e4] font-mono text-white select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.95)_0_8%,transparent_9%),radial-gradient(circle_at_70%_16%,rgba(255,255,255,.85)_0_7%,transparent_8%),linear-gradient(#ffd1e4,#f9a8d4)]" />
      <header className="fixed left-0 top-0 z-50 flex w-full items-start justify-between gap-3 p-3 sm:p-4">
        <section className="border-4 border-[#2a1028] bg-white p-3 text-[#35112f] shadow-[5px_5px_0_#f9a8d4]">
          <div className="mb-2 flex items-center gap-2">
            {[0, 1, 2].map((item) => <img key={item} src={heartSvg} alt="" className={`h-7 w-7 sm:h-9 sm:w-9 ${item < hearts ? 'opacity-100' : 'opacity-20 grayscale'}`} />)}
          </div>
          <div className="h-4 w-32 overflow-hidden border-4 border-[#2a1028] bg-[#2a1028] sm:w-44">
            <motion.div initial={false} animate={{ width: `${progress}%` }} className="h-full bg-[#ec4899]" />
          </div>
          <p className="mt-2 text-[10px] font-black uppercase tracking-widest sm:text-xs">{solvedQuiz.length}/{treasures.length} estrelas</p>
        </section>
        <nav className="flex flex-col gap-2 sm:flex-row">
          <button onClick={() => navigate('/inventory')} className="border-4 border-[#2a1028] bg-white px-4 py-3 text-xs font-black uppercase tracking-widest text-[#db2777] shadow-[4px_4px_0_#f9a8d4] transition-transform active:translate-y-1 sm:text-sm">Inventario</button>
          <button onClick={() => navigate('/final')} className="border-4 border-[#2a1028] bg-[#f9a8d4] px-4 py-3 text-xs font-black uppercase tracking-widest text-white shadow-[4px_4px_0_#831843] transition-transform active:translate-y-1 sm:text-sm">Portal</button>
        </nav>
      </header>
      <div ref={mapRef} onMouseDown={(event) => startDrag(event.pageY)} onMouseMove={(event) => { event.preventDefault(); moveDrag(event.pageY) }} onMouseUp={() => { isDragging.current = false }} onMouseLeave={() => { isDragging.current = false }} onTouchStart={(event) => startDrag(event.touches[0].pageY)} onTouchMove={(event) => moveDrag(event.touches[0].pageY)} onTouchEnd={() => { isDragging.current = false }} className="relative z-10 h-screen w-full cursor-grab overflow-y-scroll overflow-x-hidden active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="relative h-[1900px] w-full overflow-hidden bg-[#fbcfe8] sm:h-[2200px] lg:h-[2400px]">
          <img src={mapBg} alt="Mapa vertical do Treasure Hunt" draggable="false" className="absolute inset-0 h-full w-full object-cover pointer-events-none" />
          <motion.img initial={false} src={kuromiGif} alt="Personagem no mapa" animate={{ bottom: kuromiPos.bottom, left: kuromiPos.left }} transition={{ type: 'spring', stiffness: 42, damping: 15 }} className="absolute z-40 w-12 drop-shadow-xl pointer-events-none sm:w-16 md:w-20 lg:w-24 xl:w-28" style={{ bottom: kuromiPos.bottom, left: kuromiPos.left, transform: 'translate(65%, 10%)' }} />
          {treasures.map((treasure, index) => {
            const position = pathCoordinates[index]
            const isUnlocked = unlocked.includes(treasure.id)
            const isSolved = solvedQuiz.includes(treasure.id)
            const isFinalReady = treasure.id === 10 && isUnlocked && !isSolved
            return (
              <div key={treasure.id} className={`absolute touch-manipulation ${isFinalReady ? 'z-[70]' : 'z-30'}`} style={{ bottom: position.bottom, left: position.left, transform: 'translate(-50%, 50%)' }}>
                <motion.button onClick={() => handleTreasure(treasure.id)} disabled={!isUnlocked} animate={isFinalReady ? { rotate: [0, 12, -12, 0], scale: [1, 1.18, 1] } : isUnlocked && !isSolved ? { y: [-4, 4, -4] } : {}} transition={{ repeat: Infinity, duration: isFinalReady ? 1.25 : 2 }} className="relative block h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 xl:h-44 xl:w-44" aria-label={`Fase ${treasure.id}`}>
                  {isFinalReady && <motion.span animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.7, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} className="absolute inset-0 bg-white/60 blur-md" />}
                  <img src={isSolved ? starPink : starGray} alt="" draggable="false" className={`h-full w-full drop-shadow-xl pointer-events-none ${isUnlocked ? 'opacity-100' : 'opacity-55 grayscale'}`} />
                  <span className="absolute inset-0 flex items-center justify-center text-xl font-black text-white drop-shadow-lg pointer-events-none sm:text-2xl md:text-4xl lg:text-5xl">{treasure.id}</span>
                </motion.button>
              </div>
            )
          })}
        </div>
      </div>
      <footer className="fixed bottom-3 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2 border-4 border-[#2a1028] bg-white p-3 text-center text-xs font-black text-[#35112f] shadow-[5px_5px_0_#f9a8d4] sm:text-sm">Arraste o mapa, toque nas estrelas e guarde as pistas no inventario.</footer>
      {activeQuiz && <QuizModal quiz={activeQuiz} onAnswer={answerQuiz} />}
      {showClue && <ClueModal clue={showClue} onClose={() => setShowClue(null)} />}
      {showCompleted && <CompletedModal onClose={() => setShowCompleted(false)} />}
      {showGameOver && <GameOverModal onRestart={restartGame} />}
      {trap && <TrapModal heartsLeft={trap} onClose={() => setTrap(null)} />}
    </main>
  )
}
