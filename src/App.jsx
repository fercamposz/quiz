import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import MapPage from './pages/mapPage'
import InventoryPage from './pages/inventoryPage'
import FinalPuzzle from './pages/finalPuzzle'
import EndingPage from './pages/endingPage'

export default function App() {
  return (
    <BrowserRouter>
      {/* rotas do jogo */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/final" element={<FinalPuzzle />} />
        <Route path="/ending" element={<EndingPage />} />
      </Routes>
    </BrowserRouter>
  )
}
