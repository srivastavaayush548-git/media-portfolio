import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ChevronDown } from 'lucide-react'; // Added ChevronDown
import MenuBar from './MenuBar';
// Ensure your data file exports this structure
import { homeMenu } from '../Data/home'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleClose = () => setIsMenuOpen(false);

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
        ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-0 border-slate-200' : 'bg-white py-2 border-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* --- 1. Logo Section --- */}
            <div className="shrink-0 flex items-center z-50">
              <Link to="/" className="group flex flex-col items-start justify-center" onClick={handleClose}>
                <span className="font-serif text-xl md:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-blue-800 transition-colors">
                  A. SURYA PRAKASH
                </span>
                <span className="hidden md:block text-[10px] uppercase tracking-widest text-slate-500 font-medium">
                  Journalist & Author
                </span>
              </Link>
            </div>

            {/* --- 2. Desktop A. Surya Prakash with Dropdowns --- */}
            <nav className="hidden lg:flex items-center gap-1">
              {homeMenu.map((item, idx) => (
                // 'group' class here allows the child dropdown to show on hover
                <div key={idx} className="relative group">
                  
                  {/* Top Level Link */}
                  <Link 
                    to={item.path} 
                    className={`
                      flex items-center gap-1 px-4 py-6 text-sm font-semibold uppercase tracking-wide transition-colors
                      ${scrolled ? 'text-slate-700 hover:text-blue-800' : 'text-slate-600 hover:text-blue-800'}
                    `}
                  >
                    {item.label}
                    {/* Show Chevron only if submenu exists */}
                    {item.submenu && (
                      <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-800 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>

                  {/* Dropdown Menu (Conditionally Rendered) */}
                  {item.submenu && (
                    <div className="absolute top-full left-0 pt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                      {/* White Card */}
                      <div className="bg-white border-t-2 border-blue-800 shadow-xl rounded-b-md py-2 flex flex-col">
                        {item.submenu.map((subItem, sIdx) => (
                          <Link
                            key={sIdx}
                            to={subItem.path}
                            className="block px-5 py-3 text-sm text-slate-600 hover:text-blue-800 hover:bg-slate-50 transition-colors font-medium border-l-2 border-transparent hover:border-blue-800"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Search Icon */}
              <button className="ml-4 text-slate-400 hover:text-blue-800 transition-colors p-2">
                <Search className="w-5 h-5" />
              </button>
            </nav>

            {/* --- 3. Mobile Hamburger Button --- */}
            <div className="flex items-center lg:hidden z-50">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none"
                aria-label="Toggle menu"
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