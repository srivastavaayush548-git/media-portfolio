import React from "react";
import { X } from "lucide-react";

const VideoModal = ({ isOpen, videoSrc, videoTitle, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-red-700 hover:bg-red-800 text-white p-2 rounded-full transition-colors duration-200 shadow-lg"
          aria-label="Close video"
        >
          <X size={24} />
        </button>

        {/* Video Container */}
        <div className="relative w-full aspect-video bg-black">
          <video
            src={videoSrc}
            controls
            autoPlay
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Video Title */}
        {videoTitle && (
          <div className="px-6 py-4 bg-stone-900">
            <p className="text-white font-medium text-center">{videoTitle}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
