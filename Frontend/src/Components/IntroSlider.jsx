
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import int1 from '../assets/Intro/intro1.jpg';
import int2 from '../assets/Intro/intro2.jpeg';
import int3 from '../assets/Intro/intro3.jpeg';

const CLOUDINARY_VIDEO_URL = "https://res.cloudinary.com/vipinyadav01/video/upload/v1770013829/gfe7mxostddnr3wicjam.mp4";

const SLIDES = [
  {
    type: 'video',
    src: CLOUDINARY_VIDEO_URL,
    duration: 23000,
  },
  {
    type: 'image',
    src: int1,
    duration: 2000,
    caption: "A Life in Journalism"
  },
  {
    type: 'image',
    src: int2,
    duration: 2000,
    caption: "A Life in Journalism"
  },
  {
    type: 'image',
    src: int3,
    duration: 2000,
    caption: "Decades of Service"
  }
];

const IntroSlider = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const currentSlide = SLIDES[currentIndex];

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    // Wait for exit animation
    setTimeout(() => {
      onComplete();
    }, 1000); 
  }, [onComplete]);

  const handleNext = useCallback(() => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleComplete();
    }
  }, [currentIndex, handleComplete]);

  // Attempt to unmute automatically, fallback to muted if browser blocks
  useEffect(() => {
    const attemptUnmute = async () => {
      if (videoRef.current && currentSlide.type === 'video') {
        try {
          videoRef.current.muted = false;
          await videoRef.current.play();
          setIsMuted(false);
        } catch {
          console.log("Autoplay with sound blocked, falling back to muted.");
          videoRef.current.muted = true;
          await videoRef.current.play();
          setIsMuted(true);
        }
      }
    };

    if (currentSlide.type === 'video') {
        attemptUnmute();
    }
  }, [currentIndex, currentSlide.type]);



  // Auto-advance logic
  useEffect(() => {
    let timeout;
    
    if (currentSlide.type === 'image') {
      const duration = currentSlide.duration;
      timeout = setTimeout(() => {
        handleNext();
      }, duration);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [currentIndex, currentSlide, handleNext]);

  // Invisible "Click to Unmute" fallback
  // Since browsers block audio autoplay, this ensures that ANY click on the screen
  // (which counts as user interaction) will instantly turn the audio on.
  const handleGlobalUnmute = () => {
    if (videoRef.current && videoRef.current.muted) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(err => console.log("Audio play failed:", err));
      setIsMuted(false);
    }
  };

  if (isExiting) {
    return (
      <div className="fixed inset-0 z-40 bg-black transition-transform duration-1000 ease-in-out transform -translate-y-full" />
    );
  }

  return (
    <div 
      className="fixed inset-0 z-40 bg-black text-white flex flex-col font-sans cursor-pointer"
      onClick={handleGlobalUnmute}
    >
      
      {/* Main Content */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {SLIDES.map((slide, index) => {
          // Only render current, prev, and next to save resources
          if (index !== currentIndex) return null;

          return (
            <div key={index} className="absolute inset-0 w-full h-full animate-fade-in flex items-center justify-center bg-black">
              {slide.type === 'video' ? (
                     <video
                       ref={videoRef}
                       src={slide.src}
                       className="max-w-full max-h-full object-contain"
                       muted={isMuted} // Controlled by state, but starts 'false' (unmuted)
                       playsInline
                       onEnded={handleNext}
                     />
              ) : (
                <div className="w-full h-full relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20 z-10" /> {/* Overlay */}
                  <img src={slide.src} alt="Slide" className="max-w-full max-h-full object-contain" />
                </div>
              )}
            </div>
          );
        })}


      </div>


      
      {/* Styles for animations */}
      <style jsx>{`
        @keyframes slide-up-fade {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up-fade {
          animation: slide-up-fade 0.8s ease-out forwards;
        }
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default IntroSlider;
