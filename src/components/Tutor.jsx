import React from 'react';
import reduceImage from '../assets/reduce.png';    // Replace with actual image path
import reuseImage from '../assets/reuse.png';      // Replace with actual image path
import recycleImage from '../assets/recycle.png';  // Replace with actual image path

const SolutionsSection = () => {
  return (
    <section className="py-12 bg-white">
      <h2 className="text-center text-2xl font-bold mb-4">
        Cara Mengurangi <span className="text-green-500">Limbah Sampah</span>
      </h2>
      <div className="flex flex-col md:flex-row items-center bg-white py-4 px-4"> 
      <div className="w-full text-center px-4">
        <h3 className="text-lg font-semibold text-green-500 mb-2">Reduce</h3>
        <p className="text-gray-800 font-semibold text-lg leading-relaxed">
          Mengurangi penggunaan bahan yang tidak perlu dan mengurangi jumlah sampah yang dihasilkan.
        </p>
      </div>
        <div className="w-full md:w-1/2 flex justify-center px-4">
          <img src={reduceImage} alt="Recycle Hero" className="h-40 md:h-48 object-contain" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center bg-white py-4 px-4"> 
      <div className="w-full text-center px-4">
        <h3 className="text-lg font-semibold text-green-500 mb-2">Reuse</h3>
        <p className="text-gray-800 font-semibold text-lg leading-relaxed">
        Menggunakan kembali bahan yang masih bisa digunakan dan meminimalisir jumlah sampah.
      </p>
    </div>
        <div className="w-full md:w-1/2 flex justify-center px-4">
          <img src={reuseImage} alt="Recycle Hero" className="h-40 md:h-48 object-contain" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center bg-white py-4 px-4"> 
      <div className="w-full text-center px-4">
        <h3 className="text-lg font-semibold text-green-500 mb-2">Recycle</h3>
        <p className="text-gray-800 font-semibold text-lg leading-relaxed">
        Mengolah kembali sampah menjadi bahan yang bisa digunakan kembali
      </p>
    </div>
        <div className="w-full md:w-1/2 flex justify-center px-4">
          <img src={recycleImage} alt="Recycle Hero" className="h-40 md:h-48 object-contain" />
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
