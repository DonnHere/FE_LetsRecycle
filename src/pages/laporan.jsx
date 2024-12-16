import React, { useEffect, useState } from "react"; 
import logo from '../assets/logo.jpg';
import axios from 'axios';
import { FaFileAlt } from 'react-icons/fa'; // Add the report icon

function ReportDashboard() {
  const [reports, setReports] = useState([]); // State for storing reports
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedReport, setSelectedReport] = useState(null); // Selected report for status update
  const [newStatus, setNewStatus] = useState("Panding"); // Default status "Panding"

  // Base URL for images
  const baseUrl = "http://127.0.0.1:8000/storage/";

  // Fetch report data from API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/laporan");
        setReports(response.data.data); // Set data from response
      } catch (err) {
        setError("Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleCardClick = (id) => {
    window.location.href = `/riwayat-laporan/${id}`; // Navigate to report history page
  };

  const handleUpdate = async (id) => {
    const selected = reports.find(report => report.id === id);
    if (selected) {
      setSelectedReport(selected);
      setNewStatus(selected.status || "Panding"); // Set status to current status, default "Panding"
    }
  };

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value); // Update the selected status
  };

  const handleSubmitStatusUpdate = async () => {
    const Token = localStorage.getItem('authToken'); // Get token from local storage
    if (!Token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/laporan/update/${selectedReport.id}`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${Token}` // Pass token in the header
          }
        }
      );
      alert("Status berhasil diperbarui!");
      setReports(reports.map(report => report.id === selectedReport.id ? { ...report, status: newStatus } : report));
      setSelectedReport(null); // Close form after successful update
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Gagal memperbarui status");
    }
  };

  const handleDelete = async (id) => {
    const Token = localStorage.getItem('authToken'); // Get token from local storage

    if (!Token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/laporan/delete/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${Token}` // Pass token in the header
          }
        }
      );
      alert("Report deleted successfully!");
      setReports(reports.filter(report => report.id !== id));
    } catch (err) {
      console.error("Error deleting report:", err);
      alert("Failed to delete report.");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full w-full">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-full w-full text-red-600">Error: {error}</div>;
  }

  return (
    <div className="flex h-screen w-full bg-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md flex flex-col items-center h-full">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Recycle Hero" className="h-40 md:h-48 object-contain" />
          <h1 className="text-lg font-bold text-green-600">Lets Recycle</h1>
        </div>
        <nav className="w-full">
          <ul>
            <li className="text-blue-600 flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded">
              <FaFileAlt className="text-xl" /> {/* Report Icon */}
              <span className="ml-3 text-lg font-semibold">Laporan</span>
            </li>
          </ul>
        </nav>
      </aside> 

      {/* Main content */}
      <main className="flex-1 p-6 h-full overflow-auto bg-white">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Hallo, Admin</h2>
        </div>

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-600">Dashboard Laporan</h2>
        </div>

        {/* Report Table */}
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <h3 className="px-6 py-4 text-lg font-medium text-gray-800 border-b">List Laporan</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Nama</th>
                  <th className="px-4 py-3 text-left">Nomor Telepon</th>
                  <th className="px-4 py-3 text-left">Provinsi</th>
                  <th className="px-4 py-3 text-left">Kabupaten</th>
                  <th className="px-4 py-3 text-left">Kecamatan</th>
                  <th className="px-4 py-3 text-left">Kelurahan</th>
                  <th className="px-4 py-3 text-left">Tanggal Kejadian</th>
                  <th className="px-4 py-3 text-left">Deskripsi</th>
                  <th className="px-4 py-3 text-left">Gambar</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.length > 0 ? (
                  reports.map((laporan) => (
                    <tr key={laporan.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">{laporan.id}</td>
                      <td className="px-4 py-4">{laporan.nama}</td>
                      <td className="px-4 py-4">{laporan.nomor_telepon}</td>
                      <td className="px-4 py-4">{laporan.provinsi}</td>
                      <td className="px-4 py-4">{laporan.kabupaten}</td>
                      <td className="px-4 py-4">{laporan.kecamatan}</td>
                      <td className="px-4 py-4">{laporan.kelurahan}</td>
                      <td className="px-4 py-4">{laporan.tanggal_kejadian}</td>
                      <td className="px-4 py-4">{laporan.deskripsi}</td>
                      <td className="px-4 py-4">
                        {laporan.file_path ? (
                          <img src={`${baseUrl}${laporan.file_path}`} alt="Laporkan Gambar" className="w-16 h-16 object-cover" />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td className="px-4 py-4">{laporan.status}</td>
                      <td className="px-4 py-4 text-sm font-medium flex justify-start space-x-4">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleUpdate(laporan.id); }}
                          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(laporan.id); }}
                          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition duration-300"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center px-6 py-4 text-gray-500">No reports available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Status Form */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-medium mb-4">Update Status Laporan</h3>
              <p className="mb-4">Laporan ID: {selectedReport.id}</p>
              <label className="block mb-2">Status Baru:</label>
              <select
                value={newStatus}
                onChange={handleStatusChange}
                className="w-full px-4 py-2 border rounded-lg mb-4"
              >
                <option value="Panding">Panding</option>
                <option value="Proses">Proses</option>
                <option value="Selesai">Selesai</option>
              </select>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitStatusUpdate}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ReportDashboard;
