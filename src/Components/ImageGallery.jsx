import React, { useState } from 'react';
import { X } from 'lucide-react';

const ImageGallery = ({ images, title, customGridCols }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const gridClass = customGridCols || "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {title && (
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">{title}</h2>
        </div>
      )}
      
      {images.length > 0 ? (
        <div className={`grid gap-8 ${gridClass}`}>
          {images.map((img, index) => (
            <div 
              key={img.id || index}
              className="flex flex-col group h-full"
            >
              <div className="bg-white rounded-xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                <div 
                  className="cursor-pointer overflow-hidden aspect-4/3 bg-stone-200/50 relative flex items-center justify-center p-2"
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img.src} 
                    alt="" 
                    className="max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out shadow-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center text-stone-500 bg-stone-50 rounded-lg border border-dashed border-stone-300">
          <p>No images in this collection yet.</p>
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img 
            src={selectedImage.src} 
            alt="" 
            className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
