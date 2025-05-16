import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeftIcon, UserCircleIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, 
    DocumentTextIcon, CalendarDaysIcon, CurrencyDollarIcon, DocumentDuplicateIcon, PencilSquareIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast'; // For potential error messages

// Using the same mock data store as EditClient.jsx for consistency
const mockClientDB = {
  data: [
    {
      id: '1',
      name: 'Acme Corporation',
      email: 'contact@acmecorp.com',
      phone: '+91 9876543210',
      address: '123 Business Park, Mumbai, Maharashtra',
      contactPerson: 'Rohan Sharma',
      notes: 'Long-term client, prefers bi-weekly updates. Needs reports by EOD Friday.',
      totalInvoices: 15,
      totalAmount: 150000,
      paidAmount: 120000,
      outstandingAmount: 30000,
      joinedDate: '2022-01-15',
      invoices: [
        { id: 'INV-001', date: '2023-05-10', amount: 25000, status: 'Paid' },
        { id: 'INV-002', date: '2023-06-15', amount: 30000, status: 'Paid' },
        { id: 'INV-003', date: '2023-07-20', amount: 15000, status: 'Overdue' },
        { id: 'INV-006', date: '2023-08-01', amount: 10000, status: 'Sent' },
        { id: 'INV-007', date: '2023-08-05', amount: 5000, status: 'Draft' },
      ]
    },
    {
      id: '2',
      name: 'TechStart Solutions',
      email: 'info@techstart.com',
      phone: '+91 9876543211',
      address: '456 Tech Hub, Bangalore, Karnataka',
      contactPerson: 'Priya Singh',
      notes: 'New client, very responsive. Interested in premium services.',
      totalInvoices: 8,
      totalAmount: 85000,
      paidAmount: 85000,
      outstandingAmount: 0,
      joinedDate: '2023-03-01',
      invoices: [
        { id: 'INV-004', date: '2023-08-01', amount: 50000, status: 'Paid' },
        { id: 'INV-005', date: '2023-08-25', amount: 35000, status: 'Sent' },
      ]
    },
    {
      id: '5',
      name: 'Future Systems',
      email: 'contact@futuresystems.com',
      phone: '+91 9876543214',
      address: '654 Tech Valley, Pune, Maharashtra',
      contactPerson: 'Alok Verma',
      notes: 'Needs weekly check-ins. Pays on time.',
      totalInvoices: 10,
      totalAmount: 95000,
      paidAmount: 75000,
      outstandingAmount: 20000,
      joinedDate: '2022-11-20',
      invoices: [] // Example with no invoices yet for this client
    },
  ],
  findById: function(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const client = this.data.find(c => c.id === id);
        resolve(client);
      }, 600); // Simulate delay
    });
  }
};

const DetailItem = ({ icon: Icon, label, value, isLink = false, href = '#' }) => (
    <div className="flex items-start py-2.5">
      <Icon className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
        {isLink ? (
            <a href={href} className="text-sm text-[#1ABC9C] hover:underline break-all" target="_blank" rel="noopener noreferrer">{value || 'N/A'}</a>
        ) : (
            <p className="text-sm text-gray-800 break-words">{value || 'N/A'}</p>
        )}
      </div>
    </div>
);

const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending':
      case 'sent': return 'bg-yellow-100 text-yellow-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-200 text-gray-800';
    }
};

