import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import API_KEY from "../../config";

const KabupatenList = ({ provinsiId, onKabupatenSelect }) => {
  const [kabupatenList, setKabupatenList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (provinsiId) {
      const fetchKabupaten = async () => {
        try {
          const response = await axios.get(
            "https://api.binderbyte.com/wilayah/kabupaten",
            {
              params: {
                api_key: API_KEY,
                id_provinsi: provinsiId,
              },
            }
          );
          setKabupatenList(response.data.value);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchKabupaten();
    }
  }, [provinsiId]);

  if (!provinsiId) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
<div className="space-y-4">
  <div>
    <label
      htmlFor="kabupaten"
      className="block text-gray-700 text-sm font-semibold mb-2"
    >
      Kabupaten/Kota
    </label>
    <select
      id="kabupaten"
      name="kabupaten"
      onChange={(e) => onKabupatenSelect(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#A1A890] bg-white"
      required
    >
      <option value="">Pilih Kabupaten/Kota</option>
      {kabupatenList.map((kabupaten) => (
        <option key={kabupaten.id} value={kabupaten.id}>
          {kabupaten.name}
        </option>
      ))}
    </select>
  </div>
</div>

  );
};

KabupatenList.propTypes = {
    onKabupatenSelect: PropTypes.func.isRequired,
    provinsiId: PropTypes.string.isRequired // Mendefinisikan tipe dan keharusan
  };

export default KabupatenList;
