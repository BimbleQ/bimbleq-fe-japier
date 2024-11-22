import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import ProfilePic from "../assets/profilePic.png";
import "../sideNav.css";

const SideNav = ({ role }) => {
  const [activeLink, setActiveLink] = useState("Dashboard");

  // Menu items berdasarkan role
  const menuItems = {
    admin: [
      { name: "Dashboard", to: "/admin" },
      { name: "Kelola Kelas", to: "/admin/kelola-kelas" },
      { name: "Kelola Pengajar", to: "/admin/kelola-pengajar" },
      { name: "Kelola Siswa", to: "/admin/kelola-siswa" },
      { name: "Kelola Pembayaran", to: "/admin/kelola-pembayaran" },
      { name: "Kelola Pelajaran", to: "/admin/kelola-pelajaran" },
    ],
    guru: [
      { name: "Dashboard", to: "/guru" },
      { name: "Jadwal Kelas", to: "/guru/jadwal-kelas" },
      { name: "Input Nilai", to: "/guru/input-nilai" },
      { name: "Input Presensi", to: "/guru/input-presensi" },
    ],
    siswa: [
      { name: "Dashboard", to: "/siswa" },
      { name: "Jadwal Kelas", to: "/siswa/jadwal-kelas" },
      { name: "Pembayaran", to: "/siswa/pembayaran" },
    ],
  };

  const handleLogout = () => {
    // Logic untuk logout
    alert("Logout berhasil!");
    localStorage.removeItem("role"); // Hapus role dari localStorage
    window.location.href = "/login"; // Redirect ke halaman login
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