const ClientDetail = () => {
  const { id: clientId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [clientNotFound, setClientNotFound] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setClientNotFound(false);
    // --- TODO: Replace with Appwrite SDK call: const fetchedClient = await appwriteClientService.getClientById(clientId); ---
    mockClientDB.findById(clientId)
        .then(fetchedClient => {
            if (fetchedClient) {
                setClient(fetchedClient);
            } else {
                setClientNotFound(true);
                toast.error('Client details could not be loaded.');
            }
        })
        .catch(err => {
            console.error("Error fetching client details:", err);
            setClientNotFound(true);
            toast.error('Failed to load client details.');
        })
        .finally(() => {
            setIsLoading(false);
        });
  }, [clientId]);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Skeleton for Header */}
        <div className="mb-6 h-5 bg-gray-300 rounded w-1/4"></div> 
        <div className="bg-white shadow-xl rounded-lg overflow-hidden animate-pulse">
            <div className="bg-gray-300 p-6 h-28"></div> {/* Header Block */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                {/* Left Column Skeleton */}
                <div className="md:col-span-1 space-y-5">
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="py-2.5">
                            <div className="h-3 bg-gray-200 rounded w-1/3 mb-1.5"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </div>
                    ))}
                </div>
                {/* Right Column Skeleton */}
                <div className="md:col-span-2 space-y-8">
                    <div>
                        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[...Array(3)].map((_, i) => <div key={i} className="bg-gray-100 p-4 rounded-lg h-20"></div>)}
                        </div>
                    </div>
                    <div>
                        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <ul className="space-y-3">
                            {[...Array(3)].map((_, i) => <li key={i} className="bg-gray-100 p-4 rounded-lg h-16"></li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  if (clientNotFound) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="bg-white shadow-xl rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Client Not Found</h2>
            <p className="text-gray-600 mb-6">The client you are looking for (ID: {clientId}) does not exist or could not be loaded.</p>
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard/clients')}
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#1ABC9C] transition-colors duration-150 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 text-gray-400 group-hover:text-[#1ABC9C] transition-colors duration-150" />
          Back to Clients List
        </button>
      </div>

      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white truncate" title={client.name}>{client.name}</h1>
                <p className="text-sm text-gray-300">Client ID: CL-{String(client.id).padStart(4, '0')}</p>
            </div>
            <div className="flex-shrink-0">
                <button 
                    onClick={() => navigate(`/dashboard/clients/edit/${client.id}`)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#2C3E50] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2C3E50] focus:ring-white transition-colors duration-200"
                >
                    <PencilSquareIcon className="h-5 w-5 mr-2"/> Edit Client
                </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          {/* Left Column: Client Information */}
          <div className="md:col-span-1 space-y-1">
            <h2 className="text-lg font-semibold text-[#2C3E50] border-b border-gray-200 pb-2 mb-3">Client Information</h2>
            <DetailItem icon={UserCircleIcon} label="Contact Person" value={client.contactPerson} />
            <DetailItem icon={EnvelopeIcon} label="Email Address" value={client.email} isLink={true} href={`mailto:${client.email}`} />
            <DetailItem icon={PhoneIcon} label="Phone Number" value={client.phone} isLink={true} href={`tel:${client.phone}`} />
            <DetailItem icon={MapPinIcon} label="Address" value={client.address} />
            <DetailItem icon={CalendarDaysIcon} label="Client Since" value={client.joinedDate ? new Date(client.joinedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'} />
            <DetailItem icon={DocumentTextIcon} label="Notes" value={client.notes} />
          </div>

          {/* Right Column: Financial Summary & Recent Invoices */}
          <div className="md:col-span-2 space-y-8">
            <div>
                <h2 className="text-lg font-semibold text-[#2C3E50] border-b border-gray-200 pb-2 mb-4">Financial Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center shadow-sm">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Total Billed</p>
                        <p className="text-xl font-bold text-[#1ABC9C]">₹{client.totalAmount?.toLocaleString() || '0'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center shadow-sm">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Total Paid</p>
                        <p className="text-xl font-bold text-green-600">₹{client.paidAmount?.toLocaleString() || '0'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center shadow-sm">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Outstanding</p>
                        <p className="text-xl font-bold text-red-600">₹{client.outstandingAmount?.toLocaleString() || '0'}</p>
                    </div>
                </div>
            </div>

            <div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
                <h2 className="text-lg font-semibold text-[#2C3E50]">Invoice History</h2>
                {client.invoices && client.invoices.length > 0 && (
                    <button 
                        onClick={() => navigate(`/dashboard/my-invoices?clientId=${client.id}`)} 
                        className="text-sm font-medium text-[#1ABC9C] hover:underline"
                    >
                        View All ({client.invoices.length})
                    </button>
                )}
              </div>
              {client.invoices && client.invoices.length > 0 ? (
                <ul className="space-y-3">
                  {client.invoices.slice(0, 5).map(invoice => ( 
                    <li key={invoice.id} className="bg-gray-50 p-3.5 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center shadow-sm hover:shadow-md transition-shadow duration-150">
                      <div className="mb-2 sm:mb-0">
                        <Link to={`/dashboard/invoice/${invoice.id.replace('INV-','')}`} className="font-medium text-[#1ABC9C] hover:underline truncate block">{invoice.id}</Link>
                        <p className="text-xs text-gray-500">Date: {new Date(invoice.date).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})}</p>
                      </div>
                      <div className="flex items-center sm:justify-end gap-x-3">
                        <p className="text-sm font-medium text-gray-700">₹{invoice.amount.toLocaleString()}</p>
                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-lg">
                    <DocumentDuplicateIcon className="mx-auto h-10 w-10 text-gray-300" />
                    <p className="mt-2 text-sm text-gray-500">No invoices found for this client yet.</p>
                    <button 
                        onClick={() => navigate(`/dashboard/create-invoice?clientId=${client.id}`)} 
                        className="mt-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-[#1ABC9C] hover:bg-[#16A085] transition-colors"
                    >Create First Invoice</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail; 