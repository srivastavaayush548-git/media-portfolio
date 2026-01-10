import React, { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';

const ImageGroupGallery = ({ groups, customGridCols }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  if (selectedGroup) {
      // Show Detail View - Images inside the folder
      return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button 
                  onClick={() => setSelectedGroup(null)}
                  className="mb-8 flex items-center gap-2 text-stone-600 hover:text-red-800 transition-colors font-medium group px-4 py-2 rounded-full hover:bg-red-50 w-fit"
              >
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
                  Back to Categories
              </button>
              
              <div className="mb-10 text-center md:text-left">
                {/* <span className="text-red-800 font-bold tracking-wider text-sm uppercase mb-2 block">Collection</span> */}
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">{selectedGroup.title}</h2>
              </div>
              
              {selectedGroup.images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedGroup.images.map((img, index) => (
                        <div 
                            key={img.id || index}
                            className="cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all aspect-4/3 bg-stone-100 group relative"
                            onClick={() => setSelectedImage(img)}
                        >
                            <img 
                                src={img.src} 
                                alt={img.alt || selectedGroup.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="text-white bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">View</span>
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
                    alt={selectedImage.alt} 
                    className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl animate-in zoom-in-95 duration-300"
                    onClick={(e) => e.stopPropagation()} 
                  />
                  {selectedImage.alt && (
                      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                          <p className="inline-block bg-black/60 text-white px-4 py-2 rounded-full backdrop-blur-md text-sm">{selectedImage.alt}</p>
                      </div>
                  )}
                </div>
              )}
          </div>
      );
  }

  // Show List of Groups (Folders)
  const gridClass = customGridCols ? customGridCols : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
      <div className={`grid gap-8 ${gridClass}`}>
          {groups.map((group) => (
              <div 
                  key={group.id}
                  onClick={() => setSelectedGroup(group)}
                  className="group cursor-pointer flex flex-col"
              >
                  <div className="overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 aspect-4/3 bg-white border border-stone-100 relative mb-4">
                     {group.thumbnail ? (
                        <img 
                            src={group.thumbnail} 
                            alt={group.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
                            <span>No Cover</span>
                        </div>
                     )}
                     
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                      
                      <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <span className="text-white text-sm font-medium flex items-center gap-2">
                             View Gallery
                          </span>
                      </div>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-800 group-hover:text-red-700 transition-colors leading-tight">
                      {group.title}
                  </h3>
              </div>
          ))}
      </div>
  );
};

export default ImageGroupGallery;
