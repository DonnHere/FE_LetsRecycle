import React from 'react';
import Navbar1 from "../components/Navbar";
import Footer from "../components/Footer";

const PanduanPengelolaanSampah = () => {
  const panduanData = [
    {
      judul: "Pemilahan Sampah",
      deskripsi: "Pelajari cara memilah sampah berdasarkan jenisnya untuk mendukung proses daur ulang.",
      gambar: "/src/assets/memilah.png",
      icon: "🗑️"
    },
    {
      judul: "Pengurangan Sampah",
      deskripsi: "Strategi praktis untuk mengurangi produksi sampah dalam kehidupan sehari-hari.",
      gambar: "/src/assets/menerapkan.png",
      icon: "♻️"
    },
    {
      judul: "Daur Ulang",
      deskripsi: "Teknik dan manfaat mendaur ulang berbagai jenis material.",
      gambar: "/src/assets/penggantian.png",
      icon: "🔄"
    },
    {
      judul: "Komposting",
      deskripsi: "Cara mengubah sampah organik menjadi pupuk berguna untuk tanaman.",
      gambar: "/src/assets/kompos.png",
      icon: "🌱"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar1 />
      <div className="container mx-auto px-4 py-8 flex-grow max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-800">
          Panduan Pengelolaan Sampah
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {panduanData.map((panduan, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden 
                         transform transition duration-300 hover:scale-105 
                         hover:shadow-xl border border-gray-100 flex flex-col"
            >
              {/* Image Container with Fixed Height */}
              <div className="h-64 w-full flex items-center justify-center p-4 bg-gray-100">
                <img 
                  src={panduan.gambar} 
                  alt={panduan.judul} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              {/* Content with Equal Height */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-2xl mr-3">{panduan.icon}</span>
                  <h3 className="text-xl font-bold text-green-800">{panduan.judul}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-grow text-center">
                  {panduan.deskripsi}
                </p>
                
                <button 
                  className="w-full bg-green-500 text-white 
                             py-2 rounded-md hover:bg-green-600 
                             transition duration-300 mt-auto"
                >
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PanduanPengelolaanSampah;