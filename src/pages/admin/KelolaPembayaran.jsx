import React, { useState, useEffect } from "react";
import {
  getJumlahTagihanPending,
  getPembayaran,
} from "../../services/AdminService";

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

  const [jumlahTagihanPending, setJumlahTagihanPending] = useState(0);
  const [getTagihan, setPembayaran] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPembayaran = async () => {
      try {
        const data = await getJumlahTagihanPending();
        setJumlahTagihanPending(data.jumlah_tagihan_pending);
      } catch (error) {
        console.error("Error fetching tagihan:", error);
      }
    };

    fetchPembayaran();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPembayaran();
        setPembayaran(data);
      } catch (err) {
        setError("Gagal memuat data pembayaran.");
      }
    };

    fetchData();
  }, []);

  const handleAction = (id, action) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === id ? { ...payment, status: action } : payment
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col gap-6">
      {/* Header */}
      <h1 className="text-xl font-bold text-[#212121]">
        Dashboard / <span className="text-[#00a9e0]">Kelola Pembayaran</span>
      </h1>

      {/* Data Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-[#ff8c00] font-bold text-lg">
            Pembayaran Menunggu Verifikasi
          </h3>
          <p className="text-[#ff8c00] text-4xl font-bold">
            {jumlahTagihanPending}
          </p>
        </div>
      </div>

      {/* Tabel Daftar Pembayaran */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-[#212121] mb-4">
          Daftar Pembayaran
        </h3>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">
                    ID Pembayaran
                  </th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">
                    Nama Siswa
                  </th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">
                    Tipe Kelas
                  </th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">
                    Tipe Pembayaran
                  </th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">
                    Jumlah
                  </th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">
                    Status
                  </th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">
                    Bukti Pembayaran
                  </th>
                  <th className="py-2 px-4 border-b text-center text-gray-600 font-semibold">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {getTagihan.map((item) => (
                  <tr key={item.id_pembayaran}>
                    <td className="py-2 px-4 border-b text-center">
                      {item.id_pembayaran}
                    </td>
                    <td className="py-2 px-4 border-b">{item.nama_siswa}</td>
                    <td className="py-2 px-4 border-b">{item.tipe_kelas}</td>
                    <td className="py-2 px-4 border-b">{item.tipe_pembayaran}</td>
                    <td className="py-2 px-4 border-b text-right">
                      {parseFloat(item.jumlah).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td
                      className={`py-2 px-4 border-b text-center ${
                        item.status === "lunas"
                          ? "text-green-500 font-bold"
                          : "text-red-500 font-bold"
                      }`}
                    >
                      {item.status || "Menunggu"}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {item.link_bukti ? (
                        <a
                          href={item.link_bukti}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Lihat Bukti
                        </a>
                      ) : (
                        "Tidak Ada"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b flex gap-2 justify-center">
                      <button
                        onClick={() => handleAction(item.id_pembayaran, "lunas")}
                        className="bg-[#00a9e0] text-white px-4 py-2 rounded-md hover:bg-[#007ab8] transition"
                      >
                        Terima
                      </button>
                      <button
                        onClick={() => handleAction(item.id_pembayaran, "tolak")}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                      >
                        Tolak
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default KelolaPembayaran;