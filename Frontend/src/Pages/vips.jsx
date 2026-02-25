import React from 'react';
import { vipCurrentData } from '../Data/vips';
import ImageGroupGallery from '../Components/ImageGroupGallery';
import WhatOthersSay from '../Components/WhatOthersSay';
import EminentPersonalities from '../Components/EminentPersonalities';
import MiscellaneousVideos from '../Components/MiscellaneousVideos';
import { whatOthersSayVideos } from '../Data/whatOthersSay';
import miscImage1 from '../assets/Images/Vips/gallarymisleneous.jpeg';
import intro1 from '../assets/Intro/intro1.jpg';
import intro2 from '../assets/Intro/intro2.jpeg';
import intro3 from '../assets/Intro/intro3.jpeg';
import venkata from '../assets/Images/Vips/venkata/venkata.jpeg';

const VIPs = () => {
  // Extract Eminent Personalities data separately
  const eminentDataGroup = vipCurrentData.find(group => group.id === 'eminent-personalities');
  const eminentImages = eminentDataGroup ? eminentDataGroup.images : [];

  // Filter out Eminent Personalities from the main gallery groups
  const galleryGroups = vipCurrentData.filter(group => group.id !== 'eminent-personalities');

  const miscellaneousItems = [
    { type: 'image', src: miscImage1, title: 'Miscellaneous Moment' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-200 via-yellow-200 to-orange-100 text-stone-800 font-sans selection:bg-red-100 pt-24 relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br from-orange-200 via-yellow-100 to-orange-50" />
        <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
      </div>

      {/* --- Hero Section --- */}
      <div className="bg-white border-b border-stone-200 relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 leading-tight mb-6">
              Gallery
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed border-l-4 border-red-700 pl-6">
              Moments captured with eminent personalities, reflecting a journey of dialogue and engagement at the highest levels.
            </p>
          </div>
        </div>
      </div>

      {/* --- Top Static Gallery Grid --- */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { src: intro1, name: "With Shri Ram Nath Kovind" },
            { src: intro2, name: "With Shri Narendra Modi" },
            { src: intro3, name: "With Smt. Droupadi Murmu" },
            { src: venkata, name: "With Former CJI Shri M.N. Venkatachalaiah" }
          ].map((item, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden shadow-md bg-white p-2 flex flex-col">
              <img
                src={item.src}
                alt={item.name}
                className="w-full h-44 md:h-60 object-cover rounded-lg mb-3"
              />
              <p className="text-sm font-medium text-stone-800 text-center px-1 pb-1">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- Gallery Section --- */}
      <section className="py-20 max-w-7xl mx-auto px-6 relative z-10">
        <ImageGroupGallery groups={galleryGroups} customGridCols="grid-cols-1 md:grid-cols-2" />
      </section>

      {/* --- Eminent Personalities Section --- */}
      <EminentPersonalities images={eminentImages} />

      {/* --- What Others Say Section --- */}
      <WhatOthersSay videos={whatOthersSayVideos} />

      {/* --- Miscellaneous Section --- */}
      <MiscellaneousVideos items={miscellaneousItems} />
    </div>
  );
};

export default VIPs;

