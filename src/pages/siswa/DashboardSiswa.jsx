import React from "react";
import RegulerScheduleCard from "../../components/RegulerScheduleCard";
import PrivateScheduleCard from "../../components/PrivateScheduleCard";
import TagihanCard from "../../components/TagihanCard";
import ClassRequestCard from "../../components/ClassRequestCard";
import AnnouncementCard from "../../components/AnnouncementCard";

const DashboardSiswa = () => {
  const announcements = [
    { judul: "Pengumuman 1", isi: "Isi Pengumuman 1", waktu: "10:00" },
    { judul: "Pengumuman 2", isi: "Isi Pengumuman 2", waktu: "10:30" },
    { judul: "Pengumuman 3", isi: "Isi Pengumuman 3", waktu: "11:00" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-[#212121]">
        Selamat Datang, <span className="text-[#ff8c00]">[Nama Siswa]</span>
      </h1>

      {/* Jadwal Kelas */}
      <section>
        <h2 className="text-xl font-semibold text-[#212121] mb-4">Jadwal Kelas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-[#00a9e0] font-bold mb-4">Jadwal Kelas Reguler Hari Ini</h3>
            <RegulerScheduleCard 
              mataPelajaran="Matematika"
              namaGuru="Ibu Ani"
              kelas="Kelas A"
              waktu="08:00 - 10:00"
            />
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-[#00a9e0] font-bold mb-4">Jadwal Kelas Privat Hari Ini</h3>
            <PrivateScheduleCard status="Tidak Ada Jadwal Hari Ini" />
          </div>
        </div>
      </section>

      {/* Tagihan */}
      <section>
        <h2 className="text-xl font-semibold text-[#212121] mb-4">Tagihan</h2>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <TagihanCard 
            namaTagihan="SPP November"
            jumlah="Rp 1.000.000"
            status="Belum Lunas"
          />
        </div>
      </section>

      {/* Status Pengajuan */}
      <section>
        <h2 className="text-xl font-semibold text-[#212121] mb-4">Status Pengajuan Kelas</h2>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <ClassRequestCard 
            namaKelas="Fisika"
            waktu="10:00 - 12:00"
            statusPengajuan="Menunggu Verifikasi"
          />
        </div>
      </section>

      {/* Pengumuman */}
      <section>
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
      </section>
    </div>
  );
};

export default DashboardSiswa;