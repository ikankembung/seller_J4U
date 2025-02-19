import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './homepage';
import KeuanganPage from './keuangan';
import SetupMenuPage from './setupmenu';
import MenuPage from './menu';
import PesananPage from './pesanan';
import AnalisisPage from './analisis';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/keuangan" element={<KeuanganPage />} />
        <Route path="/setupmenu" element={<SetupMenuPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/pesanan" element={<PesananPage />} />
        <Route path="/analisis" element={<AnalisisPage />} />
      </Routes>
    </Router>
  );
}

export default App; 