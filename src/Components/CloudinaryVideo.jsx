import React from 'react';

const CloudinaryVideo = ({ url, title = 'Video player' }) => {
  // Check if it's a Cloudinary video URL
  const isCloudinaryUrl = url && (url.includes('cloudinary.com') || url.includes('res.cloudinary.com'));
  
  // For Cloudinary, we can use HTML5 video tag or iframe depending on the URL format
  // If it's a direct video URL, use video tag
  // If it's a player URL, use iframe
  
  if (isCloudinaryUrl) {
    // Check if it's a player embed URL (contains /video/upload/ or ends with .mp4, .webm, etc.)
    const isDirectVideoUrl = url.match(/\.(mp4|webm|ogg|mov)$/i) || url.includes('/video/upload/');
    
    if (isDirectVideoUrl && !url.includes('player')) {
      // Direct video URL - use HTML5 video tag
      return (
        <div className="w-full bg-black/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative w-full aspect-video">
            <video
              className="absolute top-0 left-0 w-full h-full"
              controls
              preload="metadata"
              title={title}
            >
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      );
    } else {
      // Player URL or embed URL - use iframe
      return (
        <div className="w-full bg-black/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative w-full aspect-video">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={url}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      );
    }
  }
  
  // Fallback for other video URLs
  return (
    <div className="w-full bg-black/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full aspect-video">
        <video
          className="absolute top-0 left-0 w-full h-full"
          controls
          preload="metadata"
          title={title}
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default CloudinaryVideo;
