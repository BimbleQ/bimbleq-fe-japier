import React from "react";

const RegulerScheduleCard = ({ mataPelajaran, namaGuru, kelas, waktu }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="text-[#00a9e0] font-bold">{mataPelajaran || "[Nama Mata Pelajaran]"}</h4>
      <p className="text-gray-700">Nama Guru: {namaGuru || "Nama Guru"}</p>
      <p className="text-gray-700">Kelas: {kelas || "Kelas A"}</p>
      <p className="text-gray-700">Waktu: {waktu || "Waktu"}</p>
    </div>
  );
};

export default RegulerScheduleCard;