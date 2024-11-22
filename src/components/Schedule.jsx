import React from "react";
import ScheduleCard from "./ScheduleCard";

const Schedule = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-[#212121] text-2xl font-semibold">Jadwal Kamu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Jadwal Hari Ini */}
        <ScheduleCard
          title="Jadwal Hari Ini"
          time="08:00"
          className="Kelas 10A"
          isToday={true}
        />
        {/* Card 2: Jadwal yang Akan Datang */}
        <ScheduleCard
          title="Jadwal yang Akan Datang"
          time="10:00"
          className="Kelas 12B"
          isToday={false}
        />
      </div>
    </div>
  );
};

export default Schedule;