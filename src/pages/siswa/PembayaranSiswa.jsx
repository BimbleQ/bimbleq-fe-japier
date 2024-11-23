import React, { useState, useEffect } from "react";
import TagihanCard from "../../components/TagihanCard";
import HistoryPembayaranCard from "../../components/HistoryPembayaranCard";
import DropdownTagihan from "../../components/DropdownTagihan"; // Mengimpor DropdownTagihan

const PembayaranSiswa = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalMessage("Bukti pembayaran berhasil dikirim!");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6 relative">
      {/* Header */}
      <h1 className="text-xl font-semibold text-[#212121]">
        Dashboard / <span className="text-[#00a9e0]">Pembayaran</span>
      </h1>

      {/* Tagihanmu */}
      <section>
        <h2 className="text-lg font-semibold text-[#212121] mb-4">Tagihanmu</h2>
        <TagihanCard
          namaTagihan="SPP Bulan November"
          jumlah="Rp 1.000.000,00"
          status="Belum Lunas"
        />
      </section>

      {/* Pembayaran Tagihan */}
      <section>
        <h2 className="text-lg font-semibold text-[#212121] mb-4">Upload Bukti Pembayaran</h2>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-[#00a9e0] font-bold mb-4">Form Upload Bukti Pembayaran Tagihan</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <DropdownTagihan /> {/* DropdownTagihan menggantikan dropdown lama */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nominal</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="Masukkan nominal pembayaran"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unggah File Bukti Pembayaran
              </label>
              <div className="flex items-center gap-4">
                <input type="file" className="hidden" id="upload-bukti" />
                <label
                  htmlFor="upload-bukti"
                  className="p-2 bg-[#00a9e0] text-white rounded-lg cursor-pointer hover:bg-[#007bb5] transition duration-200"
                >
                  Unggah
                </label>
                <p className="text-sm text-gray-500">Belum ada file terpilih</p>
              </div>
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-[#00a9e0] text-white font-bold rounded-lg hover:bg-[#007bb5] transition duration-200"
            >
              Kirim
            </button>
          </form>
        </div>
      </section>

      {/* Histori Pembayaran */}
      <section>
        <h2 className="text-lg font-semibold text-[#212121] mb-4">Histori Pembayaran</h2>
        <HistoryPembayaranCard
          namaTagihan="Class Reguler Februari"
          jumlah="1.000.000,00"
          status="PAID"
          tanggal="19 Februari 2024"
        />
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4 z-[10000]">
            <h3 className="text-lg font-semibold text-[#212121]">{modalMessage}</h3>
            <button
              className="px-4 py-2 bg-[#00a9e0] text-white rounded-lg hover:bg-[#007bb5] transition duration-200"
              onClick={closeModal}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PembayaranSiswa;