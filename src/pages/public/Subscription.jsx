import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/24/outline'

const plans = [
  {
    name: 'Free',
    description: 'Start for free and explore essential features',
    price: {
      monthly: 0,
      yearly: 0
    },
    templates: '10-12',
    features: [
      '10-12 Invoice Templates',
      'Basic client management',
      'Email support',
      'Basic analytics',
      'No credit card required'
    ],
    cta: 'Get Started',
    highlight: false
  },
  {
    name: 'Basic',
    description: 'For growing businesses that need more flexibility',
    price: {
      monthly: 1499,
      yearly: 1199 // per month, billed yearly
    },
    templates: '30-35',
    features: [
      '30-35 Invoice Templates',
      'Advanced client management',
      'Priority email support',
      'Business analytics',
      'Recurring invoices',
      'Custom branding'
    ],
    cta: 'Upgrade',
    highlight: false
  },
  {
    name: 'Advanced',
    description: 'Unlock all features for established businesses',
    price: {
      monthly: 3499,
      yearly: 2799 // per month, billed yearly
    },
    templates: '90-95',
    features: [
      '90-95 Invoice Templates',
      'All analytics & reporting',
      'Premium support',
      'Client portal',
      'Custom branding',
      'API access',
      'Team collaboration'
    ],
    cta: 'Go Advanced',
    highlight: true
  }
]

const featureList = [
  { label: 'Invoice Templates', values: ['10-12', '30-35', '90-95'] },
  { label: 'Client Management', values: ['Basic', 'Advanced', 'Advanced'] },
  { label: 'Analytics & Reporting', values: ['Basic', 'Business', 'All'] },
  { label: 'Support', values: ['Email', 'Priority Email', 'Premium'] },
  { label: 'Custom Branding', values: ['-', 'Yes', 'Yes'] },
  { label: 'Client Portal', values: ['-', '-', 'Yes'] },
  { label: 'API Access', values: ['-', '-', 'Yes'] },
  { label: 'Team Collaboration', values: ['-', '-', 'Yes'] },
]

