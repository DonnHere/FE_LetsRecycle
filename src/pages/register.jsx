import React, { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    setError({});
    setSuccess(false);

    try {
      // Request API untuk registrasi
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/register", // URL Laravel API
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 201) {
        // Jika registrasi berhasil
        setSuccess(true);
        alert("Pendaftaran berhasil! Silakan login.");
        // Reset form setelah sukses
        setFormData({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        });
      }
    } catch (err) {
      // Tangkap dan tampilkan error dari server
      if (err.response && err.response.data.errors) {
        setError(err.response.data.errors);
      } else {
        setError({ general: "Terjadi kesalahan. Coba lagi nanti." });
      }
    } finally {
      // Hentikan loading setelah request selesai
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mt-4">Let's Recycle</h1>
          <h2 className="text-xl font-medium mt-2">Register</h2>
        </div>

        {error.general && (
          <p className="text-red-500 text-center mb-4">{error.general}</p>
        )}
        {success && (
          <p className="text-green-500 text-center mb-4">
            Pendaftaran berhasil! Silakan login.
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                error.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Masukkan nama Anda"
            />
            {error.name && <p className="text-red-500 text-xs">{error.name[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                error.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Masukkan email Anda"
            />
            {error.email && (
              <p className="text-red-500 text-xs">{error.email[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                error.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Masukkan password Anda"
            />
            {error.password && (
              <p className="text-red-500 text-xs">{error.password[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Konfirmasi Password</label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                error.password_confirmation ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ulangi password Anda"
            />
            {error.password_confirmation && (
              <p className="text-red-500 text-xs">
                {error.password_confirmation[0]}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
          >
            {loading ? "Mendaftar..." : "Daftar"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Sudah punya akun? <a href="/" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
