import React from 'react';
import { nonFictionBooks } from '../Data/books';

const Books = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-red-100 pt-20">
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
          {nonFictionBooks.map((book, index) => (
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
                   {/* <span className="text-sm font-bold text-stone-900 group-hover:text-red-700 transition-colors flex items-center gap-2">
                     View Details 
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                     </svg>
                   </span> */}
                   
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
    </div>
  );
};

export default Books;
