import React from "react";

const aktivitasTerbaru = () => {
  const activities = [
    { id: 1, nama: "Admin A", isi: "Verifikasi pembayaran", waktu: "10:00" },
    { id: 2, nama: "Admin B", isi: "Menambahkan kelas baru", waktu: "10:30" },
    { id: 3, nama: "Admin C", isi: "Menghapus jadwal", waktu: "11:00" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex justify-between">
            <span className="font-bold">{activity.nama}</span>
            <span className="text-gray-600">{activity.isi}</span>
            <span className="text-gray-400">{activity.waktu}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default aktivitasTerbaru;