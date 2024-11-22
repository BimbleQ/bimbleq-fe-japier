import React from "react";
import Select from "react-select";

const DropdownTagihan = () => {
  // Data tagihan (isi ini dengan data dinamis jika diperlukan)
  const tagihanOptions = [
    {
      value: "tagihan-november",
      label: (
        <div>
          <span className="block font-bold">SPP November</span>
          <span className="text-sm text-gray-600">Jatuh Tempo: 29 November 2024</span>
          <span className="text-sm text-gray-600">Rp 1.000.000</span>
        </div>
      ),
    },
    {
      value: "tagihan-desember",
      label: (
        <div>
          <span className="block font-bold">SPP Desember</span>
          <span className="text-sm text-gray-600">Jatuh Tempo: 29 Desember 2024</span>
          <span className="text-sm text-gray-600">Rp 1.000.000</span>
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
      <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Tagihan</label>
      <Select
        options={tagihanOptions}
        placeholder="Pilih Tagihan"
        styles={customStyles}
        className="rounded-lg"
      />
    </div>
  );
};

export default DropdownTagihan;