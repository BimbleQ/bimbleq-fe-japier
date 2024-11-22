import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPengajar = () => {
  const { id } = useParams(); // Mendapatkan id dari URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    namaPengajar: "Nama Default", // Data default, bisa diganti dengan data fetch dari backend
    spesialisasi: "Spesialisasi Default",
    mataPelajaran: "Mata Pelajaran Default",
    kontak: "Kontak Default",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    alert("Data pengajar berhasil disimpan!");
    navigate("/kelola-pengajar"); // Kembali ke halaman Kelola Pengajar
  };

  const handleCancel = () => {
    navigate("/kelola-pengajar"); // Kembali ke halaman Kelola Pengajar tanpa menyimpan perubahan
  };

  return (
    <div className="p-6 bg-gray-100 h-full flex flex-col gap-6">
      {/* Breadcrumb */}
      <h2 className="text-xl font-semibold text-[#212121]">
        Dashboard / Kelola Pengajar / <span className="text-[#00a9e0]">Edit Data Pengajar</span>
      </h2>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-[#00a9e0] font-bold text-lg mb-4">Informasi Pengajar</h3>
        <form className="flex flex-col gap-4">
          {/* Nama Pengajar */}
          <input
            type="text"
            name="namaPengajar"
            value={formData.namaPengajar}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="[Nama Pengajar]"
          />

          {/* Spesialisasi */}
          <select
            name="spesialisasi"
            value={formData.spesialisasi}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              [Spesialisasi]
            </option>
            <option value="Matematika">Matematika</option>
            <option value="Bahasa Inggris">Bahasa Inggris</option>
            <option value="IPA">IPA</option>
            <option value="Bahasa Indonesia">Bahasa Indonesia</option>
          </select>

          {/* Mata Pelajaran */}
          <select
            name="mataPelajaran"
            value={formData.mataPelajaran}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              [Mata Pelajaran]
            </option>
            <option value="Matematika">Matematika</option>
            <option value="IPA">IPA</option>
            <option value="Bahasa Inggris">Bahasa Inggris</option>
            <option value="Bahasa Indonesia">Bahasa Indonesia</option>
          </select>

          {/* Kontak */}
          <input
            type="text"
            name="kontak"
            value={formData.kontak}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="[Kontak]"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-[#00a9e0] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#007ab8] transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPengajar;