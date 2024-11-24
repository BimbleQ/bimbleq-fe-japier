import axios from "axios";

// URL dasar API backend
const API_URL = "http://localhost:5001/api/admin"; // Sesuaikan dengan URL backend Anda

// Fungsi untuk mendapatkan jumlah kelas aktif
export const getJumlahKelasAktif = async () => {
  try {
    const response = await axios.get(`${API_URL}/jumlahKelasAktif`, {
      withCredentials: true,
    }); // Pastikan cookie/kredensial dikirim jika diperlukan
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil jumlah kelas aktif:", error);
    throw error;
  }
};

export const getJumlahPengajar = async () => {
  try {
    const response = await axios.get(`${API_URL}/jumlahPengajar`, {
      withCredentials: true,
    }); // Pastikan cookie/kredensial dikirim jika diperlukan
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil jumlah kelas aktif:", error);
    throw error;
  }
};

export const getJumlahSiswa = async () => {
  try {
    const response = await axios.get(`${API_URL}/jumlahSiswa`, {
      withCredentials: true,
    }); // Pastikan cookie/kredensial dikirim jika diperlukan
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil jumlah kelas aktif:", error);
    throw error;
  }
};

export const getJumlahTagihanPending = async () => {
  try {
    const response = await axios.get(`${API_URL}/jumlahTagihanPending`, {
      withCredentials: true,
    }); // Pastikan cookie/kredensial dikirim jika diperlukan
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil jumlah kelas aktif:", error);
    throw error;
  }
};

export const getJumlahPengajuanPrivat = async () => {
  try {
    const response = await axios.get(`${API_URL}/jumlahPengajuanPrivat`, {
      withCredentials: true,
    }); // Pastikan cookie/kredensial dikirim jika diperlukan
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil jumlah kelas aktif:", error);
    throw error;
  }
};

export const getJumlahPengajuanReguler = async () => {
  try {
    const response = await axios.get(`${API_URL}/jumlahPengajuanReguler`, {
      withCredentials: true,
    }); // Pastikan cookie/kredensial dikirim jika diperlukan
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil jumlah kelas aktif:", error);
    throw error;
  }
};

export const getJumlahPelajaran = async () => {
  try {
    const response = await axios.get(`${API_URL}/jumlahPelajaran`, {
      withCredentials: true,
    }); // Pastikan cookie/kredensial dikirim jika diperlukan
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil jumlah kelas aktif:", error);
    throw error;
  }
};

export const getMataPelajaran = async () => {
  try {
    const response = await axios.get(`${API_URL}/pelajaran`, {
      withCredentials: true,
    });
    return response.data.mataPelajaran;
  } catch (error) {
    console.error("Gagal mengambil data mata pelajaran:", error);
    throw error;
  }
};

export const getPembayaran = async () => {
  try {
    const response = await axios.get(`${API_URL}/getTagihan`, {
      withCredentials: true,
    });
    return response.data.pembayaran;
  } catch (error) {
    console.error("Gagal mengambil data pembayaran:", error);
    throw error;
  }
};

// siswa
export const addSiswa = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/addSiswa`, data, {
      withCredentials: true,
    });

    
    return {
      ...data, 
      message: response.data.message, 
    };
  } catch (error) {
    console.error("Gagal menambahkan siswa:", error);
    throw error;
  }
};

export const getSiswa = async () => {
  try {
    const response = await axios.get(`${API_URL}/getSiswa`, {
      withCredentials: true, 
    });
    return response.data.siswa; 
  } catch (error) {
    console.error("Error mendapatkan data siswa:", error);
    throw error; 
  }
};

export const getSiswaById = async (id_siswa) => {
  try {
    const response = await axios.get(`${API_URL}/getSiswaById/${id_siswa}`, {
      withCredentials: true,
    });
    return response.data.siswa[0]; // Mengembalikan siswa pertama dari response
  } catch (error) {
    console.error("Gagal mendapatkan data siswa:", error);
    throw error;
  }
};

export const updateSiswa = async (id_siswa, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}/updateSiswa/${id_siswa}`,
      updatedData,
      { withCredentials: true }
    );
    return response.data; // Mengembalikan response dari backend
  } catch (error) {
    console.error("Gagal memperbarui data siswa:", error);
    throw error; // Lempar error untuk ditangani di komponen pemanggil
  }
};




// pelajaran

export const simpanPelajaran = async (nama_matpel) => {
  try {
    const response = await axios.post(
      `${API_URL}/createPelajaran`, 
      { nama_matpel }, // Data dikirim sebagai objek
      { withCredentials: true } // Untuk autentikasi
    );
    console.log("Response:", response);
    return response.data.message; // Mengembalikan pesan dari response
  } catch (error) {
    console.error("Error saving pelajaran:", error);
    throw error; // Lempar error untuk penanganan di komponen
  }
};

export const getPelajaran = async () => {
  try {
    const response = await axios.get(`${API_URL}/pelajaran`, { withCredentials: true });
    console.log("Response:", response);
    return response.data.mataPelajaran; 
  } catch (error) {
    console.error("Error fetching pelajaran:", error);
    throw error; 
  }
};

export const deletePelajaran = async (id_matpel) => {
  try {
    const response = await axios.delete(`${API_URL}/removePelajaran`, {
      data: { id_matpel }, // Mengirimkan data sebagai bagian dari request body
      withCredentials: true, // Untuk autentikasi
    });
    console.log("Response:", response);
    return response.data.message; // Mengembalikan pesan dari response
  } catch (error) {
    console.error("Error deleting pelajaran:", error);
    throw error; // Lempar error untuk ditangani di komponen
  }
};

// pengajar
export const getPengajarById = async (id_pengajar) => {
  try {
    const response = await axios.get(`${API_URL}/getPengajarById/${id_pengajar}`, {
      withCredentials: true, // Mengirim kredensial jika diperlukan
    });
    console.log("Response:", response);
    return response.data.pengajar; // Mengembalikan data pengajar
  } catch (error) {
    console.error("Error fetching pengajar by ID:", error);
    throw error; // Lempar error untuk ditangani di komponen pemanggil
  }
};

export const getPengajar = async () => {
  try {
    const response = await axios.get(`${API_URL}/getPengajar`, {
      withCredentials: true, // Mengirim kredensial jika diperlukan
    });
    console.log("Response:", response);
    return response.data.pengajar; // Mengembalikan daftar pengajar
  } catch (error) {
    console.error("Error fetching pengajar:", error);
    throw error; // Lempar error untuk ditangani di komponen pemanggil
  }
};

export const tambahPengajar = async (username, password, nama, kontak, id_matpel) => {
  try {
    const response = await axios.post(
      `${API_URL}/addPengajar`,
      {
        username, // Menggunakan shorthand untuk properti objek
        password,
        nama,
        kontak,
        id_matpel,
      },
      { withCredentials: true } // Sertakan kredensial jika diperlukan
    );
    console.log("Response:", response);
    return response.data.message; // Mengembalikan pesan sukses dari backend
  } catch (error) {
    console.error("Error menambahkan pengajar:", error);
    throw error; // Lempar error untuk ditangani di komponen pemanggil
  }
};