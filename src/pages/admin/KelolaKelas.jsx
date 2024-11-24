import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getJumlahKelasAktif,
  getJumlahPengajuanPrivat,
  getJumlahPengajuanReguler,
  getKelas,
  getPengajuanKelasPrivat,
  getPerubahanKelasReguler,
  postTambahKelas,
} from "../../services/AdminService";

const KelolaKelas = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    namaKelas: "",
    jenisKelas: "",
    mataPelajaran: "",
    pengajar: "",
    tanggal: "",
  });

  const [jumlahPengajuanPrivat, setJumlahPengajuanPrivat] = useState(0);
  const [jumlahPengajuanReguler, setJumlahPengajuanReguler] = useState(0);
  const [jumlahKelasAktif, setJumlahKelasAktif] = useState(0);
  const [dataKelas, setDataKelas] = useState([]);
  const [pengajuanKelasPrivat, setPengajuanKelasPrivat] = useState([]);
  const [perubahanKelasReguler, setPerubahanKelasReguler] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ambil data jumlah kelas aktif dari API
    const fetchRingkasan = async () => {
      try {
        const data = await getJumlahKelasAktif();
        const data2 = await getJumlahPengajuanPrivat();
        const data3 = await getJumlahPengajuanReguler();
        setJumlahKelasAktif(data.jumlah_kelas_aktif); // Update state dengan data dari API
        setJumlahPengajuanPrivat(data2.jumlah_request_privat); // Update state dengan data dari API
        setJumlahPengajuanReguler(data3.jumlah_request_reguler); // Update state dengan data dari API
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil data jumlah kelas aktif:",
          error
        );
      }
    };

    fetchRingkasan();
  }, []);

  const fetchDaftarKelas = async () => {
    try {
      const kelas = await getKelas(); // Panggil service
      setDataKelas(kelas); // Simpan data ke state
      setIsLoading(false); // Selesai loading
    } catch (err) {
      setError(err); // Tangkap error
      setIsLoading(false);
    }
  };
  const fetchKelasPrivat = async () => {
    try {
      const kelasPrivat = await getPengajuanKelasPrivat(); // Panggil service
      setPengajuanKelasPrivat(kelasPrivat); // Simpan data ke state
      setIsLoading(false); // Selesai loading
    } catch (err) {
      setError(err); // Tangkap error
      setIsLoading(false);
    }
  };
  const fetchKelasReguler = async () => {
    try {
      const kelasReguler = await getPerubahanKelasReguler(); // Panggil service
      setPerubahanKelasReguler(kelasReguler); // Simpan data ke state
      setIsLoading(false); // Selesai loading
    } catch (err) {
      setError(err); // Tangkap error
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDaftarKelas();
    fetchKelasPrivat(); // Fetch data saat komponen pertama kali di-load
    fetchKelasReguler(); // Fetch data saat komponen pertama kali di-load
  }, []);

  if (isLoading) {
    return <p>Loading data...</p>; // Placeholder saat loading
  }

  if (error) {
    return <p>Terjadi kesalahan: {error.message}</p>; // Tampilkan error jika ada
  }

  return (
    <div className="p-6 bg-gray-100 h-full flex flex-col gap-6">
      {/* Breadcrumb */}
      <h2 className="text-xl font-semibold text-[#212121]">
        Dashboard / <span className="text-[#00a9e0]">Kelola Kelas</span>
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Data Summary */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-[#00a9e0] font-bold text-lg">
              Jumlah Kelas Aktif
            </h3>
            <p className="text-[#00a9e0] text-4xl font-bold">
              {jumlahKelasAktif}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-[#ff8c00] font-bold text-lg">
              Pengajuan Kelas Menunggu Verifikasi
            </h3>
            <p className="text-[#ff8c00] text-4xl font-bold">
              {jumlahPengajuanPrivat}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-[#ff8c00] font-bold text-lg">
              Pengajuan Perubahan Jadwal
            </h3>
            <p className="text-[#ff8c00] text-4xl font-bold">
              {jumlahPengajuanReguler}
            </p>
          </div>
        </div>

        {/* Form Buat Kelas Baru */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-[#00a9e0] font-bold text-lg mb-4">
            Form Buat Kelas Baru
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="namaKelas"
              placeholder="Nama Kelas"
              value={formData.namaKelas}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              name="jenisKelas"
              value={formData.jenisKelas}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Jenis Kelas
              </option>
              <option value="Privat">Privat</option>
              <option value="Reguler">Reguler</option>
            </select>

            <select
              name="mataPelajaran"
              value={formData.mataPelajaran}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Mata Pelajaran
              </option>
              <option value="Matematika">Matematika</option>
              <option value="IPA">IPA</option>
              <option value="Bahasa Inggris">Bahasa Inggris</option>
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
            </select>

            <select
              name="pengajar"
              value={formData.pengajar}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Pengajar
              </option>
              <option value="Ibu Ani">Ibu Ani</option>
              <option value="Pak Budi">Pak Budi</option>
              <option value="Bu Rina">Bu Rina</option>
              <option value="Pak Cipto">Pak Cipto</option>
            </select>

            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-[#00a9e0] text-white rounded-lg p-3 font-semibold hover:bg-[#007ab8] transition"
            >
              Kirim
            </button>
          </form>
        </div>
      </div>

      {/* Tabel Daftar Kelas */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow">
        <h3 className="text-[#212121] font-bold text-lg mb-4">Daftar Kelas</h3>
        {/* <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Nama Kelas
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Jenis Kelas
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Jumlah Siswa
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Jadwal
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Pengajar
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {classList.map((kelas) => (
              <tr key={kelas.id}>
                <td className="p-3 border border-gray-300">
                  {kelas.namaKelas}
                </td>
                <td className="p-3 border border-gray-300">
                  {kelas.jenisKelas}
                </td>
                <td className="p-3 border border-gray-300">
                  {kelas.jumlahSiswa}
                </td>
                <td className="p-3 border border-gray-300">{kelas.jadwal}</td>
                <td className="p-3 border border-gray-300">{kelas.pengajar}</td>
                <td className="p-3 border border-gray-300">
                  <button
                    onClick={() => navigate(`/kelola-kelas/edit/${kelas.id}`)}
                    className="text-[#00a9e0] hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Nama Kelas</th>
              <th className="border border-gray-300 px-4 py-2">Jenis Kelas</th>
              <th className="border border-gray-300 px-4 py-2">Jumlah Siswa</th>

              <th className="border border-gray-300 px-4 py-2">Jadwal</th>
              <th className="border border-gray-300 px-4 py-2">Pengajar</th>
              <th className="border border-gray-300 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataKelas.map((kelas, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {kelas.nama_kelas}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {kelas.tipe}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {kelas.jumlah_siswa}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(kelas.jadwal_default).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {kelas.nama_pengajar}
                </td>
                <td className="p-3 border border-gray-300">
                  <button
                    onClick={() => navigate(`/kelola-kelas/edit/${kelas.id}`)}
                    className="text-[#00a9e0] hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabel Pengajuan Kelas Privat */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-[#212121] font-bold text-lg mb-4">
          Pengajuan Kelas Privat
        </h3>
        {/* <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Nama Siswa
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Mata Pelajaran
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Pengajar
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Jadwal Kelas
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Catatan Khusus
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {privateRequests.map((request) => (
              <tr key={request.id}>
                <td className="p-3">{request.namaSiswa}</td>
                <td className="p-3">{request.mataPelajaran}</td>
                <td className="p-3">{request.pengajar}</td>
                <td className="p-3">{request.jadwalKelas}</td>
                <td className="p-3">{request.catatan}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleAction(request.id, "Terima", "privat")}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      actions[`privat-${request.id}`] === "Terima"
                        ? "bg-[#00a9e0] text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    Terima
                  </button>
                  <button
                    onClick={() => handleAction(request.id, "Tolak", "privat")}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      actions[`privat-${request.id}`] === "Tolak"
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
        </table> */}
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Nama Siswa</th>
              <th className="border border-gray-300 px-4 py-2">
                Mata Pelajaran
              </th>
              <th className="border border-gray-300 px-4 py-2">Pengajar</th>

              <th className="border border-gray-300 px-4 py-2">Jadwal Kelas</th>
              <th className="border border-gray-300 px-4 py-2">
                Catatan khusus
              </th>
              <th className="border border-gray-300 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pengajuanKelasPrivat.map((kelasPrivat, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {kelasPrivat.nama_siswa}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {kelasPrivat.nama_matpel}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {kelasPrivat.nama_pengajar}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(kelasPrivat.waktu_kelas).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {kelasPrivat.note}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    // onClick={() => handleAction(request.id, "Terima", "privat")}
                    className={`px-4 py-2 rounded-lg font-semibold bg-[#00a9e0] text-white `}
                    // ${
                    //   actions[`privat-${request.id}`] === "Terima"
                    //     ? "bg-[#00a9e0] text-white"
                    //     : "bg-gray-200"
                    // }
                  >
                    Terima
                  </button>
                  <button
                    // onClick={() => handleAction(request.id, "Tolak", "privat")}
                    className={`px-4 py-2 rounded-lg font-semibold bg-red-500 text-white `}
                  >
                    {/* ${
                    actions[`privat-${request.id}`] === "Tolak"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  } */}
                    Tolak
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabel Pengajuan Perubahan Jadwal */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-[#212121] font-bold text-lg mb-4">
          Pengajuan Perubahan Jadwal Kelas
        </h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Nama Siswa
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Kelas Lama
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Kelas Baru yang Diminta
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Alasan
              </th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {perubahanKelasReguler.map((kelasReguler, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {kelasReguler.nama_siswa}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {kelasReguler.nama_kelas_lama}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {kelasReguler.nama_kelas_baru}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {kelasReguler.note}
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    className={`px-4 py-2 rounded-lg font-semibold bg-[#00a9e0] text-white `}
                  >
                    Terima
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg font-semibold bg-red-500 text-white `}
                    // onClick={() => handleAction(request.id, "Tolak", "privat")}
                    // className={`px-4 py-2 rounded-lg font-semibold ${
                    //   actions[`privat-${request.id}`] === "Tolak"
                    //     ? "bg-red-500 text-white"
                    //     : "bg-gray-200"
                    // }`}
                  >
                    Tolak
                  </button>
                </td>
              </tr>
            ))}
            {/* {scheduleRequests.map((request) => (
              <tr key={request.id}>
                <td className="p-3">{request.namaSiswa}</td>
                <td className="p-3">{request.kelasLama}</td>
                <td className="p-3">{request.waktuBaru}</td>
                <td className="p-3">{request.alasan}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() =>
                      handleAction(request.id, "Terima", "schedule")
                    }
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      actions[`schedule-${request.id}`] === "Terima"
                        ? "bg-[#00a9e0] text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    Terima
                  </button>
                  <button
                    onClick={() =>
                      handleAction(request.id, "Tolak", "schedule")
                    }
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      actions[`schedule-${request.id}`] === "Tolak"
                        ? "bg-red-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    Tolak
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KelolaKelas;
