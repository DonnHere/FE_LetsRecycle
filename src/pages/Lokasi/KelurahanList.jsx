import { useEffect, useState } from "react";
import PropTypes from   "prop-types";
import axios from "axios";
import API_KEY from "../../config";

const KelurahanList = ({ kecamatanId, onKelurahanSelect }) => {
  const [kelurahanList, setKelurahanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (kecamatanId) {
      const fetchKelurahan = async () => {
        try {
          const response = await axios.get(
            "https://api.binderbyte.com/wilayah/kelurahan",
            {
              params: {
                api_key: API_KEY,
                id_kecamatan: kecamatanId,
              },
            }
          );
          setKelurahanList(response.data.value);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchKelurahan();
    }
  }, [kecamatanId]);

  if (!kecamatanId) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="kelurahan"
          className="block text-gray-700 text-sm font-semibold mb-2"
        >
          Desa/Kelurahan
        </label>
        <select
          id="kelurahan"
          name="kelurahan"
          onChange={(e) => onKelurahanSelect(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#A1A890] bg-white"
          required
        >
          <option value="">Pilih Kelurahan</option>
          {kelurahanList.map((kelurahan) => (
            <option key={kelurahan.id} value={kelurahan.id}>
              {kelurahan.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

KelurahanList.propTypes = {
  onKelurahanSelect: PropTypes.func.isRequired,
  kecamatanId: PropTypes.string.isRequired, // Mendefinisikan tipe dan keharusan
};

export default KelurahanList;
