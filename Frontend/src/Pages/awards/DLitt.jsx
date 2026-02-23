import React, { useState, useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';
import dlit1 from '../../assets/Images/awards/D.litt/dlt(1).jpeg';
import dlit2 from '../../assets/Images/awards/D.litt/dlt(2).jpeg';
import dlit3 from '../../assets/Images/awards/D.litt/dlt(3).jpeg';

const DLitt = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    dlit1, dlit2, dlit3
  ];

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
    <div className="min-h-screen bg-linear-to-br from-orange-200 via-yellow-200 to-orange-100 text-stone-800 font-sans selection:bg-red-100 pt-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="inline-block px-3 py-1 bg-red-50 text-red-800 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
          Academic Honour
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight mb-6">
          Doctor of Letters (D.Litt. Honoris Causa)
        </h1>
        <div className="border-l-4 border-red-700 pl-6 mb-10">
          <p className="text-xl text-stone-600 leading-relaxed">
            Conferred in recognition of distinguished contributions to journalism, literature, and public service.
          </p>
        </div>
        
        {/* Image Gallery */}
        <div>
           <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6 border-b border-stone-300 pb-2 inline-block">Event Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {galleryImages.map((img, index) => (
                 <div 
                   key={index} 
                   className="rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-white p-2 group cursor-pointer relative"
                   onClick={() => setSelectedImage(img)}
                 >
                   <div className="overflow-hidden rounded-lg relative">
                     <img 
                       src={img} 
                       alt={`D.Litt Ceremony Highlight ${index + 1}`} 
                       className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                     />
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                       <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                     </div>
                   </div>
                 </div>
               ))}
            </div>
        </div>

        {/* Lightbox Modal */}
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
                src={selectedImage} 
                alt="Award Highlight Full Size" 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DLitt;
