import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg'; // Import your logo image path

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Tagline */}
        <div className="text-center md:text-left">
          <img src={logo} alt="Logo" className="h-12 mx-auto md:mx-0 mb-4" />
          <h4 className="text-xl font-semibold">Let's Recycle!</h4>
          <p className="text-sm text-gray-300 mt-2">
            Bersama kita jaga bumi dengan langkah sederhana:
            <span className="font-medium"> Reduce, Reuse, Recycle.</span>
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h5 className="text-lg font-medium mb-3">Explore</h5>
          <ul className="space-y-2">
            <li>
              <Link to="/panduan" className="text-sm hover:text-gray-400">Panduan</Link>
            </li>
            <li>
              <Link to="/lokasi" className="text-sm hover:text-gray-400">Lokasi TPA/TPS</Link>
            </li>
            <li>
              <Link to="/pelaporan" className="text-sm hover:text-gray-400">Laporan Pembuangan Sampah Ilegal</Link>
            </li>
          </ul>
        </div>

        {/* Mission Statement */}
        <div className="text-center md:text-left">
          <h5 className="text-lg font-medium mb-3">Our Mission</h5>
          <p className="text-sm text-gray-300">
            <strong>Reduce:</strong> Mengurangi sampah dari awal.<br />
            <strong>Reuse:</strong> Gunakan kembali sebelum membuang.<br />
            <strong>Recycle:</strong> Daur ulang untuk menciptakan yang baru.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Let's Recycle. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
