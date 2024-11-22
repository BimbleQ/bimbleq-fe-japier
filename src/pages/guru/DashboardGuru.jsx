import React from "react";
import Header from "../../components/Header";
import Schedule from "../../components/Schedule";
import ClassList from "../../components/ClassList";

const DashboardGuru = () => {
  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 py-6 bg-neutral-100 min-h-screen space-y-6">
      {/* Header */}
      
        <Header />
      

      {/* Jadwal Kamu */}
      <div className="bg-white p-6 rounded-lg shadow">
        <Schedule />
      </div>

      {/* Daftar Kelas yang Diajarkan */}
      <div className="bg-white p-6 rounded-lg shadow">
        <ClassList />
      </div>
    </div>
  );
};

export default DashboardGuru;