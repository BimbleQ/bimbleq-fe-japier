import ClassCard from "./components/ClassCard";

const ClassList = () => {
  const classes = [
    { subject: "[Nama Mata Pelajaran]", studentCount: "30", className: "12N", time: "08:00" },
    { subject: "[Nama Mata Pelajaran]", studentCount: "25", className: "11I", time: "10:00" },
    { subject: "[Nama Mata Pelajaran]", studentCount: "28", className: "10G", time: "12:00" },
    { subject: "[Nama Mata Pelajaran]", studentCount: "20", className: "11G", time: "14:00" },
  ];

  return (
    <div className="flex flex-col gap-4 mt-6 w-full">
      <h2 className="text-xl font-semibold text-[#212121]">
        Daftar Kelas yang Diajarkan
      </h2>
      <div className="flex flex-col gap-4 w-full">
        {classes.map((classInfo, index) => (
          <ClassCard
            key={index}
            subject={classInfo.subject}
            studentCount={classInfo.studentCount}
            className={classInfo.className}
            time={classInfo.time}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassList;