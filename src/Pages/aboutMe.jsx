import React from 'react';
import { BookOpen, Award, Mic, PenTool, GraduationCap, Globe } from 'lucide-react';

const AboutMe = () => {
  return (
    <div className="min-h-screen pt-20 md:pt-24 bg-stone-50 text-stone-800 selection:bg-red-100 selection:text-stone-900">
      <div className="container mx-auto px-4 py-12">
        
        {/* --- Header Section --- */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6">
            About <span className="text-red-700">A. Surya Prakash</span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-stone-600">
            A distinguished Indian journalist, author, and media executive, best known for his tenure as the 
            chairperson of Prasar Bharati. His career reflects a blend of editorial leadership, 
            academic scholarship, and active engagement in India’s democratic processes. Currently, he is the Vice-Chairman of the Executive Council of the Prime Ministers’ Museum & Library (PMML) in New Delhi, previously known as the Nehru Memorial Museum & Library. In this role, he contributes to preserving and presenting the legacies of India’s prime ministers and shaping public understanding of the country’s political history.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid gap-16">

          {/* --- 1. Journalism Career --- */}
          <section className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 bg-white p-6 rounded-xl border border-stone-200">
              <div className="flex items-center gap-3 mb-4 text-red-700">
                <PenTool className="w-6 h-6" />
                <h3 className="text-xl font-bold text-stone-900">Key Positions</h3>
              </div>
              <ul className="space-y-4 text-sm md:text-base">
                <li className="flex flex-col">
                  <span className="font-semibold text-stone-900">Vice-Chairman</span>
                  <span className="text-stone-500">Prime Ministers’ Museum & Library (PMML)</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold text-stone-900">Chief of Bureau</span>
                  <span className="text-stone-500">The Indian Express</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold text-stone-900">Executive Editor</span>
                  <span className="text-stone-500">The Pioneer</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold text-stone-900">Editor</span>
                  <span className="text-stone-500">Zee News</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold text-stone-900">Political Editor</span>
                  <span className="text-stone-500">Eenadu Group</span>
                </li>
              </ul>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">A Legacy in Journalism</h2>
              <div className="space-y-4 text-stone-700 leading-relaxed text-justify">
                <p>
                  Prakash’s career in journalism has been marked by leadership roles in major Indian and international media organizations. 
                  As <strong>Executive Editor at The Pioneer</strong>, he oversaw content strategy and investigative reporting. His editorial influence extended beyond India, serving as India Editor for <strong>Asia Times</strong>, where he contributed to international perspectives on Indian politics.
                </p>
                <p>
                  Throughout his career, he has been recognized for his insightful analyses of Indian democracy. His reporting often explores the functioning of legislative institutions and the dynamics of political parties. He was also appointed to the search panel for selecting the anti-corruption ombudsman (Lokpal), reflecting trust in his impartiality.
                </p>
              </div>
            </div>
          </section>

          {/* --- 2. Prasar Bharati & Education (Split) --- */}
          <section className="grid md:grid-cols-2 gap-12">
            {/* Prasar Bharati */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-50 rounded-full text-red-700">
                  <Mic className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-stone-900">Role at Prasar Bharati</h2>
              </div>
              <p className="text-stone-700 leading-relaxed text-justify">
                As chairperson of Prasar Bharati, Prakash steered India’s premier public service broadcaster, including Doordarshan and All India Radio. Under his leadership, the organization focused on modernizing content delivery and expanding regional coverage. His vision was to balance public service objectives with the demands of a rapidly evolving media landscape, ensuring unbiased reporting insulated from political pressures.
              </p>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-50 rounded-full text-red-700">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-stone-900">Education & Early Life</h2>
              </div>
              <p className="text-stone-700 leading-relaxed text-justify">
                Surya Prakash earned a Master’s degree in Sociology from the University of Mysore, providing him with a strong understanding of social structures. Recognizing his significant contributions to literature and education, <strong>Tumkur University awarded him a Doctor of Letters (D.Litt.)</strong>, a prestigious honor reflecting both academic and practical expertise.
              </p>
            </div>
          </section>

          {/* --- 3. Notable Books --- */}
          <section className="bg-white border border-stone-200 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold text-stone-900 flex items-center justify-center gap-3">
                <BookOpen className="w-8 h-8 text-red-700" />
                Authored Works
              </h2>
              <p className="text-stone-500 mt-2">Critically examining Indian democracy and governance</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Book 1 */}
              <div className="bg-white p-6 rounded-lg border border-stone-200 hover:border-red-700 transition-colors">
                <h3 className="text-lg font-bold text-stone-900 mb-2">What Ails Indian Parliament</h3>
                <p className="text-sm text-stone-600">
                  A detailed critique of the structural and functional challenges facing India’s parliamentary system, exploring legislative inefficiencies.
                </p>
              </div>
              {/* Book 2 */}
              <div className="bg-white p-6 rounded-lg border border-stone-200 hover:border-red-700 transition-colors">
                <h3 className="text-lg font-bold text-stone-900 mb-2">The Emergency</h3>
                <p className="text-sm text-stone-600">
                  Subtitled "Indian Democracy’s Darkest Hour," this analyzes the 1975–77 suspension of civil liberties and press censorship.
                </p>
              </div>
              {/* Book 3 */}
              <div className="bg-white p-6 rounded-lg border border-stone-200 hover:border-red-700 transition-colors">
                <h3 className="text-lg font-bold text-stone-900 mb-2">Democracy, Politics and Governance</h3>
                <p className="text-sm text-stone-600">
                  Released by VP M. Venkaiah Naidu, addressing contemporary political challenges and ethical governance.
                </p>
              </div>
            </div>
          </section>

          {/* --- 4. Awards --- */}
          <section className="border-t border-stone-200 pt-16">
            <h2 className="text-3xl font-serif font-bold text-stone-900 text-center mb-10">Honors & Recognition</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              
              <div className="flex gap-4 items-start p-4 hover:bg-stone-100 rounded-lg transition-colors">
                <div className="mt-1">
                  <Award className="w-8 h-8 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900">Padma Bhushan (2025)</h3>
                  <p className="text-stone-600 mt-1">
                    India’s third-highest civilian award, acknowledging his exceptional contributions to literature and education.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 hover:bg-stone-100 rounded-lg transition-colors">
                <div className="mt-1">
                  <Award className="w-8 h-8 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900">Rajyotsava Award (2010)</h3>
                  <p className="text-stone-600 mt-1">
                    Conferred by the Government of Karnataka for excellence in literature, education, and public service.
                  </p>
                </div>
              </div>

            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AboutMe;
