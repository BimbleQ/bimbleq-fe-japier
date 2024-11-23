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
  
};

export default SiswaService;
