import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

const plans = {
  Basic: {
    name: 'Basic',
    monthly: 1499,
    yearly: 1199,
    features: [
      '30-35 Invoice Templates',
      'Advanced client management',
      'Priority email support',
      'Business analytics',
      'Recurring invoices',
      'Custom branding'
    ]
  },
  Advanced: {
    name: 'Advanced',
    monthly: 3499,
    yearly: 2799,
    features: [
      '90-95 Invoice Templates',
      'All analytics & reporting',
      'Premium support',
      'Client portal',
      'Custom branding',
      'API access',
      'Team collaboration'
    ]
  }
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const paymentMethods = [
  { label: 'Credit/Debit Card', value: 'card' },
  { label: 'UPI', value: 'upi' },
  { label: 'Netbanking', value: 'netbanking' },
  { label: 'Wallets', value: 'wallets' },
];

const formatCardNumber = (value) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  // Add dash after every 4 digits
  return digits.replace(/(.{4})/g, '$1-').replace(/-$/, '');
};

const formatExpiry = (value) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  if (digits.length === 0) return '';
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + '/' + digits.slice(2, 4);
};

const Payment = () => {
  const query = useQuery();
  const planKey = query.get('plan') === 'Advanced' ? 'Advanced' : 'Basic';
  const cycle = query.get('cycle') === 'yearly' ? 'yearly' : 'monthly';
  const plan = plans[planKey];
  const price = plan[cycle];
  const total = cycle === 'yearly' ? price * 12 : price;
  const [method, setMethod] = useState('card');
  // Card input states
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };
  const handleExpiryChange = (e) => {
    setExpiry(formatExpiry(e.target.value));
  };
  const handleCvcChange = (e) => {
    // Only allow numbers, max 4 digits
    setCvc(e.target.value.replace(/\D/g, '').slice(0, 4));
  };

  return (
    <div className="bg-gradient-to-b from-[#F8F9FA] via-[#E8F6F3] to-[#F8F9FA] min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-12 px-4 bg-gradient-to-br from-[#1ABC9C] to-[#16A085]">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-2 animate-fade-in">Complete Your Purchase</h2>
        <p className="text-xl text-[#E8F6F3] max-w-2xl mx-auto animate-fade-in">Securely upgrade to the {plan.name} plan and unlock premium features for your business.</p>
      </div>

      {/* Payment Card */}
      <div className="max-w-2xl mx-auto mt-12 bg-white rounded-2xl shadow-xl p-10 animate-fade-in">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">{plan.name} Plan <span className="ml-2 text-base font-medium text-[#1ABC9C]">({cycle.charAt(0).toUpperCase() + cycle.slice(1)})</span></h3>
          <div className="flex items-end mb-2">
            <span className="text-4xl font-extrabold text-[#1ABC9C]">
              ₹{price.toLocaleString()}
            </span>
            <span className="text-base font-medium text-[#7F8C8D] ml-2">{cycle === 'yearly' ? '/mo (billed yearly)' : '/mo'}</span>
          </div>
          {cycle === 'yearly' && (
            <span className="text-xs text-[#16A085] mb-2 block">Billed as ₹{total.toLocaleString()}/year (20% off)</span>
          )}
          <ul className="mt-4 space-y-2 text-left">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center text-[#2C3E50]">
                <CheckIcon className="h-5 w-5 text-[#1ABC9C] mr-2" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <form className="grid grid-cols-1 gap-y-6">
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Select Payment Method</label>
            <div className="flex gap-4 flex-wrap">
              {paymentMethods.map((pm) => (
                <button
                  type="button"
                  key={pm.value}
                  className={`px-4 py-2 rounded-md border text-sm font-semibold transition-all duration-200 focus:outline-none ${method === pm.value ? 'bg-[#1ABC9C] text-white border-[#1ABC9C]' : 'bg-white text-[#2C3E50] border-gray-300 hover:bg-[#E8F6F3]'}`}
                  onClick={() => setMethod(pm.value)}
                >
                  {pm.label}
                </button>
              ))}
            </div>
          </div>
          {method === 'card' && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#2C3E50]">Name on Card</label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Full Name"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-[#1ABC9C] focus:border-[#1ABC9C] border-gray-300 rounded-md"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="card" className="block text-sm font-medium text-[#2C3E50]">Card Number</label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="card"
                    id="card"
                    required
                    placeholder="1234-5678-9012-3456"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-[#1ABC9C] focus:border-[#1ABC9C] border-gray-300 rounded-md"
                    maxLength={19}
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-[#2C3E50]">Expiry (MM/YY)</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="expiry"
                      id="expiry"
                      required
                      placeholder="MM/YY"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-[#1ABC9C] focus:border-[#1ABC9C] border-gray-300 rounded-md"
                      maxLength={5}
                      value={expiry}
                      onChange={handleExpiryChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-[#2C3E50]">CVC</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      required
                      placeholder="CVC"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-[#1ABC9C] focus:border-[#1ABC9C] border-gray-300 rounded-md"
                      maxLength={4}
                      value={cvc}
                      onChange={handleCvcChange}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          {method === 'upi' && (
            <div>
              <label htmlFor="upi" className="block text-sm font-medium text-[#2C3E50]">UPI ID</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="upi"
                  id="upi"
                  required
                  placeholder="yourname@upi"
                  className="py-3 px-4 block w-full shadow-sm focus:ring-[#1ABC9C] focus:border-[#1ABC9C] border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}
          {method === 'netbanking' && (
            <div>
              <label className="block text-sm font-medium text-[#2C3E50]">Select Bank</label>
              <div className="mt-1">
                <select className="py-3 px-4 block w-full shadow-sm focus:ring-[#1ABC9C] focus:border-[#1ABC9C] border-gray-300 rounded-md" required>
                  <option value="">Choose your bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                  <option value="kotak">Kotak Mahindra Bank</option>
                  <option value="yes">Yes Bank</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}
          {method === 'wallets' && (
            <div>
              <label className="block text-sm font-medium text-[#2C3E50]">Select Wallet</label>
              <div className="mt-1">
                <select className="py-3 px-4 block w-full shadow-sm focus:ring-[#1ABC9C] focus:border-[#1ABC9C] border-gray-300 rounded-md" required>
                  <option value="">Choose your wallet</option>
                  <option value="paytm">Paytm</option>
                  <option value="phonepe">PhonePe</option>
                  <option value="googlepay">Google Pay</option>
                  <option value="amazonpay">Amazon Pay</option>
                  <option value="mobikwik">Mobikwik</option>
                  <option value="freecharge">Freecharge</option>
                </select>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] mt-4"
          >
            Pay ₹{cycle === 'yearly' ? total.toLocaleString() : price.toLocaleString()} {cycle === 'yearly' ? 'for 1 year' : 'for 1 month'}
          </button>
        </form>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#7F8C8D] text-sm">7-day money-back guarantee • Secure payments</div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <img src="https://img.icons8.com/color/48/000000/lock--v1.png" alt="Secure" className="h-6 w-6" />
            <img src="https://img.icons8.com/color/48/000000/verified-badge.png" alt="Verified" className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link to="/subscription" className="text-[#1ABC9C] hover:underline text-sm">Back to Plans</Link>
        </div>
      </div>
    </div>
  );
};

export default Payment; 