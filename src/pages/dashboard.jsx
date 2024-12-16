import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { BiUser, BiShield } from "react-icons/bi";
import logo from "../assets/logo.jpg";
import axios from "axios";

function UserDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    name: "",
    email: "",
    password: "", // Tambahkan password untuk update
  });

  // Ambil token dari localStorage
  const token = localStorage.getItem("authToken");

  // Axios instance with Authorization header
  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/api/usersadmin");
        setUsers(response.data.data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/auth/users/delete/${id}`);
      alert("User deleted successfully!");
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    alert("Logged out successfully!");
    localStorage.removeItem("authToken"); // Hapus token dari localStorage
    navigate("/");
  };

  // Handle editing user
  const handleEdit = (user) => {
    setEditingUser(user);
    setUpdatedUserData({
      name: user.name,
      email: user.email,
      password: "", // Kosongkan password untuk update baru
    });
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { name, email, password } = updatedUserData;

    try {
      const payload = { name, email };
      if (password) payload.password = password;

      const response = await axiosInstance.put(
        `/api/auth/users/update/${editingUser.id}`,
        payload
      );
      alert("User updated successfully!");
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...response.data.user, password } : user
        )
      );
      setEditingUser(null); // Clear form
    } catch (err) {
      alert("Failed to update user.");
    }
  };

  // Handle input change for update form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
  }

  return (
    <div className="flex h-screen w-full bg-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Recycle Hero" className="h-40 md:h-48 object-contain" />
          <h1 className="text-lg font-bold text-green-600">Account Management</h1>
        </div>
        <nav className="w-full flex-1">
          <ul>
            <li
              className="text-blue-600 flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
              onClick={() => navigate("/dashboard")}
            >
              <BiUser className="text-xl" />
              <span className="ml-3 text-lg font-semibold">Users</span>
            </li>

            <li
              className="text-blue-600 flex items-center px-4 py-2 mt-2 cursor-pointer hover:bg-gray-100 rounded"
              onClick={() => navigate("/dataadmin")}
            >
              <BiShield className="text-xl" />
              <span className="ml-3 text-lg font-semibold">Admin</span>
            </li>

            <li
              className="text-red-600 flex items-center px-4 py-2 mt-auto cursor-pointer hover:bg-gray-100 rounded"
              onClick={handleLogout}
            >
              <FiLogOut className="text-xl" />
              <span className="ml-3 text-lg font-semibold">Logout</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Hallo, Superadmin</h2>
        </div>

        {/* User Table */}
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <h3 className="px-6 py-4 text-lg font-medium text-gray-800 border-b">List Users</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full w-full">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Password</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Created At</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.password || "N/A"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
                        <button
                          onClick={() => handleEdit(user)}
                          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center px-6 py-4 text-gray-500">
                      No users available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Edit User</h2>
              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={updatedUserData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={updatedUserData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={updatedUserData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                  />
                  <p className="text-sm text-gray-500">Biarkan kosong untuk menyimpan kata sandi saat ini</p>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default UserDashboard;
