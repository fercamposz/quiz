import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  const navigate = useNavigate()
  const items = [{ label: 'Mapa', path: '/map' }, { label: 'Inventario', path: '/inventory' }, { label: 'Portal', path: '/final' }]

  return (
    <header className="fixed left-0 top-0 z-50 flex w-full justify-center gap-2 bg-[#17091d]/70 p-3 font-mono backdrop-blur-md">
      {items.map((item) => <motion.button key={item.path} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96, y: 2 }} onClick={() => navigate(item.path)} className="border-4 border-white bg-[#fff1f7] px-3 py-2 text-xs font-black uppercase tracking-widest text-[#db2777] shadow-[3px_3px_0_#831843] sm:px-4 sm:text-sm">{item.label}</motion.button>)}
    </header>
  )
}
