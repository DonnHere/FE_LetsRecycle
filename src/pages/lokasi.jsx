import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar1 from "../components/Navbar";

function Lokasi() {
  const [tpsData, setTpsData] = useState([]);
  const initialPosition = [-7.6297, 111.5309]; // UNS Kampus Madiun

  // Fetch data TPS dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/data-sampah");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Format data yang diterima dari API
        const formattedData = data.data.map((item) => ({
          id: item.id,
          nama_tps: item.nama_fasilitas,
          latitude: item.latitude,
          longitude: item.longitude,
          pencatatan: item.pencatatan,
          timbulan: `${item.sampah_masuk_ton_per_thn} ton/tahun`,
          komposisi: `Organik: ${item.sampah_organik_terolah_ton_per_thn || 0} ton, 
                      Anorganik: ${item.sampah_anorganik_terolah_ton_per_thn || 0} ton`,
          sumber: "Data tidak tersedia", // Tambahkan jika ada field terkait
          bank_sampah: "Data tidak tersedia", // Tambahkan jika ada field terkait
        }));
        setTpsData(formattedData);
      } catch (error) {
        console.error("Error fetching TPS data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen">
      <Navbar1 />
      <div className="flex items-center justify-between px-4 my-4">
        <h1 className="text-3xl font-bold text-center flex-1">
          Data TPS Kabupaten Madiun
        </h1>
      </div>
      <MapContainer
        center={initialPosition}
        zoom={12}
        className="h-full w-full"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {tpsData.map((tps) => (
          <Marker key={tps.id} position={[tps.latitude, tps.longitude]}>
            <Popup>
              <h3 className="font-bold">{tps.nama_tps}</h3>
              <p><strong>Timbulan:</strong> {tps.timbulan}</p>
              <p><strong>Komposisi:</strong> {tps.komposisi}</p>
              <p><strong>Sumber:</strong> {tps.sumber}</p>
              <p><strong>Bank Sampah:</strong> {tps.bank_sampah}</p>
              <p><strong>Pencatatan:</strong> {tps.pencatatan}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Lokasi;