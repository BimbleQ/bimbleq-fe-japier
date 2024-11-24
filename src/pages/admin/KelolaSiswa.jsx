import React, { useState, useEffect } from "react";
import { getJumlahSiswa } from "../../services/AdminService";
import { Link } from "react-router-dom";
import { addSiswa } from "../../services/AdminService";
import { getSiswa } from "../../services/AdminService";



const KelolaSiswa = () => {
  const [jumlahSiswa, setJumlahSiswa] = useState(0);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.nama?.toLowerCase().includes(searchTerm?.toLowerCase())
  );


  const [newStudent, setNewStudent] = useState({
    namaSiswa: "",
    kontak: "",
    alamat: "",
    usernameSiswa: "",
    passwordSiswa: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = async () => {
    if (
      newStudent.namaSiswa &&
      newStudent.kontak &&
      newStudent.alamat &&
      newStudent.usernameSiswa &&
      newStudent.passwordSiswa
    ) {
      try {
        const requestData = {
          username: newStudent.usernameSiswa,
          password: newStudent.passwordSiswa,
          nama: newStudent.namaSiswa,
          kontak: newStudent.kontak,
          alamat: newStudent.alamat,
        };
  
        const response = await addSiswa(requestData); // Memanggil API untuk menambahkan siswa baru
  
        
        setStudents((prev) => [
          {
            id_siswa: response.id_siswa, 
            nama: response.nama,
            kontak: response.kontak,
            alamat: response.alamat,
          },
          ...prev, 
        ]);
  
        
        setNewStudent({
          namaSiswa: "",
          kontak: "",
          alamat: "",
          usernameSiswa: "",
          passwordSiswa: "",
        });
  
        
        setModalContent(`Siswa ${response.nama} berhasil ditambahkan!`);
        setIsModalOpen(true);
      } catch (error) {
        console.error("Gagal menambahkan siswa:", error);
        alert("Gagal menambahkan siswa. Silakan coba lagi.");
      }
    } else {
      alert("Mohon lengkapi semua data!");
    }
  };
  
  
  useEffect(() => {
    const fetchSiswa = async () => {
      try {
        const siswa = await getSiswa(); 
        setStudents(siswa); 
      } catch (error) {
        console.error("Error mendapatkan data siswa:", error);
      }
    };

    fetchSiswa();
  }, []);

  useEffect(() => {
    const fetchJumlahSiswa = async () => {
      try {
        const data = await getJumlahSiswa();
        setJumlahSiswa(data.jumlah_siswa);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil jumlah siswa:", error);
      }
    };

    fetchJumlahSiswa();
  }, []);

  

  return (
    <div className="p-6 bg-gray-100 h-full flex flex-col gap-6">
      {/* Header */}
      <h1 className="text-xl font-bold text-[#212121]">
        Dashboard / <span className="text-[#00a9e0]">Kelola Siswa</span>
      </h1>

      {/* Data dan Form */}
      <div className="grid grid-cols-2 gap-6">
        {/* Total Siswa */}
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-[#00a9e0] font-bold text-lg">Total Siswa</h3>
          <p className="text-[#00a9e0] text-4xl font-bold">{jumlahSiswa}</p>
        </div>

        {/* Form Tambah Siswa */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-[#00a9e0] font-bold text-lg mb-4">
            Form Tambah Siswa Baru
          </h3>
          <input
            type="text"
            name="namaSiswa"
            value={newStudent.namaSiswa}
            onChange={handleInputChange}
            placeholder="Nama Siswa"
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="kontak"
            value={newStudent.kontak}
            onChange={handleInputChange}
            placeholder="Kontak"
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="alamat"
            value={newStudent.alamat}
            onChange={handleInputChange}
            placeholder="Alamat"
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="usernameSiswa"
            value={newStudent.usernameSiswa}
            onChange={handleInputChange}
            placeholder="Username Siswa"
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="passwordSiswa"
            value={newStudent.passwordSiswa}
            onChange={handleInputChange}
            placeholder="Password Siswa"
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleAddStudent}
            className="w-full bg-[#00a9e0] text-white rounded-lg p-3 font-semibold hover:bg-[#007ab8] transition"
          >
            Simpan
          </button>
        </div>
      </div>

      {/* Tabel Daftar Siswa */}
      <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[#212121] font-bold text-lg">Daftar Siswa</h3>
        <input
          type="text"
          placeholder="Cari Siswa"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left text-gray-600 border font-semibold border-gray-300">
              Nama Siswa
            </th>
            <th className="p-3 text-left text-gray-600 border font-semibold border-gray-300">
              Kontak
            </th>
            <th className="p-3 text-left text-gray-600 border font-semibold border-gray-300">
              Alamat
            </th>
            <th className="p-3 text-left text-gray-600 border font-semibold border-gray-300">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id_siswa}>
              <td className="p-3 border border-gray-300">{student.nama}</td>
              <td className="p-3 border border-gray-300">{student.kontak}</td>
              <td className="p-3 border border-gray-300">{student.alamat}</td>
              <td className="p-3 border border-gray-300">
                <Link
                  to={`/kelola-siswa/edit/${student.id_siswa}`}
                  className="text-[#00a9e0] hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      {isModalOpen && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 className="text-lg font-bold mb-4">Notifikasi</h2>
      <p>{modalContent}</p>
      <button
        className="mt-4 w-full bg-[#00a9e0] text-white rounded-lg p-2 font-semibold hover:bg-[#007ab8] transition"
        onClick={() => setIsModalOpen(false)}
      >
        Tutup
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default KelolaSiswa;