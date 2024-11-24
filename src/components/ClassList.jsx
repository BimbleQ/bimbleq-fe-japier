import ClassCard from "./ClassCard";

const ClassList = () => {
  const classes = [
    { subject: "Matematika", studentCount: "30", className: "12N", time: "16:00" },
    { subject: "Bahasa Inggris", studentCount: "30", className: "11I", time: "16:00" },
    { subject: "Matematika", studentCount: "30", className: "10G", time: "16:00" },
    { subject: "Bahasa Inggris", studentCount: "30", className: "11G", time: "16:00" },
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