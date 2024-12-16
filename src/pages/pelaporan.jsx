import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar1 from "../components/Navbar";
import axios from "axios";

// import ProvinsiList from "../components/Lokasi/ProvinsiList";
import ProvinsiList from "./Lokasi/ProvinsiList";
import KabupatenList from "./Lokasi/KabupatenList";
import KecamatanList from "./Lokasi/KecamatanList";
import KelurahanList from "./Lokasi/KelurahanList";

function Pelaporan() {
  const [formPelaporan, setFormPelaporan] = useState({
    Nama: "",
    NomorTelepon: "",
    Provinsi: "",
    Kabupaten: "",
    Kecamatan: "",
    Kelurahan: "",
    TanggalKejadian: "",
    Deskripsi: "",
    FileBukti: null,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPelaporan({
      ...formPelaporan,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormPelaporan({
      ...formPelaporan,
      FileBukti: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      Nama,
      NomorTelepon,
      Provinsi,
      Kabupaten,
      Kecamatan,
      Kelurahan,
      TanggalKejadian,
      Deskripsi,
      FileBukti,
    } = formPelaporan;

    // Validasi form
    if (
      !Nama ||
      !NomorTelepon ||
      !Provinsi ||
      !Kabupaten ||
      !Kecamatan ||
      !Kelurahan ||
      !TanggalKejadian ||
      !Deskripsi ||
      !FileBukti
    ) {
      setErrorMessage("Semua field harus diisi.");
      return;
    }

    const formData = new FormData();
    formData.append("nama", Nama);
    formData.append("nomor_telepon", NomorTelepon);
    formData.append("provinsi", Provinsi);
    formData.append("kabupaten", Kabupaten);
    formData.append("kecamatan", Kecamatan);
    formData.append("kelurahan", Kelurahan);
    formData.append("tanggal_kejadian", TanggalKejadian);
    formData.append("deskripsi", Deskripsi);
    formData.append("file_path", FileBukti);

    try {
      await axios.post("http://127.0.0.1:8000/api/laporan/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Pelaporan berhasil disimpan!");

      // Reset form to default values (including Provinsi and FileBukti)
      setFormPelaporan({
        Nama: "",
        NomorTelepon: "",
        Provinsi: "",
        Kabupaten: "",
        Kecamatan: "",
        Kelurahan: "",
        TanggalKejadian: "",
        Deskripsi: "",
        FileBukti: null, // Reset file input
      });
      setErrorMessage(""); // Reset error message
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
      setErrorMessage("Terjadi kesalahan saat menyimpan data: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <Navbar1 />
      <div className="min-h-screen bg-[#FFF6E4] font-poppins flex justify-center items-center mt-10">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-3xl p-8 flex flex-col justify-center mt-28 mb-28">
          <h2 className="text-3xl font-bold mb-6 text-center">Pelaporan Pembuangan Sampah Ilegal</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="Nama" className="block text-gray-700 text-sm font-semibold mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  name="Nama"
                  value={formPelaporan.Nama}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#A1A890]"
                  placeholder="Masukan nama"
                  required
                />
              </div>
              <div>
                <label htmlFor="NomorTelepon" className="block text-gray-700 text-sm font-semibold mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="number"
                  name="NomorTelepon"
                  value={formPelaporan.NomorTelepon}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#A1A890]"
                  placeholder="Masukan nomor telepon"
                  required
                />
              </div>
              <div>
                <label htmlFor="lokasi" className="block text-gray-700 text-sm font-semibold mb-2">
                  Lokasi Kejadian
                </label>
                <ProvinsiList onProvinsiSelect={(value) => handleChange({ target: { name: 'Provinsi', value } })} />
                {formPelaporan.Provinsi && (
                  <KabupatenList
                    provinsiId={formPelaporan.Provinsi}
                    onKabupatenSelect={(value) => handleChange({ target: { name: 'Kabupaten', value } })}
                  />
                )}
                {formPelaporan.Kabupaten && (
                  <KecamatanList
                    kabupatenId={formPelaporan.Kabupaten}
                    onKecamatanSelect={(value) => handleChange({ target: { name: 'Kecamatan', value } })}
                  />
                )}
                {formPelaporan.Kecamatan && (
                  <KelurahanList
                    kecamatanId={formPelaporan.Kecamatan}
                    onKelurahanSelect={(value) => handleChange({ target: { name: 'Kelurahan', value } })}
                  />
                )}
              </div>
              <div>
                <label htmlFor="TanggalKejadian" className="block text-gray-700 text-sm font-semibold mb-2">
                  Tanggal Kejadian
                </label>
                <input
                  type="date"
                  name="TanggalKejadian"
                  value={formPelaporan.TanggalKejadian}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#A1A890]"
                  required
                />
              </div>
              <div>
                <label htmlFor="Deskripsi" className="block text-gray-700 text-sm font-semibold mb-2">
                  Deskripsi Kejadian
                </label>
                <textarea
                  name="Deskripsi"
                  value={formPelaporan.Deskripsi}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#A1A890]"
                  placeholder="Deskripsi aktivitas"
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="FileBukti" className="block text-gray-700 text-sm font-semibold mb-2">
                  File Bukti Aktivitas
                </label>
                <input
                  type="file"
                  name="FileBukti"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#A1A890]"
                  required
                />
              </div>
              {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-orange-600 transition duration-300"
              >
                Laporkan Aktivitas
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Pelaporan;
