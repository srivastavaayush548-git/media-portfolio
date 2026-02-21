import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import MenuBar from './MenuBar';
import { homeMenu } from '../Data/home';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleClose = () => setIsMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  // Shadow on scroll logic
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize if screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b
        ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-0 border-stone-200' : 'bg-white/90 backdrop-blur-sm py-2 border-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* --- 1. Logo Section --- */}
            <div className="shrink-0 flex items-center z-50">
              <Link to="/" className="group flex flex-col items-start justify-center" onClick={handleClose}>
                <span className="font-serif text-xl md:text-2xl font-bold text-stone-900 tracking-tight group-hover:text-red-800 transition-colors">
                  A. SURYA PRAKASH
                </span>
                <span className="hidden md:block text-[10px] uppercase tracking-widest text-stone-500 font-medium">
                  Journalist & Author
                </span>
              </Link>
            </div>

            {/* --- 2. Desktop Navigation with Dropdowns --- */}
            <nav className="hidden lg:flex items-center gap-1">
              {homeMenu.map((item, idx) => {
                const active = isActive(item.path);
                return (
                  <div key={idx} className="relative group">
                    {/* Top Level Link */}
                    <Link
                      to={item.path}
                      className={`
                        flex items-center gap-1 px-4 py-6 text-sm font-semibold uppercase tracking-wide transition-colors relative
                        ${active
                          ? 'text-red-800'
                          : scrolled
                            ? 'text-stone-700 hover:text-red-800'
                            : 'text-stone-600 hover:text-red-800'
                        }
                      `}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-red-800"></span>
                      )}
                      {/* Show Chevron only if submenu exists */}
                      {item.submenu && (
                        <ChevronDown className={`w-4 h-4 transition-transform group-hover:rotate-180 ${active ? 'text-red-800' : 'text-stone-400 group-hover:text-red-800'}`} />
                      )}
                    </Link>

                    {/* Dropdown Menu (Conditionally Rendered) */}
                    {item.submenu && (
                      <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                        {/* White Card */}
                        <div className="bg-white border-t-2 border-red-800 shadow-xl rounded-b-md py-2 flex flex-col">
                          {item.submenu.map((subItem, sIdx) => {
                            const subActive = isActive(subItem.path);
                            return (
                              <Link
                                key={sIdx}
                                to={subItem.path}
                                className={`block px-5 py-3 text-sm transition-colors font-medium border-l-2 ${subActive
                                  ? 'text-red-800 bg-red-50 border-red-800'
                                  : 'text-stone-600 hover:text-red-800 hover:bg-stone-50 border-transparent hover:border-red-800'
                                  }`}
                              >
                                {subItem.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* --- 3. Mobile Hamburger Button --- */}
            <div className="flex items-center lg:hidden z-50">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-stone-800 hover:bg-stone-100 hover:text-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      <MenuBar isOpen={isMenuOpen} onClose={handleClose} />
    </>
  );
};

export default Header;