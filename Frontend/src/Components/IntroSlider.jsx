
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
// import int1 from '../assets/Intro/intro1.jpg';
// import int2 from '../assets/Intro/intro2.jpeg';
// import int3 from '../assets/Intro/intro3.jpeg';
import introVideo from '../assets/Intro/intro video.mp4';

const SLIDES = [
  {
    type: 'video',
    src: introVideo,
    duration: 23000,
  },
  // {
  //   type: 'image',
  //   src: int1,
  //   duration: 2000,
  //   caption: "A Life in Journalism"
  // },
  // {
  //   type: 'image',
  //   src: int2,
  //   duration: 2000,
  //   caption: "A Life in Journalism"
  // },
  // {
  //   type: 'image',
  //   src: int3,
  //   duration: 2000,
  //   caption: "Decades of Service"
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

  // Attempt to play muted (standard for autoplay)
  useEffect(() => {
    const attemptPlay = async () => {
      if (videoRef.current && currentSlide.type === 'video') {
        try {
          videoRef.current.muted = true;
          await videoRef.current.play();
          setIsMuted(true);
        } catch (err) {
          console.log("Autoplay failed:", err);
        }
      }
    };

    if (currentSlide.type === 'video') {
      attemptPlay();
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
                  className="w-full h-full object-contain bg-black"
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
