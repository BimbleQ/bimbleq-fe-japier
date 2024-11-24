import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMataPelajaran } from "../../services/AdminService";
import { getPengajar } from "../../services/AdminService";
import { tambahPengajar } from "../../services/AdminService";

const KelolaPengajar = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    namaPengajar: "",
    spesialisasi: "",
    kontak: "",
    username: "",
    password: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [mataPelajaranList, setMataPelajaranList] = useState([]); 
  const [pengajarList, setPengajarList] = useState([]);

  useEffect(() => {
    const fetchPelajaran = async () => {
      try {
        const data = await getMataPelajaran();
        const matpel = data.map(pelajaran => {
          return {
            id:pelajaran.id_matpel,
            nama:pelajaran.nama_matpel
          };
        });
        setMataPelajaranList(matpel);
        console.log('matpel', matpel);
      } catch (error) {
        console.error("Failed to fetch pertemuan:", error);
      }
    };
   
    fetchPengajar();
    fetchPelajaran();
  }, []);

  const fetchPengajar = async () => {
    try {
      const data = await getPengajar();
      const pengajar = data.map(pengajar => {
        return {
          id: pengajar.id_pengajar,
          namaPengajar: pengajar.nama,
          kontak: pengajar.kontak,
          spesialisasi: pengajar.spesialisasi,
          
        };
      });
      setPengajarList(pengajar);
      
    } catch (error) {
      console.error("Failed to fetch pertemuan:", error);
    }
  };
    
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    const newPengajar = {
      id: pengajarList.length + 1,
      namaPengajar: formData.namaPengajar,
      kontak: formData.kontak,
      spesialisasi: formData.spesialisasi,
    };
    try{
      const data = await tambahPengajar(formData.username, formData.password,formData.namaPengajar, formData.kontak, formData.spesialisasi)
    }catch(err) {
      console.log("gagal daftar", err);
      
    }finally{
      fetchPengajar()
    }
    
    
    setFormData({
      namaPengajar: "",
      spesialisasi: "",
      kontak: "",
      username: "",
      password: ""
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredPengajarList = pengajarList.filter(
    (pengajar) =>
      pengajar.namaPengajar.toLowerCase().includes(searchTerm) ||
      pengajar.spesialisasi.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="p-6 bg-gray-100 h-full flex flex-col gap-6">
      {/* Breadcrumb */}
      <h2 className="text-xl font-semibold text-[#212121]">
        Dashboard / <span className="text-[#00a9e0]">Kelola Pengajar</span>
      </h2>

      {/* Data Ringkasan dan Form */}
      <div className="grid grid-cols-2 gap-6">
        {/* Total Pengajar */}
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-[#00a9e0] font-bold text-lg">Total Pengajar</h3>
          <p className="text-[#00a9e0] text-4xl font-bold">{pengajarList.length}</p>
        </div>

        {/* Form Tambah Pengajar Baru */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-[#00a9e0] font-bold text-lg mb-4">Form Tambah Pengajar Baru</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="namaPengajar"
              placeholder="Nama Pengajar"
              value={formData.namaPengajar}
              onChange={handleInputChange} 
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              name="spesialisasi"
              value={formData.spesialisasi}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Spesialisasi
              </option>

              {    
            mataPelajaranList.map((mataPelajaran) => (
             <option value={mataPelajaran.id}>
                {mataPelajaran.nama}
             </option>
                ))}
            </select>
            <input
              type="text"
              name="kontak"
              placeholder="Kontak"
              value={formData.kontak}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="username"
              placeholder="Username Pengajar"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="password"
              placeholder="Password Pengajar"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-[#00a9e0] text-white rounded-lg p-3 font-semibold hover:bg-[#007ab8] transition"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>

      {/* Tabel Daftar Pengajar */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[#212121] font-bold text-lg">Daftar Pengajar</h3>
          <input
            type="text"
            placeholder="Cari Pengajar"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">Nama Pengajar</th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">Kontak</th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">Spesialisasi</th>
              <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredPengajarList.length > 0 ? (
              filteredPengajarList.map((pengajar) => (
                <tr key={pengajar.id}>
                  <td className="p-3 border border-gray-300">{pengajar.namaPengajar}</td>
                  <td className="p-3 border border-gray-300">{pengajar.kontak}</td>
                  <td className="p-3 border border-gray-300">{pengajar.spesialisasi}</td>
                  <td className="p-3 border border-gray-300">
                    <button
                      onClick={() => navigate(`/kelola-pengajar/edit/${pengajar.id}`)}
                      className="text-[#00a9e0] hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-3 text-gray-500 border border-gray-300"
                >
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KelolaPengajar;