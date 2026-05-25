import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'

import { treasures } from '../data/treasures'
import { quizzes } from '../data/quizzes'

import useGeolocation from '../hooks/useGeolocation'

import { useGameStore } from '../store/gameStore'

import QuizModal from '../components/QuizModal'

export default function MapPage() {

  const navigate = useNavigate()

  const { error } = useGeolocation()

  const {
    unlocked,
    unlockPoint,
    addClue,
    completeQuiz,
    solvedQuiz
  } = useGameStore()

  const [activeQuiz, setActiveQuiz] =
    useState(null)

  // =========================
  // VIDAS
  // =========================

  const [hearts, setHearts] =
    useState(3)

  // =========================
  // CLICK TESOURO
  // =========================

  function handleTreasure(id) {

    const isUnlocked =
      unlocked.includes(id)

    if (!isUnlocked) {
      return
    }

    const alreadySolved =
      solvedQuiz.includes(id)

    if (alreadySolved) {

      alert(
        'Esse nível já foi concluído ✨'
      )

      return
    }

    const quiz =
      quizzes.find(
        (q) => q.id === id
      )

    if (!quiz) return

    setActiveQuiz(quiz)

  }

  // =========================
  // RESPONDER QUIZ
  // =========================

  function answerQuiz(answer) {

    if (!activeQuiz) return

    // =========================
    // RESPOSTA CORRETA
    // =========================

    if (
      answer === activeQuiz.correct
    ) {

      // SALVA COMO CONCLUÍDO

      completeQuiz(activeQuiz.id)

      // ADICIONA PISTA

      const clue =
        treasures.find(
          (t) =>
            t.id === activeQuiz.id
        )

      if (clue) {

        addClue(clue.clue)

      }

      // LIBERA O PRÓXIMO

      const currentIndex =
        treasures.findIndex(
          (t) =>
            t.id === activeQuiz.id
        )

      const nextTreasure =
        treasures[currentIndex + 1]

      if (nextTreasure) {

        unlockPoint(
          nextTreasure.id
        )

      }

      alert(
        'Resposta correta! ✨ Novo nível desbloqueado!'
      )

    }

    // =========================
    // RESPOSTA ERRADA
    // =========================

    else {

      setHearts((prev) => {

        const newHearts =
          prev - 1

        // GAME OVER

        if (newHearts <= 0) {

          alert(
            'Game Over 😭'
          )

          return 3
        }

        alert(
          `Você perdeu uma vida 💔`
        )

        return newHearts

      })

    }

    setActiveQuiz(null)

  }

  // =========================
  // POSIÇÕES
  // =========================

  const pathCoordinates = [

    {
      bottom: '15%',
      left: '20%'
    },

    {
      bottom: '25%',
      left: '50%'
    },

    {
      bottom: '35%',
      left: '75%'
    },

    {
      bottom: '50%',
      left: '60%'
    },

    {
      bottom: '55%',
      left: '30%'
    },

    {
      bottom: '70%',
      left: '15%'
    },

    {
      bottom: '85%',
      left: '40%'
    },

    {
      bottom: '80%',
      left: '70%'
    },

    {
      bottom: '90%',
      left: '85%'
    }

  ]

  // =========================
  // RENDER
  // =========================

  return (

    <main className="
      min-h-screen
      bg-[#A8D08D]
      relative
      overflow-hidden
      font-mono
      select-none
      flex
      flex-col
    ">

      {/* ========================= */}
      {/* BACKGROUND */}
      {/* ========================= */}

      <div className="
        absolute
        inset-0
        pointer-events-none
        z-0
      ">

        <svg
          className="
            absolute
            inset-0
            w-full
            h-full
          "
          preserveAspectRatio="none"
        >

          <path

            d="
              M 20% 85%
              C 50% 85%, 80% 70%, 60% 50%
              C 40% 30%, 10% 40%, 15% 30%
              C 20% 20%, 50% 10%, 85% 10%
            "

            fill="transparent"

            stroke="#E2C792"

            strokeWidth="60"

            strokeLinecap="round"

            className="drop-shadow-md"

          />

        </svg>

      </div>

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <header className="
        absolute
        top-0
        w-full
        p-4
        flex
        justify-between
        items-center
        z-40
        bg-white/50
        backdrop-blur-md
        border-b-4
        border-white/80
        shadow-sm
      ">

        {/* ========================= */}
        {/* VIDAS */}
        {/* ========================= */}

        <div className="
          flex
          gap-2
          bg-white
          px-4
          py-2
          rounded-full
          border-4
          border-pink-200
          shadow-sm
        ">

          {[...Array(3)].map(
            (_, i) => (

              <motion.div

                key={i}

                animate={{
                  scale:
                    i < hearts
                      ? [1, 1.1, 1]
                      : 1
                }}

                transition={{
                  repeat: Infinity,
                  duration: 1.5
                }}

                className={`
                  text-2xl
                  transition-all
                  duration-300

                  ${
                    i < hearts
                      ? 'opacity-100'
                      : 'opacity-20 grayscale'
                  }
                `}
              >
                ❤️
              </motion.div>

            )
          )}

        </div>

        {/* ========================= */}
        {/* BOTÕES */}
        {/* ========================= */}

        <div className="
          flex
          gap-2
        ">

          <motion.button

            whileHover={{
              scale: 1.05
            }}

            whileTap={{
              scale: 0.95
            }}

            onClick={() =>
              navigate('/inventory')
            }

            className="
              w-10
              h-10
              bg-blue-400
              text-white
              rounded-full
              border-4
              border-white
              shadow-[2px_2px_0px_#1e3a8a]
              flex
              items-center
              justify-center
              font-black
            "
          >
            🎒
          </motion.button>

          <motion.button

            whileHover={{
              scale: 1.05
            }}

            whileTap={{
              scale: 0.95
            }}

            onClick={() =>
              navigate('/final')
            }

            className="
              w-10
              h-10
              bg-pink-400
              text-white
              rounded-full
              border-4
              border-white
              shadow-[2px_2px_0px_#831843]
              flex
              items-center
              justify-center
              font-black
            "
          >
            🏆
          </motion.button>

        </div>

      </header>

      {/* ========================= */}
      {/* MAPA */}
      {/* ========================= */}

      <div className="
        relative
        z-10
        flex-1
        w-full
        h-full
      ">

        {treasures.map(
          (treasure, index) => {

            const isUnlocked =
              unlocked.includes(
                treasure.id
              )

            const isSolved =
              solvedQuiz.includes(
                treasure.id
              )

            const position =
              pathCoordinates[index] || {

                bottom: '50%',
                left: '50%'

              }

            return (

              <motion.button

                key={treasure.id}

                onClick={() =>
                  handleTreasure(
                    treasure.id
                  )
                }

                disabled={!isUnlocked}

                whileHover={
                  isUnlocked
                    ? { scale: 1.1 }
                    : {}
                }

                whileTap={
                  isUnlocked
                    ? { scale: 0.9 }
                    : {}
                }

                animate={
                  isUnlocked &&
                  !isSolved

                    ? {
                        y: [
                          -3,
                          3,
                          -3
                        ]
                      }

                    : {}
                }

                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut'
                }}

                className={`
                  absolute
                  flex
                  items-center
                  justify-center
                  z-20
                  transition-all
                  duration-500
                  w-16
                  h-16
                  md:w-20
                  md:h-20
                  rounded-full
                  border-4
                  shadow-[4px_4px_0px_rgba(0,0,0,0.1)]

                  ${
                    isUnlocked

                      ? isSolved

                        ? 'bg-pink-300 border-white'

                        : 'bg-pink-500 border-white'

                      : 'bg-gray-300 border-gray-400 opacity-80 cursor-not-allowed'
                  }
                `}

                style={{
                  bottom:
                    position.bottom,

                  left:
                    position.left,

                  transform:
                    'translate(-50%, 50%)'
                }}

              >

                <span className={`
                  text-xl
                  font-black

                  ${
                    isUnlocked
                      ? 'text-white'
                      : 'text-gray-500'
                  }
                `}>
                  {index + 1}
                </span>

              </motion.button>

            )

          }
        )}

        {/* ========================= */}
        {/* ERRO GPS */}
        {/* ========================= */}

        {error && (

          <div className="
            fixed
            bottom-6
            left-1/2
            -translate-x-1/2
            w-[90%]
            max-w-sm
            bg-white
            border-4
            border-red-400
            p-4
            rounded-2xl
            shadow-[6px_6px_0px_#991b1b]
            z-50
            text-center
          ">

            <p className="
              text-red-600
              font-bold
              text-xs
            ">
              {error}
            </p>

          </div>

        )}

      </div>

      {/* ========================= */}
      {/* MODAL */}
      {/* ========================= */}

      {activeQuiz && (

        <QuizModal
          quiz={activeQuiz}
          onAnswer={answerQuiz}
        />

      )}

    </main>

  )

}