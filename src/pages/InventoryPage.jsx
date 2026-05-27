import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DndContext, DragOverlay, PointerSensor, closestCenter, defaultDropAnimationSideEffects, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { finalPassword } from '../data/treasures'
import starPink from '../assets/pixel/star.svg'
import heartSvg from '../assets/pixel/coracao.svg'

const scrambleOrder = [4, 1, 8, 3, 10, 6, 2, 9, 5, 7]

function getLetter(clue) {
  return clue.letter || finalPassword[clue.id - 1] || '?'
}

const dropAnimation = {
  duration: 260,
  easing: 'cubic-bezier(.2,.8,.2,1)',
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.3'
      }
    }
  })
}

function LetterTile({ clue, isDragging = false, isOverlay = false }) {
  return (
    <div className={`relative flex aspect-square items-center justify-center overflow-hidden border-4 border-[#2a1028] bg-white text-4xl font-black uppercase text-[#db2777] outline-none sm:text-5xl ${isOverlay ? 'scale-110 shadow-[12px_12px_0_#831843]' : 'shadow-[6px_6px_0_#f9a8d4]'} ${isDragging ? 'opacity-35' : 'opacity-100'}`}>
      <span className="absolute inset-x-2 top-2 h-2 bg-[#fff1f7]" />
      <span className="absolute left-1.5 top-1.5 h-2 w-2 bg-[#f9a8d4]" />
      <span className="absolute right-2 top-3 h-1.5 w-1.5 bg-[#ec4899]" />
      <span className="absolute bottom-2 left-2 h-1.5 w-8 bg-[#fbcfe8]" />
      <span className="relative" style={{ textShadow: '2px 2px 0 #fbcfe8' }}>{getLetter(clue)}</span>
    </div>
  )
}

function SortableLetter({ clue, index }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: clue.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 260ms cubic-bezier(.2,.8,.2,1)',
    zIndex: isDragging ? 50 : 'auto'
  }

  return (
    <motion.button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, y: 18, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: isDragging ? 4 : 0 }}
      whileHover={{ y: -5, rotate: index % 2 ? 1 : -1, scale: 1.03 }}
      whileTap={{ scale: 1.08 }}
      transition={{ delay: index * 0.035 }}
      className={`touch-none rounded-none outline-none transition-[filter] duration-200 ${isDragging ? 'cursor-grabbing filter saturate-150' : 'cursor-grab'}`}
      aria-label={`Letra ${getLetter(clue)}`}
    >
      <LetterTile clue={clue} isDragging={isDragging} />
    </motion.button>
  )
}

