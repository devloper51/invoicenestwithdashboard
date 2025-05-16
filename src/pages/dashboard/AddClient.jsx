import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlusIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
// We'll use react-hot-toast for notifications
import toast from 'react-hot-toast';

const AddClient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    contactPerson: '', // Optional
    notes: '' // Optional
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Client Name and Email are required.');
      return;
    }
    setIsSubmitting(true);

    // --- TODO: Replace with Appwrite SDK call: await appwriteClientService.createClient(formData); ---
    const submissionPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success/failure for demonstration
            const isSuccess = Math.random() > 0.1; // 90% success rate for demo
            if (isSuccess) {
                console.log('Simulated: Submitting new client:', formData);
                resolve(formData); // Pass formData or relevant data on success
            } else {
                console.error('Simulated: Failed to add client');
                reject(new Error('Simulated server error. Please try again.'));
            }
        }, 1500); // Simulate network delay
    });

    toast.promise(
        submissionPromise,
        {
            loading: 'Adding new client...',
            success: (data) => {
                // data here is what you resolve the promise with (e.g., formData)
                navigate('/dashboard/clients'); // Navigate after toast.success handles display
                return `Client "${data.name}" added successfully!`; 
            },
            error: (err) => {
                setIsSubmitting(false); // Ensure button is re-enabled on error
                return err.message || 'Failed to add client. Please try again.';
            }
        }
    ).then(() => {
        // This block executes after success toast is shown and navigate() is called
        // Reset form or perform other cleanup if needed, AFTER navigation for better UX
        // For now, just ensure isSubmitting is false if not already set by error case
        setIsSubmitting(false);
    }).catch(() => {
        // Catch any unhandled errors from the promise itself or toast.promise logic
        // This ensures isSubmitting is reset even if toast.promise fails unexpectedly
        setIsSubmitting(false);
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard/clients')} // Direct navigation back
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#1ABC9C] transition-colors duration-150 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 text-gray-400 group-hover:text-[#1ABC9C] transition-colors duration-150" />
          Back to Clients List
        </button>
      </div>

      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] px-6 py-5">
          <div className="flex items-center">
            <UserPlusIcon className="h-7 w-7 text-[#1ABC9C] mr-3 flex-shrink-0" />
            <h1 className="text-xl font-semibold text-white">Create New Client Profile</h1>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Client Name / Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm transition-shadow duration-150"
              placeholder="e.g., Acme Corporation"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm transition-shadow duration-150"
              placeholder="e.g., contact@acme.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-xs text-gray-500">(Optional)</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm transition-shadow duration-150"
              placeholder="e.g., +1 (555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-xs text-gray-500">(Optional)</span>
            </label>
            <textarea
              name="address"
              id="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm transition-shadow duration-150"
              placeholder="e.g., 123 Main St, Anytown, USA"
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Person <span className="text-xs text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              name="contactPerson"
              id="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm transition-shadow duration-150"
              placeholder="e.g., John Doe"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes <span className="text-xs text-gray-500">(Optional)</span>
            </label>
            <textarea
              name="notes"
              id="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm transition-shadow duration-150"
              placeholder="Any specific details or internal notes about this client"
            ></textarea>
          </div>

          <div className="pt-5 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/dashboard/clients')} // Direct navigation
              disabled={isSubmitting}
              className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors duration-150 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Client...
                </>
              ) : (
                'Add Client to System'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClient; 