import React, { useState } from "react";

const InputPresensi = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const classes = [
    "Kelas 10A",
    "Kelas 10B",
    "Kelas 11A",
    "Kelas 11B",
    "Kelas 12A",
    "Kelas 12B",
  ];
  
  const dummyStudents = [
    { id: 1, nama: "Ahmad Faiz" },
    { id: 2, nama: "Siti Aisyah" },
    { id: 3, nama: "Rizky Kurniawan" },
    { id: 4, nama: "Intan Permata" },
    { id: 5, nama: "Fajar Santoso" },
    { id: 6, nama: "Lia Melati" },
    { id: 7, nama: "Hafiz Rahman" },
    { id: 8, nama: "Nadia Farah" },
    { id: 9, nama: "Eka Putra" },
    { id: 10, nama: "Aulia Ningsih" },
    { id: 11, nama: "Bayu Setiawan" },
    { id: 12, nama: "Dewi Lestari" },
    { id: 13, nama: "Cahyo Nugroho" },
    { id: 14, nama: "Putri Maharani" },
    { id: 15, nama: "Andi Susanto" },
    { id: 16, nama: "Maya Rahmawati" },
    { id: 17, nama: "Dika Pratama" },
    { id: 18, nama: "Rina Amelia" },
    { id: 19, nama: "Fikri Hidayat" },
    { id: 20, nama: "Tasya Widya" },
    { id: 21, nama: "Rendy Wahyudi" },
    { id: 22, nama: "Diana Kartika" },
    { id: 23, nama: "Rian Firmansyah" },
    { id: 24, nama: "Ayu Larasati" },
    { id: 25, nama: "Bima Saputra" },
    { id: 26, nama: "Mega Sari" },
    { id: 27, nama: "Adi Wijaya" },
    { id: 28, nama: "Salsa Amanda" },
    { id: 29, nama: "Roni Hartono" },
    { id: 30, nama: "Zahra Hanifah" },
  ];

  const handleAttendance = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSaveData = () => {
    console.log("Data Presensi:", attendance);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Breadcrumb */}
      <h2 className="text-xl font-semibold text-[#212121] mb-4">
        Dashboard / <span className="text-[#00a9e0]">Input Presensi</span>
      </h2>

      {/* Dropdown Pilih Kelas */}
      <div className="mb-6">
        <select
          id="select-class"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Pilih Kelas
          </option>
          {classes.map((className, index) => (
            <option key={index} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>

      {/* Informasi Kelas */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-[#00a9e0] font-bold text-lg mb-4">Informasi Kelas</h3>
        <p className="text-gray-600">
          Nama Kelas: <span className="font-semibold">{selectedClass || "[Pilih Kelas]"}</span>
        </p>
        <p className="text-gray-600">
          Jumlah Siswa: <span className="font-semibold">{dummyStudents.length}</span>
        </p>
      </div>

      {/* Jadwal Kelas Mingguan */}
      <div>
        <h3 className="text-[#212121] font-bold text-lg mb-4">Presensi Siswa</h3>
        <table className="w-full border-collapse bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left p-3 text-gray-600 font-medium border-b">No</th>
              <th className="text-left p-3 text-gray-600 font-medium border-b">Nama Siswa</th>
              <th className="text-left p-3 text-gray-600 font-medium border-b">Kehadiran</th>
              <th className="text-left p-3 text-gray-600 font-medium border-b">Catatan Khusus</th>
            </tr>
          </thead>
          <tbody>
            {dummyStudents.map((student) => (
              <tr key={student.id}>
                <td className="p-3 border-b text-gray-600">{student.id}</td>
                <td className="p-3 border-b text-gray-600">{student.nama}</td>
                <td className="p-3 border-b">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAttendance(student.id, "Hadir")}
                      className={`px-4 py-2 rounded-lg text-sm font-bold ${
                        attendance[student.id] === "Hadir"
                          ? "bg-[#00a9e0] text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      Hadir
                    </button>
                    <button
                      onClick={() => handleAttendance(student.id, "Tidak Hadir")}
                      className={`px-4 py-2 rounded-lg text-sm font-bold ${
                        attendance[student.id] === "Tidak Hadir"
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      Tidak Hadir
                    </button>
                  </div>
                </td>
                <td className="p-3 border-b">
                  <input
                    type="text"
                    placeholder="[Input Catatan Opsional]"
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tombol Simpan Data */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSaveData}
          className="bg-[#00a9e0] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#007ab8] transition"
        >
          Simpan Data
        </button>
      </div>

      {/* Modal Pop-up */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-[#212121] mb-4">Data presensi berhasil disimpan!</h3>
            <button
              onClick={closeModal}
              className="bg-[#00a9e0] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#007ab8] transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputPresensi;