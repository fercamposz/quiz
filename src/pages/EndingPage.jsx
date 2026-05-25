import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function EndingPage() {
  const navigate = useNavigate();

  // Variantes para a animação flutuante contínua
  const floatingAnimation = {
    y: ["-10%", "10%"],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-pink-200 to-pink-100 flex flex-col items-center justify-center font-mono select-none">
      
      {/* --- HUD SUPERIOR (Corações e Barra de Vida) --- */}
      <div className="absolute top-6 left-0 w-full flex justify-center items-center gap-6 z-20">
        <div className="flex gap-1 text-2xl drop-shadow-md">
          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>❤️</motion.span>
          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>❤️</motion.span>
          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>❤️</motion.span>
        </div>
        
        {/* Barra de progresso estilo retro */}
        <div className="w-48 h-6 bg-pink-950 rounded-full border-4 border-pink-400 p-0.5 overflow-hidden shadow-lg">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: "100%" }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-pink-500 rounded-full"
          />
        </div>
      </div>

      {/* --- CÉU E ESTRELAS (Background decorativo) --- */}
      <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
        <div className="absolute top-10 left-20 text-white text-3xl">✨</div>
        <div className="absolute top-32 right-32 text-white text-2xl">✨</div>
        <div className="absolute top-1/4 left-1/3 text-white text-xl">☁️</div>
        <div className="absolute top-1/5 right-1/4 text-white text-3xl">☁️</div>
      </div>

      {/* --- ÁREA CENTRAL (Texto e Elementos Flutuantes) --- */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        
        {/* Fantasminha Esquerdo */}
        <motion.div animate={floatingAnimation} className="absolute -left-10 md:left-20 top-10 text-6xl drop-shadow-xl">
          👻
        </motion.div>

        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="text-center z-20"
        >
          {/* O text-shadow simula a borda pixelada da referência */}
          <h1 
            className="text-5xl md:text-7xl font-black text-pink-400 tracking-widest leading-tight mb-4"
            style={{ 
              textShadow: '3px 3px 0 #fff, -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff, 6px 6px 0 #b83280' 
            }}
          >
            PARABÉNS
            <br />
            VOCÊ VENCEU
          </h1>
        </motion.div>

        {/* Fantasminha Direito */}
        <motion.div animate={floatingAnimation} className="absolute -right-10 md:right-20 top-20 text-6xl drop-shadow-xl" style={{ animationDelay: '1s' }}>
          👻
        </motion.div>

      </div>

      {/* --- CHÃO DE GRAMA E CERCA --- */}
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-b from-green-400 to-green-600 border-t-8 border-green-300 z-0">
         {/* Detalhes de florzinhas na grama */}
         <div className="absolute top-4 left-10 text-xl">🌸</div>
         <div className="absolute top-12 left-1/4 text-xl">🌷</div>
         <div className="absolute top-6 right-1/3 text-xl">🌸</div>
         <div className="absolute top-10 right-10 text-xl">🌷</div>
      </div>

      {/* --- BOTÕES INFERIORES --- */}
      <div className="absolute bottom-8 left-8 flex gap-4 z-20">
        <button
          onClick={() => navigate('/map')}
          className="bg-pink-400 hover:bg-pink-300 text-white font-bold py-2 px-6 rounded-md border-4 border-white shadow-[4px_4px_0px_#97266d] active:shadow-[0px_0px_0px_#97266d] active:translate-y-1 transition-all"
        >
          START
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="bg-pink-400 hover:bg-pink-300 text-white font-bold py-2 px-6 rounded-md border-4 border-white shadow-[4px_4px_0px_#97266d] active:shadow-[0px_0px_0px_#97266d] active:translate-y-1 transition-all"
        >
          BACK
        </button>
      </div>

    </main>
  );
}