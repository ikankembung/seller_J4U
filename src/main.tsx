import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import "./index.css";
import App from "./loginpage.tsx";
import Homepage from "./homepage.tsx";
import Keuangan from "./keuangan.tsx";
import SetupMenu from "./setupmenu.tsx";
import Menu from "./menu.tsx";
import PesananPage from "./pesanan.tsx";
import AnalisisPage from "./analisis.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/keuangan" element={<Keuangan />} />
        <Route path="/setupmenu" element={<SetupMenu />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pesanan" element={<PesananPage />} />
        <Route path="/analisis" element={<AnalisisPage />} />
      </Routes>
    </Router>
  </StrictMode>
);