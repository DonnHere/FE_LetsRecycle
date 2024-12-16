import React from 'react';
import heroImage from '../assets/24x24.png'; // Ensure the correct path to the image

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white py-12 px-4">
      {/* Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black">
          Selamatkan Bumi Dengan Cara Membuang Sampah Pada Tempatnya
        </h1>
      </div>
      
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center px-4">
        <img src={heroImage} alt="Recycle Hero" className="h-40 md:h-48 object-contain" />
      </div>
    </div>
  );
};

export default HeroSection;
