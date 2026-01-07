
import React, { useState } from 'react';
import { familyData } from '../../Data/family';
import { Camera, X } from 'lucide-react';

const Family = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-yellow-200 to-orange-100 text-stone-800 font-sans selection:bg-red-100 pt-20 relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-yellow-100 to-orange-50" />
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
              Family <br />
              <span className="text-stone-500 italic">Moments</span>
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed border-l-4 border-red-700 pl-6">
              Cherished moments with my loved ones. A collection of memories that define my personal journey.
            </p>
          </div>
        </div>
      </div>

      {/* --- Gallery Section --- */}
      <section className="py-20 max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {familyData.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedImage(item)}
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-stone-100 cursor-pointer"
            >
              {/* Image Container */}
              <div className="aspect-4/3 overflow-hidden bg-stone-100">
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Lightbox Modal --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button - Fixed to top right of screen for easier access on large images */}
          <button 
            className="fixed top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[60]"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Image Container - Removed max-w-6xl valid for fuller screen */}
          <div 
            className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex items-center justify-center p-4 outline-none"
            onClick={(e) => e.stopPropagation()} 
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title} 
              className="w-full h-full object-contain rounded-sm shadow-2xl"
            />
            
            {/* Caption - Floats at bottom */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/60 backdrop-blur-md rounded-full text-white text-center border border-white/10">
              <h3 className="text-lg font-serif tracking-wide">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Family;
