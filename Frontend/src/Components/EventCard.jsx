import React from 'react';
import { Facebook, Twitter } from 'lucide-react';

const EventCard = ({ event }) => {
  return (
    <article className="mb-12 pb-12 border-b border-gray-300 last:border-b-0 last:pb-0 last:mb-0">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Event Image - Left */}
        <div className="md:w-1/3 shrink-0">
          <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-200 rounded-lg">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Event Content - Right */}
        <div className="md:w-2/3 flex-1">
          {/* Title */}
          <h2 className="text-xl md:text-2xl font-bold text-[#2784D4] mb-3">
            {event.title}
          </h2>

          {/* Date */}
          <p className="text-black text-sm mb-4">
            {event.date}
          </p>

          {/* Content */}
          <div className="text-black leading-relaxed whitespace-pre-line mb-4">
            {event.content}
          </div>

          {/* Social Media Share Buttons */}
          <div className="flex items-center gap-2 mt-4 justify-end">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors duration-200 flex items-center gap-1"
            >
              <Facebook className="w-3 h-3" />
              <span>Share</span>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(event.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-400 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors duration-200 flex items-center gap-1"
            >
              <Twitter className="w-3 h-3" />
              <span>Tweet</span>
            </a>
            <a
              href={`https://plus.google.com/share?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors duration-200"
            >
              g+
            </a>
            <a
              href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(event.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors duration-200 flex items-center justify-center"
              aria-label="Pinterest"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default EventCard;

