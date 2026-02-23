import React, { useState, useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';

const EminentPersonalities = ({ images = [] }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedItem]);

  if (!images || images.length === 0) {
    return null;
  }

  const isVideo = (src) => src && (src.endsWith('.mp4') || src.includes('video/upload'));

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <div className="inline-block mb-4 px-3 py-1 border border-red-800/30 rounded-full bg-red-50 text-red-900 text-xs font-bold uppercase tracking-wider">
          Interaction
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
          Eminent Personalities & <span className="text-red-800">Celebrities</span>
        </h2>
        <p className="text-stone-600 max-w-xl mx-auto">
          Engagements with leading figures from various spheres.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col group h-full">
            <div 
              className="bg-white rounded-xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
              onClick={() => setSelectedItem(image)}
            >
                <div className="aspect-4/3 overflow-hidden relative bg-stone-100">
                    {isVideo(image.src) ? (
                      <video 
                        src={image.src} 
                        className="w-full h-full object-cover"
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                      />
                    ) : (
                      <img 
                          src={image.src} 
                          alt={image.alt || "Eminent Personality"} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                    </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-center text-center">
                    <h3 className="text-lg font-serif font-bold text-stone-800 leading-snug">
                        {image.alt || " "}
                    </h3>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedItem(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white hover:scale-110 transition-all p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20"
            onClick={() => setSelectedItem(null)}
          >
            <X size={28} />
          </button>
          <div 
            className="relative max-w-5xl w-full flex items-center justify-center animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo(selectedItem.src) ? (
              <video 
                src={selectedItem.src} 
                className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
                controls
                autoPlay
              />
            ) : (
              <img 
                src={selectedItem.src} 
                alt={selectedItem.alt || "Eminent Personality Full Size"} 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            )}
            {selectedItem.alt && (
              <div className="absolute bottom-[-40px] left-0 right-0 text-center">
                 <p className="text-white font-serif text-lg">{selectedItem.alt}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default EminentPersonalities;
