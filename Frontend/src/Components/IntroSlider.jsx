
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
// import int1 from '../assets/Intro/intro1.jpg';
// import int2 from '../assets/Intro/intro2.jpeg';
// import int3 from '../assets/Intro/intro3.jpeg';
import introVideo from '../assets/Intro/intro_video.mp4';

const SLIDES = [
  {
    type: 'video',
    src: introVideo,
    duration: 23000,
  },
  // {
  //   type: 'image',
  //   src: int1,
  //   duration: 3000,
  //   caption: "A Legacy in Journalism"
  // },
  // {
  //   type: 'image',
  //   src: int2,
  //   duration: 3000,
  //   caption: "Dialogue & Engagement"
  // },
  // {
  //   type: 'image',
  //   src: int3,
  //   duration: 3000,
  //   caption: "A Journey of Excellence"
  // }
];

const IntroSlider = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
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

  // Auto-advance logic with video fallback
  useEffect(() => {
    let timeout;

    // For images, we always use the duration
    if (currentSlide.type === 'image') {
      timeout = setTimeout(() => {
        handleNext();
      }, currentSlide.duration);
    }
    // For video, we use the duration as a fallback in case onEnded doesn't fire
    else if (currentSlide.type === 'video') {
      timeout = setTimeout(() => {
        handleNext();
      }, (currentSlide.duration || 25000) + 2000); // Add a 2s buffer
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [currentIndex, currentSlide, handleNext]);

  // Invisible "Click to Unmute" fallback
  // Since browsers block audio autoplay, this ensures that ANY click on the screen
  // (which counts as user interaction) will instantly turn the audio on.
  const handleGlobalUnmute = async () => {
    if (videoRef.current) {
      // Initialize Audio Context for boosting if not already done
      if (!window.audioContext) {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          window.audioContext = new AudioContext();
          const source = window.audioContext.createMediaElementSource(videoRef.current);
          const gainNode = window.audioContext.createGain();

          gainNode.gain.value = 3.5; // Boost volume by 3.5x

          source.connect(gainNode);
          gainNode.connect(window.audioContext.destination);
          window.audioGainNode = gainNode;
        } catch (err) {
          console.error("Audio boost failed:", err);
        }
      }

      if (window.audioContext && window.audioContext.state === 'suspended') {
        await window.audioContext.resume();
      }

      if (videoRef.current.muted) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(err => console.log("Audio play failed:", err));
        setIsMuted(false);
      }
    }
  };

  // Watchdog effect to ensure video starts
  useEffect(() => {
    if (currentSlide.type === 'video' && videoRef.current) {
      const interval = setInterval(() => {
        if (videoRef.current && videoRef.current.paused && !isExiting) {
          videoRef.current.play().catch(() => { });
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [currentSlide.type, isExiting]);

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
            <div key={index} className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
              {slide.type === 'video' ? (
                <>
                  <video
                    ref={videoRef}
                    src={slide.src}
                    className="w-full h-full object-contain bg-black"
                    autoPlay
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    onEnded={handleNext}
                    onCanPlay={() => {
                      if (videoRef.current && videoRef.current.paused) {
                        videoRef.current.play().catch(e => console.log("Autoplay blocked:", e));
                      }
                    }}
                    onError={(e) => console.error("Video error details:", e.target.error)}
                  />
                  {isMuted && (
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs tracking-widest uppercase pointer-events-none">
                      Click anywhere for sound
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full relative flex flex-col items-center justify-center">
                  <div className="absolute inset-0 bg-black/20 z-10" />
                  <img src={slide.src} alt="Slide" className="max-w-full max-h-[80vh] object-contain animate-fade-in" />
                  {slide.caption && (
                    <div className="mt-8 text-2xl md:text-4xl font-serif text-white/90 animate-slide-up-fade">
                      {slide.caption}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Skip Intro Button */}
      {!isExiting && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleComplete();
          }}
          className="absolute bottom-8 right-8 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-6 py-2 rounded-full text-sm font-medium tracking-wider transition-all hover:scale-105 active:scale-95"
        >
          Skip Intro
        </button>
      )}





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
