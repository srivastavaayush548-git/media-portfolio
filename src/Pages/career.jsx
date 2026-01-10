import React, { useEffect, useState } from 'react';
import {
  Mic,
  Newspaper,
  PenTool,
  Globe,
  Building2,
  ChevronDown,
  Briefcase,
  Landmark
} from 'lucide-react';
import ImageGroupGallery from '../Components/ImageGroupGallery';
import convocationImage1 from '../assets/Images/Career/Image_002.jpg';
import convocationImage2 from '../assets/Images/Career/Image_007.jpg';
import convocationImage3 from '../assets/Images/Career/convocation2.jpeg';

const Career = () => {
  const [isVisible, setIsVisible] = useState(false);

  const convocationGroups = [
    {
      id: 'convocation-invitation',
      title: "Convocation Invitation",
      thumbnail: convocationImage1,
      images: [
        { id: 1, src: convocationImage1, alt: "Convocation Invitation - 2015", title: "Invitation to deliver the convocation address at a prestigious university." }
      ]
    },
    {
      id: 'convocation-ceremony',
      title: "Convocation Ceremony",
      thumbnail: convocationImage2,
      images: [
        { id: 2, src: convocationImage2, alt: "Convocation Ceremony - 2015", title: "Delivering the convocation address to the graduating class." },
        { id: 3, src: convocationImage3, alt: "Convocation Address - 2015", title: "Inspiring the next generation of leaders and thinkers." }
      ]
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const roles = [
    {
      role: "Vice-Chairman, Executive Council",
      org: "Prime Ministers' Museum & Library (PMML)",
      desc: "Preserving and presenting the legacies of India's prime ministers. Currently serving on the Executive Council in New Delhi.",
      icon: <Landmark className="w-5 h-5" />,
      year: "Current"
    },
    {
      role: "Chairperson",
      org: "Prasar Bharati",
      desc: "Steered India's premier public service broadcaster, modernizing content delivery for Doordarshan and All India Radio.",
      icon: <Mic className="w-5 h-5" />,
      year: "Past"
    },
    {
      role: "Chief of Bureau",
      org: "The Indian Express",
      desc: "Led the bureau with a focus on investigative journalism and political reporting.",
      icon: <Newspaper className="w-5 h-5" />,
      year: "Past"
    },
    {
      role: "Executive Editor",
      org: "The Pioneer",
      desc: "Oversaw content strategy and editorial direction of one of India's leading newspapers.",
      icon: <PenTool className="w-5 h-5" />,
      year: "Past"
    },
    {
      role: "India Editor",
      org: "Asia Times",
      desc: "Managed editorial operations and coverage of Indian affairs for the international publication.",
      icon: <Globe className="w-5 h-5" />,
      year: "Past"
    },
    {
      role: "Political Editor",
      org: "Eenadu Group",
      desc: "Shaped political coverage and analysis for one of South India's major media groups.",
      icon: <Building2 className="w-5 h-5" />,
      year: "Past"
    },
    {
      role: "Editor",
      org: "Zee News",
      desc: "Shaped the editorial voice of one of India's leading news channels.",
      icon: <Briefcase className="w-5 h-5" />,
      year: "Past"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-yellow-200 to-orange-100 text-stone-800 font-sans selection:bg-red-900 selection:text-white overflow-x-hidden">

      {/* --- Hero Section --- */}
      <div className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-yellow-100 to-orange-50" />
          <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        </div>

        <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block mb-4 px-3 py-1 border border-red-800/30 rounded-full bg-red-50 text-red-900 text-xs md:text-sm font-medium tracking-widest uppercase">
            Professional Journey
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-stone-900 tracking-tight mb-6">
            Career <span className="text-red-800">Path</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl text-stone-600 font-light leading-relaxed">
            A distinguished career spanning decades of editorial leadership in major Indian and international news organisations.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="animate-bounce p-2 rounded-full bg-white shadow-lg border border-stone-100 text-stone-400">
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-20">

        {/* --- Intro Section --- */}
        <section className="mb-32 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-50"></div>
            <div className="relative bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-stone-100">
              <QuoteIcon className="w-12 h-12 text-red-200 absolute top-6 left-6 -z-10" />
              <p className="text-xl md:text-2xl font-serif text-stone-800 leading-relaxed italic">
                "A. Surya Prakash has held senior editorial roles in major Indian and international news organisations, shaping public discourse through journalistic excellence."
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-stone-200"></div>
                <span className="text-sm font-bold text-stone-400 uppercase tracking-wider">Overview</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 space-y-6 text-lg text-stone-600 leading-relaxed">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">
              A Legacy of <span className="underline decoration-red-800/30 decoration-4 underline-offset-4">Leadership</span>
            </h2>
            <p>
              Throughout his career, A. Surya Prakash has demonstrated exceptional editorial leadership across print, broadcast, and digital media platforms. His roles have consistently focused on maintaining journalistic integrity while navigating the complex landscape of Indian politics and governance.
            </p>
            <p>
              He is also known for his analysis of Indian democracy and parliamentary practices. He was appointed a member of the search panel for selecting the anti-corruption ombudsman, the Lokpal, reflecting his standing as a trusted voice in matters of governance and accountability.
            </p>
          </div>
        </section>

        {/* --- Career Timeline --- */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Editorial Positions</h2>
            <p className="text-stone-500 max-w-xl mx-auto">Key roles in a career dedicated to journalistic excellence and democratic engagement.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-stone-200 transform md:-translate-x-1/2"></div>

            {roles.map((item, index) => (
              <TimelineItem
                key={index}
                year={item.year}
                title={item.role}
                org={item.org}
                desc={item.desc}
                icon={item.icon}
                side={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </section>

        {/* --- Convocation Ceremony Section --- */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-3 py-1 border border-red-800/30 rounded-full bg-red-50 text-red-900 text-xs font-bold uppercase tracking-wider">
              Speeches & Addresses
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              Convocation <span className="text-red-800">Ceremony</span>
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              Key addresses delivered at university convocations, inspiring the next generation of leaders and thinkers.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <ImageGroupGallery groups={convocationGroups} customGridCols="grid-cols-1 md:grid-cols-2" />
          </div>
        </section>

      </div>

    </div>
  );
};

// --- Helper Components ---

const TimelineItem = ({ year, title, org, desc, icon, side }) => {
  const isLeft = side === 'left';
  return (
    <div className={`flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between mb-12 relative group`}>
      {/* Dot */}
      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-4 border-red-800 rounded-full transform md:-translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300"></div>

      {/* Content */}
      <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isLeft ? 'md:text-right md:pr-12' : 'md:ml-auto md:pl-12'}`}>
        <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm hover:shadow-lg hover:border-red-100 transition-all duration-300 group-hover:-translate-y-1">
          <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <span className="text-xs font-bold tracking-wider text-red-600 uppercase bg-red-50 px-2 py-1 rounded">{year}</span>
            <div className="text-stone-400">{icon}</div>
          </div>
          <h3 className="text-lg font-bold text-stone-900">{title}</h3>
          <div className="text-sm font-medium text-stone-500 mb-3">{org}</div>
          <p className="text-sm text-stone-600 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
};

const QuoteIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21L14.017 18C14.017 16.896 14.321 16.067 14.929 15.513C15.537 14.959 16.491 14.682 17.791 14.682C18.114 14.682 18.425 14.693 18.724 14.715C18.435 13.922 18.069 13.232 17.627 12.645C17.185 12.058 16.637 11.559 15.983 11.147C15.329 10.735 14.545 10.458 13.631 10.316L13.631 7.297C15.019 7.425 16.294 7.914 17.457 8.764C18.62 9.614 19.499 10.761 20.094 12.205C20.689 13.649 20.987 15.361 20.987 17.341L20.987 21L14.017 21ZM6.017 21L6.017 18C6.017 16.896 6.321 16.067 6.929 15.513C7.537 14.959 8.491 14.682 9.791 14.682C10.114 14.682 10.425 14.693 10.724 14.715C10.435 13.922 10.069 13.232 9.627 12.645C9.185 12.058 8.637 11.559 7.983 11.147C7.329 10.735 6.545 10.458 5.631 10.316L5.631 7.297C7.019 7.425 8.294 7.914 9.457 8.764C10.62 9.614 11.499 10.761 12.094 12.205C12.689 13.649 12.987 15.361 12.987 17.341L12.987 21L6.017 21Z" />
  </svg>
);

export default Career;
