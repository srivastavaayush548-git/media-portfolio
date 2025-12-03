import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, ChevronDown, ChevronRight, Mail } from 'lucide-react';
import { homeMenu, homeSocialLinks } from '../Data/home';

const MenuBar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  // Freeze scroll logic
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Handle Submenu Toggle
  const toggleSubmenu = (label) => {
    setExpandedMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[85vw] sm:w-80 bg-white shadow-2xl z-50 
        transform transition-transform duration-300 ease-out flex flex-col
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        
        {/* Header inside Drawer (for aesthetic spacing) */}
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">A. Surya Prakash</span>
        </div>

        {/* Scrollable A. Surya Prakash Area */}
        <nav className="flex-1 overflow-y-auto py-6 px-6 space-y-2">
          {homeMenu.map((item, idx) => {
            const hasSubmenu = !!item.submenu;
            const isExpanded = expandedMenus[item.label];
            const active = isActive(item.path);

            return (
              <div key={idx} className="border-b border-slate-50 last:border-0 pb-2">
                {hasSubmenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={`w-full flex items-center justify-between py-3 text-left group`}
                    >
                      <span className={`text-lg font-serif font-medium group-hover:text-blue-800 transition-colors ${active ? 'text-blue-800' : 'text-slate-800'}`}>
                        {item.label}
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-blue-800" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-800" />
                      )}
                    </button>
                    
                    {/* Submenu Items */}
                    <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100 mt-1 mb-3' : 'max-h-0 opacity-0'}`}>
                      <ul className="pl-4 space-y-3 border-l-2 border-slate-100 ml-1">
                        {item.submenu.map((subItem, sIdx) => (
                          <li key={sIdx}>
                            <Link
                              to={subItem.path}
                              onClick={onClose}
                              className="block text-sm text-slate-500 hover:text-blue-800 transition-colors"
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`block py-3 text-lg font-serif font-medium hover:text-blue-800 transition-colors ${active ? 'text-blue-800' : 'text-slate-800'}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer Area */}
        <div className="bg-slate-50 p-6 border-t border-slate-100">
          <div className="flex justify-center space-x-6 mb-6">
            {homeSocialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-blue-800 transition-colors transform hover:-translate-y-1"
              >
                {/* Dynamically rendering icons based on ID */}
                {social.id === 'twitter' && <Twitter className="w-5 h-5" />}
                {social.id === 'facebook' && <Facebook className="w-5 h-5" />}
                {social.id === 'linkedin' && <Linkedin className="w-5 h-5" />}
                {social.id === 'email' && <Mail className="w-5 h-5" />}
              </a>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 leading-relaxed">
            &copy; {new Date().getFullYear()} A. Surya Prakash.<br />
            All Rights Reserved.
          </p>
        </div>
      </aside>
    </>
  );
};

export default MenuBar;