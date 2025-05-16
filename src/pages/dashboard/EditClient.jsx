import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

// Mock data store - in a real app, this would be your Appwrite service or similar
const mockClientDB = {
  data: [
    {
      id: '1',
      name: 'Acme Corporation',
      email: 'contact@acmecorp.com',
      phone: '+91 9876543210',
      address: '123 Business Park, Mumbai, Maharashtra',
      contactPerson: 'Rohan Sharma',
      notes: 'Long-term client, prefers bi-weekly updates.',
    },
    {
      id: '2',
      name: 'TechStart Solutions',
      email: 'info@techstart.com',
      phone: '+91 9876543211',
      address: '456 Tech Hub, Bangalore, Karnataka',
      contactPerson: 'Priya Singh',
      notes: 'New client, very responsive.',
    },
    {
      id: '5', // Example of non-sequential ID
      name: 'Future Systems',
      email: 'contact@futuresystems.com',
      phone: '+91 9876543214',
      address: '654 Tech Valley, Pune, Maharashtra',
      contactPerson: 'Alok Verma',
      notes: 'Needs weekly check-ins.'
    },
  ],
  findById: function(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const client = this.data.find(c => c.id === id);
        resolve(client);
      }, 700); // Simulate delay
    });
  },
  updateById: function(id, updatedData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.data.findIndex(c => c.id === id);
        if (index !== -1) {
          this.data[index] = { ...this.data[index], ...updatedData };
          console.log('Simulated: Updating client in DB:', this.data[index]);
          resolve(this.data[index]);
        } else {
          reject(new Error('Client not found during update simulation.'));
        }
      }, 1000); // Simulate delay
    });
  }
};

const EditClient = () => {
  const navigate = useNavigate();
  const { id: clientId } = useParams(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    contactPerson: '',
    notes: ''
  });
  const [originalClientName, setOriginalClientName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clientNotFound, setClientNotFound] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setClientNotFound(false);
    // --- TODO: Replace with Appwrite SDK call: const clientToEdit = await appwriteClientService.getClientById(clientId); ---
    mockClientDB.findById(clientId)
      .then(clientToEdit => {
        if (clientToEdit) {
          setFormData({
            name: clientToEdit.name || '',
            email: clientToEdit.email || '',
            phone: clientToEdit.phone || '',
            address: clientToEdit.address || '',
            contactPerson: clientToEdit.contactPerson || '',
            notes: clientToEdit.notes || ''
          });
          setOriginalClientName(clientToEdit.name || '');
        } else {
          setClientNotFound(true);
          toast.error('Client data could not be loaded.');
        }
      })
      .catch(err => {
        console.error("Error fetching client data:", err);
        setClientNotFound(true);
        toast.error('Failed to load client data.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [clientId]);

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

    // --- TODO: Replace with Appwrite SDK call: await appwriteClientService.updateClient(clientId, formData); ---
    const updatePromise = mockClientDB.updateById(clientId, formData);

    toast.promise(
        updatePromise,
        {
            loading: 'Saving changes...',
            success: (updatedClient) => {
                navigate(`/dashboard/clients/${clientId}`);
                return `Client "${updatedClient.name}" updated successfully!`;
            },
            error: (err) => {
                setIsSubmitting(false);
                return err.message || 'Failed to update client. Please try again.';
            }
        }
    ).then(() => {
        setIsSubmitting(false);
    }).catch(() => {
        setIsSubmitting(false);
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-xl rounded-lg p-8 animate-pulse">
            <div className="h-5 bg-gray-300 rounded w-1/4 mb-10"></div> {/* Back button placeholder */}
            <div className="h-8 bg-gray-300 rounded w-1/2 mb-6"></div> {/* Title placeholder */}
            {[...Array(6)].map((_, i) => (
                <div key={i} className="mb-6">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
            ))}
            <div className="h-10 bg-gray-300 rounded w-1/4 ml-auto"></div> {/* Button placeholder */}
        </div>
      </div>
    );
  }

  if (clientNotFound) {
     return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
         <div className="bg-white shadow-xl rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Client Not Found</h2>
            <p className="text-gray-600 mb-6">The client you are trying to edit (ID: {clientId}) does not exist or could not be loaded.</p>
            <button
                onClick={() => navigate('/dashboard/clients')}
                className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1ABC9C] hover:bg-[#16A085] transition-colors duration-150"
            >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Clients List
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate(`/dashboard/clients/${clientId}`)} 
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#1ABC9C] transition-colors duration-150 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 text-gray-400 group-hover:text-[#1ABC9C] transition-colors duration-150" />
          Back to Client Details
        </button>
      </div>

      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] px-6 py-5">
          <div className="flex items-center">
            <PencilSquareIcon className="h-7 w-7 text-[#1ABC9C] mr-3 flex-shrink-0" />
            <h1 className="text-xl font-semibold text-white truncate" title={`Edit Client: ${originalClientName || 'Loading...'}`}>Edit Client: {originalClientName || 'Details'}</h1>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Client Name / Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text" name="name" id="name" value={formData.name} onChange={handleChange} required
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm transition-shadow duration-150"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email" name="email" id="email" value={formData.email} onChange={handleChange} required
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm transition-shadow duration-150"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-xs text-gray-500">(Optional)</span>
            </label>
            <input
              type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm transition-shadow duration-150"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-xs text-gray-500">(Optional)</span>
            </label>
            <textarea
              name="address" id="address" rows="3" value={formData.address} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm transition-shadow duration-150"
            ></textarea>
          </div>
          <div>
            <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Person <span className="text-xs text-gray-500">(Optional)</span>
            </label>
            <input
              type="text" name="contactPerson" id="contactPerson" value={formData.contactPerson} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm transition-shadow duration-150"
            />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes <span className="text-xs text-gray-500">(Optional)</span>
            </label>
            <textarea
              name="notes" id="notes" rows="3" value={formData.notes} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm transition-shadow duration-150"
            ></textarea>
          </div>

          <div className="pt-5 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(`/dashboard/clients/${clientId}`)}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors duration-150 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoading} // Also disable if still loading initial data
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving Changes...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClient; 