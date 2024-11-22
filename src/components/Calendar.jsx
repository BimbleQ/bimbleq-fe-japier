import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; 
import interactionPlugin from "@fullcalendar/interaction"; 

const calendar = () => {
  const events = [
    { title: "Meeting with Team", date: "2024-11-20" },
    { title: "Project Deadline", date: "2024-11-25" },
  ];

  // Handler ketika tanggal diklik
  const handleDateClick = (info) => {
    alert(`Date clicked: ${info.dateStr}`);
  };

  // Handler ketika event diklik
  const handleEventClick = (info) => {
    alert(`Event clicked: ${info.event.title}`);
  };

  return (
    <div className="container mx-auto p-4">
      
      <div className="bg-white shadow-lg rounded-lg p-6">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick} // Klik pada tanggal
          eventClick={handleEventClick} // Klik pada event
          selectable={true} // Mengaktifkan seleksi tanggal
          editable={true} // Memungkinkan drag and drop event
          height="auto"
        />
      </div>
    </div>
  );
};

export default calendar;