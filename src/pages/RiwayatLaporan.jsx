import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";


function RiwayatLaporan() {
  const [items, setItems] = useState([]); // State to store list of items
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/laporan");
        setItems(response.data.data);
      } catch {
        setError("Failed to load items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleCardClick = (id) => {
    window.location.href = /riwayat-laporan/`${id}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen mt-20 bg-[#FFF6E4] font-poppins py-10 px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Riwayat Laporan
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg cursor-pointer"
              onClick={() => handleCardClick(item.id)}
            >
              <h3 className="text-xl font-semibold mb-2">
                {item.jenis_aktivitas}
              </h3>
              <p className="text-gray-600">Tanggal: {item.tanggal_kejadian}</p>
              <p
                className={`mt-2 text-sm ${
                  item.status === "Selesai" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                Status: {item.status}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RiwayatLaporan;