import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Award,
  Mic,
  PenTool,
  GraduationCap,
  Globe,
  ChevronDown,
  Newspaper,
  Landmark,
  ScrollText,
  ExternalLink
} from 'lucide-react';

import suryaPrakashImg from '../assets/Surya-Prakash.jpeg';

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-200 via-yellow-200 to-orange-100 text-stone-800 font-sans selection:bg-red-900 selection:text-white overflow-x-hidden">

      <div className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-br from-orange-200 via-yellow-100 to-orange-50" />
          <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        </div>

        <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block mb-4 px-3 py-1 border border-red-800/30 rounded-full bg-red-50 text-red-900 text-xs md:text-sm font-medium tracking-widest uppercase">
            Journalist &bull; Author &bull; Media Executive
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-stone-900 tracking-tight mb-6">
            A. Surya <span className="text-red-800">Prakash</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl text-stone-600 font-light leading-relaxed">
            Democracy is not just about elections; it is about the daily functioning of institutions and the vigilance of the press.
          </p>
        </div>

        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="animate-bounce p-2 rounded-full bg-white shadow-lg border border-stone-100 text-stone-400">
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-20">

        <section className="mb-32 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-50"></div>

            {/* Image */}
            <div className="relative mb-6 mx-auto max-w-sm rounded-2xl overflow-hidden shadow-2xl border-4 border-red-800/20 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 border-4 border-red-800/30 rounded-2xl pointer-events-none z-10"></div>
              <img src={suryaPrakashImg} alt="A. Surya Prakash" className="w-full h-auto object-cover relative" />
            </div>
          </div>
          <div className="md:col-span-7 space-y-6 text-lg text-stone-600 leading-relaxed">

            <div className="relative bg-white/50 p-6 md:p-8 rounded-2xl border border-stone-100 mb-8 backdrop-blur-sm">
              <QuoteIcon className="w-8 h-8 text-red-200 absolute top-4 left-4 -z-10" />
              <p className="text-lg md:text-xl font-serif text-stone-800 leading-relaxed italic">
                Democracy is not just about elections; it is about the daily functioning of institutions and the vigilance of the media.
              </p>
            </div>  

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">
              Professional Journey
            </h2>
            <p>
              Best known for his tenure as the <strong>Chairperson of Prasar Bharati</strong>, A. Surya Prakash has dedicated his life to the intersection of media and governance. His career reflects a blend of editorial leadership, academic scholarship, and active engagement in India’s democratic processes.
            </p>
            <p>
              Currently serving as the <strong>Member, The Prime Ministers’ Museum & Library (PMML) Society</strong>, he contributes to preserving the legacies of India’s leaders. His work ensures that the history of India's political evolution is accessible, accurate, and inspiring for future generations.
            </p>
          </div>
        </section>

        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Key Milestones</h2>
            <p className="text-stone-500 max-w-xl mx-auto">Key milestones in a career spanning over five decades of service to the nation, reform of democratic institutions and the media.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-stone-300/80 transform md:-translate-x-1/2 pointer-events-none"
              aria-hidden="true"
            ></div>

            <TimelineItem
              year="Current"
              title="Member"
              org="Prime Ministers’ Museum & Library (PMML) Society"
              desc="Preserving and presenting the legacies of India’s prime ministers."
              icon={<Landmark className="w-5 h-5" />}
              side="left"
            />
            <TimelineItem
              year="Past"
              title="Vice-Chairman, Executive Council"
              org="Prime Ministers’ Museum & Library (PMML)"
              desc="Served as the Vice-Chairman of the Executive Council & as Chairman of the Content Committee & the Design Committee of the Prime Ministers Museum, contributing to the institution's strategic direction."
              icon={<Landmark className="w-5 h-5" />}
              side="right"
            />
            <TimelineItem
              year="Past"
              title="Chairperson"
              org="Prasar Bharati"
              desc="Led India's public service broadcaster, overseeing Doordarshan and All India Radio."
              icon={<Mic className="w-5 h-5" />}
              side="left"
            />
            <TimelineItem
              year="Past"
              title="Editor"
              org="Zee News"
              desc="Headed the editorial team of a major national news channel."
              icon={<Globe className="w-5 h-5" />}
              side="right"
            />
            <TimelineItem
              year="Past"
              title="Executive Editor"
              org="The Pioneer"
              desc="Directed editorial operations and content strategy."
              icon={<PenTool className="w-5 h-5" />}
              side="left"
            />
             <TimelineItem
              year="Past"
              title="India Editor"
              org="Asia Times"
              desc="Provided the Indian focus in a international newspaper at a time when the Narasimha Rao government ended the shackles of socialism and opened up the Indian Economy to foreign investment."
              icon={<Globe className="w-5 h-5" />}
              side="right"
            />
            <TimelineItem
              year="Past"
              title="Political Editor"
              org="Eenadu Group"
              desc="Led political reporting and analysis."
              icon={<Newspaper className="w-5 h-5" />}
              side="left"
            />
            <TimelineItem
              year="Past"
              title="Chief of Bureau, New Delhi"
              org="The Indian Express"
              desc="Headed the New Delhi bureau, focusing on national affairs."
              icon={<Newspaper className="w-5 h-5" />}
              side="right"
            />
            <TimelineItem
              year="Past"
              title="Director"
              org="The Pioneer Media School"
              desc="Guided the next generation of journalists."
              icon={<GraduationCap className="w-5 h-5" />} // Changed icon to match education/school context
              side="left"
            />
          </div>
        </section>

        {/* --- Books Section --- */}


        {/* --- Awards & Education --- */}
        <section className="grid md:grid-cols-2 gap-12">
          {/* Awards */}
          <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">Honors</h2>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0"></div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">Padma Bhushan (2025)</h3>
                  <p className="text-stone-600 text-sm mt-1">India’s third-highest civilian award for contribution to literature and education.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-stone-300 shrink-0"></div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">Karnataka Rajyotsava Award (2010)</h3>
                  <p className="text-stone-600 text-sm mt-1">Conferred by the Government of Karnataka for excellence in public service.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-stone-300 shrink-0"></div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">Bipin Chandra Pal Sanman</h3>
                  <p className="text-stone-600 text-sm mt-1">For fearless journalism</p>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">Education</h2>
            </div>
            <div className="space-y-6">
              <div className="group flex gap-4 items-start">
                <div className="p-2 bg-stone-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <ScrollText className="w-5 h-5 text-stone-400 group-hover:text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">Doctor of Letters (D.Litt.)</h3>
                  <p className="text-stone-600 text-sm">Tumkur University</p>
                  <p className="text-stone-400 text-xs mt-1">(For his thesis on the working of Indian Parliament)</p>
                </div>
              </div>
                <div className="group flex gap-4 items-start">
                <div className="p-2 bg-stone-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <ScrollText className="w-5 h-5 text-stone-400 group-hover:text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">Master’s in Sociology</h3>
                  <p className="text-stone-600 text-sm">University of Mysore</p>
                </div>
              </div>
               <div className="group flex gap-4 items-start">
                <div className="p-2 bg-stone-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <ScrollText className="w-5 h-5 text-stone-400 group-hover:text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">LL.B.</h3>
                  <p className="text-stone-600 text-sm">Chaudhary Charan Singh University</p>
                  
                </div>
              </div>
              <div className="group flex gap-4 items-start">
                <div className="p-2 bg-stone-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <ScrollText className="w-5 h-5 text-stone-400 group-hover:text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">D.Litt (Honoris Causa)</h3>
                  <p className="text-stone-600 text-sm">SGT University, Gurgaon</p>
                </div>
              </div>             
            </div>
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
    <div className={`flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between mb-12 last:mb-0 relative group md:min-h-[120px]`}>
      {/* Dot */}
      <div
        className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-4 border-red-800 rounded-full shadow-md transform md:-translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-300"
        aria-hidden="true"
      ></div>

      {/* Content */}
      <div className={`w-full md:max-w-[44%] pl-10 md:pl-0 ${isLeft ? 'md:text-right md:pr-14' : 'md:ml-auto md:pl-14'}`}>
        <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-300 group-hover:translate-y-0">
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

export default AboutMe;
