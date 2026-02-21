import React from 'react';
import YoutubeVideo from '../Components/YoutubeVideo';
import { categorizedInterviews } from '../Data/interviews';

const Interview = () => {
  return (
    <div className="min-h-screen pt-24 bg-linear-to-br from-orange-200 via-yellow-200 to-orange-100 text-stone-800">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-stone-900">
          INTERVIEWS
        </h1>
        
        <div className="max-w-7xl mx-auto space-y-20">
          {categorizedInterviews.map((group, gIndex) => (
            <section key={gIndex}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-800 shrink-0">
                  {group.category}
                </h2>
                <div className="h-px w-full bg-stone-300"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.videos.map((item, index) => (
                  <div key={index} className="flex flex-col group">
                    <YoutubeVideo 
                      videoId={item.id} 
                      type={item.type} 
                      title={item.title} 
                    />
                    <div className="mt-4 bg-white/50 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                         <span className="px-2 py-1 bg-orange-100/80 text-orange-800 text-[10px] font-bold uppercase tracking-wider rounded-full border border-orange-200">
                           {item.type === 'playlist' ? 'Playlist' : 'Interview'}
                         </span>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-stone-900 leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interview;

