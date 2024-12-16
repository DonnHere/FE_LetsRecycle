import React from 'react';
import Navbar1 from "../components/Navbar";
import Footer from "../components/Footer";

const RecyclePage = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <Navbar1 />

      {/* Hero Section */}
      <section className="bg-white-100 text-center py-12 px-4">
        <h2 className="text-3xl font-bold text-green-800 mb-4">
          Selamatkan Bumi Dengan Cara Membuang Sampah Pada Tempatnya
        </h2>
        <img src="src/assets/24x24.png" alt="Hero" className="mx-auto w-full max-w-lg mb-6" />
      </section>

      {/* Problems Section */}
      <section className="py-12 px-6 bg-white">
  <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
    Permasalahan Sampah Saat Ini
  </h3>
  <div className="container mx-auto flex justify-center items-center min-h-screen">
    <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md max-w-xl">
      <img src="src/assets/sumbersampah.png" alt="Problem" className="mx-auto w-full mb-6" />
      <h4 className="text-xl font-bold mb-2 text-green-700 text-center">
        Bagaimana Cara Mengatasi Masalah Tersebut?
      </h4>
    </div>
  </div>
</section>
      {/* Solution Section */}
      <section className="py-12 bg-green-50 px-6">
        <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Cara Mengurangi Limbah Sampah
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-white shadow-lg rounded-lg">
            <img src="src/assets/reduce.png" alt="Reduce" className="w-16 h-16 mx-auto mb-4" />
            <h4 className="text-green-600 font-bold mb-2">Reduce</h4>
            <p>Mengurangi penggunaan bahan yang tidak perlu dan mengurangi jumlah sampah yang dihasilkan.</p>
          </div>
          <div className="text-center p-4 bg-white shadow-lg rounded-lg">
            <img src="src/assets/reuse.png" alt="reuse.png" className="w-16 h-16 mx-auto mb-4" />
            <h4 className="text-green-600 font-bold mb-2">Reuse</h4>
            <p>Menggunakan kembali bahan yang masih bisa digunakan dan meminimalkan jumlah sampah.</p>
          </div>
          <div className="text-center p-4 bg-white shadow-lg rounded-lg">
            <img src="src/assets/recycle.png" alt="Recycle" className="w-16 h-16 mx-auto mb-4" />
            <h4 className="text-green-600 font-bold mb-2">Recycle</h4>
            <p>Mengolah kembali sampah menjadi bahan yang bisa digunakan kembali.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default RecyclePage;