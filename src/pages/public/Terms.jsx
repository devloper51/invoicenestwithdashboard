import React from 'react';

const Terms = () => (
  <>
    <div className="py-12 text-center bg-gradient-to-br from-[#1ABC9C] to-[#16A085]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl animate-fade-in">Terms of Service</h1>
        <p className="mt-3 text-xl text-[#E8F6F3] animate-fade-in" style={{animationDelay: '0.1s'}}>Last updated: June 2024</p>
      </div>
    </div>
    <div className="max-w-3xl mx-auto py-12 px-6 sm:px-8 lg:px-10 bg-white rounded-lg shadow-xl mt-[-3rem] mb-12 relative z-10">
      <p className="mb-6 text-[#34495E]">
        Welcome to <span className="font-semibold">InvoiceNest</span>. These Terms of Service ("Terms") govern your use of our invoice management platform and related services. By accessing or using InvoiceNest, you agree to be bound by these Terms.
      </p>
      <h2 className="text-2xl font-bold text-[#1ABC9C] mt-8 mb-3">1. Use of Service</h2>
      <ul className="list-disc ml-6 space-y-1 text-[#34495E] mb-6">
        <li>You must be at least 18 years old and have the legal capacity to enter into a contract.</li>
        <li>You agree to provide accurate and complete information when creating an account.</li>
        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
      </ul>
      <h2 className="text-2xl font-bold text-[#1ABC9C] mt-8 mb-3">2. User Content</h2>
      <ul className="list-disc ml-6 space-y-1 text-[#34495E] mb-6">
        <li>You retain ownership of all invoices, client data, and content you create on InvoiceNest.</li>
        <li>You grant InvoiceNest a license to use, store, and process your data solely to provide and improve our services.</li>
        <li>You are responsible for the legality and accuracy of your content.</li>
      </ul>
      <h2 className="text-2xl font-bold text-[#1ABC9C] mt-8 mb-3">3. Prohibited Activities</h2>
      <ul className="list-disc ml-6 space-y-1 text-[#34495E] mb-6">
        <li>Do not use InvoiceNest for any unlawful, fraudulent, or harmful activities.</li>
        <li>Do not attempt to gain unauthorized access to our systems or data.</li>
        <li>Do not interfere with the operation or security of InvoiceNest.</li>
      </ul>
      <h2 className="text-2xl font-bold text-[#1ABC9C] mt-8 mb-3">4. Payment & Subscription</h2>
      <ul className="list-disc ml-6 space-y-1 text-[#34495E] mb-6">
        <li>Some features of InvoiceNest may require a paid subscription.</li>
        <li>All fees are billed in advance and are non-refundable except as required by law.</li>
        <li>InvoiceNest reserves the right to change pricing or features with notice.</li>
      </ul>
      <h2 className="text-2xl font-bold text-[#1ABC9C] mt-8 mb-3">5. Termination</h2>
      <ul className="list-disc ml-6 space-y-1 text-[#34495E] mb-6">
        <li>We may suspend or terminate your access to InvoiceNest for violation of these Terms or applicable laws.</li>
        <li>You may cancel your account at any time from your dashboard or by contacting support.</li>
      </ul>
      <h2 className="text-2xl font-bold text-[#1ABC9C] mt-8 mb-3">6. Disclaimer & Limitation of Liability</h2>
      <p className="mb-6 text-[#34495E]">
        InvoiceNest is provided "as is" and "as available" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.
      </p>
      <h2 className="text-2xl font-bold text-[#1ABC9C] mt-8 mb-3">7. Changes to Terms</h2>
      <p className="mb-6 text-[#34495E]">
        We may update these Terms from time to time. Continued use of InvoiceNest after changes constitutes acceptance of the new Terms.
      </p>
      <h2 className="text-2xl font-bold text-[#1ABC9C] mt-8 mb-3">8. Contact Us</h2>
      <p className="mb-6 text-[#34495E]">
        If you have any questions about these Terms, please contact us at <a href="mailto:invoicenest@gmail.com" className="text-[#1ABC9C] underline hover:text-[#16A085]">invoicenest@gmail.com</a>.
      </p>
      <p className="mt-10 text-[#7F8C8D] text-sm text-center">&copy; {new Date().getFullYear()} InvoiceNest. All rights reserved.</p>
    </div>
  </>
);

export default Terms; 