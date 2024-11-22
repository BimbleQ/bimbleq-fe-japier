import React, { useState } from "react";

const InputNilai = () => {
  const [selectedAssessment, setSelectedAssessment] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [inputValues, setInputValues] = useState([{ nilai: "", catatan: "" }]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal pop-up

  const assessments = ["UTS", "UAS", "Tugas"];
  const classes = ["Kelas 10A", "Kelas 10B", "Kelas 11A"];

  const handleInputChange = (index, field, value) => {
    const updatedValues = [...inputValues];
    updatedValues[index][field] = value;
    setInputValues(updatedValues);
  };

  const handleSave = () => {
    console.log("Data disimpan:", inputValues);
    setIsModalOpen(true); // Tampilkan modal saat data disimpan
  };

  const closeModal = () => {
    setIsModalOpen(false); // Tutup modal
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
      </div>

      {/* Informasi Kelas */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-[#00a9e0] font-bold text-lg mb-4">Informasi Kelas</h3>
        <p className="text-gray-600">[Nama Kelas]</p>
        <p className="text-gray-600">[Jumlah Siswa]</p>
        <p className="text-gray-600">[Mata Pelajaran]</p>
        <p className="text-gray-600">[Waktu]</p>
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
            {inputValues.map((_, index) => (
              <tr key={index}>
                <td className="p-3 border-b text-gray-600">{index + 1}</td>
                <td className="p-3 border-b text-gray-600">Nama Siswa</td>
                <td className="p-3 border-b">
                  <input
                    type="text"
                    placeholder="[Input Nilai]"
                    value={inputValues[index].nilai}
                    onChange={(e) => handleInputChange(index, "nilai", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="p-3 border-b">
                  <input
                    type="text"
                    placeholder="[Input Catatan Opsional]"
                    value={inputValues[index].catatan}
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