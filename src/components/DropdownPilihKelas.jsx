import React from "react";
import Select from "react-select";

const DropdownPilihKelas = () => {
  // Data kelas (isi ini dengan data dinamis jika diperlukan)
  const kelasOptions = [
    {
      value: "kelas-ipa-a",
      label: (
        <div>
          <span className="block font-bold">KELAS IPA A</span>
          <span className="text-sm text-gray-600">18:40 Senin, 29 Februari 2024</span>
        </div>
      ),
    },
    {
      value: "kelas-ipa-b",
      label: (
        <div>
          <span className="block font-bold">KELAS IPA B</span>
          <span className="text-sm text-gray-600">18:40 Senin, 29 Februari 2025</span>
        </div>
      ),
    },
  ];

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
      <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Kelas Tujuan</label>
      <Select 
        options={kelasOptions} 
        placeholder="Pilih Kelas"
        styles={customStyles}
        className="rounded-lg"
      />
    </div>
  );
};

export default DropdownPilihKelas;