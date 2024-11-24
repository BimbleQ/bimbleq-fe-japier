import React from "react";
import Select from "react-select";

const DropdownPilihKelas = ({ options, selectedOption, onChange }) => {
  // Custom styles untuk dropdown
  const customStyles = {
    option: (provided) => ({
      ...provided,
      padding: 10,
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: "8px",
      borderColor: "#ddd",
      padding: "5px",
    }),
  };

  return (
    <div className="w-full">
      <Select
        options={options} // Data kelas untuk ditampilkan
        value={selectedOption} // Nilai yang dipilih
        onChange={onChange} // Fungsi untuk menangani perubahan
        placeholder="Pilih Kelas"
        styles={customStyles}
        className="rounded-lg"
      />
    </div>
  );
};

export default DropdownPilihKelas;
