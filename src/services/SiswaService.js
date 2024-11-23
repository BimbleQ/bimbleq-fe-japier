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

};

export default SiswaService;
