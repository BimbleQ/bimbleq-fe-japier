import React, { useState, useEffect } from "react";
import { getPelajaran } from "../../services/AdminService";
import { simpanPelajaran } from "../../services/AdminService";

const KelolaPelajaran = () => {
  const [mataPelajaranList, setMataPelajaranList] = useState([]);
  const [newMataPelajaran, setNewMataPelajaran] = useState("");
  


  useEffect(() => {
    const fetchPertemuan = async () => {
      try {
        const data = await getPelajaran();
        const matpel = data.map(pelajaran => {
          return {
            id:pelajaran.id_matpel,
            nama:pelajaran.nama_matpel
          };
        });
        setMataPelajaranList(matpel);
        console.log('data', data);
      } catch (error) {
        console.error("Failed to fetch pertemuan:", error);
      } finally {
        
      }
    };

    fetchPertemuan();
  }, []);

 
  const handleAddMataPelajaran = async (e) => {
    e.preventDefault();

    try{
      const data = await simpanPelajaran(newMataPelajaran);
      console.log("berhasil tambah", data);
    } catch (err) {
      console.log("gagal", err);
    }


    if (newMataPelajaran.trim() !== "") {
      setMataPelajaranList([
        ...mataPelajaranList,
        { id: mataPelajaranList.length + 1, nama: newMataPelajaran },
      ]);
      setNewMataPelajaran("");
    }
  };

  
  const handleDeleteMataPelajaran = async (id) => {
    setMataPelajaranList(mataPelajaranList.filter((mataPelajaran) => mataPelajaran.id !== id));
    try{
      const data = await PelajaranService.deletePelajaran(id);
      console.log("berhasil dihapus", data);
    } catch (err) {
      console.log("gagal hapus", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Header */}
      <h1 className="text-xl font-semibold text-[#212121]">
        Dashboard / <span className="text-[#00a9e0]">Kelola Mata Pelajaran</span>
      </h1>

      {/* Data Statistik dan Form */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Jumlah Mata Pelajaran */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h4 className="text-[#00a9e0] font-bold">Jumlah Mata Pelajaran</h4>
            <p className="text-3xl font-bold text-[#00a9e0]">{mataPelajaranList.length}</p>
          </div>

          {/* Form Tambah Mata Pelajaran */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-[#00a9e0] font-bold mb-4">Form Tambah Mata Pelajaran Baru</h3>
            <form onSubmit={handleAddMataPelajaran} className="space-y-4">
              <div>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Nama Mata Pelajaran"
                  value={newMataPelajaran}
                  onChange={(e) => setNewMataPelajaran(e.target.value)}
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
        <h2 className="text-lg font-semibold text-[#212121] mb-4">Daftar Mata Pelajaran</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <table className="table-auto w-full border-collapse border border-gray-300">
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
                    <td className="p-3 border border-gray-300">{mataPelajaran.nama}</td>
                    <td className="p-3 border border-gray-300">
                      <button
                        onClick={() => handleDeleteMataPelajaran(mataPelajaran.id)}
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
          </table>
        </div>
      </section>
    </div>
  );
};

export default KelolaPelajaran;