import starPink from '../assets/pixel/star.svg'

export default function InventoryItem({ clue }) {
  const text = typeof clue === 'string' ? clue : clue.clue

  return (
    <div className="flex w-full items-center gap-4 border-4 border-white bg-[#fff1f7] p-4 text-[#35112f] shadow-[4px_4px_0_#9d174d] transition-transform hover:-translate-y-1">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#f9a8d4] bg-white">
        <img src={starPink} alt="" className="h-8 w-8" />
      </div>
      <p className="text-sm font-bold leading-6">{text}</p>
    </div>
  )
}
