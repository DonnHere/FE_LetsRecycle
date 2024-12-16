import React from 'react';
import heroImage from '../assets/menerapkan.png'; 

function Menerapkan() {
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
            2. Menerapkan 3R dalam Penanganan Sampah
          </h4>
          <p className="text-gray-800 text-base leading-relaxed">
          Prinsip 3R adalah reduce (mengurangi timbunan sampah), reuse (menggunakan kembali), dan recycle (daur ulang sampah).
          </p>
        </div>
      </div>
    </section>
  );
}

export default Menerapkan;
