import React, { useState, useEffect } from "react";
import {
  getJumlahKelasAktif,
  getJumlahPengajar,
  getJumlahSiswa,
  getJumlahTagihanPending,
  getJumlahPengajuanPrivat,
  getJumlahPengajuanReguler,
} from "../../services/AdminService";
import AktivitasTerbaru from "../../components/AktivitasTerbaru";
import Calendar from "../../components/Calendar";
import { useNavigate } from "react-router-dom";


const DashboardAdmin = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const [jumlahKelasAktif, setJumlahKelasAktif] = useState(0);
  const [jumlahPengajar, setJumlahPengajar] = useState(0);
  const [jumlahSiswa, setJumlahSiswa] = useState(0);
  const [jumlahTagihanPending, setJumlahTagihanPending] = useState(0);
  const [jumlahPengajuanPrivat, setJumlahPengajuanPrivat] = useState(0);
  const [jumlahPengajuanReguler, setJumlahPengajuanReguler] = useState(0);


  useEffect(() => {
    // Ambil data jumlah kelas aktif dari API
    const fetchRingkasanAktif = async () => {
      try {
        const data = await getJumlahKelasAktif();
        const data2 = await getJumlahPengajar();
        const data3 = await getJumlahSiswa();
        const data4 = await getJumlahTagihanPending();
        const data5 = await getJumlahPengajuanPrivat();
        const data6 = await getJumlahPengajuanReguler();
        setJumlahKelasAktif(data.jumlah_kelas_aktif); // Update state dengan data dari API
        setJumlahPengajar(data2.jumlah_pengajar); // Update state dengan data dari API
        setJumlahSiswa(data3.jumlah_siswa); // Update state dengan data dari API
        setJumlahTagihanPending(data4.jumlah_tagihan_pending); // Update state dengan data dari API
        setJumlahPengajuanPrivat(data5.jumlah_request_privat); // Update state dengan data dari API
        setJumlahPengajuanReguler(data6.jumlah_request_reguler); // Update state dengan data dari API
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil data jumlah kelas aktif:",
          error
        );
      }
    };

    fetchRingkasanAktif();
  }, []); // Kosong berarti hanya dijalankan sekali saat komponen pertama kali dirender

  return (
    <div className="p-6 bg-gray-100 h-full flex flex-col gap-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-[#212121]">
        Selamat Datang, <span className="text-[#ff8c00]">Admin</span>
      </h1>

      {/* Ringkasan Aktivitas */}
      <h2 className="text-lg font-semibold text-[#212121] mb-2">
        Ringkasan Aktivitas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-[#00a9e0] font-bold text-lg">
            Jumlah Kelas Aktif
          </h3>
          <p className="text-[#00a9e0] text-4xl font-bold">
            {jumlahKelasAktif}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-[#00a9e0] font-bold text-lg">Jumlah Pengajar</h3>
          <p className="text-[#00a9e0] text-4xl font-bold">{jumlahPengajar}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-[#00a9e0] font-bold text-lg">
            Jumlah Siswa Terdaftar
          </h3>
          <p className="text-[#00a9e0] text-4xl font-bold">{jumlahSiswa}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-[#ff8c00] font-bold text-lg">
            Pembayaran Menunggu Verifikasi
          </h3>
          <p className="text-[#ff8c00] text-4xl font-bold">
            {jumlahTagihanPending}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-[#ff8c00] font-bold text-lg">
            Pengajuan Kelas Menunggu Verifikasi
          </h3>
          <p className="text-[#ff8c00] text-4xl font-bold">
            {jumlahPengajuanPrivat}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-[#ff8c00] font-bold text-lg">
            Permintaan Perubahan Jadwal
          </h3>
          <p className="text-[#ff8c00] text-4xl font-bold">
            {jumlahPengajuanReguler}
          </p>
        </div>
      </div>

      {/* Aksi Cepat */}
      <h2 className="text-lg font-semibold text-[#212121] mb-2">Aksi Cepat</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button onClick={() => handleNavigation("/kelola-kelas")}
        className="bg-[#00a9e0] text-white font-bold p-4 rounded-lg shadow hover:bg-[#007ab8] transition">
          Buat Kelas
        </button>
        <button onClick={() => handleNavigation("/kelola-pembayaran")}
        className="bg-[#00a9e0] text-white font-bold p-4 rounded-lg shadow hover:bg-[#007ab8] transition">
          Verifikasi Pembayaran
        </button>
        <button onClick={() => handleNavigation("/kelola-kelas")}
        className="bg-[#00a9e0] text-white font-bold p-4 rounded-lg shadow hover:bg-[#007ab8] transition">
          Verifikasi Kelas
        </button>
      </div>

      {/* Kalender dan Aktivitas Terbaru */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kalender */}
        <div>
          <h2 className="text-lg font-semibold text-[#212121] mb-4">
            Kalender
          </h2>
          <div className="bg-white p-6 rounded-lg shadow h-full">
            <Calendar />
          </div>
        </div>

        {/* Aktivitas Terbaru */}
        <div>
          <h2 className="text-lg font-semibold text-[#212121] mb-4">
            Aktivitas Terbaru
          </h2>
          <AktivitasTerbaru />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
