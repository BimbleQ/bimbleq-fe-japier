import React, { useState } from "react";

const EditKelas = () => {
  const [classInfo, setClassInfo] = useState({
    namaKelas: "Matematika 10A",
    mataPelajaran: "Matematika",
    pengajar: "Ibu Ani",
    jumlahSiswa: 25,
  });

  const [students, setStudents] = useState([
    { id: 1, nama: "Siswa A" },
    { id: 2, nama: "Siswa B" },
    { id: 3, nama: "Siswa C" },
    { id: 4, nama: "Siswa D" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddStudent = () => {
    if (selectedStudent) {
      setStudents((prev) => [...prev, { id: students.length + 1, nama: selectedStudent.nama }]);
      alert(`${selectedStudent.nama} berhasil ditambahkan.`);
      setSelectedStudent(null);
      setSearchTerm("");
    }
  };

  const handleEditStudent = (id) => {
    alert(`Edit data siswa ID: ${id}`);
  };

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
    alert(`Siswa dengan ID ${id} berhasil dihapus.`);
  };

  const filteredStudents = [
    { id: 5, nama: "Siswa E" },
    { id: 6, nama: "Siswa F" },
    { id: 7, nama: "Siswa G" },
  ].filter((student) => student.nama.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-6 bg-gray-100 h-full flex flex-col gap-6">
      {/* Breadcrumb */}
      <h2 className="text-xl font-semibold text-[#212121]">
        Dashboard / Kelola Kelas / <span className="text-[#00a9e0]">Edit Kelas</span>
      </h2>

      {/* Informasi Kelas */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-[#00a9e0] font-bold text-lg mb-4">Informasi Kelas</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="namaKelas"
            value={classInfo.namaKelas}
            readOnly
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nama Kelas"
          />
          <select
            name="mataPelajaran"
            value={classInfo.mataPelajaran}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Matematika">Matematika</option>
            <option value="IPA">IPA</option>
            <option value="Bahasa Inggris">Bahasa Inggris</option>
            <option value="Bahasa Indonesia">Bahasa Indonesia</option>
          </select>
          <select
            name="pengajar"
            value={classInfo.pengajar}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Ibu Ani">Ibu Ani</option>
            <option value="Pak Budi">Pak Budi</option>
            <option value="Bu Rina">Bu Rina</option>
            <option value="Pak Cipto">Pak Cipto</option>
          </select>
          <input
            type="number"
            name="jumlahSiswa"
            value={classInfo.jumlahSiswa}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Jumlah Siswa"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Daftar Siswa */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-[#00a9e0] font-bold text-lg mb-4">Daftar Siswa</h3>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">Nama Siswa</th>
                <th className="p-3 text-left text-gray-600 font-semibold border border-gray-300">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="p-3 border border-gray-300">{student.nama}</td>
                  <td className="p-3 border border-gray-300">
                    <button
                      onClick={() => handleEditStudent(student.id)}
                      className="text-[#00a9e0] hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-red-500 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tambahkan Siswa */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-[#00a9e0] font-bold text-lg mb-4">Tambahkan Siswa</h3>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Cari Siswa"
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <div className="bg-white border border-gray-300 rounded-lg p-3">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => setSelectedStudent(student)}
              >
                {student.nama}
              </div>
            ))}
          </div>
          {selectedStudent && (
            <div className="mt-4">
              <h4 className="text-[#00a9e0] font-bold">Informasi Siswa</h4>
              <p className="text-gray-600">Nama: {selectedStudent.nama}</p>
              <button
                onClick={handleAddStudent}
                className="w-full bg-[#00a9e0] text-white rounded-lg p-3 font-semibold hover:bg-[#007ab8] transition mt-4"
              >
                Tambah Siswa
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditKelas;