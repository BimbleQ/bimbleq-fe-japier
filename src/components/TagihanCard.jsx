import React from "react";

const TagihanCard = ({ namaTagihan, jumlah, status }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="text-[#ff8c00] font-bold">Tagihan Pembayaran</h4>
      <p className="text-gray-700">{namaTagihan || "Nama Tagihan"}</p>
      <p className="text-gray-700">{jumlah || "Jumlah"}</p>
      <p className="text-gray-700"><span className="text-[#ff8c00]">{status || "Status"}</span></p>
    </div>
  );
};

export default TagihanCard;