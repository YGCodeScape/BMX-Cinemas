import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Career from "../pages/Career";
import Advertise from "../pages/Advertise";
import Corporate from "../pages/Corporate";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career" element={<Career />} />
        <Route path="/advertise" element={<Advertise />} />
        <Route path="/corporate" element={<Corporate />} />
        
        {/* ---------- FALLBACK ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}