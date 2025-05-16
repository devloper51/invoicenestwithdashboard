import React from 'react';

const Privacy = () => (
  <>
    <div className="py-12 text-center bg-gradient-to-br from-[#1ABC9C] to-[#16A085]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl animate-fade-in">Privacy Policy</h1>
        <p className="mt-3 text-xl text-[#E8F6F3] animate-fade-in" style={{animationDelay: '0.1s'}}>Last updated: June 2024</p>
      </div>
    </div>
    <div className="max-w-3xl mx-auto py-12 px-6 sm:px-8 lg:px-10 bg-white rounded-lg shadow-xl mt-[-3rem] mb-12 relative z-10">
      <p className="mb-6 text-[#34495E]">
        At <span className="font-semibold">InvoiceNest</span>, we are committed to protecting your privacy and ensuring the security of your personal and business information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our invoice management platform.
      </p>
      <h2 className="text-2xl font-bold text-[#1ABC9C] mt-8 mb-3">1. Information We Collect</h2>
      <ul className="list-disc ml-6 space-y-1 text-[#34495E] mb-6">
        <li><span className="font-semibold">Account Information:</span> Name, email address, company name, and contact details.</li>
        <li><span className="font-semibold">Invoice Data:</span> Client details, invoice items, payment records, and related business data.</li>
        <li><span className="font-semibold">Usage Data:</span> Log data, device information, and analytics about how you use InvoiceNest.</li>
      </ul>
      <h2 className="text-2xl font-bold text-[#1ABC9C] mt-8 mb-3">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 space-y-1 text-[#34495E] mb-6">
        <li>To provide, operate, and maintain the InvoiceNest platform.</li>
        <li>To process and manage invoices, payments, and client records.</li>
        <li>To communicate with you about your account, updates, and support.</li>
        <li>To improve our services and develop new features.</li>
        <li>To comply with legal obligations and protect our users.</li>
      </ul>
      <h2 className="text-2xl font-bold text-[#1ABC9C] mt-8 mb-3">3. Data Sharing & Disclosure</h2>
      <ul className="list-disc ml-6 space-y-1 text-[#34495E] mb-6">
        <li>We do <span className="font-semibold">not</span> sell your personal or business data to third parties.</li>
        <li>We may share data with trusted service providers who help us operate InvoiceNest (e.g., cloud hosting, analytics).</li>
        <li>We may disclose information if required by law or to protect the rights and safety of InvoiceNest and its users.</li>
      </ul>
      <h2 className="text-2xl font-bold text-[#1ABC9C] mt-8 mb-3">4. Data Security</h2>
      <p className="mb-6 text-[#34495E]">
        We use industry-standard security measures to protect your data, including encryption, secure servers, and regular audits. However, no method of transmission over the Internet is 100% secure.
      </p>
      <h2 className="text-2xl font-bold text-[#1ABC9C] mt-8 mb-3">5. Your Rights & Choices</h2>
      <ul className="list-disc ml-6 space-y-1 text-[#34495E] mb-6">
        <li>You can access, update, or delete your account information at any time.</li>
        <li>You may opt out of marketing communications from InvoiceNest.</li>
        <li>Contact us at <a href="mailto:invoicenest@gmail.com" className="text-[#1ABC9C] underline hover:text-[#16A085]">invoicenest@gmail.com</a> for privacy-related requests.</li>
      </ul>
      <h2 className="text-2xl font-bold text-[#1ABC9C] mt-8 mb-3">6. Changes to This Policy</h2>
      <p className="mb-6 text-[#34495E]">
        We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website.
      </p>
      <h2 className="text-2xl font-bold text-[#1ABC9C] mt-8 mb-3">7. Contact Us</h2>
      <p className="mb-6 text-[#34495E]">
        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <a href="mailto:invoicenest@gmail.com" className="text-[#1ABC9C] underline hover:text-[#16A085]">invoicenest@gmail.com</a>.
      </p>
      <p className="mt-10 text-[#7F8C8D] text-sm text-center">&copy; {new Date().getFullYear()} InvoiceNest. All rights reserved.</p>
    </div>
  </>
);

export default Privacy; 