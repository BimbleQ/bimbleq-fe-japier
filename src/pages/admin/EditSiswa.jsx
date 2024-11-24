import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSiswaById, updateSiswa } from "../../services/AdminService";

const EditSiswa = () => {
  const navigate = useNavigate();
  const { id: id_siswa } = useParams(); 
  const [student, setStudent] = useState({
    nama: "",
    kontak: "",
    alamat: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  
  useEffect(() => {
    const fetchSiswa = async () => {
      try {
        const data = await getSiswaById(id_siswa); 
        setStudent(data); 
      } catch (error) {
        console.error("Gagal mendapatkan data siswa:", error);
      }
    };

    fetchSiswa();
  }, [id_siswa]);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSave = async () => {
    try {
      await updateSiswa(id_siswa, student); 
      setModalContent("Data siswa berhasil diperbarui!");
      setIsModalOpen(true); 
    } catch (error) {
      console.error("Gagal memperbarui data siswa:", error);
      alert("Gagal memperbarui data siswa.");
    }
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
          name="nama"
          value={student.nama}
          onChange={handleInputChange}
          placeholder="Nama Siswa"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="kontak"
          value={student.kontak}
          onChange={handleInputChange}
          placeholder="Kontak"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="alamat"
          value={student.alamat}
          onChange={handleInputChange}
          placeholder="Alamat"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Notifikasi</h2>
            <p>{modalContent}</p>
            <button
              className="mt-4 w-full bg-[#00a9e0] text-white rounded-lg p-2 font-semibold hover:bg-[#007ab8] transition"
              onClick={() => {
                setIsModalOpen(false);
                navigate("/kelola-siswa"); 
              }}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditSiswa;