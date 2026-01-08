import React, { useState } from 'react';
import praksh from '../assets/a-surya-prakash.jpeg';
import BGHome from '../assets/Images/Homebg.jpg';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import distinct article images
// import articleImg1 from '../assets/Images/Articles/WhatsApp Image 2026-01-02 at 4.56.04 PM.jpeg';
// import articleImg2 from '../assets/Images/Articles/WhatsApp Image 2026-01-02 at 4.56.05 PM.jpeg';
// import articleImg3 from '../assets/Images/Articles/WhatsApp Image 2026-01-02 at 4.56.06 PM.jpeg';
// import articleImg4 from '../assets/Images/Articles/WhatsApp Image 2026-01-02 at 4.56.07 PM.jpeg';
// import articleImg5 from '../assets/Images/Articles/WhatsApp Image 2026-01-02 at 4.56.20 PM.jpeg';
// import articleImg6 from '../assets/Images/Articles/WhatsApp Image 2026-01-02 at 4.56.21 PM.jpeg';
// import articleImg7 from '../assets/Images/Articles/WhatsApp Image 2026-01-02 at 4.56.22 PM.jpeg';
// import articleImg8 from '../assets/Images/Articles/WhatsApp Image 2026-01-02 at 4.56.23 PM.jpeg';
// import articleImg9 from '../assets/Images/Articles/WhatsApp Image 2026-01-02 at 4.56.45 PM.jpeg';
// import articleImg10 from '../assets/Images/Articles/WhatsApp Image 2026-01-02 at 4.56.46 PM.jpeg';

const HomeLayout = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const blogData = [
    // {
    //   category: "CONSTITUTION",
    //   title: "The Evolution of Parliamentary Democracy in India",
    //   excerpt: "An analysis of how legislative bodies have adapted to modern governance challenges over the last seven decades.",
    //   image: articleImg1
    // },
    // {
    //   category: "POLITICS",
    //   title: "Electoral Reforms: The Road Ahead",
    //   excerpt: "Exploring the critical need for transparency in funding and the role of the Election Commission in ensuring fair play.",
    //   image: articleImg2
    // },
    // {
    //   category: "MEDIA",
    //   title: "Journalism in the Age of Digital Noise",
    //   excerpt: "Reflecting on the shifting paradigms of news consumption and the enduring responsibility of the editor.",
    //   image: articleImg3
    // },
    // {
    //   category: "DEMOCRACY",
    //   title: "Grassroots Governance and Local Bodies",
    //   excerpt: "How panchayati raj institutions are reshaping the democratic landscape at the village level.",
    //   image: articleImg4
    // },
    // {
    //   category: "PUBLIC POLICY",
    //   title: "Broadcasting Reforms in a New Era",
    //   excerpt: "The future of public service broadcasting in an era of ott platforms and private media dominance.",
    //   image: articleImg5
    // },
    // {
    //   category: "HISTORY",
    //   title: "Revisiting the Emergency Era",
    //   excerpt: "Lessons learned from one of the darkest chapters in Indian democracy and the resilience of its institutions.",
    //   image: articleImg6
    // },
    // {
    //   category: "CONSTITUTION",
    //   title: "Federalism: Cooperation and Conflict",
    //   excerpt: "Understanding the delicate balance of power between the center and states in India's federal structure.",
    //   image: articleImg7
    // },
    // {
    //   category: "SOCIETY",
    //   title: "The Changing Face of Indian Civil Society",
    //   excerpt: "The role of ngos and citizen groups in holding the government accountable and driving social change.",
    //   image: articleImg8
    // },
    // {
    //   category: "LEADERSHIP",
    //   title: "Political Leadership in Independent India",
    //   excerpt: "A comparative study of leadership styles from Nehru to the present day.",
    //   image: articleImg9
    // },
    // {
    //   category: "GLOBAL AFFAIRS",
    //   title: "India's Place in the New World Order",
    //   excerpt: "Analyzing India's foreign policy shifts and its growing influence on the global stage.",
    //   image: articleImg10
    // }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 3 >= blogData.length ? 0 : prev + 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 3 < 0 ? 0 : prev - 3));
  };

  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(${BGHome})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const personalDetails = {
    name: "A. Surya Prakash",
    title: "Journalist, Author & Scholar",
    bio: (
      <>
        <strong>A. Surya Prakash</strong> is an Indian journalist and author, best known for serving as the chairperson of Prasar Bharati, India’s public service broadcaster. He has worked in various leading media organisations and is the author of several books on Indian politics and parliamentary democracy. In January 2025, Prakash was conferred with the Padma Bhushan, India's third-highest civilian award, for his contributions to literature and education. Currently, he is a{" "}
        <strong>Member of the Executive Council of the Prime Ministers’ Museum & Library (PMML) in New Delhi</strong>
        . He also served as the Vice-Chairman of the Executive Council of the same institution. In these roles, he contributes to preserving and presenting the legacies of India’s prime ministers and shaping public understanding of the country’s political history.
      </>
    ),
    imageSrc: praksh
  };

  const careerHighlights = [
    { role: "Member, Executive Council", org: "PMML" },
    { role: "Vice-Chairman", org: "PMML" },
    { role: "Chairperson", org: "Prasar Bharati" },
    { role: "Chief of Bureau", org: "The Indian Express" },
    { role: "Political Editor", org: "Eenadu Group " },
    { role: "Executive Editor", org: "The Pioneer" },
    { role: "Editor", org: "Zee News" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-yellow-200 to-orange-100 bg-cover bg-center font-sans selection:bg-red-100">
      {/* --- Hero Section --- */}
      <header style={backgroundStyle} className="">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-28 sm:py-24 grid md:grid-cols-12 gap-12 items-center">

          {/* Text Content */}
          <div className="md:col-span-7 space-y-6 ">
            <div className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-red-900 text-xs font-bold uppercase tracking-wider rounded-full md:hidden lg:inline-block shadow-sm">
              Constitutional Scholar
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-950 leading-tight">
              Decoding Indian <br />
              <span className="text-red-900 italic">Democracy & Governance</span>
            </h1>

            <p className="text-lg text-stone-900 font-medium leading-relaxed border-l-4 border-red-700 pl-6">
              {personalDetails.bio}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-stone-900 text-white font-medium rounded hover:bg-stone-700 transition-colors">
                Read Latest Columns
              </button>
              <a href="/about-me" className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-stone-300 text-stone-900 font-medium rounded hover:bg-white transition-colors">
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
          
          {/* Navigation Controls */}
          <div className="flex gap-2">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full border border-stone-300 hover:bg-stone-100 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full border border-stone-300 hover:bg-stone-100 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentSlide + 3 >= blogData.length}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogData.slice(currentSlide, currentSlide + 3).map((item, index) => (
            <article key={index} className="group cursor-pointer">
              <div className="h-64 bg-stone-200 overflow-hidden rounded relative">
                <img 
                  src={item.image} 
                  alt={item.title || "Blog Image"} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <a href="#" className="text-red-700 font-medium hover:underline">View Archive &rarr;</a>
        </div>
      </section>
    </div>
  );
};

export default HomeLayout;
