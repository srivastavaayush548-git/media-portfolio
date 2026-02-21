import React, { useState } from 'react';
import praksh from '../assets/a-surya-prakash.jpeg';
import BGHome from '../assets/Images/Homebg.jpg';
import { X, BookOpen, ExternalLink } from 'lucide-react';
import { nonFictionBooks } from '../Data/books';
import IntroSlider from './IntroSlider';


const HomeLayout = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  // Get featured books based on specific titles requested (Show only 3, in specific order)
  const featuredBooks = [
    "What Ails Indian Parliament",
    "PUBLIC MONEY, PRIVATE AGENDA: THE USE AND ABUSE OF MPLADS",
    "The Emergency: Indian Democracy's Darkest Hour"
  ].map(title => nonFictionBooks.find(b => b.title.includes(title) || title.includes(b.title)))
  .filter(Boolean); // Remove any potential undefined matches

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
        <strong>A. Surya Prakash</strong> is an Indian journalist and author, best known for serving as the chairperson of Prasar Bharati, India’s public service broadcaster. He has worked in various leading media organisations and is the author of several books on Indian politics and parliamentary democracy. In January 2025, Prakash was conferred with the Padma Bhushan, India's third-highest civilian award, for his contributions to literature and education. Currently, he is a <strong>Member of the Prime Ministers’ Museum & Library (PMML) Society, New Delhi</strong>. He served as the <strong>Vice-Chairman of the Executive Council</strong> of the same institution for five years until January, 2024. He was also <strong>Chairman of the Content Committee and the Design Committee</strong> of the <strong>Prime Ministers Museum (Pradhanmantri Sangrahalaya)</strong>.
      </>
    ),
    imageSrc: praksh
  };

  const careerHighlights = [
    { role: "Member, Society", org: "PMML" },
    { role: "Vice-Chairman, Executive Council", org: "PMML" },
    { role: "Chairperson", org: "Prasar Bharati" },
    { role: "Editor", org: "Zee News" },
    { role: "Executive Editor", org: "The Pioneer" },
    { role: "India Editor", org: "Asia Times" },
    { role: "Political Editor", org: "Eenadu Group" },
    { role: "Chief of Bureau, New Delhi", org: "The Indian Express" },
    {role: "Director", org: "The Pioneer Media School"}
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-yellow-200 to-orange-100 bg-cover bg-center font-sans selection:bg-red-100">
      {/* Intro Slider Overlay */}
      {showIntro && (
        <IntroSlider onComplete={() => setShowIntro(false)} />
      )}

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
              <a href="/about-me" className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-stone-300 text-stone-900 font-medium rounded hover:bg-white transition-colors">
                The Journey So Far
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

      {/* --- Featured Books Section --- */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="inline-block mb-4 px-3 py-1 bg-red-50 text-red-800 text-xs font-bold uppercase tracking-wider rounded-full">
              Authored Works
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
              Featured <span className="text-red-800">Books</span>
            </h2>
            <p className="text-stone-600 mt-2 max-w-2xl">
              Exploring Indian democracy, governance, and parliamentary practices through extensive research and analysis.
            </p>
          </div>
          <a
            href="/books"
            className="hidden md:flex items-center gap-2 text-red-700 font-medium hover:text-red-800 transition-colors"
          >
            View All Books
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredBooks.map((book, index) => (
            <article
              key={index}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100"
            >
              <div
                className="h-80 bg-stone-200 overflow-hidden relative cursor-pointer"
                onClick={() => handleImageClick(book.cover)}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-red-800 shrink-0" />
                  <span className="text-xs font-bold text-red-700 uppercase tracking-wide">Non-Fiction</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-2 leading-tight group-hover:text-red-800 transition-colors line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-sm text-stone-600 mb-4 font-medium">
                  By: {book.author}
                </p>
                <p className="text-sm text-stone-600 leading-relaxed line-clamp-3 mb-4">
                  {book.description}
                </p>
                {book.purchaseLink && (
                  <a
                    href={book.purchaseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-red-700 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Buy Now
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/books"
            className="inline-flex items-center gap-2 text-red-700 font-medium hover:text-red-800 transition-colors"
          >
            View All Books
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Modal / Lightbox for Book Covers */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 z-50 text-white/70 hover:text-white transition-colors p-2"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl">
            <img
              src={selectedImage}
              alt="Book cover - Full size view"
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeLayout;
