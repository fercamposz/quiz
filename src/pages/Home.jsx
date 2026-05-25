import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import kuromiGif from "../assets/pixel/kuromigif.gif";

export default function Home() {

  const navigate = useNavigate();

  // =========================
  // ANIMAÇÃO
  // =========================

  const floatingAnimation = {

    y: ["-8%", "8%"],

    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },

  };

  return (

    <main className="
      min-h-screen
      relative
      overflow-hidden
      bg-gradient-to-b
      from-pink-200
      to-pink-300
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

        {/* NUVENS */}

        <div className="
          absolute
          top-0
          w-full
          h-32
          bg-white/30
          rounded-b-full
          blur-xl
        "></div>

        {/* ESTRELAS */}

        <div className="
          absolute
          top-20
          left-10
          md:left-32
          text-white
          text-3xl
          opacity-80
        ">
          ✨
        </div>

        <div className="
          absolute
          top-40
          right-10
          md:right-32
          text-white
          text-4xl
          opacity-80
        ">
          ✨
        </div>

      </div>

      {/* ========================= */}
      {/* HUD */}
      {/* ========================= */}

      <div className="
        absolute
        top-6
        w-full
        px-8
        flex
        items-center
        justify-start
        gap-8
        z-30
      ">

        {/* CORAÇÕES */}

        <div className="
          flex
          gap-2
          text-3xl
        ">

          <span
            style={{
              textShadow: "2px 2px 0 #000"
            }}
          >
            ❤️
          </span>

          <span
            style={{
              textShadow: "2px 2px 0 #000"
            }}
          >
            ❤️
          </span>

          <span
            style={{
              textShadow: "2px 2px 0 #000"
            }}
          >
            ❤️
          </span>

        </div>

        {/* BARRA */}

        <div className="
          w-48
          h-6
          bg-pink-950
          rounded-full
          border-4
          border-black
          p-0.5
          overflow-hidden
        ">

          <div className="
            w-1/3
            h-full
            bg-pink-400
            rounded-full
          " />

        </div>

      </div>

      {/* ========================= */}
      {/* TITULO */}
      {/* ========================= */}

      <div className="
        relative
        z-20
        flex-1
        flex
        flex-col
        items-center
        justify-center
        mt-10
      ">

        <motion.h1

          initial={{
            scale: 0.8,
            opacity: 0
          }}

          animate={{
            scale: 1,
            opacity: 1
          }}

          transition={{
            type: "spring",
            bounce: 0.5
          }}

          className="
            text-5xl
            md:text-7xl
            font-black
            text-pink-400
            tracking-widest
            leading-tight
            text-center
          "

          style={{
            textShadow:
              "3px 3px 0 #fff, -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff, 6px 6px 0 #b83280",
          }}

        >

          TREASURE

          <br />

          HUNT

        </motion.h1>

      </div>

      {/* ========================= */}
      {/* CERCA + FANTASMAS */}
      {/* ========================= */}

      <div className="
        absolute
        bottom-[20%]
        w-full
        h-40
        z-10
        flex
        items-end
        justify-center
      ">

        {/* CERCA */}

        <div className="
          absolute
          bottom-0
          w-full
          h-24
          border-y-8
          border-white/90
          bg-white/10
          flex
          justify-around
          items-center
          px-4
        ">

          {[...Array(15)].map((_, i) => (

            <div

              key={i}

              className="
                relative
                w-4
                h-32
                bg-white/90
                rounded-t-lg
                shadow-sm
                border-x-2
                border-white
              "
            >

              {i % 2 === 0 && (

                <span className="
                  absolute
                  top-6
                  -left-2
                  text-sm
                  opacity-80
                ">
                  🌹
                </span>

              )}

            </div>

          ))}

        </div>

        {/* FANTASMA ESQUERDO */}

        <motion.img

          src={kuromiGif}

          alt="Fantasma esquerdo"

          animate={floatingAnimation}

          className="
            absolute
            left-8
            md:left-1/4
            bottom-10
            w-32
            object-contain
            scale-x-[-1]
            drop-shadow-lg
            z-20
          "
        />

        {/* FANTASMA DIREITO */}

        <motion.img

          src={kuromiGif}

          alt="Fantasma direito"

          animate={floatingAnimation}

          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.5
          }}

          className="
            absolute
            right-8
            md:right-1/4
            bottom-16
            w-32
            object-contain
            drop-shadow-lg
            z-20
          "
        />

      </div>

      {/* ========================= */}
      {/* GRAMA */}
      {/* ========================= */}

      <div className="
        absolute
        bottom-0
        w-full
        h-[25%]
        bg-gradient-to-b
        from-green-400
        to-green-600
        border-t-8
        border-green-300
        z-20
      ">

        <div className="
          absolute
          top-2
          left-10
          text-green-700/20
          text-2xl
          font-black
        ">
          ||
        </div>

        <div className="
          absolute
          top-6
          left-1/4
          text-green-700/20
          text-2xl
          font-black
        ">
          ||
        </div>

        <div className="
          absolute
          top-4
          right-1/3
          text-green-700/20
          text-2xl
          font-black
        ">
          ||
        </div>

      </div>

      {/* ========================= */}
      {/* BOTÕES */}
      {/* ========================= */}

      <div className="
        absolute
        bottom-8
        left-1/2
        -translate-x-1/2
        flex
        gap-4
        z-30
      ">

        <button

          onClick={() => navigate("/map")}

          className="
            bg-pink-400
            hover:bg-pink-300
            text-white
            font-bold
            text-xl
            py-2
            px-6
            rounded-lg
            border-4
            border-white
            shadow-[4px_4px_0px_#97266d]
            active:shadow-none
            active:translate-y-1
            transition-all
          "
        >
          START
        </button>

        <button

          onClick={() => navigate("/")}

          className="
            bg-pink-400
            hover:bg-pink-300
            text-white
            font-bold
            text-xl
            py-2
            px-6
            rounded-lg
            border-4
            border-white
            shadow-[4px_4px_0px_#97266d]
            active:shadow-none
            active:translate-y-1
            transition-all
          "
        >
          BACK
        </button>

      </div>

    </main>

  );

}