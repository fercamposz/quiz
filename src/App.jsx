import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MapPage from "./pages/MapPage.jsx";
import InventoryPage from "./pages/InventoryPage";
import FinalPuzzle from "./pages/FinalPuzzle";
import EndingPage from "./pages/EndingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/map" element={<MapPage />} />

        <Route path="/inventory" element={<InventoryPage />} />

        <Route path="/final" element={<FinalPuzzle />} />

        <Route path="/ending" element={<EndingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
