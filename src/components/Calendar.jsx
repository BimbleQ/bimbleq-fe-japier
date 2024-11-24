import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; 
import interactionPlugin from "@fullcalendar/interaction"; 

const Calendar = ({ events }) => {
  // Handler ketika tanggal diklik
  const handleDateClick = (info) => {
    alert(`Tanggal yang diklik: ${info.dateStr}`);
  };

  // Handler ketika event diklik
  const handleEventClick = (info) => {
    alert(`Event diklik: ${info.event.title}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events} // Gunakan data dari prop
          //dateClick={handleDateClick} // Klik pada tanggal
          //eventClick={handleEventClick} // Klik pada event
          selectable={true} // Mengaktifkan seleksi tanggal
          editable={false} // Mematikan drag and drop event
          height="auto"
        />
      </div>
    </div>
  );
};

export default Calendar;
