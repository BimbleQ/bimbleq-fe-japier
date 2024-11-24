import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SideNav from "./components/sideNav";
import AuthService from "./services/AuthService"; // Import AuthService

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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login
  const [role, setRole] = useState(null); // Role pengguna (admin, guru, siswa)
  const [nama, setNama] = useState(""); 
  const [isLoading, setIsLoading] = useState(true); // State untuk loading

  // Validasi session saat aplikasi dimuat
  useEffect(() => {
    const validateSession = async () => {
      try {
        const sessionData = await AuthService.validateSession();
        setIsLoggedIn(true);
        setRole(sessionData.role); // Simpan role dari respons API
        setNama(sessionData.user.nama);
      } catch (error) {
        console.log("Session tidak valid:", error.message);
        setIsLoggedIn(false);
        setRole(null); // Reset role jika session tidak valid
        setNama("");
      } finally {
        setIsLoading(false); // Set loading selesai
      }
    };

    validateSession();
  }, []);

  // Redirect ke dashboard sesuai role
  const getDefaultRoute = () => {
    if (role === "admin") return <Navigate to="/admin" />;
    if (role === "pengajar") return <Navigate to="/guru" />;
    if (role === "siswa") return <Navigate to="/siswa" />;
    return null;
  };

  // Tampilkan loading jika masih memvalidasi session
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      {isLoggedIn ? (
        <div className="flex h-screen">
          {/* Sidenav */}
          <SideNav role={role} nama={nama} />

          {/* Konten */}
          <div className="flex-1 bg-gray-100 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={getDefaultRoute()} />
              {role === "admin" && (
                <>
                  <Route path="/admin" element={< DashboardAdmin />} />
                  <Route path="/kelola-kelas" element={<KelolaKelas/>} />
                  <Route path="/kelola-kelas/edit/:id" element={<EditKelas />} />
                  <Route path="/kelola-pengajar" element={<KelolaPengajar />} />
                  <Route path="/kelola-pengajar/edit/:id" element={<EditPengajar />} />
                  <Route path="/kelola-siswa" element={<KelolaSiswa />} />
                  <Route path="/kelola-siswa/edit/:id" element={<EditSiswa />} />
                  <Route path="/kelola-pembayaran" element={<KelolaPembayaran />} />
                  <Route path="/kelola-pelajaran" element={<KelolaPelajaran />} />
                </>
              )}
              {role === "pengajar" && (
                <>
                  <Route path="/guru" element={<DashboardGuru />} />
                  <Route path="/jadwal-kelas" element={<JadwalKelas />} />
                  <Route path="/input-nilai" element={<InputNilai />} />
                  <Route path="/input-presensi" element={<InputPresensi />} />
                </>
              )}
              {role === "siswa" && (
                <>
                  <Route path="/siswa" element={<DashboardSiswa nama={nama}/>} />
                  <Route path="/jadwal-kelas" element={<JadwalDashboardSiswa />} />
                  <Route path="/pembayaran" element={<PembayaranSiswa />} />
                </>
              )}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      ) : (
        // <Routes>
        //   <Route
        //     path="/login"
        //     element={<Login onLogin={async () => {
        //       try {
        //         const sessionData = await AuthService.validateSession();
        //         setRole(sessionData.role);
        //         setIsLoggedIn(true);
        //       } catch (error) {
        //         console.error("Login validasi gagal:", error.message);
        //       }
        //     }} />}
        //   />
        //   <Route path="*" element={<Navigate to="/login" />} />
        // </Routes>

        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={({ role, nama }) => {
              setRole(role);
              setNama(nama);
              setIsLoggedIn(true);
            }} />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
