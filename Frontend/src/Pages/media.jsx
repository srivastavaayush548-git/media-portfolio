import React, { useState, useEffect } from 'react';
import { X, Play } from 'lucide-react';
import { useData } from '../Context/DataContext';

const Media = () => {
    const { mediaData, loading } = useData();
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedItem]);

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-orange-200 via-yellow-200 to-orange-100 flex items-center justify-center">
                <div className="text-stone-600 animate-pulse font-serif text-2xl italic">Loading your stories...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-orange-200 via-yellow-200 to-orange-100 text-stone-800 font-sans selection:bg-red-100 pt-24">
            {/* --- Hero Section --- */}

            <div className="max-w-7xl mx-auto px-6 py-20">
                {mediaData && mediaData.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {mediaData.map((item) => (
                            <div 
                                key={item._id || item.id} 
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer border border-stone-200"
                                onClick={() => setSelectedItem(item)}
                            >
                                <div className="aspect-video relative overflow-hidden bg-stone-900">
                                    {item.type === 'video' ? (
                                        <>
                                            {item.thumbnail ? (
                                                <img 
                                                    src={item.thumbnail} 
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            ) : (
                                                <video 
                                                    src={item.src} 
                                                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                                />
                                            )}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-red-800 group-hover:border-red-600 transition-all duration-300">
                                                    <Play className="w-8 h-8 text-white fill-current" />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <img 
                                            src={item.src} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-serif font-bold text-stone-900 mb-2 leading-tight">
                                        {item.title}
                                    </h3>
                                    {item.description && (
                                        <p className="text-sm text-stone-600 line-clamp-2">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-stone-500 italic">Media content coming soon...</p>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedItem && (
                <div 
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-300"
                    onClick={() => setSelectedItem(null)}
                >
                    <button 
                        className="absolute top-6 right-6 text-white/70 hover:text-white hover:scale-110 transition-all p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20 z-110"
                        onClick={() => setSelectedItem(null)}
                    >
                        <X size={28} />
                    </button>
                    <div 
                        className="relative max-w-5xl w-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedItem.type === 'video' ? (
                            <video 
                                src={selectedItem.src} 
                                className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
                                controls
                                autoPlay
                            />
                        ) : (
                            <img 
                                src={selectedItem.src} 
                                alt={selectedItem.alt || selectedItem.title} 
                                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                            />
                        )}
                        <div className="mt-6 text-center max-w-2xl px-4">
                            <h3 className="text-2xl font-serif font-bold text-white mb-2 italic">
                                {selectedItem.title}
                            </h3>
                            {selectedItem.description && (
                                <p className="text-stone-300 text-sm italic">
                                    {selectedItem.description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Media;