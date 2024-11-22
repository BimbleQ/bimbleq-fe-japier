import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import ProfilePic from "../assets/profilePic.png";
import AuthService from "../services/AuthService"; // Import AuthService
import "../sideNav.css";

const SideNav = ({ role }) => {
  const [activeLink, setActiveLink] = useState("Dashboard");

  // Menu items berdasarkan role
  const menuItems = {
    admin: [
      { name: "Dashboard", to: "/admin" },
      { name: "Kelola Kelas", to: "/kelola-kelas" },
      { name: "Kelola Pengajar", to: "/kelola-pengajar" },
      { name: "Kelola Siswa", to: "kelola-siswa" },
      { name: "Kelola Pembayaran", to: "kelola-pembayaran" },
      { name: "Kelola Pelajaran", to: "kelola-pelajaran" },
    ],
    pengajar: [
      { name: "Dashboard", to: "/guru" },
      { name: "Jadwal Kelas", to: "jadwal-kelas" },
      { name: "Input Nilai", to: "input-nilai" },
      { name: "Input Presensi", to: "input-presensi" },
    ],
    siswa: [
      { name: "Dashboard", to: "/siswa" },
      { name: "Jadwal Kelas", to: "/jadwal-kelas" },
      { name: "Pembayaran", to: "/pembayaran" },
    ],
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout(); // Panggil fungsi logout dari AuthService
      alert("Logout berhasil!");
    } catch (error) {
      console.error("Gagal logout:", error.message);
      alert("Gagal logout. Silakan coba lagi.");
    }
  };

  return (
    <div className="sideNav_wrapper">
      {/* Logo Section */}
      <div className="logo_wrapper">
        <img src={Logo} alt="Logo" />
      </div>
      {/* Profile Section */}
      <div className="profile_wrapper">
        <div className="profilepic_wrapper">
          <img src={ProfilePic} alt="Profile" />
        </div>
        <div className="namaEmail_wrapper">
          <p className="nama_siswa">Javier Jinan</p>
          <p className="email_siswa">email@gmail.com</p>
        </div>
      </div>
      <hr />
      {/* Navigation Links */}
      <div className="navLink_wrapper">
        {menuItems[role]?.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={`nav_link ${
              activeLink === item.name ? "active" : ""
            }`}
            onClick={() => setActiveLink(item.name)}
          >
            {item.name}
          </Link>
        ))}
      </div>
      {/* Logout Button */}
      <div className="logout_wrapper">
        <button className="logout_button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideNav;