const Subscription = () => {
  const [billingCycle, setBillingCycle] = useState('monthly')

  return (
    <div className="bg-gradient-to-b from-[#F8F9FA] via-[#E8F6F3] to-[#F8F9FA] min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-16 px-4 bg-gradient-to-br from-[#1ABC9C] to-[#16A085]">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-4 animate-fade-in">Choose Your Plan</h2>
        <p className="text-xl text-[#E8F6F3] max-w-2xl mx-auto animate-fade-in">Flexible plans for every business. Start free, upgrade anytime.</p>
      </div>

      {/* Billing Toggle */}
      <div className="mt-12 flex justify-center">
        <div className="relative bg-white rounded-lg p-0.5 flex">
          <button
            type="button"
            className={`$ {
              billingCycle === 'monthly'
                ? 'bg-[#1ABC9C] text-white'
                : 'text-[#2C3E50]'
            } relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10 sm:w-auto sm:px-8`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly billing
          </button>
          <button
            type="button"
            className={`$ {
              billingCycle === 'yearly'
                ? 'bg-[#1ABC9C] text-white'
                : 'text-[#2C3E50]'
            } relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10 sm:w-auto sm:px-8`}
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly billing
            <span className="absolute -top-4 -right-4 bg-[#1ABC9C] text-white text-xs px-2 py-1 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={`rounded-2xl shadow-xl border-2 ${plan.highlight ? 'border-[#1ABC9C] scale-105 bg-gradient-to-br from-[#E8F6F3] to-[#F8F9FA]' : 'border-gray-200 bg-white'} p-8 flex flex-col items-center relative animate-fade-in`}
          >
            {plan.highlight && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1ABC9C] text-white text-xs px-4 py-1 rounded-full font-semibold shadow-lg">Most Popular</span>
            )}
            <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">{plan.name}</h3>
            <p className="text-[#7F8C8D] mb-6">{plan.description}</p>
            <div className="flex items-end mb-2">
              <span className="text-4xl font-extrabold text-[#1ABC9C]">
                {plan.price[billingCycle] === 0 ? '₹0' : `₹${plan.price[billingCycle].toLocaleString()}`}
              </span>
              {plan.price[billingCycle] !== 0 && (
                <span className="text-base font-medium text-[#7F8C8D] ml-2">/mo</span>
              )}
            </div>
            {billingCycle === 'yearly' && plan.price[billingCycle] !== 0 && (
              <span className="text-xs text-[#16A085] mb-2">Billed as ₹{(plan.price[billingCycle]*12).toLocaleString()}/year</span>
            )}
            {plan.price[billingCycle] === 0 ? (
              <Link
                to="/login"
                className={`mt-6 w-full inline-block rounded-md py-3 text-sm font-semibold text-center transition-all duration-300 shadow-lg bg-white text-[#1ABC9C] border border-[#1ABC9C] hover:bg-[#E8F6F3]`}
              >
                {plan.cta}
              </Link>
            ) : (
              <Link
                to={`/payment?plan=${plan.name}&cycle=${billingCycle}`}
                className={`mt-6 w-full inline-block rounded-md py-3 text-sm font-semibold text-center transition-all duration-300 shadow-lg ${plan.highlight ? 'bg-[#1ABC9C] text-white hover:bg-[#16A085]' : 'bg-white text-[#1ABC9C] border border-[#1ABC9C] hover:bg-[#E8F6F3]'}`}
              >
                {plan.cta}
              </Link>
            )}
            <ul className="mt-8 space-y-3 w-full text-left">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-[#2C3E50]">
                  <CheckIcon className="h-5 w-5 text-[#1ABC9C] mr-2" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="mt-20 max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-x-auto animate-fade-in">
        <table className="min-w-full text-center">
          <thead>
            <tr>
              <th className="py-4 px-6 text-lg font-bold text-[#2C3E50]">Features</th>
              <th className="py-4 px-6 text-lg font-bold text-[#1ABC9C]">Free</th>
              <th className="py-4 px-6 text-lg font-bold text-[#1ABC9C]">Basic</th>
              <th className="py-4 px-6 text-lg font-bold text-[#1ABC9C]">Advanced</th>
            </tr>
          </thead>
          <tbody>
            {featureList.map((row, idx) => (
              <tr key={row.label} className={idx % 2 === 0 ? 'bg-[#F8F9FA]' : ''}>
                <td className="py-3 px-6 text-[#2C3E50] font-medium text-left">{row.label}</td>
                {row.values.map((val, i) => (
                  <td key={i} className="py-3 px-6 text-[#7F8C8D]">{val === 'Yes' ? <CheckIcon className="h-5 w-5 inline text-[#1ABC9C]" /> : val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Trust & FAQ Section */}
      <div className="mt-20 max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-[#E8F6F3] to-[#F8F9FA] rounded-2xl shadow-lg p-8 mb-12">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-[#1ABC9C] mb-2">Trusted by 5,000+ businesses</div>
            <div className="text-[#7F8C8D]">7-day money-back guarantee • Secure payments</div>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <img src="https://img.icons8.com/color/48/000000/lock--v1.png" alt="Secure" className="h-8 w-8" />
            <img src="https://img.icons8.com/color/48/000000/verified-badge.png" alt="Verified" className="h-8 w-8" />
          </div>
        </div>
        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-[#1ABC9C]">Can I try InvoiceNest for free?</h4>
              <p className="text-[#7F8C8D]">Yes! Our Free plan lets you explore all essential features with no credit card required.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#1ABC9C]">How does the yearly billing discount work?</h4>
              <p className="text-[#7F8C8D]">When you choose yearly billing, you get 20% off the monthly price, billed as a single annual payment.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#1ABC9C]">Can I upgrade, downgrade, or cancel anytime?</h4>
              <p className="text-[#7F8C8D]">Absolutely! You can change your plan or cancel at any time from your dashboard. No hidden fees.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#1ABC9C]">Is my payment information secure?</h4>
              <p className="text-[#7F8C8D]">Yes, all payments are processed securely with industry-standard encryption and compliance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscription 