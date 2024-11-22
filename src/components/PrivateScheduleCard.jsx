import React from "react";

const PrivateScheduleCard = ({ status }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <p className="text-gray-700">{status || "Tidak Ada Jadwal Hari Ini"}</p>
    </div>
  );
};

export default PrivateScheduleCard;