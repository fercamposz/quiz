import { useGameStore } from '../store/gameStore'
import { useNavigate } from 'react-router-dom'

export default function FinalPuzzle(){

  const {clues} = useGameStore()

  const navigate = useNavigate()

  function finish(){

    const finalText = clues.join(' ')

    if(finalText.includes('A CHAVE')){
      navigate('/ending')
    }else{
      alert('Organize corretamente')
    }
  }

  return(

    <main className="min-h-screen p-6 bg-pinky flex flex-col items-center justify-center">

      <div className="pixel-box bg-white p-6 rounded-3xl max-w-md w-full">

        <h1 className="text-lg mb-8 text-center">
          ENIGMA FINAL
        </h1>

        <div className="space-y-4 mb-6">

          {clues.map((clue)=>(
            <div
              key={clue}
              className="bg-primary p-4 rounded-xl border-4 border-black"
            >
              {clue}
            </div>
          ))}

        </div>

        <button
          onClick={finish}
          className="pixel-btn rounded-xl w-full"
        >
          FINALIZAR
        </button>

      </div>

    </main>
  )
}