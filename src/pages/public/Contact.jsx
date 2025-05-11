import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

// Sample list of disposable domains (extend as needed)
const disposableDomains = [
  'mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com', 'yopmail.com', 'trashmail.com', 'getnada.com', 'dispostable.com'
]

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isDisposable = (email) => {
  const domain = email.split('@')[1]?.toLowerCase();
  return disposableDomains.some(d => domain === d);
}

const contactInfo = [
  {
    name: 'Email',
    value: 'invoicenest@gmail.com',
    icon: EnvelopeIcon,
  },
  {
    name: 'Phone',
    value: '+1 (555) 123-4567',
    icon: PhoneIcon,
  },
  {
    name: 'Address',
    value: '123 Business Street, Suite 100, New York, NY 10001',
    icon: MapPinIcon,
  },
]

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-[#F8F9FA] via-[#E8F6F3] to-[#F8F9FA] min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[260px] flex items-center justify-center" style={{background: 'linear-gradient(120deg, #1ABC9C 60%, #E8F6F3 100%)'}}>
        <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-[#1ABC9C]/80 via-[#E8F6F3]/60 to-[#16A085]/80 opacity-80 z-0" />
        <div className="relative z-10 text-center py-16 px-4 w-full">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl drop-shadow-lg animate-fade-in">Contact Us</h1>
          <p className="mt-4 text-xl text-[#E8F6F3] max-w-2xl mx-auto animate-fade-in">We'd love to hear from you! Reach out with questions, feedback, or partnership opportunities and our team will respond promptly.</p>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details Card */}
          <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col justify-center animate-fade-in">
            <h2 className="text-2xl font-extrabold text-[#2C3E50] mb-4">Get in touch</h2>
            <p className="text-lg text-[#7F8C8D] mb-8">Have questions about our services? We're here to help. Send us a message and we'll get back to you as soon as possible.</p>
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div className="flex-shrink-0">
                    <item.icon className="h-6 w-6 text-[#1ABC9C]" aria-hidden="true" />
                  </div>
                  <div className="ml-4 text-base text-[#7F8C8D]">
                    <p className="font-medium text-[#2C3E50]">{item.name}</p>
                    <p className="mt-1">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Contact Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-10 animate-fade-in">
            <form
              action="https://formspree.io/f/meogzwpe"
              method="POST"
              className="grid grid-cols-1 gap-y-6"
            >
              <input
                type="text"
                name="name"
                required
                placeholder="Name"
                className="py-3 px-4 block w-full shadow-sm focus:ring-[#1ABC9C] focus:border-[#1ABC9C] border-gray-300 rounded-md"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="py-3 px-4 block w-full shadow-sm focus:ring-[#1ABC9C] focus:border-[#1ABC9C] border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="subject"
                required
                placeholder="Subject"
                className="py-3 px-4 block w-full shadow-sm focus:ring-[#1ABC9C] focus:border-[#1ABC9C] border-gray-300 rounded-md"
              />
              <textarea
                name="message"
                rows={4}
                required
                placeholder="Message"
                className="py-3 px-4 block w-full shadow-sm focus:ring-[#1ABC9C] focus:border-[#1ABC9C] border-gray-300 rounded-md"
              />
              <input type="hidden" name="_gotcha" style={{ display: 'none' }} />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact 