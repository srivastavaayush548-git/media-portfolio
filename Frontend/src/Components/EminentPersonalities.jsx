import React from 'react';

const EminentPersonalities = ({ images = [] }) => {
  if (!images || images.length === 0) {
    return null;
  }

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
            <div className="bg-white rounded-xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                <div className="aspect-4/3 overflow-hidden relative">
                    <img 
                        src={image.src} 
                        alt={image.alt || "Eminent Personality"} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                {/* Optional: if there's metadata like title or desc, render it here. 
                    Currently the data only has src and alt. 
                    We can show the alt text as a caption if it's descriptive. 
                */}
                <div className="p-5 flex-1 flex flex-col justify-center text-center">
                    <h3 className="text-lg font-serif font-bold text-stone-800 leading-snug">
                        {image.alt || " "}
                    </h3>
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EminentPersonalities;
