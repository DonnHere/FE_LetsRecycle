import React from 'react';
import currentIssueImage from '../assets/data.png';

const CurrentIssues = () => {
  return (
    <section className="py-12 bg-white text-center">
      <h2 className="text-3xl font-semibold mb-8"> 
        Permasalahan Sampah <span className="text-green-700">Saat Ini</span>
      </h2>
      <div className="bg-green-200 p-8 rounded-lg shadow-lg max-w-4xl mx-auto flex flex-col md:flex-row md:justify-between"> 
        <img
          src={currentIssueImage}
          alt="Sampah Plastik Indonesia"
          className="w-full md:w-1/2 h-auto mb-4 md:mb-0 md:mr-4 object-cover rounded-md" 
        />
        <div className="text-center md:text-left md:ml-4 flex flex-col justify-center"> 
            <h3 className="text-2xl font-bold mb-2"> 
                Bagaimana Cara Mengatasi Masalah Tersebut?
            </h3>
        </div>
      </div>
    </section>
  );
};

export default CurrentIssues;
