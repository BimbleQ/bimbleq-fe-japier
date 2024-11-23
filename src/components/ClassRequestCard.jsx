import React from "react";

const ClassRequestCard = ({
  judulCard,
  mataPelajaran,
  namaPengajar,
  kelasLama,
  kelasBaru,
  waktuAwal,
  waktuBaru,
  waktu,
  status
}) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-[#00a9e0] font-bold mb-4">{judulCard}</h3>
      <p><strong>Mata Pelajaran:</strong> {mataPelajaran}</p>
      {kelasLama && <p><strong>Kelas Lama:</strong> {kelasLama}</p>}
      {kelasBaru && <p><strong>Kelas Baru:</strong> {kelasBaru}</p>}
      {waktuAwal && <p><strong>Waktu Awal:</strong> {waktuAwal}</p>}
      {waktuBaru && <p><strong>Waktu Baru:</strong> {waktuBaru}</p>}
      {waktu && <p><strong>Waktu:</strong> {waktu}</p>}
      <p><strong>Nama Pengajar:</strong> {namaPengajar}</p>
      <p><strong>Status:</strong> {status}</p>
    </div>
  );
};

export default ClassRequestCard;
