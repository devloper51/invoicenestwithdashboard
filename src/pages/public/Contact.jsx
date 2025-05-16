import { useState } from 'react';
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast';

// Sample list of disposable domains (extend as needed)
const disposableDomains = [
  'mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com', 'yopmail.com', 'trashmail.com', 'getnada.com', 'dispostable.com'
]

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isDisposable = (email) => {
  if (!email) return false;
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    } else if (isDisposable(formData.email)) {
      newErrors.email = 'Disposable email addresses are not allowed.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please correct the errors in the form.');
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const formSpreeEndpoint = 'https://formspree.io/f/meogzwpe'; // Your Formspree endpoint

    try {
      const response = await fetch(formSpreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.errors?.map(err => err.message).join(', ') || 'Failed to send message. Please try again.';
        toast.error(errorMessage);
        if (errorData.errors) {
            const formErrors = {};
            errorData.errors.forEach(err => {
                if(err.field) {
                    formErrors[err.field.toLowerCase()] = err.message;
                } else {
                     // Generic error not tied to a field
                }
            });
            setErrors(formErrors);
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    }
    setIsSubmitting(false);
  };

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
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`py-3 px-4 block w-full shadow-sm focus:ring-[#1ABC9C] focus:border-[#1ABC9C] border-gray-300 rounded-md ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`py-3 px-4 block w-full shadow-sm focus:ring-[#1ABC9C] focus:border-[#1ABC9C] border-gray-300 rounded-md ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`py-3 px-4 block w-full shadow-sm focus:ring-[#1ABC9C] focus:border-[#1ABC9C] border-gray-300 rounded-md ${errors.subject ? 'border-red-500' : ''}`}
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>
              <div>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`py-3 px-4 block w-full shadow-sm focus:ring-[#1ABC9C] focus:border-[#1ABC9C] border-gray-300 rounded-md ${errors.message ? 'border-red-500' : ''}`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              {/* <input type="hidden" name="_gotcha" style={{ display: 'none' }} /> Formspree handles this automatically with JS submissions */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact 