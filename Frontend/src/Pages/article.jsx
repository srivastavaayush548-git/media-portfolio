import React, { useState } from 'react';
import { useData } from '../Context/DataContext';
import { X } from 'lucide-react';

const Article = () => {
  const { articles } = useData();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-red-100 pt-24">
      {/* --- Hero Section --- */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-red-50 text-red-800 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              Press & Media
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 leading-tight mb-6">
              ARTICLES
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed border-l-4 border-red-700 pl-6">
              A curated collection of columns, op-eds, and reports contributing to the national discourse on democracy and governance.
            </p>
          </div>
        </div>
      </div>

      {/* --- Gallery Sections --- */}
      <div className="relative z-10 pb-20">
        {articles.map((section, sectionIndex) => (
          <section key={section._id || sectionIndex} className="py-16 max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-4 text-center">
                {section.title}
              </h2>
              <div className="w-24 h-1 bg-red-800 mx-auto rounded-full opacity-20"></div>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {section.articles?.map((image) => (
                <div 
                  key={image._id} 
                  className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 bg-white border border-stone-200"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative"> 
                    <img 
                      src={image.src} 
                      alt={image.alt || image.title} 
                      loading="lazy"
                      className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-300" />
                  </div>
                  {image.title && (
                    <div className="p-4 border-t border-stone-100 bg-white">
                      <p className="text-sm font-serif font-bold text-stone-900 line-clamp-2">{image.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* --- Lightbox Modal --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img 
            src={selectedImage.src} 
            alt={selectedImage.alt} 
            className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
};

export default Article;

