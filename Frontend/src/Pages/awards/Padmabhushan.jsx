import React, { useState, useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';
import introVideo from '../../assets/Intro/intro video.mp4';
import pbImg1 from '../../assets/Images/awards/Padmabhushan/WhatsApp Image 2026-02-02 at 3.10.40 PM.jpeg';
import pbImg2 from '../../assets/Images/awards/Padmabhushan/WhatsApp Image 2026-02-02 at 3.10.41 PM (1).jpeg';
import pbImg3 from '../../assets/Images/awards/Padmabhushan/WhatsApp Image 2026-02-02 at 3.10.41 PM.jpeg';
import pbImg4 from '../../assets/Images/awards/Padmabhushan/WhatsApp Image 2026-02-16 at 2.04.46 PM.jpeg';
import pbImg5 from '../../assets/Images/awards/Padmabhushan/WhatsApp Image 2026-02-16 at 2.04.48 PM.jpeg';
import pbImg6 from '../../assets/Images/awards/Padmabhushan/WhatsApp Image 2026-02-16 at 2.04.48 PM (1).jpeg';
import pbImg7 from '../../assets/Images/awards/Padmabhushan/WhatsApp Image 2026-02-16 at 2.04.48 PM (2).jpeg';
import pbImg8 from '../../assets/Images/awards/Padmabhushan/WhatsApp Image 2026-02-16 at 2.04.48 PM (3).jpeg';
import pbImg9 from '../../assets/Images/awards/Padmabhushan/WhatsApp Image 2026-02-16 at 2.04.49 PM.jpeg';
import pbImg10 from '../../assets/Images/awards/Padmabhushan/WhatsApp Image 2026-02-16 at 2.04.49 PM (1).jpeg';
import pbImg11 from '../../assets/Images/awards/Padmabhushan/WhatsApp Image 2026-02-16 at 2.04.49 PM (2).jpeg';
import pbImg12 from '../../assets/Images/awards/Padmabhushan/WhatsApp Image 2026-02-16 at 2.04.50 PM.jpeg';
import pbImg13 from '../../assets/Images/awards/Padmabhushan/WhatsApp Image 2026-02-16 at 2.04.50 PM (1).jpeg';
import pbImg14 from '../../assets/Images/awards/Padmabhushan/WhatsApp Image 2026-02-16 at 2.04.50 PM (2).jpeg';
import pbCoverImg from '../../assets/Images/awards/Padmabhushan/coverimage.jpg';

const Padmabhushan = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    pbImg1, pbImg2, pbImg3, pbImg4, pbImg5, pbImg6,
    pbImg7, pbImg8, pbImg9, pbImg10, pbImg11, pbImg12,
    pbImg13, pbImg14, pbCoverImg
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
          National Honour
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight mb-6">
          Padma Bhushan (2025)
        </h1>
        <div className="border-l-4 border-red-700 pl-6 mb-10">
          <p className="text-xl text-stone-600 leading-relaxed">
            India’s third-highest civilian award for contribution to literature and education.
          </p>
        </div>

        <div className="w-full bg-white/80 rounded-2xl p-2 md:p-4 backdrop-blur-sm shadow-lg mb-12">
          <div className="relative w-full rounded-xl overflow-hidden shadow-lg aspect-video bg-stone-900">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={introVideo}
              controls
              autoPlay
              loop
            ></video>
          </div>
          <p className="text-center text-sm text-stone-600 mt-4 font-medium">
            Video: A. Surya Prakash Honoured with Padma Bhushan
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
                    alt={`Padma Bhushan Ceremony Highlight ${index + 1}`}
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

export default Padmabhushan;
