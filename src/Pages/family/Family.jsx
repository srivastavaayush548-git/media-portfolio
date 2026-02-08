import React from 'react';
import { familyData } from '../../Data/family';
import ImageGallery from '../../Components/ImageGallery';

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
          
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 leading-tight mb-6">
              FAMILY
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed border-l-4 border-red-700 pl-6">
              Cherished moments with my loved ones. A collection of memories that define my personal journey.
            </p>
          </div>
        </div>
      </div>
      {/* --- Gallery Sections --- */}
      <div className="relative z-10 pb-20">
        {familyData.map((group, groupIndex) => (
          <section key={group.id || groupIndex} className="py-16 max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">

              <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
                {group.title}
              </h2>
              <div className="w-24 h-1 bg-red-800 mx-auto rounded-full opacity-20"></div>
            </div>

            <ImageGallery 
              images={group.images} 
              customGridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            />
          </section>
        ))}
      </div>
    </div>
  );
};

export default Family;
