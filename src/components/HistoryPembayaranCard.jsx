import React from "react";

const HistoryPembayaranCard = ({ namaTagihan, jumlah, status, tanggal }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
      <div>
        <h4 className="font-bold text-[#212121]">{namaTagihan || "Nama Tagihan"}</h4>
        <p className="text-gray-700">Rp {jumlah || "0,00"}</p>
        <p className={`text-sm font-bold ${status === "PAID" ? "text-green-500" : "text-red-500"}`}>
          {status || "UNPAID"}
        </p>
      </div>
      <p className="text-gray-500 text-sm">{tanggal || "Tanggal"}</p>
    </div>
  );
};

export default HistoryPembayaranCard;
