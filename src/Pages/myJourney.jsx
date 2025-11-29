import React, { useState } from 'react';
import { myJourneyContent } from '../Data/myJourney';
import journeyBg from '../assets/journey-bg.jpg';
const MyJourney = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="min-h-screen pt-12 relative">
      {/* Background */}
      <div
        className="fixed inset-0 top-12 -z-10"
        style={{
          backgroundImage: `url(${journeyBg})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="relative z-10 container mx-auto px-2 md:px-4 lg:px-2 py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">
          {myJourneyContent.title}
        </h1>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto ">

          {/* Vertical Line - Continuous white line through diamonds */}
          <div
            className="absolute top-0 bottom-0 bg-white"
            style={{
              left: '20px',
              width: '1px',
              zIndex: 1
            }}
          ></div>

          {/* Items */}
          <div className="space-y-24">
            {myJourneyContent.timeline.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center gap-4 mb-4">

                  <div
                    className="relative z-10 shrink-0 cursor-pointer"
                    style={{
                      width: '16px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: '12px'
                    }}
                  >
                    <div
                      className={`transition-all duration-200 ${hoveredIndex === index ? 'bg-blue-300' : 'bg-white'
                        }`}
                      style={{
                        width: '16px',
                        height: '16px',
                        transform: hoveredIndex === index ? 'rotate(135deg)' : 'rotate(45deg)'
                      }}
                    ></div>
                  </div>

                  {/* Year Box - Light Blue with White Text */}
                  <div
                    className="text-black font-semibold px-4 py-2 inline-block shadow cursor-pointer relative overflow-hidden"
                    style={{
                      transform: hoveredIndex === index ? 'scale(1.1) translateY(-2px)' : 'scale(1) translateY(0)',
                      transition: 'transform 0.3s ease-in-out',
                      backgroundColor: '#93c5fd'
                    }}
                  >
                    {/* Sliding white overlay from right to left */}
                    <div
                      className="absolute inset-0 bg-white"
                      style={{
                        transform: hoveredIndex === index ? 'translateX(0%)' : 'translateX(100%)',
                        transition: 'transform 0.5s ease-in-out'
                      }}
                    ></div>
                    <span className="relative z-10">{item.year}</span>
                  </div>
                </div>

                {/* Right Content */}
                <div className="pl-8 flex-1">

                  {/* Content Row - Image and Text */}
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    {/* Image */}
                    {item.image && (
                      <div className="shrink-0 w-full md:w-64 rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={item.image}
                          alt={`${item.year} illustration`}
                          className="w-full h-auto object-cover"
                          style={{ maxWidth: '100%' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML =
                              '<div class="w-full h-48 bg-blue-500/30 flex items-center justify-center text-white text-sm rounded-lg">Image Not Available</div>';
                          }}
                        />
                      </div>
                    )}

                    {/* Text Block */}
                    <div className="flex-1 text-white leading-relaxed text-base max-w-full">
                      {item.text}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyJourney;
