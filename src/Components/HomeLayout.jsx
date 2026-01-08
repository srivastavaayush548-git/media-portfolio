import React, { useState } from 'react';
import praksh from '../assets/a-surya-prakash.jpeg';
import BGHome from '../assets/Images/Homebg.jpg';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import bookNewsImg from '../assets/booknews.png';
import invitationImg from '../assets/invitation.png';


const HomeLayout = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const blogData = [
    {
      category: "EVENTS",
      title: "Book Launch & News",
      excerpt: "Updates on recent book launches and literary contributions.",
      image: bookNewsImg
    },
    {
      category: "EVENTS",
      title: "Special Invitation of Book Launch",
      excerpt: "Official invitations to upcoming talks and ceremonies.",
      image: invitationImg
    },
    // ... previous commented out items can remain here or be removed
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

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

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
          <h2 className="text-3xl font-serif font-bold text-stone-900">Latest Updates</h2>

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
            <article
              key={index}
              className="group cursor-pointer"
              onClick={() => handleImageClick(item.image)}
            >
              <div className="h-64 bg-stone-200 overflow-hidden rounded-t relative">
                <img
                  src={item.image}
                  alt={item.title || "Blog Image"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 bg-white border border-t-0 border-stone-200 rounded-b shadow-sm group-hover:shadow-md transition-shadow">
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-2 leading-tight group-hover:text-red-900 transition-colors">
                  {item.title}
                </h3>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a href="#" className="text-red-700 font-medium hover:underline">View Archive &rarr;</a>
        </div>
      </section>

      {/* Modal / Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={handleCloseModal}
              className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl">
            <img
              src={selectedImage}
              alt="Full size view"
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
