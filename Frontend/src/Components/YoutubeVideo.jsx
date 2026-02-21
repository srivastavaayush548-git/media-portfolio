import React from 'react';

const YoutubeVideo = ({ videoId, type = 'video', title = 'YouTube video player' }) => {
  const getSrc = () => {
    if (type === 'playlist') {
      return `https://www.youtube.com/embed/videoseries?list=${videoId}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="w-full bg-black/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full aspect-video">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={getSrc()}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default YoutubeVideo;
