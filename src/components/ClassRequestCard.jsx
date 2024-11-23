import React from "react";
import { FaClock } from "react-icons/fa"; // Menggunakan ikon dari react-icons

const ClassRequestCard = ({
  judulCard = "Kelas Privat",
  mataPelajaran = "[Nama Mata Pelajaran]",
  namaPengajar = "[Nama Pengajar]",
  tanggal = "[Tanggal]",
  waktu = "[Waktu]",
  status = "[Status]",
}) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
      {/* Judul Card */}
      <h3 className="text-[#00a9e0] text-lg font-bold mb-4">{judulCard}</h3>

      {/* Nama Mata Pelajaran */}
      <p className="text-gray-800 font-medium mb-3">{mataPelajaran}</p>

      {/* Tanggal */}
      <p className="text-gray-800 font-medium mb-3">{tanggal}</p>

      {/* Waktu dengan Ikon Jam */}
      <div className="flex items-center text-gray-700 font-medium mb-3">
        <FaClock className="mr-2 text-[#00a9e0]" /> {/* Ikon jam */}
        {waktu}
      </div>

      {/* Nama Pengajar */}
      <p className="text-gray-700 font-medium mb-3">{namaPengajar}</p>

      {/* Status */}
      <p className="text-[#ff8c00] font-bold">{status}</p>
    </div>
  );
};

export default ClassRequestCard;
