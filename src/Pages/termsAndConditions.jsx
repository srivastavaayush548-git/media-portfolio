import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-red-100 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 text-center mb-10">
          Terms & Conditions
        </h1>

        <div className="prose prose-lg prose-stone max-w-none">
          <p>
            Welcome to the official website of <strong>Dr. A. Surya Prakash</strong>. By accessing and using this website, you agree to comply with and be bound by the following terms and conditions of use. If you disagree with any part of these terms and conditions, please do not use our website.
          </p>

          <h3 className="text-2xl font-serif font-bold text-stone-900 mt-8 mb-4">1. General Use</h3>
          <p>
            The content of the pages of this website is for your general information and use only. It is subject to change without notice. This website serves as a digital portfolio and archive of Dr. A. Surya Prakash's journalistic work, books, and academic contributions.
          </p>

          <h3 className="text-2xl font-serif font-bold text-stone-900 mt-8 mb-4">2. Intellectual Property</h3>
          <p>
            This website contains material which is owned by or licensed to Dr. A. Surya Prakash. This material includes, but is not limited to, the design, layout, look, appearance, graphics, articles, and book excerpts.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Articles & Columns:</strong> Copyright for published articles may reside with the respective publications (e.g., The Indian Express, The Pioneer, Zee News) or with the author, as per the original agreements.</li>
            <li><strong>Books:</strong> Excerpts and details of books are provided for informational purposes. Copyrights belong to the respective publishers and the author.</li>
            <li><strong>Photographs:</strong> Images used on this site are personal archives or licensed for use. Reproduction is prohibited other than in accordance with the copyright notice.</li>
          </ul>

          <h3 className="text-2xl font-serif font-bold text-stone-900 mt-8 mb-4">3. Restrictions</h3>
          <p>
            You are expressly restricted from all of the following:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Publishing any website material in any media without prior written consent.</li>
            <li>Selling, sublicensing, and/or otherwise commercializing any website material.</li>
            <li>Using this website in any way that is, or may be, damaging to this website or to the reputation of Dr. A. Surya Prakash.</li>
          </ul>

          <h3 className="text-2xl font-serif font-bold text-stone-900 mt-8 mb-4">4. Third-Party Links</h3>
          <p>
            From time to time, this website may also include links to other websites (e.g., news portals, book retailers). These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
          </p>

          <h3 className="text-2xl font-serif font-bold text-stone-900 mt-8 mb-4">5. Disclaimer</h3>
          <p>
            The information contained in this website is for general information purposes only. While we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
