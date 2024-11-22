import React from "react";
import Logo from "../../assets/Logo.png"; // Pastikan path ke logo sudah benar

const Login = () => {
  return (
    <div className="h-screen w-full flex">
      {/* Bagian Kiri: Logo */}
      <div className="bg-[#00a9e0] w-1/2 flex items-center justify-center">
        <img src={Logo} alt="BimbelQ Logo" className="w-1/2" />
      </div>

      {/* Bagian Kanan: Form Login */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-md w-3/4 max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#212121] mb-6">Masuk</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#00a9e0] text-white font-bold rounded-lg hover:bg-[#007ab8] transition"
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