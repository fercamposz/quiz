import { motion } from 'framer-motion'

export default function LoadingScreen() {

  return (

    <main className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-primary
    ">

      <motion.div

        animate={{
          y: [0, -10, 0]
        }}

        transition={{
          repeat: Infinity,
          duration: 1
        }}

        className="
          pixel-box
          bg-pinky
          p-8
          rounded-3xl
          text-center
        "
      >

        <h1 className="
          text-sm
          leading-8
        ">
          Loading
          <br />
          Magical Forest...
        </h1>

      </motion.div>

    </main>

  )
}