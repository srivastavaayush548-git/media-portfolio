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
        const youtubeId = video.url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)?.[1];
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
          <div key={index} className="flex flex-col group overflow-hidden rounded-2xl shadow-lg border border-stone-200">
            {renderVideo(video)}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatOthersSay;
