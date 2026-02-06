import React from 'react';
import { familyData } from '../../Data/family';
import ImageGroupGallery from '../../Components/ImageGroupGallery';

const Family = () => {
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
            <div className="inline-block px-3 py-1 bg-red-50 text-red-800 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              Gallery
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 leading-tight mb-6">
              FAMILY
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed border-l-4 border-red-700 pl-6">
              Cherished moments with my loved ones. A collection of memories that define my personal journey.
            </p>
          </div>
        </div>
      </div>
      {/* --- Gallery Section --- */}
      <section className="py-20 max-w-7xl mx-auto px-6 relative z-10">
        <ImageGroupGallery groups={familyData} customGridCols="grid-cols-1 md:grid-cols-2" />
      </section>
    </div>
  );
};

export default Family;
