import { Link } from 'react-router-dom'
import { 
  ChartBarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  HeartIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const stats = [
  { label: 'Active Users', value: '50,000+' },
  { label: 'Invoices Generated', value: '1M+' },
  { label: 'Countries Served', value: '150+' },
  { label: 'Customer Satisfaction', value: '99%' }
]

const values = [
  {
    icon: HeartIcon,
    title: "Customer First",
    description: "We put our customers at the heart of everything we do, ensuring their success is our top priority."
  },
  {
    icon: SparklesIcon,
    title: "Innovation",
    description: "We constantly push boundaries to bring you the most advanced invoicing solutions."
  },
  {
    icon: GlobeAltIcon,
    title: "Global Reach",
    description: "Our platform serves businesses worldwide with localized solutions and support."
  }
]

const differentiators = [
  {
    icon: ChartBarIcon,
    title: 'Data-Driven Innovation',
    desc: 'We leverage analytics and feedback to constantly improve our platform, ensuring you always have the best invoicing tools.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Unmatched Security',
    desc: 'Your data is protected with enterprise-grade encryption and regular security audits.'
  },
  {
    icon: UserGroupIcon,
    title: 'Customer-Centric Support',
    desc: 'Our support team is available 24/7 to help you succeed, no matter where you are.'
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Reach',
    desc: 'InvoiceNest empowers businesses in 150+ countries with localized solutions and support.'
  }
];

const milestones = [
  { year: '2019', event: 'InvoiceNest founded with a vision to simplify invoicing.' },
  { year: '2020', event: 'Reached 10,000 users and launched mobile support.' },
  { year: '2021', event: 'Expanded to 100+ countries and introduced analytics dashboard.' },
  { year: '2023', event: 'Surpassed 1 million invoices generated and 99% customer satisfaction.' }
];

const impactStats = [
  { label: 'Businesses Empowered', value: '50,000+' },
  { label: 'Invoices Generated', value: '1,000,000+' },
  { label: 'Countries Served', value: '150+' },
  { label: 'Customer Satisfaction', value: '99%' }
];

const About = () => {
  return (
    <div className="bg-gradient-to-b from-[#F8F9FA] via-[#E8F6F3] to-[#F8F9FA]">
      {/* Company Introduction */}
      <div className="relative overflow-hidden min-h-[320px] flex items-center" style={{background: 'linear-gradient(120deg, #1ABC9C 60%, #E8F6F3 100%)'}}>
        <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-[#1ABC9C]/80 via-[#E8F6F3]/60 to-[#16A085]/80 opacity-80 z-0" />
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 w-full z-10 relative text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl animate-fade-in">
            About InvoiceNest
          </h1>
          <p className="mt-6 text-xl text-[#E8F6F3] max-w-3xl mx-auto">
            InvoiceNest empowers over 50,000 businesses in 150+ countries to get paid faster and manage their finances with ease. Our platform has processed more than 1 million invoices, helping companies of all sizes save time, improve cash flow, and deliver a seamless experience to their clients. With a 99% customer satisfaction rate, InvoiceNest is trusted by modern businesses for its simplicity, security, and innovation.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50,000+</div>
              <div className="text-[#E8F6F3] text-sm">Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1M+</div>
              <div className="text-[#E8F6F3] text-sm">Invoices Processed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">150+</div>
              <div className="text-[#E8F6F3] text-sm">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">99%</div>
              <div className="text-[#E8F6F3] text-sm">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* What Sets Us Apart */}
      <div className="py-24 bg-gradient-to-br from-[#F0F9F7] via-[#E8F6F3] to-[#E3F4F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#2C3E50] sm:text-5xl animate-fade-in">
              What Sets <span className="text-[#1ABC9C]">Us Apart</span>
            </h2>
            <p className="mt-4 text-xl text-[#7F8C8D] max-w-3xl mx-auto">
              Discover the values and features that make InvoiceNest the preferred choice for modern businesses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map((item, idx) => (
              <div key={item.title} className="group relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#1ABC9C] to-[#16A085] opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />
                <div className="relative">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-[#1ABC9C] to-[#16A085] mb-6">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-3 group-hover:text-[#1ABC9C] transition-colors duration-300">{item.title}</h3>
                  <p className="text-[#7F8C8D] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Impact / Trusted By Section */}
      <div className="py-16 bg-gradient-to-br from-[#F0F9F7] via-[#E8F6F3] to-[#E3F4F1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#2C3E50] sm:text-4xl animate-fade-in">
              Our <span className="text-[#1ABC9C]">Impact</span>
            </h2>
            <p className="mt-4 text-lg text-[#7F8C8D] max-w-2xl mx-auto">
              Trusted by thousands of businesses around the globe.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, idx) => (
              <div key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-3xl font-bold text-[#1ABC9C] mb-2">{stat.value}</div>
                <div className="text-[#7F8C8D]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1ABC9C] to-[#16A085] py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1ABC9C]/80 via-[#E8F6F3]/60 to-[#16A085]/80 opacity-80" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCAyYy0zLjMxNCAwLTYgMi42ODYtNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-10" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-6 animate-fade-in">
            Ready to Experience InvoiceNest?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Start your free trial today or contact our team to learn more about how InvoiceNest can help your business thrive.
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
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About 