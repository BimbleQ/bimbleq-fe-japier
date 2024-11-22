import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SideNav from "./components/sideNav";

// Halaman Login
import Login from "./pages/login/login";

// Admin Pages
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import KelolaKelas from "./pages/admin/KelolaKelas";
import EditKelas from "./pages/admin/EditKelas";
import KelolaPengajar from "./pages/admin/KelolaPengajar";
import EditPengajar from "./pages/admin/EditPengajar";
import KelolaSiswa from "./pages/admin/KelolaSiswa";
import EditSiswa from "./pages/admin/EditSiswa";
import KelolaPembayaran from "./pages/admin/KelolaPembayaran";
import KelolaPelajaran from "./pages/admin/KelolaPelajaran";

// Guru Pages
import DashboardGuru from "./pages/guru/DashboardGuru";
import JadwalKelas from "./pages/guru/JadwalKelas";
import InputNilai from "./pages/guru/InputNilai";
import InputPresensi from "./pages/guru/InputPresensi";

// Siswa Pages
import DashboardSiswa from "./pages/siswa/DashboardSiswa";
import JadwalDashboardSiswa from "./pages/siswa/JadwalDashboardSiswa";
import PembayaranSiswa from "./pages/siswa/PembayaranSiswa";

import "./index.css";
import "@fontsource/poppins"; // Menggunakan font Poppins

const App = () => {
  // Simulasi state untuk login
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulasi login
  const [role, setRole] = useState(null); // Simulasi role (admin, guru, siswa)

  // Fungsi login simulasi
  const handleLogin = (userRole) => {
    setRole(userRole);
    setIsLoggedIn(true);
  };

  // Render routes berdasarkan role
  const renderRoutes = () => {
    if (role === "admin") {
      return (
        <Routes>
          <Route path="/" element={<DashboardAdmin />} />
          <Route path="/kelola-kelas" element={<KelolaKelas />} />
          <Route path="/kelola-kelas/edit/:id" element={<EditKelas />} />
          <Route path="/kelola-pengajar" element={<KelolaPengajar />} />
          <Route path="/kelola-pengajar/edit/:id" element={<EditPengajar />} />
          <Route path="/kelola-siswa" element={<KelolaSiswa />} />
          <Route path="/kelola-siswa/edit/:id" element={<EditSiswa />} />
          <Route path="/kelola-pembayaran" element={<KelolaPembayaran />} />
          <Route path="/kelola-pelajaran" element={<KelolaPelajaran />} />
        </Routes>
      );
    } else if (role === "guru") {
      return (
        <Routes>
          <Route path="/" element={<DashboardGuru />} />
          <Route path="/jadwal-kelas" element={<JadwalKelas />} />
          <Route path="/input-nilai" element={<InputNilai />} />
          <Route path="/input-presensi" element={<InputPresensi />} />
        </Routes>
      );
    } else if (role === "siswa") {
      return (
        <Routes>
          <Route path="/" element={<DashboardSiswa />} />
          <Route path="/jadwal-kelas" element={<JadwalDashboardSiswa />} />
          <Route path="/pembayaran" element={<PembayaranSiswa />} />
        </Routes>
      );
    } else {
      return <Navigate to="/" />;
    }
  };

  return (
    <Router>
      {isLoggedIn ? (
        <div className="flex h-screen">
          {/* Sidenav */}
          <SideNav role={role} />

          {/* Konten */}
          <div className="flex-1 bg-gray-100 overflow-y-auto p-6">{renderRoutes()}</div>
        </div>
      ) : (
        <Routes>
          {/* Route ke halaman login */}
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          {/* Redirect ke login jika belum login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;