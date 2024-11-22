class AuthService {
    static async login(username, password) {
      const API_URL = "http://localhost:5001/api/auth/login";
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
          credentials: "include", // Kirim cookie untuk autentikasi
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed");
        }
  
        const data = await response.json();
        return data; // Data yang dikembalikan API, misalnya informasi role atau pesan
      } catch (error) {
        console.error("AuthService login error:", error.message);
        throw error;
      }
    }
  
    static async logout() {
      const API_URL = "http://localhost:5001/api/auth/logout";
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          credentials: "include", // Kirim cookie untuk logout
        });
  
        if (!response.ok) {
          throw new Error("Logout failed");
        }
  
        // Redirect ke halaman login setelah logout
        window.location.href = "/login";
      } catch (error) {
        console.error("AuthService logout error:", error.message);
      }
    }
  
    static async validateSession() {
        const API_URL = "http://localhost:5001/api/auth/validate";
        try {
          const response = await fetch(API_URL, {
            method: "GET",
            credentials: "include", // Kirim cookie untuk validasi session
          });
    
          if (!response.ok) {
            throw new Error("Session validation failed");
          }
    
          const data = await response.json();
          console.log("Session Data:", data); // Log hasil API untuk debugging
    
          // Ambil role dari user
          if (data.isAuthenticated && data.user) {
            return { role: data.user.role }; // Pastikan role diteruskan
          } else {
            throw new Error("User data not found or not authenticated");
          }
        } catch (error) {
          console.error("AuthService validateSession error:", error.message);
          throw error;
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
  