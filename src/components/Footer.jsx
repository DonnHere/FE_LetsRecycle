import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg'; // Import your logo image path

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="Logo" className="h-16 mb-4" />
          <h4 className="text-2xl font-bold mb-2">Let's Recycle!</h4>
          <p className="text-sm text-gray-300 text-center md:text-left">
            Bersama kita jaga bumi dengan langkah sederhana: <br />
            <span className="font-semibold">Reduce, Reuse, Recycle.</span>
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h5 className="text-lg font-semibold mb-4">Explore</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/panduan" className="hover:text-gray-400">Panduan</Link>
            </li>
            <li>
              <Link to="/lokasi" className="hover:text-gray-400">Lokasi Daur Ulang</Link>
            </li>
            <li>
              <Link to="/formreport" className="hover:text-gray-400">Laporan Masalah</Link>
            </li>
            <li>
              <Link to="/tentang" className="hover:text-gray-400">Tentang Kami</Link>
            </li>
          </ul>
        </div>

        {/* Reduce, Reuse, Recycle */}
        <div className="text-center md:text-left">
          <h5 className="text-lg font-semibold mb-4">Our Mission</h5>
          <p className="text-sm text-gray-300">
            <strong>Reduce:</strong> Mengurangi sampah dari awal. <br />
            <strong>Reuse:</strong> Gunakan kembali sebelum membuang. <br />
            <strong>Recycle:</strong> Daur ulang untuk menciptakan yang baru.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10"></div>

      {/* Copyright */}
      <div className="text-center mt-6 text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} Let's Recycle. All rights reserved.</p>
        <p className="mt-1">Built with <span className="text-red-500"></span> by MyTeam</p>
      </div>
    </footer>
  );
};

export default Footer;