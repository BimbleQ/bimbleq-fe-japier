import React from "react";
import FullCalendar from "@fullcalendar/react"; // Import FullCalendar
import dayGridPlugin from "@fullcalendar/daygrid"; // Plugin untuk tampilan kalender
import interactionPlugin from "@fullcalendar/interaction"; // Plugin untuk interaksi


const JadwalKelas = () => {
  const events = [
    { title: "Kelas Matematika", date: "2024-11-20" },
    { title: "Kelas Bahasa Inggris", date: "2024-11-22" },
  ];

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Breadcrumb */}
      <h2 className="text-xl font-semibold text-[#212121]">
        Dashboard / <span className="text-[#00a9e0]">Jadwal Kelas</span>
      </h2>

      
       {/* Jadwal Mingguan */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-[#212121] font-semibold">Jadwal Kelas Mingguan</h3>
        <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Hari</th>
              <th className="border border-gray-300 p-2">Tanggal</th>
              <th className="border border-gray-300 p-2">Waktu</th>
              <th className="border border-gray-300 p-2">Jenis Kelas</th>
              <th className="border border-gray-300 p-2">Mata Pelajaran</th>
              <th className="border border-gray-300 p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {/* Isi tabel */}
            <tr>
              <td className="border border-gray-300 p-2">Senin</td>
              <td className="border border-gray-300 p-2">20 Nov</td>
              <td className="border border-gray-300 p-2">08:00</td>
              <td className="border border-gray-300 p-2">Kelas Reguler</td>
              <td className="border border-gray-300 p-2">Matematika</td>
              <td className="border border-gray-300 p-2 text-center">
                <button className="bg-[#00a9e0] text-white px-4 py-2 rounded">Detail</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      

      {/* Kalender dan Ringkasan Mingguan */}
      <div className="grid grid-cols-3 gap-6">
        {/* Kalender */}
        <div className="col-span-2 bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-[#212121] font-semibold">Kalender</h3>
          <div className="mt-4">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              height="auto"
              dateClick={(info) => alert(`Tanggal dipilih: ${info.dateStr}`)}
              eventClick={(info) => alert(`Event: ${info.event.title}`)}
            />
          </div>
        </div>

        {/* Ringkasan Mingguan */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-[#212121] font-semibold">Ringkasan Mingguan</h3>
          <div className="flex flex-col gap-4">
            <div className="bg-[#00a9e0] text-white rounded-lg p-4 text-center m-4">
              Total Kelas Minggu Ini: 4
            </div>
            <div className="bg-[#ff8c00] text-white rounded-lg p-4 text-center m-4">
              Kelas Privat: 2
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default JadwalKelas;