import React, { useState } from "react";

const InputPresensi = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({}); // State untuk menyimpan status kehadiran
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal pop-up
  const classes = ["Kelas 10A", "Kelas 10B", "Kelas 11A"];

  const handleAttendance = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSaveData = () => {
    console.log("Data Presensi:", attendance);
    setIsModalOpen(true); // Tampilkan modal saat data disimpan
  };

  const closeModal = () => {
    setIsModalOpen(false); // Tutup modal
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
          Jumlah Siswa: <span className="font-semibold">30</span>
        </p>
      </div>

      {/* Jadwal Kelas Mingguan */}
      <div>
        <h3 className="text-[#212121] font-bold text-lg mb-4">Jadwal Kelas Mingguan</h3>
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
            {[1].map((id) => (
              <tr key={id}>
                <td className="p-3 border-b text-gray-600">{id}</td>
                <td className="p-3 border-b text-gray-600">Nama Siswa</td>
                <td className="p-3 border-b">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAttendance(id, "Hadir")}
                      className={`px-4 py-2 rounded-lg text-sm font-bold ${
                        attendance[id] === "Hadir" ? "bg-[#00a9e0] text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      Hadir
                    </button>
                    <button
                      onClick={() => handleAttendance(id, "Tidak Hadir")}
                      className={`px-4 py-2 rounded-lg text-sm font-bold ${
                        attendance[id] === "Tidak Hadir" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"
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