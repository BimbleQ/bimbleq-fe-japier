import React from "react";

const TagihanCard = ({ namaTagihan, jumlah, status }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="text-[#ff8c00] font-bold">Tagihan Pembayaran</h4>
      <p className="text-gray-700">Nama Tagihan: {namaTagihan || "Nama Tagihan"}</p>
      <p className="text-gray-700">Jumlah: {jumlah || "Jumlah"}</p>
      <p className="text-gray-700">Status Pembayaran: <span className="text-[#ff8c00]">{status || "Status"}</span></p>
    </div>
  );
};

export default TagihanCard;