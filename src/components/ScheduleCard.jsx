import React, { useState } from "react";

const ScheduleCard = ({ title, time, className, isToday }) => {
  const [status, setStatus] = useState(null);

  const handleButtonClick = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between space-y-4">
      {/* Title */}
      <h3 className="text-[#00a9e0] text-xl font-bold">{title}</h3>
      {/* Time */}
      <p className="text-[#2c2c2c] text-sm font-medium">{time}</p>
      {/* Class */}
      <p className="text-[#2c2c2c] text-sm font-medium">{className}</p>
      {/* Status */}
      <div className="space-y-2">
        <p className="text-[#2c2c2c] text-sm font-medium">
          {isToday ? "Konfirmasi Kehadiran" : "Konfirmasi Kedatangan"}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => handleButtonClick(isToday ? "Hadir" : "Datang")}
            className={`px-4 py-2 rounded-lg text-sm font-bold border ${
              status === (isToday ? "Hadir" : "Datang")
                ? "bg-[#00a9e0] text-white border-[#00a9e0]"
                : "text-[#00a9e0] border-[#00a9e0] hover:bg-[#00a9e0] hover:text-white"
            }`}
          >
            {isToday ? "Hadir" : "Datang"}
          </button>
          <button
            onClick={() =>
              handleButtonClick(isToday ? "Tidak Hadir" : "Tidak Datang")
            }
            className={`px-4 py-2 rounded-lg text-sm font-bold border ${
              status === (isToday ? "Tidak Hadir" : "Tidak Datang")
                ? "bg-red-500 text-white border-red-500"
                : "text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
            }`}
          >
            {isToday ? "Tidak Hadir" : "Tidak Datang"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;