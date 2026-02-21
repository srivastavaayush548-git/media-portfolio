import React from 'react';
import { Twitter, Facebook } from 'lucide-react';

const OpinionArticle = ({ article }) => {
  return (
    <article className="p-6 mb-8 ">
      {/* Article Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
        {article.title}
      </h2>

      {/* Article Image - Just below title, larger size */}
      {article.image && (
        <div className="flex justify-start mb-4">
          <div className="relative w-56 md:w-64 aspect-[4/3] overflow-hidden bg-gray-200 rounded-lg">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
      )}

      {/* Article Date */}
      <p className="text-gray-600 text-sm mb-4">
        {article.date}
      </p>

      {/* Article Content */}
      <div className="text-black leading-relaxed whitespace-pre-line">
        {article.content}
      </div>

      {/* Social Media Links */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          {/* Text Links - Flex Start */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Get connected on</span>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700 transition-colors cursor-pointer"
            >
              Twitter
            </a>
            <span className="text-gray-600">,</span>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 underline hover:text-pink-700 transition-colors cursor-pointer"
            >
              Instagram
            </a>
            <span className="text-gray-600">&</span>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:text-blue-900 transition-colors cursor-pointer"
            >
              Facebook
            </a>
          </div>

          {/* Icons - Flex End */}
          <div className="flex items-center gap-3">
            {/* Pinterest Icon */}
            <a
              href="https://pinterest.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 transition-colors cursor-pointer"
              aria-label="Pinterest"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
              </svg>
            </a>

            {/* Facebook Icon */}
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>

            {/* Twitter Icon */}
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transition-colors cursor-pointer"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OpinionArticle;

