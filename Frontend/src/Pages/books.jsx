import React, { useState } from 'react';
import { useData } from '../Context/DataContext';
import { X, Maximize2, Play } from 'lucide-react';

const Books = () => {
  const { booksData, loading } = useData();
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Keep for compatibility if needed, but better use selectedBook
  if (loading) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-200 via-yellow-200 to-orange-100 text-stone-800 font-sans selection:bg-red-100 pt-24 text-center sm:text-left">
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

      {/* Dynamic Sections from Backend */}
      {booksData.sort((a, b) => a.order - b.order).map((section, sIdx) => (
        <section key={section._id} className={`py-20 max-w-6xl mx-auto px-6 ${sIdx > 0 ? 'border-t border-stone-300/30' : ''}`}>
          <div className="flex items-end mb-12 border-b border-stone-200 pb-4">
            <h2 className="text-3xl font-serif font-bold text-stone-900">{section.title}</h2>
          </div>

          {/* Generic Grid for Books In Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {section.books.sort((a, b) => a.order - b.order).map((book) => {
              // Check if it's a gallery-style section (Invitation/Review usually have minimal text)
              const isGalleryStyle = section.title.toLowerCase().includes('invitation') || section.title.toLowerCase().includes('review');

              if (isGalleryStyle && !book.title && !book.description) {
                return (
                  <div
                    key={book._id}
                    className="relative aspect-3/4 bg-white p-2 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedBook(book)}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-lg">
                      {book.type === 'video' ? (
                        <video src={book.cover} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <img src={book.cover} alt="Gallery Item" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        {book.type === 'video' ? (
                          <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12" />
                        ) : (
                          <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                        )}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <article key={book._id} className="group cursor-pointer flex flex-col h-full border-b md:border-b-0 pb-10 md:pb-0 border-stone-200 last:border-0" onClick={() => (isGalleryStyle && book.cover) && setSelectedBook(book)}>
                  <div className="relative aspect-2/3 bg-stone-200 mb-6 overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-all duration-500">
                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500 z-10"></div>
                    {book.type === 'video' ? (
                      <video src={book.cover} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    {book.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity z-20">
                        <Play className="text-white fill-current w-12 h-12 opacity-70" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="text-xs font-bold text-red-700 mb-2 uppercase tracking-wide">
                      {section.title}
                    </div>
                    {book.title && (
                      <h3 className="text-xl font-serif font-bold text-stone-900 mb-3 leading-tight group-hover:text-red-700 transition-colors">
                        {book.title}
                      </h3>
                    )}
                    {book.author && (
                      <p className="text-stone-500 font-medium mb-4">
                        By: {book.author}
                      </p>
                    )}

                    {/* Metadata Grid */}
                    {(book.pages || book.published || book.language) && (
                      <div className="grid grid-cols-2 gap-y-2 text-xs text-stone-500 mb-4 border-y border-stone-100 py-3">
                        {book.pages && <div><span className="font-bold text-stone-700">Pages:</span> {book.pages}</div>}
                        {book.language && <div><span className="font-bold text-stone-700">Language:</span> {book.language}</div>}
                        {book.published && <div className="col-span-2"><span className="font-bold text-stone-700">Published:</span> {book.published}</div>}
                      </div>
                    )}

                    {book.description && (
                      <p className="text-stone-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-4">
                        {book.description}
                      </p>
                    )}

                    <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
                      {book.readOnline ? (
                        <button
                          className="px-4 py-2 bg-red-800 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-stone-900 transition-colors"
                          onClick={(e) => { e.stopPropagation(); alert("Reader mode with watermark coming soon.") }}
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
              )
            })}
          </div>
        </section>
      ))}

      {/* --- Lightbox Modal --- */}
      {(selectedBook || selectedImage) && (
        <div
          className="fixed inset-0 z-110 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={() => { setSelectedBook(null); setSelectedImage(null); }}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white hover:scale-110 transition-all p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20"
            onClick={() => { setSelectedBook(null); setSelectedImage(null); }}
          >
            <X size={28} />
          </button>
          <div
            className="relative max-w-5xl w-full flex items-center justify-center animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedBook?.type === 'video' ? (
              <video
                src={selectedBook.cover}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                controls
                autoPlay
              />
            ) : (
              <img
                src={selectedBook?.cover || selectedImage}
                alt="Full Size Preview"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
