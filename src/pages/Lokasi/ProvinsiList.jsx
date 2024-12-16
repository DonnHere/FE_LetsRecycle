import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Tambahkan ini
import axios from "axios";
import API_KEY from "../../config";

const ProvinsiList = ({ onProvinsiSelect }) => {
  const [provinsiList, setProvinsiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProvinsi = async () => {
      try {
        const response = await axios.get(
          "https://api.binderbyte.com/wilayah/provinsi",
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
        setProvinsiList(response.data.value);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProvinsi();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
<div className="space-y-4">
  <div>
    <label
      htmlFor="provinsi"
      className="block text-gray-700 text-sm font-semibold mb-2"
    >
      Provinsi
    </label>
    <select
      id="provinsi"
      name="provinsi"
      onChange={(e) => onProvinsiSelect(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#A1A890] bg-white"
      required
    >
      <option value="">Pilih Provinsi</option>
      {provinsiList.map((provinsi) => (
        <option key={provinsi.id} value={provinsi.id}>
          {provinsi.name}
        </option>
      ))}
    </select>
  </div>
</div>

  );
};

// Tambahkan validasi PropTypes
ProvinsiList.propTypes = {
  onProvinsiSelect: PropTypes.func.isRequired, // Mendefinisikan tipe dan keharusan
};

export default ProvinsiList;
