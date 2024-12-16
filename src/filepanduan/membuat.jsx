import React from 'react';
import heroImage from '../assets/kompos.png'; 

function Memilah() {
  return (
    <section className="py-12 bg-white">

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
            3. Membuat Tempat Pembuatan Kompos
          </h4>
          <p className="text-gray-800 text-base leading-relaxed">
          Memiliki sarana pembuatan kompos di rumah akan memudahkan dalam mengurangi sampah organik. Sebab, sampah organik adalah penyumbang sampah terbanyak di Indonesia.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Memilah;
