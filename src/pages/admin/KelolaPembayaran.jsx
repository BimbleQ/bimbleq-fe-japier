import React, { useState } from "react";

const KelolaPembayaran = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      namaSiswa: "Siswa A",
      nominal: "Rp 1.000.000",
      waktuPembayaran: "2024-11-01",
      buktiPembayaran: "bukti-a.jpg",
      status: null,
    },
    {
      id: 2,
      namaSiswa: "Siswa B",
      nominal: "Rp 500.000",
      waktuPembayaran: "2024-11-02",
      buktiPembayaran: "bukti-b.jpg",
      status: null,
    },
    {
      id: 3,
      namaSiswa: "Siswa C",
      nominal: "Rp 750.000",
      waktuPembayaran: "2024-11-03",
      buktiPembayaran: "bukti-c.jpg",
      status: null,
    },
  ]);

  const handleAction = (id, action) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === id ? { ...payment, status: action } : payment
      )
    );
  };

  const pendingPaymentsCount = payments.filter(
    (payment) => payment.status === null
  ).length;

  return (
    <div className="p-6 bg-gray-100 h-full flex flex-col gap-6">
      {/* Header */}
      <h1 className="text-xl font-bold text-[#212121]">
        Dashboard / <span className="text-[#00a9e0]">Kelola Pembayaran</span>
      </h1>

      {/* Data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-[#ff8c00] font-bold text-lg">
            Pembayaran Menunggu Verifikasi
          </h3>
          <p className="text-[#ff8c00] text-4xl font-bold">
            {pendingPaymentsCount}
          </p>
        </div>
      </div>

      {/* Tabel Daftar Pembayaran */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-[#212121] font-bold text-lg mb-4">
          Daftar Pembayaran
        </h3>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Nama Siswa
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Nominal
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Waktu Pembayaran
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Bukti Pembayaran
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="p-3 border border-gray-300">
                  {payment.namaSiswa}
                </td>
                <td className="p-3 border border-gray-300">{payment.nominal}</td>
                <td className="p-3 border border-gray-300">
                  {payment.waktuPembayaran}
                </td>
                <td className="p-3 border border-gray-300">
                  <a
                    href={`/${payment.buktiPembayaran}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00a9e0] hover:underline"
                  >
                    [Lihat Bukti Pembayaran]
                  </a>
                </td>
                <td className="p-3 border border-gray-300 flex gap-2">
                  <button
                    onClick={() => handleAction(payment.id, "Terima")}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      payment.status === "Terima"
                        ? "bg-[#00a9e0] text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    Terima
                  </button>
                  <button
                    onClick={() => handleAction(payment.id, "Tolak")}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      payment.status === "Tolak"
                        ? "bg-red-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    Tolak
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KelolaPembayaran;