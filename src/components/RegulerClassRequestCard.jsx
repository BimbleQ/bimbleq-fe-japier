import React from "react";

const RegulerClassRequestCard = ({
  mataPelajaran = "[Nama Mata Pelajaran]",
  kelasLama = "[Kelas Lama]",
  kelasBaru = "[Kelas Baru]",
  waktuLama = "[Waktu Lama]",
  waktuBaru = "[Waktu Baru]",
  namaPengajar = "[Nama Pengajar]",
  status = "[Status]",
}) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
      {/* Judul Card */}
      <h3 className="text-[#00a9e0] text-lg font-bold mb-4">Kelas Reguler</h3>

      {/* Nama Mata Pelajaran */}
      <p className="text-gray-800 font-medium mb-3">{mataPelajaran}</p>

      {/* Perubahan Kelas */}
      <div className="flex items-center text-gray-700 mb-2">
        <span className="font-medium">{kelasLama}</span>
        <span className="mx-2 text-[#00a9e0] font-bold">→</span>
        <span className="font-medium">{kelasBaru}</span>
      </div>

      {/* Perubahan Waktu */}
      <div className="flex items-center text-gray-700 mb-3">
        <span className="font-medium">{waktuLama}</span>
        <span className="mx-2 text-[#00a9e0] font-bold">→</span>
        <span className="font-medium">{waktuBaru}</span>
      </div>

      {/* Nama Pengajar */}
      <p className="text-gray-700 font-medium mb-3">{namaPengajar}</p>

      {/* Status */}
      <p className="text-[#ff8c00] font-bold">{status}</p>
    </div>
  );
};

export default RegulerClassRequestCard;
