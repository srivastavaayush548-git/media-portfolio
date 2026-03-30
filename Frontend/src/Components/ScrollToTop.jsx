import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Basic window scroll
    window.scrollTo(0, 0);
    
    // Fallback for some browsers or specific layouts
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    
    // Also try body if documentElement fails
    document.body.scrollTo(0, 0);

    // Some components might render with a delay, so a very short timeout can help
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
