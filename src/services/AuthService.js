import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";

class AuthService {
  static async login(username, password) {
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { username, password },
        { withCredentials: true }
      );
      console.log("Login sukses:", response.data);
      return response.data; 
    } catch (error) {
      console.error("AuthService login error:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }

  static async logout() {
    try {
      await axios.post(`${API_URL}/logout`, null, {
        withCredentials: true, 
      });
      console.log("Logout berhasil");

      //redirect ke halaman login setelah logout
      window.location.href = "/login";
    } catch (error) {
      console.error("AuthService logout error:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  }

  static async validateSession() {
    try {
      const response = await axios.get(`${API_URL}/validate`, {
        withCredentials: true, 
      });
      console.log("Session Data:", response.data);

      //ambil role dari user
      if (response.data.isAuthenticated && response.data.user) {
        return { role: response.data.user.role, user: response.data.user }; //sertakan informasi user
      } else {
        throw new Error("User data not found or not authenticated");
      }
    } catch (error) {
      console.error("AuthService validateSession error:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Session validation failed");
    }
  }

  static async isLoggedIn() {
    try {
      const data = await this.validateSession();
      return !!data; // Jika data tersedia, berarti pengguna sudah login
    } catch (error) {
      return false; // Jika validasi gagal, pengguna dianggap belum login
    }
  }
}

export default AuthService;
