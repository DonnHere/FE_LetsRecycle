import React from 'react';
import heroImage from '../assets/memilah.png'; 

function Memilah() {
  return (
    <section className="py-12 bg-white">
      <h2 className="text-center text-2xl font-bold mb-2">
        Panduan Pengelolaan <span className="text-green-500">Limbah</span>
      </h2>
      <h3 className="text-center text-lg font-semibold text-gray-700 mb-6">
        4 Cara Pengolahan Sampah
      </h3>

      <div className="max-w-3xl mx-auto p-6 bg-green-200 rounded-lg shadow-md flex items-center space-x-6">
        <div className="flex-1 flex justify-center">
          <img
            src={heroImage}
            alt="Sorting trash bins"
            className="w-32 h-32 object-contain"
          />
        </div>

        <div className="flex-1">
          <div className="text-3xl font-bold text-gray-800 mb-2"></div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            1. Memilah Jenis Sampah
          </h4>
          <p className="text-gray-800 text-base leading-relaxed">
            Terdapat tiga jenis sampah menurut material atau bahan bakunya, yaitu organik, anorganik, serta bahan berbahaya dan beracun (B3). Ketiga sampah ini perlu dipilah sesuai jenisnya agar mudah diolah.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Memilah;
