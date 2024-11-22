import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditSiswa = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSave = () => {
    alert(`Data Siswa ID: ${id} telah disimpan`);
    navigate("/kelola-siswa");
  };

  const handleCancel = () => {
    navigate("/kelola-siswa");
  };

  return (
    <div className="p-6 bg-gray-100 h-full flex flex-col gap-6">
      <h1 className="text-xl font-bold text-[#212121]">
        Dashboard / Kelola Siswa /{" "}
        <span className="text-[#00a9e0]">Edit Data Siswa</span>
      </h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-[#00a9e0] font-bold text-lg mb-4">Informasi Siswa</h3>
        <input
          type="text"
          placeholder="[Nama Siswa]"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="[Kontak]"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="[Alamat]"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Tombol */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleCancel}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700 transition"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="bg-[#00a9e0] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#007ab8] transition"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSiswa;