import React from 'react';

const Career = () => {
  const roles = [
    { role: "Chairperson", org: "Prasar Bharati" },
    { role: "Chief of Bureau", org: "Indian Express" },
    { role: "Executive Editor", org: "The Pioneer" },
    { role: "India Editor", org: "Asia Times" },
    { role: "Political Editor", org: "Eenadu Group" },
    { role: "Editor", org: "Zee News" }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-red-100 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="inline-block px-3 py-1 bg-red-50 text-red-800 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
          Professional Journey
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight mb-8">
          Career
        </h1>
        
        <div className="text-xl text-stone-600 leading-relaxed mb-10">
          <p>
            A. Surya Prakash has held senior editorial roles in major Indian and international news organisations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {roles.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 hover:border-red-200 transition-colors group">
              <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-red-700 transition-colors mb-2">
                {item.org}
              </h3>
              <p className="text-stone-500 font-medium">
                {item.role}
              </p>
            </div>
          ))}
        </div>

        <div className="border-l-4 border-red-700 pl-6 py-2 bg-white/50 rounded-r-lg">
          <p className="text-lg text-stone-700 leading-relaxed">
            He is also known for his analysis of Indian democracy and parliamentary practices. He was appointed a member of the search panel for selecting the anti-corruption ombudsman, the Lokpal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Career;
