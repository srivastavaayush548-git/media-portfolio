import React from "react";
import padmaVideo from '../../assets/Video/A. Surya Prakash Honoured with Padma Bhushan for Contributions to Journalism and Literature.mp4';

const Padmabhushan = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-yellow-200 to-orange-100 text-stone-800 font-sans selection:bg-red-100 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="inline-block px-3 py-1 bg-red-50 text-red-800 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
          National Honor
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight mb-6">
          Padma Bhushan
        </h1>
        <div className="border-l-4 border-red-700 pl-6 mb-10">
          <p className="text-xl text-stone-600 leading-relaxed">
            Conferred the Padma Bhushan in 2025 for his distinguished service in
            the fields of Literature and Education.
          </p>
        </div>

        {/* Video Section */}
        <div className="w-full bg-black/5 rounded-2xl p-2 md:p-4 backdrop-blur-sm">
          <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
            <video className="w-full h-auto" controls playsInline>
              <source src={padmaVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-center text-sm text-stone-500 mt-3 font-medium italic">
            Video: A. Surya Prakash Honoured with Padma Bhushan
          </p>
        </div>
      </div>
    </div>
  );
};

export default Padmabhushan;
