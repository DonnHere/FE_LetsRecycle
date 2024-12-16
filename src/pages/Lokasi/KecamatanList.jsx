import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import API_KEY from "../../config";

const KecamatanList = ({ kabupatenId, onKecamatanSelect }) => {
  const [kecamatanList, setKecamatanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (kabupatenId) {
      const fetchKecamatan = async () => {
        try {
          const response = await axios.get(
            "https://api.binderbyte.com/wilayah/kecamatan",
            {
              params: {
                api_key: API_KEY,
                id_kabupaten: kabupatenId,
              },
            }
          );
          setKecamatanList(response.data.value);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchKecamatan();
    }
  }, [kabupatenId]);

  if (!kabupatenId) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
<div className="space-y-4">
  <div>
    <label
      htmlFor="kecamatan"
      className="block text-gray-700 text-sm font-semibold mb-2"
    >
      Kecamatan
    </label>
    <select
      id="kecamatan"
      name="kecamatan"
      onChange={(e) => onKecamatanSelect(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#A1A890] bg-white"
      required
    >
      <option value="">Pilih Kecamatan</option>
      {kecamatanList.map((kecamatan) => (
        <option key={kecamatan.id} value={kecamatan.id}>
          {kecamatan.name}
        </option>
      ))}
    </select>
  </div>
</div>

  );
};

KecamatanList.propTypes = {
    onKecamatanSelect: PropTypes.func.isRequired,
    kabupatenId: PropTypes.string.isRequired // Mendefinisikan tipe dan keharusan
  };


export default KecamatanList;
