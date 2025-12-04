import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-stone-900 py-12 text-stone-300">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start">
        <div className="mb-2 md:mb-0 md:w-1/3">
          <span className="font-serif text-2xl font-extrabold text-stone-50">A. Surya Prakash</span>
          <p className="text-sm mt-3 leading-relaxed">
            Crafting innovative digital solutions with a focus on user experience and robust architecture.
          </p>
          <p className="text-xs mt-6 text-stone-400">© {new Date().getFullYear()} A. Surya Prakash. All rights reserved.</p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-16 space-y-8 md:space-y-0">
          <div>
            <ul className="space-y-3">
              <li>
                <a href="/privacy-policy" className="hover:text-stone-50 transition-colors duration-200">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-conditions" className="hover:text-stone-50 transition-colors duration-200">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          <div>
            <ul className="space-y-3">
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-stone-50 transition-colors duration-200">Twitter (X)</a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-stone-50 transition-colors duration-200">LinkedIn</a>
              </li>
              <li>
                <a href="mailto:your.email@example.com" className="hover:text-stone-50 transition-colors duration-200">Email</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
