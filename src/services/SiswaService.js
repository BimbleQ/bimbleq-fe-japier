import axios from "axios";

const API_URL = "http://localhost:5001/api/siswa";

const SiswaService = {
  getPertemuanHariIni: async () => {
    try {
      const response = await axios.get(`${API_URL}/pertemuan`, { withCredentials: true });
      return response.data.pertemuanHariIni;
    } catch (error) {
      console.error("Error fetching pertemuan hari ini:", error);
      throw error;
    }
  },

  getTagihan: async () => {
    try {
      const response = await axios.get(`${API_URL}/tagihan`, { withCredentials: true });
      return response.data.tagihan; // Ambil array tagihan dari respons
    } catch (error) {
      console.error("Error fetching tagihan:", error);
      throw error;
    }
  },

  getReqPrivateClass: async () => {
    try {
      const response = await axios.get(`${API_URL}/reqPrivateClass`, { withCredentials: true });
      return response.data.requests;
    } catch (error) {
      console.error("Error fetching private class requests:", error);
      throw error;
    }
  },

  getReqRegulerClass: async () => {
    try {
      const response = await axios.get(`${API_URL}/reqRegulerClass`, { withCredentials: true });
      return response.data.requests;
    } catch (error) {
      console.error("Error fetching regular class requests:", error);
      throw error;
    }
  },

  getCalendar: async () => {
    try {
      const response = await axios.get(`${API_URL}/getCalendar`, { withCredentials: true });
      return response.data.kelas; // Return hanya data kelas
    } catch (error) {
      console.error("Error fetching calendar data:", error);
      throw error;
    }
  },

  getHistoriPembayaran: async () => {
    try {
      const response = await axios.get(`${API_URL}/getHistoryBayarSiswa`, { withCredentials: true });
      return response.data.histori; // Mengembalikan data histori dari API
    } catch (error) {
      console.error("Error fetching histori pembayaran:", error);
      throw error;
    }
  },

  getMataPelajaran: async () => {
    try {
      const response = await axios.get(`${API_URL}/pelajaran`, { withCredentials: true });
      return response.data.mataPelajaran;
    } catch (error) {
      console.error("Error fetching mata pelajaran:", error);
      throw error;
    }
  },

  // Fetch pengajar berdasarkan mata pelajaran
  getPengajarByMatpel: async (idMatpel) => {
    try {
      const response = await axios.get(`${API_URL}/pengajarMatpel?id_matpel=${idMatpel}`, {
        withCredentials: true,
      });
      return response.data.pengajar;
    } catch (error) {
      console.error("Error fetching pengajar:", error);
      throw error;
    }
  },

  // Submit pengajuan kelas privat
  submitPrivateClassRequest: async (payload) => {
    try {
      const response = await axios.post(`${API_URL}/crePrivateClass`, payload, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error submitting private class request:", error);
      throw error;
    }
  },

    // Fetch kelas awal
    getKelasAwal: async () => {
      try {
        const response = await axios.get(`${API_URL}/kelasAwal`, { withCredentials: true });
        return response.data.kelasAwal;
      } catch (error) {
        console.error("Error fetching kelas awal:", error);
        throw error;
      }
    },
  
    // Fetch kelas tujuan berdasarkan ID pertemuan lama
    getKelasTujuan: async (idPertemuanLama) => {
      try {
        const response = await axios.get(`${API_URL}/kelasTujuan_refID`, {
          params: { id_pertemuan_lama: idPertemuanLama },
          withCredentials: true,
        });
        return response.data.kelasTujuan;
      } catch (error) {
        console.error("Error fetching kelas tujuan:", error);
        throw error;
      }
    },
  
    // Submit permintaan perubahan kelas reguler
    postReqReg: async (payload) => {
      try {
        const response = await axios.post(`${API_URL}/postReqReg`, payload, {
          withCredentials: true, // Sertakan cookie/session
        });
        return response.data; // Kembalikan data respons
      } catch (error) {
        console.error("Error submitting regular class request:", error);
        throw error;
      }
    },
  
};

export default SiswaService;
