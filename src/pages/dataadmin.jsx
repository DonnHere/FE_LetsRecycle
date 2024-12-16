import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { BiUser, BiShield, BiPlus } from "react-icons/bi";
import logo from "../assets/logo.jpg";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editAdmin, setEditAdmin] = useState(null);
  const [form, setForm] = useState({ nama: "", email: "", password: "" });
  const [newAdminForm, setNewAdminForm] = useState(false); // State to toggle form for adding admin

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/data/admin");
        setAdmins(response.data.data);
      } catch (err) {
        setError("Failed to load admins");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/delete/${id}`);
      alert("Admin deleted successfully!");
      setAdmins(admins.filter((admin) => admin.id !== id));
    } catch (err) {
      console.error("Error deleting admin:", err);
      alert("Failed to delete admin.");
    }
  };

  const handleEdit = (admin) => {
    setEditAdmin(admin);
    setForm({ nama: admin.nama, email: admin.email, password: "" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/admin/update/${editAdmin.id}`,
        form
      );
      alert("Admin updated successfully!");
      setAdmins(
        admins.map((admin) =>
          admin.id === editAdmin.id ? { ...admin, ...form } : admin
        )
      );
      setEditAdmin(null); // Close the edit form
    } catch (err) {
      console.error("Error updating admin:", err);
      alert("Failed to update admin.");
    }
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/"); // Navigate back to login or home page
  };

  const handleAddAdmin = () => {
    setNewAdminForm(!newAdminForm); // Toggle form visibility
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/admin/create", form);
      alert("Admin added successfully!");
      setAdmins([...admins, response.data]);
      setNewAdminForm(false); // Hide the form after submission
      setForm({ nama: "", email: "", password: "" }); // Reset the form
    } catch (err) {
      console.error("Error adding admin:", err);
      alert("Failed to add admin.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Error: {error}
      </div>
    );
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
            <li>
              <Link to="/dashboard" className="text-blue-600 flex items-center px-4 py-2 hover:bg-gray-100 rounded text-lg font-semibold">
                <BiUser className="text-xl" />
                <span className="ml-3">Users</span>
              </Link>
            </li>
            <li className="mt-2">
              <Link to="/dataadmin" className="text-blue-600 flex items-center px-4 py-2 hover:bg-gray-100 rounded text-lg font-semibold">
                <BiShield className="text-xl" />
                <span className="ml-3">Admin</span>
              </Link>
            </li>
            <li className="mt-auto">
              <button onClick={handleLogout} className="text-red-600 flex items-center px-4 py-2 mt-4 hover:bg-gray-100 rounded text-lg font-semibold">
                <FiLogOut className="text-xl" />
                <span className="ml-3">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Hallo, Superadmin</h2>
        </div>

        {/* Add Admin Button */}
        <div className="flex justify-start mb-4">
          <button onClick={handleAddAdmin} className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-green-800 transition duration-300">
            <BiPlus className="text-xl" />
            <span className="ml-2">Data Admin</span>
          </button>
        </div>

        {/* New Admin Form */}
        {newAdminForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-medium mb-4 text-center">Add New Admin</h3>
              <form onSubmit={handleCreateAdmin}>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={form.nama}
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                  />
                </div>
                <div className="flex justify-between space-x-4">
                  <button
                    type="button"
                    onClick={() => setNewAdminForm(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-lg">
                    Add Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Admin Form */}
        {editAdmin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-medium mb-4 text-center">Edit Admin</h3>
              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={form.nama}
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                  />
                </div>
                <div className="flex justify-between space-x-4">
                  <button
                    type="button"
                    onClick={() => setEditAdmin(null)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg">
                    Update Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Admin Table */}
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <h3 className="px-6 py-4 text-lg font-medium text-gray-800 border-b">
            List Admins
          </h3>
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
                {admins.length > 0 ? (
                  admins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{admin.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{admin.nama}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{admin.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">N/A</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(admin.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-start space-x-4">
                        <button onClick={() => handleEdit(admin)} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(admin.id)} className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition duration-300">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center px-6 py-4 text-gray-500">
                      No admins available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