export default function InventoryPage() {
  const navigate = useNavigate()
  const { clues, solvedQuiz, letterOrder, setLetterOrder } = useGameStore()
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))
  const [activeId, setActiveId] = useState(null)

  const orderedClues = useMemo(() => {
    const ids = clues.map((clue) => clue.id)
    const validOrder = (letterOrder || []).filter((id) => ids.includes(id))
    const missing = ids.filter((id) => !validOrder.includes(id)).sort((a, b) => scrambleOrder.indexOf(a) - scrambleOrder.indexOf(b))
    const order = [...validOrder, ...missing]
    return order.map((id) => clues.find((clue) => clue.id === id)).filter(Boolean)
  }, [clues, letterOrder])

  const assembledWord = orderedClues.map(getLetter).join('')
  const allLettersUnlocked = clues.length >= finalPassword.length
  const wordSolved = allLettersUnlocked && assembledWord === finalPassword
  const activeClue = orderedClues.find((clue) => clue.id === activeId)

  function handleDragEnd(event) {
    const { active, over } = event
    setActiveId(null)
    if (over && active.id !== over.id) {
      const oldIndex = orderedClues.findIndex((clue) => clue.id === active.id)
      const newIndex = orderedClues.findIndex((clue) => clue.id === over.id)
      if (oldIndex >= 0 && newIndex >= 0) {
        setLetterOrder(arrayMove(orderedClues, oldIndex, newIndex).map((clue) => clue.id))
      }
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#ffd1e4] px-4 py-6 font-mono text-[#35112f] select-none sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,.95)_0_8%,transparent_9%),radial-gradient(circle_at_76%_18%,rgba(255,255,255,.9)_0_7%,transparent_8%),linear-gradient(#ffd1e4,#fbcfe8)]" />
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl flex-col">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button onClick={() => navigate('/map')} className="w-full border-4 border-[#2a1028] bg-white px-5 py-3 text-sm font-black uppercase tracking-widest text-[#db2777] shadow-[4px_4px_0_#f9a8d4] transition-transform active:translate-y-1 sm:w-auto">Voltar</button>
          <div className="relative border-4 border-[#2a1028] bg-white px-6 py-4 text-center shadow-[6px_6px_0_#f9a8d4]">
            <div className="absolute -top-5 left-1/2 flex -translate-x-1/2 gap-1">{[0, 1, 2].map((item) => <img key={item} src={starPink} alt="" className="h-8 w-8" />)}</div>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-widest text-[#db2777] sm:text-4xl" style={{ textShadow: '2px 2px 0 #fbcfe8' }}>Inventario</h1>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.24em] text-[#831843]">{clues.length}/{finalPassword.length} letras encontradas</p>
          </div>
        </header>

        <div className="mb-5 border-4 border-[#b6b6b6] bg-white p-4 shadow-[5px_5px_0_#f9a8d4]">
          <div className="flex items-center gap-4">
            <motion.img src={heartSvg} alt="" animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="h-14 w-14" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#be185d]">Bolsa de letras</p>
              <p className="text-sm font-bold leading-6">{wordSolved ? 'Perfeito. A palavra-chave esta montada e o portal ja pode abrir.' : 'Arraste as letras baguncadas para montar a palavra-chave final.'}</p>
            </div>
          </div>
        </div>

        {clues.length === 0 ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center border-[6px] border-[#2a1028] bg-white p-8 text-center shadow-[8px_8px_0_#f9a8d4]">
            <img src={starPink} alt="" className="mb-5 h-24 w-24 opacity-60 grayscale" />
            <p className="max-w-sm text-base font-black leading-7 sm:text-lg">Nenhuma letra foi desbloqueada ainda. Volte ao mapa e venca o primeiro desafio.</p>
          </div>
        ) : (
          <div className="grid flex-1 gap-5 lg:grid-cols-[1fr_18rem]">
            <div className="border-[6px] border-[#2a1028] bg-[#fff1f7] p-4 shadow-[8px_8px_0_#f9a8d4] sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#be185d]">Arraste e solte</p>
                <p className="border-4 border-[#f9a8d4] bg-white px-3 py-2 text-xs font-black text-[#831843]">{solvedQuiz.length} estrelas</p>
              </div>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={({ active }) => setActiveId(active.id)} onDragCancel={() => setActiveId(null)} onDragEnd={handleDragEnd}>
                <SortableContext items={orderedClues.map((clue) => clue.id)} strategy={rectSortingStrategy}>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                    {orderedClues.map((clue, index) => <SortableLetter key={clue.id} clue={clue} index={index} />)}
                  </div>
                </SortableContext>
                <DragOverlay dropAnimation={dropAnimation}>{activeClue ? <LetterTile clue={activeClue} isOverlay /> : null}</DragOverlay>
              </DndContext>
            </div>

            <aside className="flex flex-col justify-between border-4 border-[#b6b6b6] bg-white p-4 shadow-[6px_6px_0_#f9a8d4]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#be185d]">Palavra montada</p>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {Array.from({ length: finalPassword.length }).map((_, index) => (
                    <span key={index} className={`flex aspect-square items-center justify-center border-4 text-xl font-black shadow-[3px_3px_0_#f9a8d4] ${orderedClues[index] ? 'border-[#2a1028] bg-[#f9a8d4] text-white' : 'border-[#b6b6b6] bg-[#fff1f7] text-[#f9a8d4]'}`}>
                      {orderedClues[index] ? getLetter(orderedClues[index]) : ''}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm font-bold leading-6 text-[#831843]">{allLettersUnlocked ? 'Todas as letras estao na bolsa. Agora e so acertar a ordem.' : `Faltam ${finalPassword.length - clues.length} letras para completar a palavra.`}</p>
              </div>
              <button onClick={() => navigate('/final')} disabled={!wordSolved} className="mt-5 w-full border-4 border-[#2a1028] bg-[#ec4899] px-5 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[4px_4px_0_#831843] transition-all active:translate-y-1 disabled:cursor-not-allowed disabled:grayscale disabled:opacity-50">Abrir portal</button>
            </aside>
          </div>
        )}
      </section>
    </main>
  )
}
