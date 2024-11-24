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

export const getSiswa = async () => {
  try {
    const response = await axios.get(`${API_URL}/getSiswa`, {
      withCredentials: true,
    });
    return response.data.siswa;
  } catch (error) {
    console.error("Gagal mengambil data siswa:", error);
    throw error;
  }
};

export const getPengajar = async () => {
  try {
    const response = await axios.get(`${API_URL}/getPengajar`, {
      withCredentials: true,
    });
    return response.data.pengajar;
  } catch (error) {
    console.error("Gagal mengambil data pengajar:", error);
    throw error;
  }
};

export const getKelas = async () => {
  try {
    const response = await axios.get(`${API_URL}/getKelas`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data kelas:", error);
    throw error;
  }
};

export const getPengajuanKelasPrivat = async () => {
  try {
    const response = await axios.get(`${API_URL}/getPengajuanKelasPrivat`, {
      withCredentials: true,
    });
    return response.data.requests;
  } catch (error) {
    console.error("Gagal mengambil data kelas privat:", error);
    throw error;
  }
};

export const getPerubahanKelasReguler = async () => {
  try {
    const response = await axios.get(`${API_URL}/getPengajuanKelasReguler`, {
      withCredentials: true,
    });
    return response.data.requests;
  } catch (error) {
    console.error("Gagal mengambil data kelas reguler:", error);
    throw error;
  }
};
export const postTambahKelas = async (
  nama_kelas,
  tipe,
  id_matpel,
  id_pengajar
) => {
  try {
    const response = await axios.post(
      `${API_URL}/createKelas`,
      {
        nama_kelas: nama_kelas,
        tipe: tipe,
        id_matpel: id_matpel,
        id_pengajar: id_pengajar,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Gagal simpan kelas:", error);
    throw error;
  }
};
export const postSimpanPelajaran = async () => {
  try {
    const response = await axios.post(`${API_URL}/createPelajaran`, {
      withCredentials: true,
    });
    return response.data.requests;
  } catch (error) {
    console.error("Gagal simpan pelajaran:", error);
    throw error;
  }
};

export const removePelajaran = async () => {
  try {
    const response = await axios.delete(`${API_URL}/removePelajaran`, {
      withCredentials: true,
    });
    return response.data.requests;
  } catch (error) {
    console.error("Gagal hapus pelajaran:", error);
    throw error;
  }
};
