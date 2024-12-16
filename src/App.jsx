import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Login from './pages/login';
import Register from './pages/register';
import Panduan from './pages/panduan';
import Dashboard from './pages/dashboard';
import Lokasi from './pages/lokasi';
import Laporan from './pages/laporan';
import Formreport from './pages/formreport';
import Pelaporan from './pages/pelaporan';
import RiwayatLaporan from './pages/RiwayatLaporan';
import LoginAdmin from './pages/loginadmin';
import LoginSuperAdmin from './pages/loginsuperadmin';
import DataAdmin from './pages/dataadmin';


function App() {
  return (
    <Router>
    <div>
      <Routes>
      <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/panduan" element={<Panduan />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lokasi" element={<Lokasi />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/formreport" element={<Formreport />} />
        <Route path="/pelaporan" element={<Pelaporan />} />
        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route path="/loginsuperadmin" element={<LoginSuperAdmin />} />
        <Route path="/riwayat/pelaporan" element={<RiwayatLaporan />} />
        <Route path="/dataadmin" element={<DataAdmin />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;