import React from 'react';
import { vipCurrentData } from '../Data/vips';
import ImageGroupGallery from '../Components/ImageGroupGallery';

const VIPs = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-red-100 pt-20">
      {/* --- Hero Section --- */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-red-50 text-red-800 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              Gallery
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 leading-tight mb-6">
              Distinguished <br />
              <span className="text-stone-500 italic">Interactions</span>
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed border-l-4 border-red-700 pl-6">
              Moments captured with eminent personalities, reflecting a journey of dialogue and engagement at the highest levels.
            </p>
          </div>
        </div>
      </div>

      {/* --- Gallery Section --- */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <ImageGroupGallery groups={vipCurrentData} />
      </section>
    </div>
  );
};

export default VIPs;

