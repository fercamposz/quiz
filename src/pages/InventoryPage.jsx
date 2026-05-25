import {
  DndContext,
  closestCenter
} from '@dnd-kit/core'

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'

import { CSS } from '@dnd-kit/utilities'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { useGameStore } from '../store/gameStore'

// ==============================
// ITEM ARRASTÁVEL
// ==============================

function SortableItem({ id, index }) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1
  }

  return (

    <motion.div

      ref={setNodeRef}

      style={style}

      {...attributes}
      {...listeners}

      whileHover={{
        scale: 1.02
      }}

      whileTap={{
        scale: 0.98
      }}

      className={`
        bg-white
        border-4
        rounded-2xl
        p-4
        flex
        items-center
        gap-4
        cursor-grab
        active:cursor-grabbing
        transition-all
        duration-300

        ${
          isDragging
            ? 'border-pink-500 shadow-xl opacity-90 scale-105'
            : 'border-pink-400 shadow-[4px_4px_0px_#97266d]'
        }
      `}
    >

      {/* HANDLE */}

      <div className="
        text-pink-300
        text-xl
        flex
        flex-col
        gap-1
      ">

        <span className="
          block
          w-4
          h-1
          bg-pink-300
          rounded-full
        "></span>

        <span className="
          block
          w-4
          h-1
          bg-pink-300
          rounded-full
        "></span>

        <span className="
          block
          w-4
          h-1
          bg-pink-300
          rounded-full
        "></span>

      </div>

      {/* TEXTO */}

      <div className="flex-1">

        <span className="
          text-pink-900
          font-bold
          text-sm
          leading-relaxed
          block
        ">
          {id}
        </span>

      </div>

      {/* NUMERO */}

      <div className="
        w-8
        h-8
        rounded-full
        bg-pink-100
        border-2
        border-pink-300
        flex
        items-center
        justify-center
        text-pink-500
        font-black
        text-xs
        shrink-0
      ">
        {index + 1}
      </div>

    </motion.div>

  )
}

// ==============================
// PAGINA INVENTARIO
// ==============================

export default function InventoryPage() {

  const navigate = useNavigate()

  const { clues } = useGameStore()

  const [items, setItems] = useState(
    () => [...clues]
  )

  // ==============================
  // DRAG END
  // ==============================

  function handleDragEnd(event) {

    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {

      setItems((items) => {

        const oldIndex =
          items.indexOf(active.id)

        const newIndex =
          items.indexOf(over.id)

        return arrayMove(
          items,
          oldIndex,
          newIndex
        )

      })

    }

  }

  // ==============================
  // RENDER
  // ==============================

  return (

    <main className="
      min-h-screen
      bg-gradient-to-b
      from-pink-200
      to-pink-100
      p-6
      select-none
      relative
      overflow-hidden
      flex
      flex-col
    ">

      {/* BACKGROUND */}

      <div className="
        absolute
        inset-0
        pointer-events-none
        opacity-50
        z-0
      ">

        <div className="
          absolute
          top-10
          left-10
          text-white
          text-3xl
        ">
          ✨
        </div>

        <div className="
          absolute
          top-32
          right-10
          text-white
          text-2xl
        ">
          ☁️
        </div>

        <div className="
          absolute
          bottom-20
          left-1/4
          text-white
          text-xl
        ">
          🌸
        </div>

      </div>

      {/* CONTAINER */}

      <div className="
        relative
        z-10
        w-full
        max-w-md
        mx-auto
        flex-1
        flex
        flex-col
      ">

        {/* HEADER */}

        <header className="
          flex
          items-center
          justify-between
          mb-8
          gap-4
        ">

          <motion.button

            whileHover={{
              scale: 1.05
            }}

            whileTap={{
              scale: 0.95,
              y: 2
            }}

            onClick={() => navigate(-1)}

            className="
              bg-white
              text-pink-500
              font-black
              py-2
              px-4
              rounded-xl
              border-4
              border-pink-400
              shadow-[4px_4px_0px_#97266d]
              text-xs
              transition-all
            "
          >
            ◀ BACK
          </motion.button>

          <h1
            className="
              text-3xl
              font-black
              text-pink-400
              tracking-widest
              text-right
            "

            style={{
              textShadow:
                '2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 4px 4px 0 #b83280'
            }}
          >
            INVENTORY
          </h1>

        </header>

        {/* AREA INVENTARIO */}

        <div className="
          flex-1
          bg-pink-50/50
          backdrop-blur-sm
          border-4
          border-pink-300
          border-dashed
          rounded-3xl
          p-4
          shadow-inner
          overflow-y-auto
        ">

          {items.length === 0 ? (

            // ==============================
            // INVENTARIO VAZIO
            // ==============================

            <div className="
              h-full
              flex
              flex-col
              items-center
              justify-center
              text-center
              opacity-70
            ">

              <span className="
                text-6xl
                mb-4
                grayscale
              ">
                🎒
              </span>

              <p className="
                text-pink-800
                font-bold
                text-sm
                leading-7
              ">
                Seu inventário está vazio...
                <br />
                Vá explorar o mapa!
              </p>

            </div>

          ) : (

            // ==============================
            // LISTA
            // ==============================

            <DndContext

              collisionDetection={
                closestCenter
              }

              onDragEnd={handleDragEnd}

            >

              <SortableContext

                items={items}

                strategy={
                  verticalListSortingStrategy
                }

              >

                <div className="space-y-4">

                  {items.map((item, index) => (

                    <SortableItem
                      key={item}
                      id={item}
                      index={index}
                    />

                  ))}

                </div>

              </SortableContext>

            </DndContext>

          )}

        </div>

      </div>

    </main>

  )
}