import React from 'react';
import praksh from '../assets/a-surya-prakash.jpg';


const HomeLayout = () => {
  // Data derived from your description
  const personalDetails = {
    name: "A. Surya Prakash",
    title: "Journalist, Author & Scholar",
    bio: (
      <>
       <strong>A. Surya Prakash</strong> is an Indian journalist and author, best known for serving as the chairperson of Prasar Bharati, India’s public service broadcaster. He has worked in various leading media organisations and is the author of several books on Indian politics and parliamentary democracy. In January 2025, Prakash was conferred with the Padma Bhushan, India's third-highest civilian award, for his contributions to literature and education. Currently, he is the{" "}
        <strong>Vice-Chairman of the Executive Council of the Prime Ministers’ Museum & Library (PMML) in New Delhi</strong>
        , previously known as the Nehru Memorial Museum & Library. In this role, he contributes to preserving and presenting the legacies of India’s prime ministers and shaping public understanding of the country’s political history.
      </>
    ),
    imageSrc: praksh
  };

  const careerHighlights = [
    { role: "Vice-Chairman", org: "PMML" },
    { role: "Chairperson", org: "Prasar Bharati" },
    { role: "Chief of Bureau", org: "The Indian Express" },
    { role: "Political Editor", org: "Eenadu Group" },
    { role: "Executive Editor", org: "The Pioneer" },
    { role: "Editor", org: "Zee News" }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-red-100">
      {/* --- Hero Section --- */}
      <header className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-28 sm:py-24 grid md:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="md:col-span-7 space-y-6 ">
            <div className="inline-block px-3 py-1 bg-red-50 text-red-800 text-xs font-bold uppercase tracking-wider rounded-full md:hidden lg:inline-block">
              Constitutional Scholar
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 leading-tight">
              Decoding Indian <br />
              <span className="text-stone-500 italic">Democracy & Governance</span>
            </h1>
            
            <p className="text-lg text-stone-600 leading-relaxed border-l-4 border-red-700 pl-6">
              {personalDetails.bio}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-stone-900 text-white font-medium rounded hover:bg-stone-700 transition-colors">
                Read Latest Columns
              </button>
              <a href="/about-me" className="px-6 py-3 border border-stone-300 text-stone-700 font-medium rounded hover:bg-stone-50 transition-colors">
                View Bibliography
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="md:col-span-5 relative">
            <div className="absolute inset-0 bg-stone-200 transform translate-x-4 translate-y-4 rounded-lg"></div>
            <img 
              src={personalDetails.imageSrc} 
              alt={personalDetails.name} 
              className="relative w-full h-[500px] object-cover rounded-lg shadow-lg transition-all duration-700"
            />
          </div>
        </div>
      </header>

      {/* --- Career Milestones Strip --- */}
      <section className="bg-stone-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-stone-400 text-sm font-bold uppercase tracking-widest mb-6">Key Positions Held</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {careerHighlights.map((item, index) => (
              <div key={index} className="border-l border-stone-700 pl-4">
                <h3 className="text-lg font-serif font-semibold">{item.org}</h3>
                <p className="text-stone-400 text-sm mt-1">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Featured Works / News Layout --- */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-serif font-bold text-stone-900">Recent Blogs</h2>
          <a href="#" className="text-red-700 font-medium hover:underline">View Archive &rarr;</a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Article Card 1 */}
          <article className="group cursor-pointer">
            <div className="h-48 bg-stone-200 mb-4 overflow-hidden rounded">
               {/* Placeholder for article image */}
               <div className="w-full h-full bg-stone-300 group-hover:scale-105 transition-transform duration-500"></div>
            </div>
            <div className="text-xs font-bold text-red-700 mb-2">CONSTITUTION</div>
            <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-red-700 transition-colors">
              The Evolution of Parliamentary Democracy in India
            </h3>
            <p className="text-stone-600 text-sm line-clamp-3">
              An analysis of how legislative bodies have adapted to modern governance challenges over the last seven decades...
            </p>
          </article>

          {/* Article Card 2 */}
          <article className="group cursor-pointer">
            <div className="h-48 bg-stone-200 mb-4 overflow-hidden rounded">
               <div className="w-full h-full bg-stone-300 group-hover:scale-105 transition-transform duration-500"></div>
            </div>
            <div className="text-xs font-bold text-red-700 mb-2">POLITICS</div>
            <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-red-700 transition-colors">
              Electoral Reforms: The Road Ahead
            </h3>
            <p className="text-stone-600 text-sm line-clamp-3">
              Exploring the critical need for transparency in funding and the role of the Election Commission in ensuring fair play...
            </p>
          </article>

          {/* Article Card 3 */}
          <article className="group cursor-pointer">
            <div className="h-48 bg-stone-200 mb-4 overflow-hidden rounded">
               <div className="w-full h-full bg-stone-300 group-hover:scale-105 transition-transform duration-500"></div>
            </div>
            <div className="text-xs font-bold text-red-700 mb-2">MEDIA</div>
            <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-red-700 transition-colors">
              Journalism in the Age of Digital Noise
            </h3>
            <p className="text-stone-600 text-sm line-clamp-3">
              Reflecting on the shifting paradigms of news consumption and the enduring responsibility of the editor...
            </p>
          </article>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-stone-200 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-serif text-xl font-bold text-stone-900">A. Surya Prakash</span>
            <p className="text-sm text-stone-500 mt-1">© 2024 All Rights Reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-stone-400 hover:text-stone-900">Twitter (X)</a>
            <a href="#" className="text-stone-400 hover:text-stone-900">LinkedIn</a>
            <a href="#" className="text-stone-400 hover:text-stone-900">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeLayout;
