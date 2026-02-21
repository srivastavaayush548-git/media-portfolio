import React, { useState } from 'react';
import { Search } from 'lucide-react';

const GalleryImage = ({ image, index, onImageClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div
        className="relative w-full aspect-4/3 overflow-hidden bg-gray-800 cursor-pointer"
        onClick={() => onImageClick(index)}
      >
        <img
          src={image.src}
          alt={image.alt}
          className={`w-full h-full object-cover transition-transform duration-300 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'
            }`}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML =
              '<div class="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400 text-sm">Image Not Available</div>';
          }}
        />

        {/* Blue Overlay with Backdrop Blur on hover */}
        <div
          className={`absolute inset-0 transition-all duration-300 z-10 pointer-events-none ${isHovered ? ' backdrop-blur-sm' : 'bg-transparent'
            }`}
        ></div>

        {/* Center Content: Search Icon and Caption on Hover */}
        {isHovered && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 p-2 animate-in fade-in duration-300">
            {/* Search Icon Button - First */}
            <button
              className="bg-transparent rounded-full p-2 shadow-2xl transition-all duration-200 hover:scale-110 mb-4"
              onClick={(e) => {
                e.stopPropagation();
                onImageClick(index);
              }}
              aria-label="View full image"
            >
              <Search className="w-4 h-4 md:w-4 md:h-4 text-white" />
            </button>

            {/* Caption - Second */}
            {image.caption && (
              <div className="bg-transparent px-6 py-4 max-w-[90%]">
                <p className="text-white text-sm md:text-base leading-relaxed text-center font-medium">
                  {image.caption}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default GalleryImage;

