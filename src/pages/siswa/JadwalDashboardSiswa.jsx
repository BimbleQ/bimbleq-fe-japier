import React, { useState, useEffect } from "react";
import ClassRequestCard from "../../components/ClassRequestCard";
import Calendar from "../../components/Calendar";
import DropdownPilihKelas from "../../components/DropdownPilihKelas";

const JadwalDashboardSiswa = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Fungsi untuk menampilkan modal
  const handleSubmit = (type) => {
    if (type === "kelas") {
      setModalMessage("Pengajuan kelas berhasil dikirim!");
    } else if (type === "permintaan") {
      setModalMessage("Permintaan perubahan jadwal berhasil dikirim!");
    }
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  // Atur overflow body saat modal terbuka
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Header */}
      <h1 className="text-xl font-semibold text-[#212121]">
        Dashboard / <span className="text-[#00a9e0]">Jadwal Kelas</span>
      </h1>

        {/* Status Pengajuan Kelas */}
      <section>
        <h2 className="text-lg font-semibold text-[#212121] mb-4">Status Pengajuan Kelas</h2>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <ClassRequestCard
            namaKelas="Fisika"
            waktu="10:00 - 12:00"
            statusPengajuan="Menunggu Verifikasi"
          />
        </div>
      </section>

       {/* Kalender */}
       <section>
        <h2 className="text-lg font-semibold text-[#212121] mb-4">Kalender</h2>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <Calendar />
        </div>
      </section>

      {/* Form Pengajuan */}
      <section>
        <h2 className="text-lg font-semibold text-[#212121] mb-4">Form Pengajuan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Form Pengajuan Kelas Privat */}
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-[#00a9e0] font-bold mb-4">Form Pengajuan Kelas Privat</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Mata Pelajaran</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Pilih Mata Pelajaran</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pengajar</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Pilih Pengajar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jadwal Kelas (Tanggal)</label>
                <input type="date" className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jam Kelas</label>
                <input type="time" className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Catatan Khusus</label>
                <textarea className="w-full p-2 border rounded-lg" rows="3"></textarea>
              </div>
              <button
                type="button"
                className="w-full p-2 bg-[#00a9e0] text-white font-bold rounded-lg hover:bg-[#007bb5] transition duration-200"
                onClick={() => handleSubmit("kelas")}
              >
                Ajukan Kelas
              </button>
            </form>
          </div>

          {/* Form Permintaan Perubahan Jadwal Kelas */}
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-[#00a9e0] font-bold mb-4">Form Permintaan Perubahan Jadwal Kelas</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Pilih Kelas Awal</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Pilih Kelas Awal</option>
                </select>
              </div>
              <div>
                <DropdownPilihKelas />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jadwal Baru</label>
                <input type="date" className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Alasan</label>
                <textarea className="w-full p-2 border rounded-lg" rows="3"></textarea>
              </div>
              <button
                type="button"
                className="w-full p-2 bg-[#00a9e0] text-white font-bold rounded-lg hover:bg-[#007bb5] transition duration-200"
                onClick={() => handleSubmit("permintaan")}
              >
                Ajukan Permintaan
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Jadwal Kelas Mingguan
      <section>
        <h2 className="text-lg font-semibold text-[#212121] mb-4">Jadwal Kelas Mingguan</h2>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border border-gray-300 p-2">Hari</th>
                <th className="border border-gray-300 p-2">Tanggal</th>
                <th className="border border-gray-300 p-2">Waktu</th>
                <th className="border border-gray-300 p-2">Jenis Kelas</th>
                <th className="border border-gray-300 p-2">Mata Pelajaran</th>
                <th className="border border-gray-300 p-2">Pengajar</th>
                <th className="border border-gray-300 p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Senin</td>
                <td className="border border-gray-300 p-2">20 Nov 2024</td>
                <td className="border border-gray-300 p-2">08:00 - 10:00</td>
                <td className="border border-gray-300 p-2">Reguler</td>
                <td className="border border-gray-300 p-2">Matematika</td>
                <td className="border border-gray-300 p-2">Ibu Ani</td>
                <td className="border border-gray-300 p-2">
                  <button className="text-[#00a9e0]">Detail</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section> */}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4 z-[10000]">
            <h3 className="text-lg font-semibold text-[#212121]">{modalMessage}</h3>
            <button
              className="px-4 py-2 bg-[#00a9e0] text-white rounded-lg hover:bg-[#007bb5] transition duration-200"
              onClick={closeModal}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JadwalDashboardSiswa;