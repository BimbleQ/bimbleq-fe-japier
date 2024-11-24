import React, { useState, useEffect } from "react";
import { getJumlahSiswa, getSiswa } from "../../services/AdminService";
import { Link } from "react-router-dom";

const KelolaSiswa = () => {
  const [students, setStudents] = useState([
    { id: 1, namaSiswa: "John Doe", kontak: "099038902", alamat: "Jalan A" },
    { id: 2, namaSiswa: "Jane Smith", kontak: "0881234567", alamat: "Jalan B" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.namaSiswa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [newStudent, setNewStudent] = useState({
    namaSiswa: "",
    kontak: "",
    alamat: "",
    usernameSiswa: "",
    passwordSiswa: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = () => {
    if (
      newStudent.namaSiswa &&
      newStudent.kontak &&
      newStudent.alamat &&
      newStudent.usernameSiswa &&
      newStudent.passwordSiswa
    ) {
      setStudents((prev) => [...prev, { ...newStudent, id: prev.length + 1 }]);
      setNewStudent({
        namaSiswa: "",
        kontak: "",
        alamat: "",
        usernameSiswa: "",
        passwordSiswa: "",
      });
    } else {
      alert("Mohon lengkapi semua data!");
    }
  };

  const [jumlahSiswa, setJumlahSiswa] = useState(0);
  const [dataSiswa, setDataSiswa] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSiswa = async () => {
      try {
        const data = await getJumlahSiswa();
        setJumlahSiswa(data.jumlah_siswa);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil data jumlah kelas aktif:",
          error
        );
      }
    };
    fetchSiswa();
  }, []);

  const fetchData = async () => {
    try {
      const siswa = await getSiswa(); // Panggil service
      setDataSiswa(siswa); // Simpan data ke state
      setIsLoading(false); // Set loading ke false
    } catch (err) {
      setError(err); // Tangkap error
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData(); // Fetch data saat komponen pertama kali di-load
  }, []);

  if (isLoading) {
    return <p>Loading data...</p>; // Placeholder saat loading
  }

  if (error) {
    return <p>Terjadi kesalahan: {error.message}</p>; // Tampilkan error jika ada
  }

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
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Nama</th>
              <th className="border border-gray-300 px-4 py-2">Kontak</th>
              <th className="border border-gray-300 px-4 py-2">Alamat</th>
              <th className="border border-gray-300 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataSiswa.map((siswa) => (
              <tr key={siswa.id_siswa}>
                <td className="border border-gray-300 px-4 py-2">
                  {siswa.nama}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {siswa.kontak}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {siswa.alamat}
                </td>
                <td className="p-3 border border-gray-300">
                  <Link
                    to={`/kelola-siswa/edit/${siswa.id}`}
                    className="text-[#00a9e0] hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <table className="table-auto w-full border-collapse border border-gray-300">
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
              <tr key={student.id}>
                <td className="p-3 border border-gray-300">
                  {student.namaSiswa}
                </td>
                <td className="p-3 border border-gray-300">{student.kontak}</td>
                <td className="p-3 border border-gray-300">{student.alamat}</td>
                <td className="p-3 border border-gray-300">
                  <Link
                    to={`/kelola-siswa/edit/${student.id}`}
                    className="text-[#00a9e0] hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
};

export default KelolaSiswa;
