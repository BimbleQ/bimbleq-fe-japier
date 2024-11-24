import React, { useState, useEffect } from "react";
import TagihanCard from "../../components/TagihanCard";
import HistoryPembayaranCard from "../../components/HistoryPembayaranCard";
import PrivateScheduleCard from "../../components/PrivateScheduleCard";
import DropdownTagihan from "../../components/DropdownTagihan";
import SiswaService from "../../services/SiswaService";

const PembayaranSiswa = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [tagihan, setTagihan] = useState([]);
  const [isLoadingTagihan, setIsLoadingTagihan] = useState(true);
  const [historiPembayaran, setHistoriPembayaran] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

    const fetchTagihan = async () => {
      try {
        const data = await SiswaService.getTagihan();
        console.log("Tagihan API Data:", data);
        setTagihan(data);
      } catch (error) {
        console.error("Failed to fetch tagihan:", error);
      } finally {
        setIsLoadingTagihan(false);
      }
    };

    const fetchHistoriPembayaran = async () => {
      try {
        const data = await SiswaService.getHistoriPembayaran();
        console.log("Histori Pembayaran API Data:", data);
        setHistoriPembayaran(data);
      } catch (error) {
        console.error("Failed to fetch histori pembayaran:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoriPembayaran();
    fetchTagihan();

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

      {/* Tagihan */}
       <section>
        <h2 className="text-xl font-semibold text-[#212121] mb-4">Tagihan</h2>
        <div className="p-4 bg-white shadow-md rounded-lg">
          {isLoadingTagihan ? (
            <p>Loading...</p>
          ) : tagihan.length > 0 ? (
            tagihan.map((item, index) => (
              <TagihanCard
                key={index}
                namaTagihan={`${item.jenis_tagihan}`}
                jumlah={`Rp ${parseInt(item.jumlah).toLocaleString("id-ID")}`}
                status={`${item.status}`}
              />
            ))
          ) : (
              <PrivateScheduleCard status="Anda sudah membayar semua tagihan, tidak ada tagihan..." />
            
          )}
        </div>
      </section>


      {/* Pembayaran Tagihan */}
      <section>
        <h2 className="text-lg font-semibold text-[#212121] mb-4">Upload Bukti Pembayaran</h2>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-[#00a9e0] font-bold mb-4">Form Upload Bukti Pembayaran Tagihan</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <DropdownTagihan /> {/* DropdownTagihan untuk menampilkan data tagihan yang sudah di filter berdasarkan siswa dan status tagihan unpaid, dropdown ini menggunakjan API  */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nominal</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="Masukkan nominal pembayaran" 
                id ="pembayaran_nominal"
              />  {/* input ini dipakai untuk menampilkan nominal yg dipili pada dropdown sebelumnya */}
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
                </label>  {/* input untuk mengupload bukti foto */}
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
        {isLoading ? (
          <p>Loading...</p>
        ) : historiPembayaran.length > 0 ? (
          historiPembayaran.map((item, index) => {
            // Format tanggal
            const formattedDate = new Date(item.waktu_tagihah).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });

            return (
              <HistoryPembayaranCard
                key={index}
                namaTagihan={`${item.tipe_kelas} - ${item.tipe_pembayaran}`}
                jumlah={parseInt(item.jumlah).toLocaleString("id-ID")}
                status={item.status === "telat" ? "LATE" : "PAID"}
                tanggal={formattedDate}
              />
            );
          })
        ) : (
          <p>Tidak Ada Histori Pembayaran</p>
        )}
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