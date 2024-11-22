import React from "react";

const announcementCard = ({ judul, isi, waktu }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="font-bold">{judul || "Judul Pengumuman"}</h4>
      <p className="text-gray-700">{isi || "Isi Pengumuman"}</p>
      <p className="text-gray-500 text-sm text-right">{waktu || "Waktu"}</p>
    </div>
  );
};

export default announcementCard;