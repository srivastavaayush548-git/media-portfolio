import React, { useState } from 'react';
import convocationImage1 from '../../assets/Images/Career/Image_002.jpg';
import convocationImage2 from '../../assets/Images/Career/Image_007.jpg';
import convocationImage3 from '../../assets/Images/Career/convocation2.jpeg';
import { Award, BookOpen, GraduationCap, X } from 'lucide-react';

const Convocation = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const convocations = [
    {
      university: "Example University",
      title: "Convocation Invitation",
      date: "August 15, 2024",
      description: "Addressing the graduating batch on the future of media and democracy.",
      link: "#",
      image: convocationImage1 
    },
    {
      university: "Example University",
      title: "Convocation Ceremony",
      date: "August 15, 2024",
      description: "Addressing the graduating batch on the future of media and democracy.",
      link: "#",
      image: convocationImage2 
    },
    {
      university: "Example University",
      title: "Convocation",
      date: "Date TBD",
      description: "Address to the graduating class.",
      link: "#",
      image: convocationImage3
    },
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-yellow-200 to-orange-100 text-stone-800 font-sans selection:bg-red-900 selection:text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1 border border-red-800/30 rounded-full bg-red-50 text-red-900 text-xs font-bold uppercase tracking-wider">
            Speeches & Addresses
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6">
            Convocation <span className="text-red-800">Addresses</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-stone-600 leading-relaxed">
            Key addresses delivered at university convocations, inspiring the next generation of leaders and thinkers.
          </p>
        </div>

        {/* List */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {convocations.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-stone-100 group relative cursor-pointer"
              onClick={() => handleImageClick(item.image)}
            >
              <div className="h-80 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white text-center border-t border-stone-100">
                  <h3 className="text-lg font-serif font-bold text-stone-800 capitalize">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
        
        {convocations.length === 0 && (
           <div className="text-center py-20">
               <p className="text-2xl text-stone-500 font-serif italic">Content coming soon...</p>
           </div>
        )}

      </div>

      {/* Modal / Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div className="absolute top-4 right-4 z-[110]">
             <button 
               onClick={handleCloseModal}
               className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
             >
               <X className="w-8 h-8" />
             </button>
          </div>
          
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl">
             <img 
               src={selectedImage} 
               alt="Full size view" 
               className="max-w-full max-h-[90vh] object-contain"
               onClick={(e) => e.stopPropagation()} 
             />
          </div>
        </div>
      )}

    </div>
  );
};

export default Convocation;
