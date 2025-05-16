import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  PencilSquareIcon,
  TrashIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

// Mock data that would typically come from an API
const mockInitialClients = [
    {
      id: 1,
      name: 'Acme Corporation',
      email: 'contact@acmecorp.com',
      phone: '+91 9876543210',
      address: '123 Business Park, Mumbai, Maharashtra',
      totalInvoices: 15, // This would likely be a derived/aggregated field
      totalAmount: 150000, // This also
      contactPerson: 'Rohan Sharma',
      notes: 'Long-term client.'
    },
    {
      id: 2,
      name: 'TechStart Solutions',
      email: 'info@techstart.com',
      phone: '+91 9876543211',
      address: '456 Tech Hub, Bangalore, Karnataka',
      totalInvoices: 8,
      totalAmount: 85000,
      contactPerson: 'Priya Singh',
      notes: 'New client.'
    },
    // ... (other mock clients from your existing list if needed)
    {
      id: 5,
      name: 'Future Systems',
      email: 'contact@futuresystems.com',
      phone: '+91 9876543214',
      address: '654 Tech Valley, Pune, Maharashtra',
      totalInvoices: 10,
      totalAmount: 95000,
      contactPerson: 'Alok Verma',
      notes: 'Needs weekly check-ins.'
    },
];

const ClientCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
    <div className="p-6">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-1.5"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="flex space-x-1.5">
          <div className="h-7 w-7 bg-gray-200 rounded-full"></div>
          <div className="h-7 w-7 bg-gray-200 rounded-full"></div>
        </div>
      </div>
      <div className="space-y-2.5 text-sm">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
      <div className="h-8 bg-gray-200 rounded w-full mt-3"></div>
    </div>
  </div>
);

const Clients = () => {
  const navigate = useNavigate()
  const [clientsData, setClientsData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call to fetch clients
    // --- TODO: Replace with Appwrite SDK call: const fetchedClients = await appwriteClientService.getAllClients(); ---
    setTimeout(() => {
      setClientsData(mockInitialClients);
      setIsLoading(false);
    }, 1000); // Simulate network delay
  }, []);

  const filteredClients = clientsData.filter(client =>
    (client.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (client.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleDeleteClient = (clientId, clientName) => {
    if (window.confirm(`Are you sure you want to delete client "${clientName}"? This action cannot be undone.`)) {
      // --- TODO: Replace with Appwrite SDK call: await appwriteClientService.deleteClient(clientId); ---
      toast.promise(
        new Promise(resolve => setTimeout(resolve, 700)).then(() => {
            setClientsData(prevClients => prevClients.filter(client => client.id !== clientId));
            // Optionally re-fetch or update a global state if this list is shared
        }),
        {
          loading: 'Deleting client...',
          success: `Client "${clientName}" (simulated) deleted successfully!`,
          error: 'Failed to delete client.',
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#2C3E50]">Manage Clients</h1>
            <p className="text-gray-500 mt-1">View, search, add, edit, or delete client profiles.</p>
          </div>
          <Link
            to="/dashboard/clients/new"
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] transition-colors duration-200"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Client
          </Link>
        </div>

        {/* Search Bar */} 
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email..."
              disabled={isLoading && clientsData.length === 0} // Disable if initially loading no data
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm shadow-sm transition-colors duration-150"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => <ClientCardSkeleton key={i} />)}
          </div>
        ) : filteredClients.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClients.map((client) => (
              <div key={client.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden flex flex-col group">
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="max-w-[calc(100%-50px)]">
                      <h3 className="text-xl font-semibold text-[#2C3E50] group-hover:text-[#1ABC9C] transition-colors duration-150 truncate" title={client.name}>{client.name}</h3>
                      <p className="text-xs text-gray-400">ID: CL-{String(client.id).padStart(4, '0')}</p>
                    </div>
                    <div className="flex space-x-1 flex-shrink-0">
                      <button 
                        onClick={() => navigate(`/dashboard/clients/edit/${client.id}`)}
                        title="Edit Client"
                        className="p-1.5 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteClient(client.id, client.name)}
                        title="Delete Client"
                        className="p-1.5 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-4 w-4 mr-2.5 text-gray-400 flex-shrink-0" />
                      <a href={`mailto:${client.email}`} className="hover:text-[#1ABC9C] transition-colors duration-150 truncate" title={client.email}>{client.email}</a>
                    </div>
                    {client.phone && (
                      <div className="flex items-center">
                        <PhoneIcon className="h-4 w-4 mr-2.5 text-gray-400 flex-shrink-0" />
                        <span className="truncate" title={client.phone}>{client.phone}</span>
                      </div>
                    )}
                    {client.address && (
                      <div className="flex items-start">
                        <BuildingOfficeIcon className="h-4 w-4 mr-2.5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-xs leading-snug line-clamp-2" title={client.address}>{client.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 mt-auto">
                  {/* Placeholder for quick stats if needed, or remove if View Details is enough */}
                  {/* <div className="grid grid-cols-2 gap-x-4 text-center mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Invoices</p>
                      <p className="text-base font-semibold text-[#2C3E50]">{client.totalInvoices}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Billed</p>
                      <p className="text-base font-semibold text-[#2C3E50]">₹{client.totalAmount?.toLocaleString()}</p>
                    </div>
                  </div> */}
                  <Link
                    to={`/dashboard/clients/${client.id}`}
                    className="block w-full text-center px-4 py-2.5 border border-[#1ABC9C] rounded-md text-sm font-medium text-[#1ABC9C] bg-white hover:bg-[#1ABC9C] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1ABC9C] transition-colors duration-200 ease-in-out shadow-sm hover:shadow-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <UsersIcon className="mx-auto h-16 w-16 text-gray-300" />
            <h3 className="mt-4 text-xl font-semibold text-[#2C3E50]">No Clients Found</h3>
            {searchTerm ? (
                <p className="mt-1.5 text-sm text-gray-500">Your search for "<span className="font-medium">{searchTerm}</span>" did not match any clients. Try a different term.</p>
            ) : (
                <p className="mt-1.5 text-sm text-gray-500">Get started by adding your first client to the system.</p>
            )}
            <div className="mt-6">
              <Link
                to="/dashboard/clients/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] transition-colors duration-200"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Client
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Clients 