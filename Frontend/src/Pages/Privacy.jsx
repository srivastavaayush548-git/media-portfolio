import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-200 via-yellow-200 to-orange-100 text-stone-800 font-sans selection:bg-red-100 pt-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 text-center mb-10">
          Privacy Policy
        </h1>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-stone-100 prose prose-lg prose-stone max-w-none">
          <p className="text-xl text-stone-600 leading-relaxed">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit the official portfolio website of <strong>A. Surya Prakash</strong>.
          </p>
          <p className="text-sm text-stone-500 mb-8">Last Updated: January 2026</p>

          <h3 className="text-2xl font-serif font-bold text-stone-900 mt-8 mb-4">1. Information Collection</h3>
          <p>
            As a personal portfolio website, we generally do not collect personally identifiable information (PII) from visitors unless explicitly provided by you, such as when you reach out via email links provided on the site.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-stone-700">
            <li><strong>Voluntary Information:</strong> If you contact us via email, we will have your email address and any other information you choose to provide.</li>
            <li><strong>Log Data:</strong> Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, and other statistics.</li>
          </ul>

          <h3 className="text-2xl font-serif font-bold text-stone-900 mt-8 mb-4">2. Cookies & Tracking</h3>
          <p>
            This website acts primarily as a static portfolio. We do not use aggressive tracking cookies. However, third-party services (such as video embeds from YouTube or social media widgets) may use cookies to collect information and improve your experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h3 className="text-2xl font-serif font-bold text-stone-900 mt-8 mb-4">3. External Links</h3>
          <p>
            Our Service contains links to external sites that are not operated by us (e.g., The Indian Express, Pioneer, YouTube, Book retailers). If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy and terms of service of every site you visit. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites.
          </p>

          <h3 className="text-2xl font-serif font-bold text-stone-900 mt-8 mb-4">4. Usage of Content</h3>
          <p>
            The content displayed on this site, including articles, images from family and professional events, and videos, is for informational and archival purposes. The privacy of individuals appearing in photographs (e.g., family members, colleagues) is respected, and images are used with appropriate context.
          </p>

          <h3 className="text-2xl font-serif font-bold text-stone-900 mt-8 mb-4">5. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us via the provided communication channels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
