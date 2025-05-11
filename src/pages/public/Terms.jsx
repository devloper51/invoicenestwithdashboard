import React from 'react';

const Terms = () => (
  <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] rounded-lg shadow-md mt-10">
    <h1 className="text-3xl font-extrabold text-[#1ABC9C] mb-6">Terms of Service</h1>
    <p className="mb-4 text-[#2C3E50]">Last updated: June 2024</p>
    <p className="mb-4 text-[#34495E]">
      Welcome to <span className="font-semibold">InvoiceNest</span>. These Terms of Service ("Terms") govern your use of our invoice management platform and related services. By accessing or using InvoiceNest, you agree to be bound by these Terms.
    </p>
    <h2 className="text-xl font-bold text-[#1ABC9C] mt-8 mb-2">1. Use of Service</h2>
    <ul className="list-disc ml-6 text-[#34495E] mb-4">
      <li>You must be at least 18 years old and have the legal capacity to enter into a contract.</li>
      <li>You agree to provide accurate and complete information when creating an account.</li>
      <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
    </ul>
    <h2 className="text-xl font-bold text-[#1ABC9C] mt-8 mb-2">2. User Content</h2>
    <ul className="list-disc ml-6 text-[#34495E] mb-4">
      <li>You retain ownership of all invoices, client data, and content you create on InvoiceNest.</li>
      <li>You grant InvoiceNest a license to use, store, and process your data solely to provide and improve our services.</li>
      <li>You are responsible for the legality and accuracy of your content.</li>
    </ul>
    <h2 className="text-xl font-bold text-[#1ABC9C] mt-8 mb-2">3. Prohibited Activities</h2>
    <ul className="list-disc ml-6 text-[#34495E] mb-4">
      <li>Do not use InvoiceNest for any unlawful, fraudulent, or harmful activities.</li>
      <li>Do not attempt to gain unauthorized access to our systems or data.</li>
      <li>Do not interfere with the operation or security of InvoiceNest.</li>
    </ul>
    <h2 className="text-xl font-bold text-[#1ABC9C] mt-8 mb-2">4. Payment & Subscription</h2>
    <ul className="list-disc ml-6 text-[#34495E] mb-4">
      <li>Some features of InvoiceNest may require a paid subscription.</li>
      <li>All fees are billed in advance and are non-refundable except as required by law.</li>
      <li>InvoiceNest reserves the right to change pricing or features with notice.</li>
    </ul>
    <h2 className="text-xl font-bold text-[#1ABC9C] mt-8 mb-2">5. Termination</h2>
    <ul className="list-disc ml-6 text-[#34495E] mb-4">
      <li>We may suspend or terminate your access to InvoiceNest for violation of these Terms or applicable laws.</li>
      <li>You may cancel your account at any time from your dashboard or by contacting support.</li>
    </ul>
    <h2 className="text-xl font-bold text-[#1ABC9C] mt-8 mb-2">6. Disclaimer & Limitation of Liability</h2>
    <p className="mb-4 text-[#34495E]">
      InvoiceNest is provided "as is" and "as available" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.
    </p>
    <h2 className="text-xl font-bold text-[#1ABC9C] mt-8 mb-2">7. Changes to Terms</h2>
    <p className="mb-4 text-[#34495E]">
      We may update these Terms from time to time. Continued use of InvoiceNest after changes constitutes acceptance of the new Terms.
    </p>
    <h2 className="text-xl font-bold text-[#1ABC9C] mt-8 mb-2">8. Contact Us</h2>
    <p className="mb-4 text-[#34495E]">
      If you have any questions about these Terms, please contact us at <a href="mailto:invoicenest@gmail.com" className="text-[#1ABC9C] underline">invoicenest@gmail.com</a>.
    </p>
    <p className="mt-8 text-[#7F8C8D] text-sm">&copy; {new Date().getFullYear()} InvoiceNest. All rights reserved.</p>
  </div>
);

export default Terms; 