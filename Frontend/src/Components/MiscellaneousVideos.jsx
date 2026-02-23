import React, { useState, useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';

const MiscellaneousVideos = ({ items = [] }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  if (!items || items.length === 0) {
    return null;
  }

  const renderItem = (item) => {
    return (
      <div 
        className="relative w-full h-64 overflow-hidden cursor-pointer group"
        onClick={() => setSelectedImage(item.src)}
      >
        <img 
          src={item.src} 
          alt={item.title || "Gallery Image"} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <div className="inline-block mb-4 px-3 py-1 border border-red-800/30 rounded-full bg-red-50 text-red-900 text-xs font-bold uppercase tracking-wider">
          Miscellaneous
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
          Miscellaneous <span className="text-red-800">Moments</span>
        </h2>
        <p className="text-stone-600 max-w-xl mx-auto">
          A collection of diverse moments, images, and interactions from various events.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col group overflow-hidden rounded-2xl shadow-lg border border-stone-200 bg-white">
            {renderItem(item)}
          </div>
        ))}
      </div>

      {/* Lightbox for Images */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white hover:scale-110 transition-all p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <X size={28} />
          </button>
          <div 
            className="relative max-w-5xl w-full flex items-center justify-center animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Miscellaneous Moment Full Size" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default MiscellaneousVideos;
