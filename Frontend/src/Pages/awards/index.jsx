import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Star, ChevronRight } from 'lucide-react';
import pbCover from '../../assets/Images/awards/Padmabhushan/coverimage.jpg';
import rjCover from '../../assets/Images/awards/rajyotsav .jpg';
import dlCover from '../../assets/Images/awards/D.litt/dlt(2).jpeg';

const AwardsIndex = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-stone-50 via-orange-50 to-stone-100 text-stone-800 font-sans pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/40 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-fade-in-custom">
          <div className="inline-block px-4 py-1.5 bg-red-50 border border-red-100 rounded-full text-red-800 text-sm font-bold uppercase tracking-widest mb-6">
            National & State Recognitions
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 mb-8 tracking-tight">
            AWARDS
          </h1>
          <div className="w-24 h-1 bg-red-800 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            Honouring a lifelong commitment to journalism, public service, and the preservation of democratic values in India.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Padma Bhushan Card */}
          <Link 
            to="/awards/padmabhushan" 
            className="group relative h-[400px] md:h-[500px] bg-stone-900 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:shadow-red-900/20"
          >
            {/* Background Image (Blurred for filling gaps) */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-2xl scale-110 opacity-40 transition-transform duration-700 group-hover:scale-125"
              style={{ backgroundImage: `url(${pbCover})` }}
            ></div>
            
            {/* Main Image (Contained to show full photo) */}
            <div className="absolute inset-0 flex items-center justify-center p-4 z-5">
              <img 
                src={pbCover} 
                alt="Padma Bhushan" 
                className="max-w-full max-h-full object-contain rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="absolute inset-0 bg-linear-to-b from-stone-900/20 via-transparent to-stone-900/90 z-10"></div>
            
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end text-white z-20">
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-white/10 backdrop-blur-md rounded-2xl w-fit border border-white/20 group-hover:bg-red-800 group-hover:border-red-600 transition-all duration-300">
                <Award className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-red-200 mb-2">National Honour</h2>
              <h3 className="text-xl md:text-2xl font-serif font-bold mb-3 md:mb-4">Padma Bhushan</h3>
              <p className="text-stone-300 text-sm md:text-base line-clamp-2 mb-4 md:mb-6 group-hover:text-white transition-colors">
                India’s third-highest civilian award for contribution to literature and education.
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">
                View Gallery <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            
            <div className="absolute top-6 right-6 z-20">
              <span className="px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider">
                2025
              </span>
            </div>
          </Link>

          {/* Rajyotsava Award Card */}
          <Link 
            to="/awards/rajyotsava-award" 
            className="group relative h-[400px] md:h-[500px] bg-stone-900 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:shadow-yellow-900/20"
          >
            {/* Background Image (Blurred for filling gaps) */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-2xl scale-110 opacity-40 transition-transform duration-700 group-hover:scale-125"
              style={{ backgroundImage: `url(${rjCover})` }}
            ></div>
            
            {/* Main Image (Contained to show full photo) */}
            <div className="absolute inset-0 flex items-center justify-center p-4 z-5">
              <img 
                src={rjCover} 
                alt="Rajyotsava Award" 
                className="max-w-full max-h-full object-contain rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="absolute inset-0 bg-linear-to-b from-stone-900/20 via-transparent to-stone-900/90 z-10"></div>
            
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end text-white z-20">
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-white/10 backdrop-blur-md rounded-2xl w-fit border border-white/20 group-hover:bg-yellow-600 group-hover:border-yellow-500 transition-all duration-300">
                <Star className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-200 mb-2">State Honour</h2>
              <h3 className="text-xl md:text-2xl font-serif font-bold mb-3 md:mb-4">Rajyotsava Award</h3>
              <p className="text-stone-300 text-sm md:text-base line-clamp-2 mb-4 md:mb-6 group-hover:text-white transition-colors">
                Conferred by the Government of Karnataka for excellence in media.
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">
                View Gallery <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            
            <div className="absolute top-6 right-6 z-30">
              <span className="px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider">
                2010
              </span>
            </div>
          </Link>

          {/* D.Litt Card */}
          <Link 
            to="/awards/d-litt" 
            className="group relative h-[400px] md:h-[500px] bg-stone-900 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:shadow-orange-900/20"
          >
            {/* Background Image (Blurred for filling gaps) */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-2xl scale-110 opacity-40 transition-transform duration-700 group-hover:scale-125"
              style={{ backgroundImage: `url(${dlCover})` }}
            ></div>
            
            {/* Main Image (Contained to show full photo) */}
            <div className="absolute inset-0 flex items-center justify-center p-4 z-5">
              <img 
                src={dlCover} 
                alt="D.Litt Award" 
                className="max-w-full max-h-full object-contain rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="absolute inset-0 bg-linear-to-b from-stone-900/20 via-transparent to-stone-900/90 z-10"></div>
            
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end text-white z-20">
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-white/10 backdrop-blur-md rounded-2xl w-fit border border-white/20 group-hover:bg-orange-600 group-hover:border-orange-500 transition-all duration-300">
                <Star className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-orange-200 mb-2">Academic Honour</h2>
              <h3 className="text-xl md:text-2xl font-serif font-bold mb-3 md:mb-4">D.Litt.</h3>
              <p className="text-stone-300 text-sm md:text-base line-clamp-2 mb-4 md:mb-6 group-hover:text-white transition-colors">
                 Doctor of Letters (Honoris Causa) for distinguished contributions to journalism.
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">
                View Gallery <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            
            {/* Year Badge if known, or just a label */}
            <div className="absolute top-6 right-6 z-30">
              <span className="px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider">
                Honoris Causa
              </span>
            </div>
          </Link>
        </div>
      </div>
      
      <style>
        {`
        @keyframes fadeInCustom {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-custom {
          animation: fadeInCustom 1s ease-out forwards;
        }
      `}
      </style>
    </div>
  );
};

export default AwardsIndex;
