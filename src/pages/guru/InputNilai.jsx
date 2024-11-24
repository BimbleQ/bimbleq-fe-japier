import React, { useState } from "react";

const InputNilai = () => {
  const [selectedAssessment, setSelectedAssessment] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const dummyData = [
    { nama: "Ahmad Faiz", nilai: "", catatan: "" },
    { nama: "Siti Aisyah", nilai: "", catatan: "" },
    { nama: "Rizky Kurniawan", nilai: "", catatan: "" },
    { nama: "Intan Permata", nilai: "", catatan: "" },
    { nama: "Fajar Santoso", nilai: "", catatan: "" },
    { nama: "Lia Melati", nilai: "", catatan: "" },
    { nama: "Hafiz Rahman", nilai: "", catatan: "" },
    { nama: "Nadia Farah", nilai: "", catatan: "" },
    { nama: "Eka Putra", nilai: "", catatan: "" },
    { nama: "Aulia Ningsih", nilai: "", catatan: "" },
    { nama: "Bayu Setiawan", nilai: "", catatan: "" },
    { nama: "Dewi Lestari", nilai: "", catatan: "" },
    { nama: "Cahyo Nugroho", nilai: "", catatan: "" },
    { nama: "Putri Maharani", nilai: "", catatan: "" },
    { nama: "Andi Susanto", nilai: "", catatan: "" },
    { nama: "Maya Rahmawati", nilai: "", catatan: "" },
    { nama: "Dika Pratama", nilai: "", catatan: "" },
    { nama: "Rina Amelia", nilai: "", catatan: "" },
    { nama: "Fikri Hidayat", nilai: "", catatan: "" },
    { nama: "Tasya Widya", nilai: "", catatan: "" },
    { nama: "Rendy Wahyudi", nilai: "", catatan: "" },
    { nama: "Diana Kartika", nilai: "", catatan: "" },
    { nama: "Rian Firmansyah", nilai: "", catatan: "" },
    { nama: "Ayu Larasati", nilai: "", catatan: "" },
    { nama: "Bima Saputra", nilai: "", catatan: "" },
    { nama: "Mega Sari", nilai: "", catatan: "" },
    { nama: "Adi Wijaya", nilai: "", catatan: "" },
    { nama: "Salsa Amanda", nilai: "", catatan: "" },
    { nama: "Roni Hartono", nilai: "", catatan: "" },
    { nama: "Zahra Hanifah", nilai: "", catatan: "" },
  ];

  const [inputValues, setInputValues] = useState(dummyData); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const assessments = [
    "UTS",
    "UAS",
    "Bulan 1",
    "Bulan 2",
    "Bulan 3",
    "Bulan 4",
    "Bulan 5",
    "Bulan 6",
    "Bulan 7",
    "Bulan 8",
    "Bulan 9",
    "Bulan 10",
    "Bulan 11",
    "Bulan 12",
  ];
  const classes = [
    "Kelas 10A",
    "Kelas 10B",
    "Kelas 11A",
    "Kelas 11B",
    "Kelas 12A",
    "Kelas 12B",
  ];
  const subjects = [
    "Matematika",
    "Fisika",
    "Kimia",
    "Bahasa Inggris",
    "Bahasa Indonesia",
  ];

  const handleInputChange = (index, field, value) => {
    const updatedValues = [...inputValues];
    updatedValues[index][field] = value;
    setInputValues(updatedValues);
  };

  const handleSave = () => {
    console.log("Data disimpan:", inputValues);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Breadcrumb */}
      <h2 className="text-xl font-semibold text-[#212121]">
        Dashboard / <span className="text-[#00a9e0]">Input Nilai</span>
      </h2>

      {/* Dropdown Pilihan */}
      <div className="space-y-4">
        <select
          value={selectedAssessment}
          onChange={(e) => setSelectedAssessment(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Assessment
          </option>
          {assessments.map((assessment, index) => (
            <option key={index} value={assessment}>
              {assessment}
            </option>
          ))}
        </select>
        <select
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
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Pilih Mata Pelajaran
          </option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      {/* Informasi Kelas */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-[#00a9e0] font-bold text-lg mb-4">Informasi Kelas</h3>
        <p className="text-gray-600">
          <strong>Nama Kelas:</strong> {selectedClass || "[Nama Kelas]"}
        </p>
        <p className="text-gray-600">
          <strong>Jumlah Siswa:</strong> {dummyData.length} siswa
        </p>
        <p className="text-gray-600">
          <strong>Mata Pelajaran:</strong> {selectedSubject || "[Mata Pelajaran]"}
        </p>
        <p className="text-gray-600">
          <strong>Waktu:</strong> {selectedAssessment || "[Waktu]"}
        </p>
      </div>

      {/* Nilai Siswa */}
      <div>
        <h3 className="text-xl font-semibold text-[#212121] mb-4">Nilai Siswa</h3>
        <table className="w-full border-collapse bg-white rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left text-gray-600 font-semibold">No</th>
              <th className="p-3 text-left text-gray-600 font-semibold">Nama Siswa</th>
              <th className="p-3 text-left text-gray-600 font-semibold">Nilai</th>
              <th className="p-3 text-left text-gray-600 font-semibold">Catatan Khusus</th>
            </tr>
          </thead>
          <tbody>
            {inputValues.map((data, index) => (
              <tr key={index}>
                <td className="p-3 border-b text-gray-600">{index + 1}</td>
                <td className="p-3 border-b text-gray-600">{data.nama}</td>
                <td className="p-3 border-b">
                  <input
                    type="text"
                    placeholder="[Input Nilai]"
                    value={data.nilai}
                    onChange={(e) => handleInputChange(index, "nilai", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="p-3 border-b">
                  <input
                    type="text"
                    placeholder="[Input Catatan Opsional]"
                    value={data.catatan}
                    onChange={(e) => handleInputChange(index, "catatan", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tombol Simpan */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-[#00a9e0] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#007ab8] transition"
          >
            Simpan Data
          </button>
        </div>
      </div>

      {/* Modal Pop-up */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-[#212121] mb-4">Data berhasil disimpan!</h3>
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

export default InputNilai;