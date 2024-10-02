import React from 'react';
import bannerPhoto from '../../assets/banner_img.png';

function BannerSlider() {

  return(
    <div className="relative bg-cover bg-center h-screen flex items-center justify-center object-fill" 
         style={{ backgroundImage: `url(${bannerPhoto})` }}>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      
      {/* Banner Content */}
      <div className="relative z-10 text-center text-white px-6">
        {/* Heading */}
        <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-6">
          Empower Change with Every Contribution
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Join us in making a difference. Help fund meaningful projects, empower communities, and support causes that matter.
        </p>

        {/* Call to Action Button */}
        <a href="/campaigns" 
           className="bg-transparent hover:bg-blue-600 hover:text-white text-white border border-blue-600 font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out">
          Discover fundraisers
        </a>
      </div>
    </div>

  );
}

export default BannerSlider;
