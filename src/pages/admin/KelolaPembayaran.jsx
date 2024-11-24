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

  const [jumlahTagihanPending, setJumlahTagihanPending] = useState(0);
  const [getTagihan, setPembayaran] = useState([]);
  const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ambil data jumlah kelas aktif dari API
    const fetchPembayaran = async () => {
      try {
        const data = await getJumlahTagihanPending();
        setJumlahTagihanPending(data.jumlah_tagihan_pending); // Update state dengan data dari API
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil data jumlah kelas aktif:",
          error
        );
      }
    };

    fetchPembayaran();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPembayaran();
        // console.log("Data yang diterima dari API:", data);
        setPembayaran(data);
      } catch (err) {
        setError("Gagal memuat data pembayaran.");
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getPembayaran();
  //       setPembayaran(data);
  //     } catch (err) {
  //       setError("Gagal memuat data pembayaran.");
  //     }
  //   };

  //   fetchData();
  // }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const data = await getTagihan(); // Panggil API
  //             setTagihan(data); // Simpan data ke state
  //         } catch (error) {
  //             console.error("Terjadi kesalahan saat mengambil data:", error);
  //         } finally {
  //             setIsLoading(false); // Matikan loading
  //         }
  //     };

  //     fetchData();
  // }, []);

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
            {jumlahTagihanPending}
          </p>
        </div>
      </div>

      {/* Tabel Daftar Pembayaran */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-[#212121] font-bold text-lg mb-4">
          Daftar Pembayaran
        </h3>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">ID Pembayaran</th>
                  <th className="py-2 px-4 border-b">Nama Siswa</th>
                  <th className="py-2 px-4 border-b">Tipe Kelas</th>
                  <th className="py-2 px-4 border-b">Tipe Pembayaran</th>
                  <th className="py-2 px-4 border-b">Jumlah</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Bukti Pembayaran</th>
                </tr>
              </thead>
              <tbody>
                {getTagihan.map((item) => (
                  <tr key={item.id_pembayaran}>
                    <td className="py-2 px-4 border-b text-center">
                      {item.id_pembayaran}
                    </td>
                    <td className="py-2 px-4 border-b">{item.nama_siswa}</td>
                    <td className="py-2 px-4 border-b text-center">
                      {item.tipe_kelas}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {item.tipe_pembayaran}
                    </td>
                    <td className="py-2 px-4 border-b text-right">
                      {parseFloat(item.jumlah).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td
                      className={`py-2 px-4 border-b text-center ${
                        item.status === "lunas"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.status}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">ID Pembayaran</th>
                  <th className="py-2 px-4 border-b">Nama Siswa</th>
                  <th className="py-2 px-4 border-b">Tipe Kelas</th>
                  <th className="py-2 px-4 border-b">Tipe Pembayaran</th>
                  <th className="py-2 px-4 border-b">Jumlah</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Bukti Pembayaran</th>
                </tr>
              </thead>
              <tbody>
                {getTagihan && getTagihan.length > 0 ? (
                  getTagihan.map((item) => (
                    <tr key={item.id_pembayaran}>
                      <td className="py-2 px-4 border-b text-center">
                        {item.id_pembayaran}
                      </td>
                      <td className="py-2 px-4 border-b">{item.nama_siswa}</td>
                      <td className="py-2 px-4 border-b text-center">
                        {item.tipe_kelas}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {item.tipe_pembayaran}
                      </td>
                      <td className="py-2 px-4 border-b text-right">
                        {parseFloat(item.jumlah).toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </td>
                      <td
                        className={`py-2 px-4 border-b text-center ${
                          item.status === "lunas"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {item.status}
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
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      Tidak ada data pembayaran.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default KelolaPembayaran;
