import React from 'react';
import YoutubeVideo from './YoutubeVideo';
import CloudinaryVideo from './CloudinaryVideo';

const WhatOthersSay = ({ videos = [] }) => {
  if (!videos || videos.length === 0) {
    return null;
  }

  const isYouTubeVideo = (url) => {
    return url && (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('youtube-nocookie.com'));
  };

  const isCloudinaryVideo = (url) => {
    return url && (url.includes('cloudinary.com') || url.includes('res.cloudinary.com'));
  };

  const renderVideo = (video) => {
    // If video has a URL property, check if it's YouTube or Cloudinary
    if (video.url) {
      if (isYouTubeVideo(video.url)) {
        // Extract YouTube video ID from URL
        const youtubeId = video.url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
        if (youtubeId) {
          return (
            <YoutubeVideo
              videoId={youtubeId}
              type={video.type || 'video'}
              title={video.title}
            />
          );
        }
      } else if (isCloudinaryVideo(video.url)) {
        return (
          <CloudinaryVideo
            url={video.url}
            title={video.title}
          />
        );
      } else {
        // Generic video URL
        return (
          <CloudinaryVideo
            url={video.url}
            title={video.title}
          />
        );
      }
    }

    // Fallback to YouTube video ID format (backward compatibility)
    if (video.id) {
      return (
        <YoutubeVideo
          videoId={video.id}
          type={video.type || 'video'}
          title={video.title}
        />
      );
    }

    return null;
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <div className="inline-block mb-4 px-3 py-1 border border-red-800/30 rounded-full bg-red-50 text-red-900 text-xs font-bold uppercase tracking-wider">
          Testimonials
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
          What Others <span className="text-red-800">Say</span>
        </h2>
        <p className="text-stone-600 max-w-xl mx-auto">
          Insights and perspectives from distinguished personalities and colleagues.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {videos.map((video, index) => (
          <div key={index} className="flex flex-col group">
            {renderVideo(video)}
            <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-stone-200 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-[10px] font-bold uppercase tracking-wider rounded-full border border-red-200">
                  {video.type === 'playlist' ? 'Playlist' : video.url && isCloudinaryVideo(video.url) ? 'Cloudinary' : 'Video'}
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 leading-snug line-clamp-2">
                {video.title}
              </h3>
              {video.speaker && (
                <p className="text-sm text-stone-600 mt-2 font-medium">
                  {video.speaker}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatOthersSay;
