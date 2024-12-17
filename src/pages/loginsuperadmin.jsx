import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Pastikan axios sudah diinstal

function SuperAdminLoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Kirim request menggunakan axios
      const response = await axios.post("http://127.0.0.1:8000/api/superadmin", {
        email: formData.username, // Gunakan email sebagai username
        password: formData.password,
      });

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.access_token);
        navigate("/dashboard")
      } else {
        setError(response.data.message || "Login gagal. Periksa kembali email dan password.");
      }
    } catch (err) {
      setError("Gagal terhubung ke server. Silakan coba lagi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">SuperAdmin Login</h2>
        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          <p>
            <a href="/" className="text-blue-600 hover:underline">
              Back to Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminLoginPage;
