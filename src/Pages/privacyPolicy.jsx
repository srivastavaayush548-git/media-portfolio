import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-red-100 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 text-center mb-10">
          Privacy Policy
        </h1>

        <div className="prose prose-lg prose-stone max-w-none">
          <p>
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit the official website of <strong>Dr. A. Surya Prakash</strong>.
          </p>

          <h3 className="text-2xl font-serif font-bold text-stone-900 mt-8 mb-4">1. Information Collection</h3>
          <p>
            As a personal portfolio website, we generally do not collect personally identifiable information (PII) from visitors unless explicitly provided by you (e.g., through email communication).
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Log Data:</strong> Like many site operators, we may collect information that your browser sends whenever you visit our Site ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</li>
          </ul>

          <h3 className="text-2xl font-serif font-bold text-stone-900 mt-8 mb-4">2. Cookies</h3>
          <p>
            This website may use "cookies" to collect information and improve your experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.
          </p>

          <h3 className="text-2xl font-serif font-bold text-stone-900 mt-8 mb-4">3. External Links</h3>
          <p>
            Our Service may contain links to external sites that are not operated by us (e.g., news outlets, publishers). If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy and terms of service of every site you visit. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites, products, or services.
          </p>

          <h3 className="text-2xl font-serif font-bold text-stone-900 mt-8 mb-4">4. Changes to This Privacy Policy</h3>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h3 className="text-2xl font-serif font-bold text-stone-900 mt-8 mb-4">5. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us via the social media channels listed on the website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
