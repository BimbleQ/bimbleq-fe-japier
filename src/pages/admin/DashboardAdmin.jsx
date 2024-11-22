import React from "react";
import AktivitasTerbaru from "../components/AktivitasTerbaru";
import Calendar from "../components/Calendar";

const DashboardAdmin = () => {
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
          <h3 className="text-[#00a9e0] font-bold text-lg">Jumlah Kelas Aktif</h3>
          <p className="text-[#00a9e0] text-4xl font-bold">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-[#00a9e0] font-bold text-lg">Jumlah Pengajar</h3>
          <p className="text-[#00a9e0] text-4xl font-bold">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-[#00a9e0] font-bold text-lg">Jumlah Siswa Terdaftar</h3>
          <p className="text-[#00a9e0] text-4xl font-bold">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-[#ff8c00] font-bold text-lg">
            Pembayaran Menunggu Verifikasi
          </h3>
          <p className="text-[#ff8c00] text-4xl font-bold">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-[#ff8c00] font-bold text-lg">
            Pengajuan Kelas Menunggu Verifikasi
          </h3>
          <p className="text-[#ff8c00] text-4xl font-bold">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-[#ff8c00] font-bold text-lg">
            Permintaan Perubahan Jadwal
          </h3>
          <p className="text-[#ff8c00] text-4xl font-bold">0</p>
        </div>
      </div>

      {/* Aksi Cepat */}
      <h2 className="text-lg font-semibold text-[#212121] mb-2">Aksi Cepat</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-[#00a9e0] text-white font-bold p-4 rounded-lg shadow hover:bg-[#007ab8] transition">
          Buat Kelas
        </button>
        <button className="bg-[#00a9e0] text-white font-bold p-4 rounded-lg shadow hover:bg-[#007ab8] transition">
          Verifikasi Pembayaran
        </button>
        <button className="bg-[#00a9e0] text-white font-bold p-4 rounded-lg shadow hover:bg-[#007ab8] transition">
          Verifikasi Kelas
        </button>
      </div>

      {/* Kalender dan Aktivitas Terbaru */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kalender */}
        <div>
          <h2 className="text-lg font-semibold text-[#212121] mb-4">Kalender</h2>
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