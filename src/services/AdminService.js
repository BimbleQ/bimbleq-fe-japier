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
