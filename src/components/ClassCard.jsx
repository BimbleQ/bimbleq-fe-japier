const ClassCard = ({ subject, studentCount, className, time }) => {
    return (
      <div className="w-full flex justify-between items-center bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        {/* Bagian kiri: Informasi kelas */}
        <div>
          <h3 className="text-[#2c2c2c] text-lg font-bold font-['Poppins']">
            {subject}
          </h3>
          <p className="text-sm text-gray-600">Jumlah Siswa: {studentCount}</p>
          <p className="text-sm text-gray-600">Kelas: {className}</p>
        </div>
        {/* Bagian kanan: Waktu */}
        <div>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>
    );
  };
  
  export default ClassCard;