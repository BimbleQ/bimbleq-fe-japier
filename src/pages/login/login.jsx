import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Logo from "../../assets/Logo.png";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Gunakan useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const data = await AuthService.login(username, password);
      console.log("Login sukses:", data);
  
      // Panggil onLogin untuk memperbarui state di App.jsx
      onLogin({ role: data.user.role, nama: data.user.nama });
  
      // Navigasikan ke dashboard berdasarkan role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else if (data.user.role === "guru") {
        navigate("/guru");
      } else if (data.user.role === "siswa") {
        navigate("/siswa");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="h-screen w-full flex">
      <div className="bg-[#00a9e0] w-1/2 flex items-center justify-center">
        <img src={Logo} alt="BimbelQ Logo" className="w-1/2" />
      </div>
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-md w-3/4 max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#212121] mb-6">Masuk</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#00a9e0] text-white font-bold rounded-lg"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
