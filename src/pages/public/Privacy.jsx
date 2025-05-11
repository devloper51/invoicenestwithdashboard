import React from 'react';

const Privacy = () => (
  <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] rounded-lg shadow-md mt-10">
    <h1 className="text-3xl font-extrabold text-[#1ABC9C] mb-6">Privacy Policy</h1>
    <p className="mb-4 text-[#2C3E50]">Last updated: June 2024</p>
    <p className="mb-4 text-[#34495E]">
      At <span className="font-semibold">InvoiceNest</span>, we are committed to protecting your privacy and ensuring the security of your personal and business information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our invoice management platform.
    </p>
    <h2 className="text-xl font-bold text-[#1ABC9C] mt-8 mb-2">1. Information We Collect</h2>
    <ul className="list-disc ml-6 text-[#34495E] mb-4">
      <li><span className="font-semibold">Account Information:</span> Name, email address, company name, and contact details.</li>
      <li><span className="font-semibold">Invoice Data:</span> Client details, invoice items, payment records, and related business data.</li>
      <li><span className="font-semibold">Usage Data:</span> Log data, device information, and analytics about how you use InvoiceNest.</li>
    </ul>
    <h2 className="text-xl font-bold text-[#1ABC9C] mt-8 mb-2">2. How We Use Your Information</h2>
    <ul className="list-disc ml-6 text-[#34495E] mb-4">
      <li>To provide, operate, and maintain the InvoiceNest platform.</li>
      <li>To process and manage invoices, payments, and client records.</li>
      <li>To communicate with you about your account, updates, and support.</li>
      <li>To improve our services and develop new features.</li>
      <li>To comply with legal obligations and protect our users.</li>
    </ul>
    <h2 className="text-xl font-bold text-[#1ABC9C] mt-8 mb-2">3. Data Sharing & Disclosure</h2>
    <ul className="list-disc ml-6 text-[#34495E] mb-4">
      <li>We do <span className="font-semibold">not</span> sell your personal or business data to third parties.</li>
      <li>We may share data with trusted service providers who help us operate InvoiceNest (e.g., cloud hosting, analytics).</li>
      <li>We may disclose information if required by law or to protect the rights and safety of InvoiceNest and its users.</li>
    </ul>
    <h2 className="text-xl font-bold text-[#1ABC9C] mt-8 mb-2">4. Data Security</h2>
    <p className="mb-4 text-[#34495E]">
      We use industry-standard security measures to protect your data, including encryption, secure servers, and regular audits. However, no method of transmission over the Internet is 100% secure.
    </p>
    <h2 className="text-xl font-bold text-[#1ABC9C] mt-8 mb-2">5. Your Rights & Choices</h2>
    <ul className="list-disc ml-6 text-[#34495E] mb-4">
      <li>You can access, update, or delete your account information at any time.</li>
      <li>You may opt out of marketing communications from InvoiceNest.</li>
      <li>Contact us at <a href="mailto:invoicenest@gmail.com" className="text-[#1ABC9C] underline">invoicenest@gmail.com</a> for privacy-related requests.</li>
    </ul>
    <h2 className="text-xl font-bold text-[#1ABC9C] mt-8 mb-2">6. Changes to This Policy</h2>
    <p className="mb-4 text-[#34495E]">
      We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website.
    </p>
    <h2 className="text-xl font-bold text-[#1ABC9C] mt-8 mb-2">7. Contact Us</h2>
    <p className="mb-4 text-[#34495E]">
      If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <a href="mailto:invoicenest@gmail.com" className="text-[#1ABC9C] underline">invoicenest@gmail.com</a>.
    </p>
    <p className="mt-8 text-[#7F8C8D] text-sm">&copy; {new Date().getFullYear()} InvoiceNest. All rights reserved.</p>
  </div>
);

export default Privacy; 