import { Link } from 'react-router-dom'
import { useState } from 'react'
import { 
  DocumentTextIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ClockIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

const testimonials = [
  {
    text: "InvoiceNest has revolutionized our billing process. The automation features alone have saved us countless hours, and our clients love the professional look of our invoices.",
    author: "Sarah Johnson",
    role: "CEO, TechStart Solutions",
    rating: 5
  },
  {
    text: "The analytics dashboard gives us insights we never had before. We can now track our cash flow and client payment patterns in real-time. Game-changing!",
    author: "Michael Chen",
    role: "Finance Director, GrowthLabs",
    rating: 5
  },
  {
    text: "As a freelancer, I needed something simple yet powerful. InvoiceNest delivers exactly that. The client portal feature has made it so much easier to manage my projects.",
    author: "Emma Rodriguez",
    role: "Independent Consultant",
    rating: 5
  }
]

const whyChoose = [
  {
    icon: ShieldCheckIcon,
    title: "Enterprise-Grade Security",
    desc: "Your data is protected with bank-level encryption and regular security audits.",
    color: "from-[#1ABC9C] to-[#16A085]"
  },
  {
    icon: ClockIcon,
    title: "Save 10+ Hours Monthly",
    desc: "Automate invoicing, reminders, and reporting to focus on growing your business.",
    color: "from-[#1ABC9C] to-[#16A085]"
  },
  {
    icon: ChartBarIcon,
    title: "Smart Analytics",
    desc: "Get real-time insights and forecasts to make data-driven business decisions.",
    color: "from-[#1ABC9C] to-[#16A085]"
  },
  {
    icon: DocumentTextIcon,
    title: "Professional Templates",
    desc: "Choose from 50+ customizable templates that match your brand identity.",
    color: "from-[#1ABC9C] to-[#16A085]"
  },
  {
    icon: UserGroupIcon,
    title: "Client Portal",
    desc: "Give your clients a seamless experience with their own branded portal.",
    color: "from-[#1ABC9C] to-[#16A085]"
  },
  {
    icon: CurrencyDollarIcon,
    title: "Multiple Payment Options",
    desc: "Accept payments via credit cards, bank transfers, and digital wallets.",
    color: "from-[#1ABC9C] to-[#16A085]"
  }
]

const features = [
  {
    name: 'Easy Invoice Generation',
    description: 'Create professional invoices in minutes with our intuitive interface. Choose from 50+ templates and customize to match your brand.',
    icon: DocumentTextIcon,
  },
  {
    name: 'Client Management',
    description: 'Keep track of all your clients and their payment history in one place. Send automated reminders and maintain clear communication.',
    icon: UserGroupIcon,
  },
  {
    name: 'Payment Tracking',
    description: 'Monitor payments in real-time, set up recurring invoices, and get instant notifications when payments are received.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Business Analytics',
    description: 'Get detailed insights into your business performance with customizable reports and forecasting tools.',
    icon: ChartBarIcon,
  },
]

const Home = () => {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <div className="bg-gradient-to-b from-[#F8F9FA] via-[#E8F6F3] to-[#F8F9FA]">
      {/* Hero Section with animated gradient */}
      <div className="relative overflow-hidden min-h-[480px] flex items-center" style={{background: 'linear-gradient(120deg, #1ABC9C 60%, #E8F6F3 100%)'}}>
        <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-[#1ABC9C]/80 via-[#E8F6F3]/60 to-[#16A085]/80 opacity-80 z-0" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between py-16 px-4 sm:px-6 lg:px-8 w-full z-10 relative">
          {/* Left: Text */}
          <div className="w-full lg:w-1/2 z-10 text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl drop-shadow-lg">
              <span className="block">Invoice Management</span>
              <span className="block text-[#E8F6F3]">Made Simple</span>
            </h1>
            <p className="mt-4 text-lg text-[#E8F6F3] font-semibold">
              Smart, Fast & Hassle-Free Invoicing for Modern Businesses
            </p>
            <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl">
              Streamline your invoicing process with our powerful platform. Create, manage, and track invoices effortlessly.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row sm:justify-start gap-3">
              <Link
                to="/signup"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#1ABC9C] bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-105 md:py-4 md:text-lg md:px-10 animate-bounce-slow shadow-lg"
              >
                Get started
              </Link>
              <button
                onClick={() => setShowDemo(true)}
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#16A085] hover:bg-[#138D75] transition-all duration-300 hover:scale-105 md:py-4 md:text-lg md:px-10 animate-pulse shadow-lg"
              >
                Watch Live Demo
              </button>
            </div>
            <div className="mt-6">
              <span className="inline-block bg-white/80 text-[#1ABC9C] font-semibold px-4 py-2 rounded-full shadow-md animate-fade-in">
                Trusted by 5,000+ businesses
              </span>
            </div>
          </div>
          {/* Right: SVG Illustration with glow */}
          <div className="w-full lg:w-1/2 flex justify-center mt-12 lg:mt-0 relative">
            <div className="absolute -inset-4 blur-2xl opacity-40 bg-[#1ABC9C] rounded-full z-0" />
            <svg viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-lg w-full h-auto z-10 relative drop-shadow-2xl">
              {/* Left Invoice (Purple) */}
              <g style={{ filter: 'drop-shadow(0 4px 16px rgba(142,68,173,0.10))' }}>
                <rect x="30" y="50" width="140" height="210" rx="14" fill="#fff" stroke="#8e44ad" strokeWidth="4"/>
                <text x="100" y="80" textAnchor="middle" fill="#8e44ad" fontSize="18" fontWeight="bold" fontFamily="Arial">INVOICE</text>
                <rect x="50" y="100" width="90" height="10" rx="4" fill="#E8F6F3"/>
                <rect x="50" y="120" width="70" height="10" rx="4" fill="#E8F6F3"/>
                <rect x="50" y="140" width="100" height="10" rx="4" fill="#E8F6F3"/>
                <rect x="50" y="170" width="80" height="8" rx="4" fill="#8e44ad" fillOpacity="0.15"/>
                <rect x="50" y="190" width="60" height="8" rx="4" fill="#8e44ad" fillOpacity="0.15"/>
                <rect x="50" y="210" width="90" height="8" rx="4" fill="#8e44ad" fillOpacity="0.15"/>
                <rect x="50" y="230" width="60" height="12" rx="5" fill="#8e44ad" fillOpacity="0.25"/>
              </g>
              {/* Center Invoice (Teal, front) */}
              <g style={{ filter: 'drop-shadow(0 8px 24px rgba(26,188,156,0.13))' }}>
                <rect x="120" y="30" width="170" height="250" rx="16" fill="#fff" stroke="#1ABC9C" strokeWidth="5"/>
                <text x="205" y="65" textAnchor="middle" fill="#1ABC9C" fontSize="22" fontWeight="bold" fontFamily="Arial">INVOICE</text>
                <rect x="145" y="90" width="110" height="12" rx="5" fill="#E8F6F3"/>
                <rect x="145" y="110" width="90" height="12" rx="5" fill="#E8F6F3"/>
                <rect x="145" y="130" width="120" height="12" rx="5" fill="#E8F6F3"/>
                <rect x="145" y="160" width="100" height="10" rx="5" fill="#1ABC9C" fillOpacity="0.15"/>
                <rect x="145" y="180" width="120" height="10" rx="5" fill="#1ABC9C" fillOpacity="0.15"/>
                <rect x="145" y="200" width="80" height="10" rx="5" fill="#1ABC9C" fillOpacity="0.15"/>
                <rect x="145" y="230" width="130" height="16" rx="6" fill="#1ABC9C" fillOpacity="0.25"/>
              </g>
              {/* Right Invoice (Blue) */}
              <g style={{ filter: 'drop-shadow(0 4px 16px rgba(41,128,185,0.10))' }}>
                <rect x="260" y="60" width="130" height="200" rx="14" fill="#fff" stroke="#2980b9" strokeWidth="4"/>
                <text x="325" y="90" textAnchor="middle" fill="#2980b9" fontSize="18" fontWeight="bold" fontFamily="Arial">INVOICE</text>
                <rect x="280" y="110" width="80" height="10" rx="4" fill="#E8F6F3"/>
                <rect x="280" y="130" width="100" height="10" rx="4" fill="#E8F6F3"/>
                <rect x="280" y="150" width="60" height="10" rx="4" fill="#E8F6F3"/>
                <rect x="280" y="180" width="90" height="8" rx="4" fill="#2980b9" fillOpacity="0.15"/>
                <rect x="280" y="200" width="60" height="8" rx="4" fill="#2980b9" fillOpacity="0.15"/>
                <rect x="280" y="220" width="80" height="8" rx="4" fill="#2980b9" fillOpacity="0.15"/>
                <rect x="280" y="240" width="60" height="12" rx="5" fill="#2980b9" fillOpacity="0.25"/>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Live Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-white to-[#F8F9FA] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#1ABC9C] mb-4">See InvoiceNest in Action</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#2C3E50]">Quick Demo</h3>
                  <div className="bg-[#F8F9FA] p-4 rounded-lg">
                    <p className="text-[#7F8C8D]">Watch how easy it is to:</p>
                    <ul className="list-disc list-inside mt-2 space-y-2 text-[#2C3E50]">
                      <li>Create a professional invoice in under 2 minutes</li>
                      <li>Add client details and payment terms</li>
                      <li>Track payment status and send reminders</li>
                      <li>Generate reports and analytics</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#2C3E50]">Key Features</h3>
                  <div className="bg-[#F8F9FA] p-4 rounded-lg">
                    <ul className="space-y-2 text-[#2C3E50]">
                      <li>✨ Beautiful, professional templates</li>
                      <li>📱 Mobile-friendly design</li>
                      <li>🔒 Secure payment processing</li>
                      <li>📊 Real-time analytics</li>
                      <li>📧 Automated reminders</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link
                  to="/signup"
                  className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#1ABC9C] hover:bg-[#16A085] transition-all duration-300 hover:scale-105"
                >
                  Start Your Free Trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-br from-[#E8F6F3] via-white to-[#F0F9F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#2C3E50] sm:text-5xl animate-fade-in">
              Everything You <span className="text-[#1ABC9C]">Need</span>
            </h2>
            <p className="mt-4 text-xl text-[#7F8C8D] max-w-3xl mx-auto">
              Powerful features designed to streamline your invoicing process and grow your business
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <div
                key={feature.name}
                className="group relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1ABC9C] to-[#16A085] opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />
                <div className="relative">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-[#1ABC9C] to-[#16A085] mb-6">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-3 group-hover:text-[#1ABC9C] transition-colors duration-300">
                    {feature.name}
                  </h3>
                  <p className="text-[#7F8C8D] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-4 bg-white/80 rounded-full px-6 py-3 shadow-lg">
              <span className="text-[#1ABC9C] font-semibold">📱 Available on all devices</span>
              <span className="text-gray-300">|</span>
              <span className="text-[#1ABC9C] font-semibold">🔄 Real-time sync</span>
              <span className="text-gray-300">|</span>
              <span className="text-[#1ABC9C] font-semibold">🔒 Secure & reliable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose InvoiceNest Section */}
      <div className="py-24 bg-gradient-to-br from-[#F0F9F7] via-[#E8F6F3] to-[#E3F4F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#2C3E50] sm:text-5xl animate-fade-in">
              Why Choose <span className="text-[#1ABC9C]">InvoiceNest</span>?
            </h2>
            <p className="mt-4 text-xl text-[#7F8C8D] max-w-3xl mx-auto">
              Join thousands of businesses that trust InvoiceNest for their invoicing needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoose.map((item, idx) => (
              <div 
                key={item.title} 
                className="group relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} mb-6`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-3 group-hover:text-[#1ABC9C] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[#7F8C8D] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-4 bg-white/80 rounded-full px-6 py-3 shadow-lg">
              <span className="text-[#1ABC9C] font-semibold">✨ Trusted by 5,000+ businesses</span>
              <span className="text-gray-300">|</span>
              <span className="text-[#1ABC9C] font-semibold">⭐ 4.9/5 Customer Rating</span>
              <span className="text-gray-300">|</span>
              <span className="text-[#1ABC9C] font-semibold">🚀 99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gradient-to-br from-[#E3F4F1] via-[#E8F6F3] to-[#F0F9F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#2C3E50] sm:text-5xl animate-fade-in">
              What Our <span className="text-[#1ABC9C]">Users Say</span>
            </h2>
            <p className="mt-4 text-xl text-[#7F8C8D] max-w-3xl mx-auto">
              Join thousands of satisfied businesses that have transformed their invoicing process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className="group relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1ABC9C] to-[#16A085] opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />
                <div className="relative">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-[#1ABC9C]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#2C3E50] italic mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-[#1ABC9C]">{testimonial.author}</p>
                    <p className="text-[#7F8C8D] text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-[#1ABC9C] hover:bg-[#16A085] transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Join Our Happy Customers
            </Link>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1ABC9C] to-[#16A085] py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1ABC9C]/80 via-[#E8F6F3]/60 to-[#16A085]/80 opacity-80" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCAyYy0zLjMxNCAwLTYgMi42ODYtNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-10" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-6 animate-fade-in">
            Ready to Get Paid Faster?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of businesses that trust InvoiceNest for their invoicing needs. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-[#1ABC9C] bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Start Free Trial
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              Contact Sales
            </Link>
          </div>
          <div className="mt-8 text-white/80 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 