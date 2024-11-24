import React, { useState, useEffect } from "react";
import {
  getMataPelajaran,
  getJumlahPelajaran,
  postSimpanPelajaran,
  removePelajaran,
} from "../../services/AdminService";

const KelolaPelajaran = () => {
  // const [mataPelajaranList, setMataPelajaranList] = useState([]);
  // const [newMataPelajaran, setNewMataPelajaran] = useState("");

  // // Fungsi untuk menambahkan mata pelajaran baru
  // const handleAddMataPelajaran = (e) => {
  //   e.preventDefault();
  //   if (newMataPelajaran.trim() !== "") {
  //     setMataPelajaranList([
  //       ...mataPelajaranList,
  //       { id: mataPelajaranList.length + 1, nama: newMataPelajaran },
  //     ]);
  //     setNewMataPelajaran("");
  //   }
  // };

  // // Fungsi untuk menghapus mata pelajaran
  // const handleDeleteMataPelajaran = (id) => {
  //   setMataPelajaranList(
  //     mataPelajaranList.filter((mataPelajaran) => mataPelajaran.id !== id)
  //   );
  // };
  const [mataPelajaran, setMataPelajaran] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [jumlahPelajaran, setJumlahPelajaran] = useState(0);

  useEffect(() => {
    const fetchPelajaran = async () => {
      try {
        const data = await getJumlahPelajaran();
        setJumlahPelajaran(data.jumlah_pelajaran);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil data jumlah kelas aktif:",
          error
        );
      }
    };

    fetchPelajaran();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await getMataPelajaran(); // Panggil API
        setMataPelajaran(data1); // Simpan data ke state
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      } finally {
        setIsLoading(false); // Matikan loading
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Header */}
      <h1 className="text-xl font-semibold text-[#212121]">
        Dashboard /{" "}
        <span className="text-[#00a9e0]">Kelola Mata Pelajaran</span>
      </h1>

      {/* Data Statistik dan Form */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Jumlah Mata Pelajaran */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h4 className="text-[#00a9e0] font-bold">Jumlah Mata Pelajaran</h4>
            <p className="text-3xl font-bold text-[#00a9e0]">
              {jumlahPelajaran}
            </p>
          </div>

          {/* Form Tambah Mata Pelajaran */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-[#00a9e0] font-bold mb-4">
              Form Tambah Mata Pelajaran Baru
            </h3>
            {/* onSubmit="" */}
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Nama Mata Pelajaran"
                  // value=""
                  // onChange={(e) => setNewMataPelajaran(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-[#00a9e0] text-white font-bold rounded-lg hover:bg-[#007bb5] transition duration-200"
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Daftar Mata Pelajaran */}
      <section>
        <h2 className="text-lg font-semibold text-[#212121] mb-4">
          Daftar Mata Pelajaran
        </h2>
        <div className="bg-white p-6 rounded-lg shadow">
          {isLoading ? (
            <p className="text-gray-500">Memuat data...</p>
          ) : (
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Nama Mata Pelajaran</th>
                </tr>
              </thead>
              <tbody>
                {mataPelajaran.map((matpel) => (
                  <tr key={matpel.id_matpel}>
                    <td className="py-2 px-4 border-b text-center">
                      {matpel.id_matpel}
                    </td>
                    <td className="py-2 px-4 border-b">{matpel.nama_matpel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                  Nama Mata Pelajaran
                </th>
                <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {mataPelajaranList.length > 0 ? (
                mataPelajaranList.map((mataPelajaran) => (
                  <tr key={mataPelajaran.id}>
                    <td className="p-3 border border-gray-300">
                      {mataPelajaran.nama}
                    </td>
                    <td className="p-3 border border-gray-300">
                      <button
                        onClick={() =>
                          handleDeleteMataPelajaran(mataPelajaran.id)
                        }
                        className="text-red-500 hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="text-center p-3 text-gray-500 border border-gray-300"
                  >
                    Tidak ada mata pelajaran.
                  </td>
                </tr>
              )}
            </tbody>
          </table> */}
        </div>
      </section>
    </div>
  );
};

export default KelolaPelajaran;
