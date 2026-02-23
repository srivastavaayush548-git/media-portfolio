import React, { useState, useEffect } from 'react';
import { nonFictionBooks } from '../Data/books';
import { X, Maximize2 } from 'lucide-react';
import invitationImg from '../assets/invitation.png';
import bookNewsImg from '../assets/booknews.png';

const Books = () => {
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

  const invitationImages = [invitationImg];
  const reviewImages = [bookNewsImg];

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-200 via-yellow-200 to-orange-100 text-stone-800 font-sans selection:bg-red-100 pt-24">
      {/* --- Hero Section --- */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-red-50 text-red-800 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              Publications
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 leading-tight mb-6">
              Books & <br />
              <span className="text-stone-500 italic">Literary Works</span>
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed border-l-4 border-red-700 pl-6">
              Exploring the nuances of Indian democracy, governance, and media through extensive research and analysis.
            </p>
          </div>
        </div>
      </div>

      {/* --- Non-Fiction Section --- */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="flex items-end mb-12 border-b border-stone-200 pb-4">
          <h2 className="text-3xl font-serif font-bold text-stone-900">Non-Fiction</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Custom order sequence */}
          {[
            "What Ails Indian Parliament",
            "PUBLIC MONEY, PRIVATE AGENDA: THE USE AND ABUSE OF MPLADS", 
            "The Emergency: Indian Democracy's Darkest Hour",
            "Democracy, Politics & Governance"
          ].map(title => nonFictionBooks.find(b => b.title.includes(title) || title.includes(b.title)))
           .filter(Boolean) // Remove any undefined if not found
           .map((book, index) => (
            <article key={index} className="group cursor-pointer flex flex-col h-full">
              <div className="relative aspect-2/3 bg-stone-200 mb-6 overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-all duration-500">
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500 z-10"></div>
                <img 
                  src={book.cover} 
                  alt={book.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="text-xs font-bold text-red-700 mb-2 uppercase tracking-wide">
                  Non-Fiction
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-3 leading-tight group-hover:text-red-700 transition-colors">
                  {book.title}
                </h3>
                <p className="text-stone-500 font-medium mb-4">
                  By: {book.author}
                </p>
                
                {/* Metadata Grid */}
                {(book.pages || book.published || book.language) && (
                  <div className="grid grid-cols-2 gap-y-2 text-xs text-stone-500 mb-4 border-y border-stone-100 py-3">
                    {book.pages && <div><span className="font-bold text-stone-700">Pages:</span> {book.pages}</div>}
                    {book.language && <div><span className="font-bold text-stone-700">Language:</span> {book.language}</div>}
                    {book.published && <div className="col-span-2"><span className="font-bold text-stone-700">Published:</span> {book.published}</div>}
                  </div>
                )}

                <p className="text-stone-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-4">
                  {book.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
                   {book.readOnline ? (
                      <button 
                        className="px-4 py-2 bg-red-800 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-stone-900 transition-colors"
                        onClick={() => alert("Reader mode with watermark coming soon.")}
                      >
                        Read Online
                      </button>
                   ) : <div></div>}
                   
                   {book.purchaseLink && (
                     <a 
                       href={book.purchaseLink} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="px-4 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-red-700 transition-colors"
                       onClick={(e) => e.stopPropagation()}
                     >
                       Buy Now
                     </a>
                   )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* --- Book Invitation Section --- */}
      <section className="py-20 max-w-6xl mx-auto px-6 border-t border-stone-300/30">
        <div className="flex items-end mb-12 border-b border-stone-200 pb-4">
          <h2 className="text-3xl font-serif font-bold text-stone-900">Book Invitation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:text-left">
          {invitationImages.map((img, idx) => (
            <div 
              key={idx} 
              className="relative aspect-3/4 bg-white p-2 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedImage(img)}
            >
              <div className="relative h-full w-full overflow-hidden rounded-lg">
                <img src={img} alt="Book Invitation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Book Review Section --- */}
      <section className="py-20 max-w-6xl mx-auto px-6 border-t border-stone-300/30">
        <div className="flex items-end mb-12 border-b border-stone-200 pb-4">
          <h2 className="text-3xl font-serif font-bold text-stone-900">Book Review</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewImages.map((img, idx) => (
            <div 
              key={idx} 
              className="relative aspect-video bg-white p-2 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedImage(img)}
            >
              <div className="relative h-full w-full overflow-hidden rounded-lg">
                <img src={img} alt="Book Review" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Lightbox Modal --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-300"
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
              alt="Full Size Preview" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
