import React, { useState, useEffect } from "react";
import RegulerClassRequestCard from "../../components/RegulerClassRequestCard";
import PrivateClassRequestCard from "../../components/PrivateClassRequestCard";
import Calendar from "../../components/Calendar";
import DropdownPilihKelas from "../../components/DropdownPilihKelas";
import SiswaService from "../../services/SiswaService";
import AuthService from "../../services/AuthService";

const JadwalDashboardSiswa = () => {
  const [idSiswa, setIdSiswa] = useState(null); 
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [privateClassRequests, setPrivateClassRequests] = useState([]);
  const [regularClassRequests, setRegularClassRequests] = useState([]);
  const [mataPelajaran, setMataPelajaran] = useState([]);
  const [pengajar, setPengajar] = useState([]);
  const [selectedMatpel, setSelectedMatpel] = useState("");
  const [formData, setFormData] = useState({
    id_pengajar: "",
    waktu_kelas: "",
    note: "",
  });

  const [isLoadingMatpel, setIsLoadingMatpel] = useState(true);
  const [isLoadingPengajar, setIsLoadingPengajar] = useState(false);

  // Fungsi untuk menampilkan modal
  const handleSubmit = (type) => {
    if (type === "kelas") {
      setModalMessage("Pengajuan kelas berhasil dikirim!");
    } else if (type === "permintaan") {
      setModalMessage("Permintaan perubahan jadwal berhasil dikirim!");
    }
    setIsModalOpen(true);
  };

  const handleSubmitPrivateClass = async () => {
    if (!idSiswa) {
      setModalMessage("Gagal mengirim data. ID siswa tidak ditemukan.");
      setIsModalOpen(true);
      console.error("ID siswa tidak ditemukan saat mencoba submit.");
      return;
    }
  
    try {
      const payload = {
        id_siswa: idSiswa, // ID siswa dari session
        id_matpel: selectedMatpel, // ID mata pelajaran dari dropdown
        id_pengajar: formData.id_pengajar, // ID pengajar dari dropdown
        waktu_kelas: formData.waktu_kelas, // Waktu kelas dari input
        note: formData.note, // Catatan khusus dari text field
      };
  
      console.log("Submitting Data:", payload); // Debug log untuk memastikan payload
      await SiswaService.submitPrivateClassRequest(payload); // Kirim data ke API
  
      setModalMessage("Pengajuan kelas berhasil dikirim!");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to submit private class request:", error);
      setModalMessage("Gagal mengirim pengajuan kelas privat.");
      setIsModalOpen(true);
    }
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  
  // Atur overflow body saat modal terbuka
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const fetchSession = async () => {
      try {
        const sessionData = await AuthService.validateSession(); // Gunakan validateSession
        console.log("Validated Session Data:", sessionData);
  
        if (sessionData && sessionData.user && sessionData.user.id_user) {
          setIdSiswa(sessionData.user.id_user); // Simpan ID user dari session
        } else {
          console.error("ID user tidak ditemukan pada data session.");
        }
      } catch (error) {
        console.error("Failed to validate session:", error);
      }
    };
  
    const fetchRequests = async () => {
      try {
        const privateRequests = await SiswaService.getReqPrivateClass();
        const regularRequests = await SiswaService.getReqRegulerClass();
        setPrivateClassRequests(privateRequests);
        setRegularClassRequests(regularRequests);
      } catch (error) {
        console.error("Failed to fetch class requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCalendarData = async () => {
      try {
        const data = await SiswaService.getCalendar();
        const formattedEvents = data.map((kelas) => ({
          title: kelas.nama_kelas,
          date: new Date(kelas.waktu_kelas).toISOString().split("T")[0], // Format tanggal
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Failed to fetch calendar data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMataPelajaran = async () => {
      try {
        const data = await SiswaService.getMataPelajaran();
        setMataPelajaran(data);
      } catch (error) {
        console.error("Failed to fetch mata pelajaran:", error);
      } finally {
        setIsLoadingMatpel(false);
      }
    };

    fetchSession();
    fetchCalendarData();
    fetchRequests();
    fetchMataPelajaran();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  // Fetch data pengajar berdasarkan mata pelajaran
  useEffect(() => {
    if (!selectedMatpel) return; // Jangan fetch pengajar jika mata pelajaran belum dipilih

    const fetchPengajar = async () => {
      setIsLoadingPengajar(true);
      try {
        const response = await SiswaService.getPengajarByMatpel(selectedMatpel);
        setPengajar(response); // Respons langsung digunakan karena format sesuai
      } catch (error) {
        console.error("Failed to fetch pengajar:", error);
      } finally {
        setIsLoadingPengajar(false);
      }
    };

    fetchPengajar();
  }, [selectedMatpel]);

  const handleMatpelChange = (event) => {
    const idMatpel = event.target.value;
    setSelectedMatpel(idMatpel);
    setPengajar([]); // Reset pengajar saat mata pelajaran berubah
    setFormData({ ...formData, id_pengajar: "" }); // Reset pengajar di formData
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Header */}
      <h1 className="text-xl font-semibold text-[#212121]">
        Dashboard / <span className="text-[#00a9e0]">Jadwal Kelas</span>
      </h1>

      {/* Status Pengajuan Kelas */}
      {/* Status Pengajuan */}
      <section>
        <h2 className="text-xl font-semibold text-[#212121] mb-4">Pengajuan Kelas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Kelas Privat */}
          {isLoading ? (
              <p>Loading...</p>
            ) : privateClassRequests.length > 0 ? (
              privateClassRequests.map((request, index) => {
                // Pisahkan tanggal dan waktu berdasarkan spasi
                const [tanggalRaw, waktuRaw] = request.waktu_kelas.split(" ");

                // Format tanggal menjadi "21 November 2024"
                const tanggal = new Date(tanggalRaw).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                });

                // Gunakan waktu langsung tanpa perlu split
                const jam = waktuRaw.slice(0, 5); // Ambil jam dalam format "HH:mm"

                return (
                  <PrivateClassRequestCard
                    key={`private-${index}`}
                    judulCard="Kelas Privat"
                    mataPelajaran={request.nama_matpel}
                    namaPengajar={request.nama_pengajar}
                    tanggal={tanggal} // Format tanggal
                    waktu={jam} // Format jam
                    status={request.status_request}
                  />
                );
              })
            ) : (
              <p>Tidak Ada Pengajuan Kelas Privat</p>
            )}

          {/* Kelas Reguler */}
          {isLoading ? (
            <p>Loading...</p>
          ) : regularClassRequests.length > 0 ? (
            regularClassRequests.map((request, index) => (
              <RegulerClassRequestCard
                key={`regular-${index}`}
                mataPelajaran={request.nama_matpel_baru}
                kelasLama={request.nama_kelas_lama}
                kelasBaru={request.nama_kelas_baru}
                waktuLama={new Date(request.waktu_kelas_lama).toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                waktuBaru={new Date(request.waktu_kelas_baru).toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                namaPengajar={request.nama_pengajar_baru}
                status={request.status_request}
              />
            ))
          ) : (
            <p> </p>
          )}
        </div>
      </section>


       {/* Kalender */}
      <section>
        <h2 className="text-lg font-semibold text-[#212121] mb-4">Kalender</h2>
        <div className="p-4 bg-white shadow-md rounded-lg">
          {isLoading ? <p>Loading...</p> : <Calendar events={events} />}
        </div>
      </section>

      {/* Form Pengajuan */}
      <section>
        <h2 className="text-lg font-semibold text-[#212121] mb-4">Form Pengajuan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Form Pengajuan Kelas Privat */}
          <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-[#00a9e0] font-bold mb-4">Form Pengajuan Kelas Privat</h3>
      <form className="space-y-4">
        {/* Dropdown Mata Pelajaran */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Mata Pelajaran</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={selectedMatpel}
            onChange={handleMatpelChange}
          >
            <option value="">Pilih Mata Pelajaran</option>
            {isLoadingMatpel ? (
              <option value="" disabled>Loading...</option>
            ) : (
              mataPelajaran.map((matpel) => (
                <option key={matpel.id_matpel} value={matpel.id_matpel}>
                  {matpel.nama_matpel}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Dropdown Pengajar */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Pengajar</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={formData.id_pengajar}
            name="id_pengajar"
            onChange={handleInputChange}
            disabled={!selectedMatpel}
          >
            <option value="">Pilih Pengajar</option>
            {isLoadingPengajar ? (
              <option value="" disabled>Loading...</option>
            ) : (
              pengajar.map((pengajarItem) => (
                <option key={pengajarItem.id_pengajar} value={pengajarItem.id_pengajar}>
                  {pengajarItem.nama} {/* Menggunakan properti 'nama' dari respons API */}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Waktu Kelas */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Waktu Kelas</label>
          <input
            type="datetime-local"
            className="w-full p-2 border rounded-lg"
            name="waktu_kelas"
            value={formData.waktu_kelas}
            onChange={handleInputChange}
          />
        </div>

        {/* Catatan Khusus */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Catatan Khusus</label>
          <textarea
            className="w-full p-2 border rounded-lg"
            rows="3"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="w-full p-2 bg-[#00a9e0] text-white font-bold rounded-lg hover:bg-[#007bb5] transition duration-200"
          onClick={handleSubmitPrivateClass}
        >
          Ajukan Kelas
        </button>
      </form>
    </div>

          {/* Form Permintaan Perubahan Jadwal Kelas */}
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-[#00a9e0] font-bold mb-4">Form Permintaan Perubahan Jadwal Kelas</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Pilih Kelas Awal</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Pilih Kelas Awal</option>
                </select>
              </div>
              <div>
                <DropdownPilihKelas />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jadwal Baru</label>
                <input type="date" className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Alasan</label>
                <textarea className="w-full p-2 border rounded-lg" rows="3"></textarea>
              </div>
              <button
                type="button"
                className="w-full p-2 bg-[#00a9e0] text-white font-bold rounded-lg hover:bg-[#007bb5] transition duration-200"
                onClick={() => handleSubmit("permintaan")}
              >
                Ajukan Permintaan
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Jadwal Kelas Mingguan
      <section>
        <h2 className="text-lg font-semibold text-[#212121] mb-4">Jadwal Kelas Mingguan</h2>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border border-gray-300 p-2">Hari</th>
                <th className="border border-gray-300 p-2">Tanggal</th>
                <th className="border border-gray-300 p-2">Waktu</th>
                <th className="border border-gray-300 p-2">Jenis Kelas</th>
                <th className="border border-gray-300 p-2">Mata Pelajaran</th>
                <th className="border border-gray-300 p-2">Pengajar</th>
                <th className="border border-gray-300 p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Senin</td>
                <td className="border border-gray-300 p-2">20 Nov 2024</td>
                <td className="border border-gray-300 p-2">08:00 - 10:00</td>
                <td className="border border-gray-300 p-2">Reguler</td>
                <td className="border border-gray-300 p-2">Matematika</td>
                <td className="border border-gray-300 p-2">Ibu Ani</td>
                <td className="border border-gray-300 p-2">
                  <button className="text-[#00a9e0]">Detail</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section> */}

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

export default JadwalDashboardSiswa;