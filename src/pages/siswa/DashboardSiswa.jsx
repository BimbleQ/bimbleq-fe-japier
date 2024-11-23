import React, { useState, useEffect } from "react";
import RegulerScheduleCard from "../../components/RegulerScheduleCard";
import PrivateScheduleCard from "../../components/PrivateScheduleCard";
import TagihanCard from "../../components/TagihanCard";
import PrivateClassRequestCard from "../../components/PrivateClassRequestCard";
import RegulerClassRequestCard from "../../components/RegulerClassRequestCard";
import AnnouncementCard from "../../components/AnnouncementCard";
import SiswaService from "../../services/SiswaService";

  const DashboardSiswa = ({ nama }) => {
    //const [pertemuanHariIni, setPertemuanHariIni] = useState([]);
    // const [pertemuanReguler, setPertemuanReguler] = useState([]);
    // const [pertemuanPrivat, setPertemuanPrivat] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //   const fetchPertemuan = async () => {
    //     try {
    //       const data = await SiswaService.getPertemuanHariIni();
    //       const reguler = data.filter((pertemuan) => pertemuan.tipe === "reguler");
    //       const privat = data.filter((pertemuan) => pertemuan.tipe === "privat");

    //       //setPertemuanHariIni(data);
    //       setPertemuanReguler(reguler);
    //       setPertemuanPrivat(privat);

    //     } catch (error) {
    //       console.error("Failed to fetch pertemuan:", error);

    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };

    //   fetchPertemuan();
    // }, []);

    const [pertemuanReguler, setPertemuanReguler] = useState([]);
    const [pertemuanPrivat, setPertemuanPrivat] = useState([]);
    const [privateClassRequests, setPrivateClassRequests] = useState([]);
    const [regularClassRequests, setRegularClassRequests] = useState([]);
    const [tagihan, setTagihan] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingTagihan, setIsLoadingTagihan] = useState(true);

    useEffect(() => {
      const fetchPertemuan = async () => {
        try {
          const data = await SiswaService.getPertemuanHariIni();
          console.log("Data API:", data);

          const reguler = data.filter((pertemuan) => pertemuan.tipe === "reguler");
          const privat = data.filter((pertemuan) => pertemuan.tipe === "privat");

          setPertemuanReguler(reguler);
          setPertemuanPrivat(privat);
        } catch (error) {
          console.error("Failed to fetch pertemuan:", error);
        } finally {
          setIsLoading(false);
        }
      };

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

      fetchPertemuan();
      fetchTagihan();
      fetchRequests();
    }, []);

  // const announcements = [
  //   { judul: "Pengumuman 1", isi: "Isi Pengumuman 1", waktu: "10:00" },
  //   { judul: "Pengumuman 2", isi: "Isi Pengumuman 2", waktu: "10:30" },
  //   { judul: "Pengumuman 3", isi: "Isi Pengumuman 3", waktu: "11:00" },
  // ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-[#212121]">
        Selamat Datang, <span className="text-[#ff8c00]" id="nama_siswa">{nama || "Nama Siswa"}</span>
      </h1>
      {/* Jadwal Kelas */}
      <section>
        <h2 className="text-xl font-semibold text-[#212121] mb-4">Jadwal Kelas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Kelas Reguler */}
          <div className="p-4 bg-white shadow-md rounded-lg" id="kelasReguler">
            <h3 className="text-[#00a9e0] font-bold mb-4">Jadwal Kelas Reguler Hari Ini</h3>
            {isLoading ? (
              <p>Loading...</p>
            ) : pertemuanReguler.length > 0 ? (
              pertemuanReguler.map((pertemuan, index) => (
                <RegulerScheduleCard
                  key={index}
                  mataPelajaran={pertemuan.nama_matpel}
                  namaGuru={pertemuan.nama_pengajar}
                  kelas={pertemuan.nama_kelas}
                  waktu={new Date(pertemuan.waktu_kelas).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
              ))
            ) : (
              <div className="p-4 bg-gray-100 rounded-lg text-center">
                <p className="text-gray-600">Tidak Ada Jadwal Reguler Hari Ini</p>
              </div>
            )}
          </div>

          {/* Kelas Privat */}
          <div className="p-4 bg-white shadow-md rounded-lg" id="kelasPrivat">
            <h3 className="text-[#00a9e0] font-bold mb-4">Jadwal Kelas Privat Hari Ini</h3>
            {isLoading ? (
              <p>Loading...</p>
            ) : pertemuanPrivat.length > 0 ? (
              pertemuanPrivat.map((pertemuan, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg shadow">
                  <p className="text-sm text-gray-600">
                    Mata Pelajaran: <span className="font-semibold">{pertemuan.nama_matpel}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Nama Guru: <span className="font-semibold">{pertemuan.nama_pengajar}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Kelas: <span className="font-semibold">{pertemuan.nama_kelas}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Waktu:{" "}
                    <span className="font-semibold">
                      {new Date(pertemuan.waktu_kelas).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 bg-gray-100 rounded-lg text-center">
                <p className="text-gray-600">Tidak Ada Jadwal Privat Hari Ini</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
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


      {/* masih belum bisa di implementasikan! */}
      {/* Pengumuman */}
      {/* <section>
        <h2 className="text-xl font-semibold text-[#212121] mb-4">Pengumuman</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {announcements.map((announcement, index) => (
            <AnnouncementCard
              key={index}
              judul={announcement.judul}
              isi={announcement.isi}
              waktu={announcement.waktu}
            />
          ))}
        </div>
      </section> */}
    </div>
  );
};

export default DashboardSiswa;