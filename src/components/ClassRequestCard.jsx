import React from "react";

const ClassRequestCard = ({ namaKelas, waktu, statusPengajuan }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="text-[#ff8c00] font-bold">{namaKelas || "Nama Kelas"}</h4>
      <p className="text-gray-700">Waktu: {waktu || "Waktu"}</p>
      <p className="text-gray-700">Status Pengajuan: <span className="text-[#ff8c00]">{statusPengajuan || "Status"}</span></p>
    </div>
  );
};

export default ClassRequestCard;