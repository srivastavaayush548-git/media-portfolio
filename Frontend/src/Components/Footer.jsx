import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-linear-to-br from-stone-900 via-stone-800 to-stone-900 border-t border-stone-700/50 pt-16 pb-8 text-stone-300 font-sans relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">

          {/* Identity & Bio */}
          <div className="md:col-span-5 space-y-5">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                A. Surya <span className="text-red-400">Prakash</span>
              </h2>
              <div className="w-16 h-1 bg-red-600 mb-4"></div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Distinguished journalist, author and scholar dedicated to preserving democratic values and enhancing parliamentary governance in India.
            </p>
            <div className="pt-2 flex gap-3">
              {/* Social Links */}
              <SocialLink href="https://x.com/mediasurya?s=20" label="Twitter" />
              <SocialLink href="#" label="LinkedIn" />
              <SocialLink href="mailto:contact@asuryaprakash.com" label="Email" />
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1"></div> {/* Spacer */}

          <div className="md:col-span-3">
            <h3 className="text-white font-serif font-bold mb-6 text-lg relative">
              Discover
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-600"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/about-me" label="About Me" />
              <FooterLink to="/career" label="Career Path" />
              <FooterLink to="/books" label="Authored Works" />
              <FooterLink to="/article" label="Articles & Columns" />
              <FooterLink to="/interview" label="Interviews" />
              <FooterLink to="/gallery" label="Gallery" />
              <FooterLink to="/family" label="Family Moments" />
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-white font-serif font-bold mb-6 text-lg relative">
              Legal & Info
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-600"></span>
            </h3>
            <ul className="space-y-3 text-sm mb-6">
              <FooterLink to="/privacy-policy" label="Privacy Policy" />
              <FooterLink to="/terms-and-conditions" label="Terms & Conditions" />
            </ul>
            <div className="pt-4 border-t border-stone-700/50">
              <p className="text-xs text-stone-500 leading-relaxed">
                &copy; {new Date().getFullYear()} A. Surya Prakash.<br />
                All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-700/50 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
            <p>Built with dedication to preserving journalistic excellence</p>
            <p className="text-stone-600">Journalist &bull; Author &bull; Scholar</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="hover:text-red-400 transition-colors duration-200 block py-1.5 relative group"
    >
      <span className="relative">
        {label}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
      </span>
    </Link>
  </li>
);

const SocialLink = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-11 h-11 rounded-lg bg-stone-800/50 backdrop-blur-sm flex items-center justify-center hover:bg-red-600/20 hover:text-red-400 hover:border-red-500/50 border border-stone-700/50 transition-all duration-300 group"
    title={label}
  >
    <span className="sr-only">{label}</span>
    {/* Simple SVG Icons or text fallback */}
    {label === "Twitter" && (
      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )}
    {label === "LinkedIn" && (
      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )}
    {label === "Email" && (
      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )}
  </a>
);

export default Footer;
