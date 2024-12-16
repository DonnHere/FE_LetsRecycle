import React from "react";
import illustration from "../assets/foot.png"; // Replace with the actual path to your image file

function ZeroWasteBanner() {
  return (
    <div className="flex items-center justify-center bg-white h-screen">
      <div className="flex w-full max-w-4xl px-4"> {/* Reduced max-width and padding */}
        {/* Text Section (50% width) */}
        <div className="w-1/2 text-left flex flex-col justify-center">
          <h1 className="text-5xl font-bold leading-tight"> {/* Added leading-tight to reduce line spacing */}
            <span className="text-black">ZERO</span> <span className="text-green-500">WASTE</span>
          </h1>
          <h1 className="text-5xl font-bold leading-tight">
            <span className="text-black">GAYA</span> <span className="text-green-500">HIDUP</span>
          </h1>
          <h1 className="text-5xl font-bold leading-tight">
            <span className="text-black">BEBAS</span> <span className="text-green-500">SAMPAH</span>
          </h1>
        </div>

        {/* Image Section (50% width) */}
        <div className="w-1/2 flex justify-center">
          <img src={illustration} alt="Zero Waste Lifestyle" className="h-72 object-contain" /> {/* Reduced height */}
        </div>
      </div>
    </div>
  );
}

export default ZeroWasteBanner;
