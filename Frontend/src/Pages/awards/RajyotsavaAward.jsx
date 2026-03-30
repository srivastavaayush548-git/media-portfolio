import React, { useState, useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { awardsData } from '../../Data/awards';

const RajyotsavaAward = () => {
  const awards = awardsData.filter(a => a.title === 'Rajyotsava Award');
  const [imageErrors, setImageErrors] = useState({});
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

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-red-100 pt-24 relative">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="inline-block px-3 py-1 bg-red-50 text-red-800 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
          State Honour
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight mb-6">
          Karnataka Rajyotsava Award (2010)
        </h1>
        <div className="border-l-4 border-red-700 pl-6 mb-10">
          <p className="text-xl text-stone-600 leading-relaxed">
            Conferred by the Government of Karnataka for excellence in media.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {awards.map((item, index) => (
            <div 
              key={index} 
              className="rounded-xl overflow-hidden shadow-xl group bg-white cursor-pointer"
              onClick={() => !imageErrors[item.id] && setSelectedImage(item)}
            >
              <div className="relative w-full overflow-hidden rounded-t-xl group">
                {!imageErrors[item.id] ? (
                  <img 
                    src={item.src} 
                    alt={item.alt || "Award Image"} 
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={() => setImageErrors(prev => ({ ...prev, [item.id]: true }))}
                  />
                ) : (
                  <div className="w-full h-64 bg-stone-100 flex items-center justify-center">
                    <p className="text-stone-400 text-sm">Image not available</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                  <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                </div>
              </div>
              {item.description && (
                <div className="p-4 bg-white">
                  <p className="text-sm text-stone-600">{item.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- Lightbox Modal --- */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white hover:scale-110 transition-all p-2 z-60 bg-white/10 rounded-full backdrop-blur-md border border-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X size={28} />
            </button>
            <div 
              className="relative max-w-5xl w-full flex items-center justify-center animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt || "Award Image"} 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RajyotsavaAward