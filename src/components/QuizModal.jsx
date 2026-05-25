import { motion } from 'framer-motion'

export default function QuizModal({

  quiz,
  onAnswer

}) {

  return (

    <div className="
      fixed
      inset-0
      bg-black/60
      backdrop-blur-sm
      z-50
      flex
      items-center
      justify-center
      p-4
    ">

      <motion.div

        initial={{
          scale: 0.8,
          opacity: 0
        }}

        animate={{
          scale: 1,
          opacity: 1
        }}

        className="
          bg-pink-100
          w-full
          max-w-md
          rounded-3xl
          border-4
          border-white
          shadow-[8px_8px_0px_#ec4899]
          p-6
        "
      >

        <h2 className="
          text-2xl
          font-black
          text-pink-500
          mb-6
          text-center
        ">
          QUIZ ✨
        </h2>

        <p className="
          text-center
          font-bold
          text-gray-700
          mb-6
        ">
          {quiz.question}
        </p>

        <div className="
          flex
          flex-col
          gap-3
        ">

          {quiz.answers.map(
            (answer) => (

              <button

                key={answer}

                onClick={() =>
                  onAnswer(answer)
                }

                className="
                  bg-pink-400
                  hover:bg-pink-300
                  transition-all
                  text-white
                  font-bold
                  py-3
                  rounded-2xl
                  border-4
                  border-white
                  shadow-[4px_4px_0px_#be185d]
                "
              >
                {answer}
              </button>

            )
          )}

        </div>

      </motion.div>

    </div>

  )

}