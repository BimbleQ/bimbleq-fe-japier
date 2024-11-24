import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getJumlahKelasAktif,
  getJumlahPengajuanPrivat,
  getJumlahPengajuanReguler,
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

  const [privateRequests, setPrivateRequests] = useState([
    {
      id: 1,
      namaSiswa: "Siswa A",
      mataPelajaran: "Matematika",
      pengajar: "Ibu Ani",
      jadwalKelas: "Senin, 08:00",
      catatan: "Perlu perhatian khusus",
    },
    {
      id: 2,
      namaSiswa: "Siswa B",
      mataPelajaran: "IPA",
      pengajar: "Pak Budi",
      jadwalKelas: "Selasa, 10:00",
      catatan: "",
    },
  ]);

  const [scheduleRequests, setScheduleRequests] = useState([
    {
      id: 1,
      namaSiswa: "Mulyono Hendra",
      kelasLama: "Kelas Fisika A",
      waktuBaru: "Kelas B 14:00",
      alasan: "Ada acara keluarga",
    },
    {
      id: 2,
      namaSiswa: "Javier Jinan",
      kelasLama: "Kelas Matematika A",
      waktuBaru: "Kelas Matematika B 14:00",
      alasan: "Ada acara keluarga",
    },
  ]);

  const [classList, setClassList] = useState([
    {
      id: 1,
      namaKelas: "Matematika 10A",
      jenisKelas: "Reguler",
      jumlahSiswa: "25",
      jadwal: "Senin, 08:00",
      pengajar: "Ibu Ani",
    },
    {
      id: 2,
      namaKelas: "Fisika 11B",
      jenisKelas: "Privat",
      jumlahSiswa: "5",
      jadwal: "Rabu, 10:00",
      pengajar: "Pak Budi",
    },
  ]);

  const [actions, setActions] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAction = (id, status, table) => {
    setActions((prev) => ({
      ...prev,
      [`${table}-${id}`]: status,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Formulir:", formData);
    alert("Kelas berhasil dibuat!");
  };

  const handleSaveActions = () => {
    console.log("Tindakan Disimpan:", actions);
    alert("Tindakan berhasil disimpan!");
  };

  const [jumlahPengajuanPrivat, setJumlahPengajuanPrivat] = useState(0);
  const [jumlahPengajuanReguler, setJumlahPengajuanReguler] = useState(0);
  const [jumlahKelasAktif, setJumlahKelasAktif] = useState(0);

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
        <table className="table-auto w-full border-collapse border border-gray-300">
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
        </table>
      </div>

      {/* Tabel Pengajuan Kelas Privat */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-[#212121] font-bold text-lg mb-4">
          Pengajuan Kelas Privat
        </h3>
        <table className="w-full border-collapse border border-gray-300">
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
            {scheduleRequests.map((request) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KelolaKelas;
