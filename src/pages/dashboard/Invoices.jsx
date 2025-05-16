import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  PaperAirplaneIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

// Expanded Mock Data
const mockInvoicesData = [
  {
    id: 'INV-2024-001',
    clientName: 'Acme Corp',
    clientEmail: 'contact@acmecorp.com',
    clientId: 'client-1',
    amount: 5000,
    currency: 'USD',
    status: 'paid',
    issueDate: '2024-07-15',
    dueDate: '2024-08-15',
    invoicePdfUrl: '#',
  },
  {
    id: 'INV-2024-002',
    clientName: 'TechStart Inc',
    clientEmail: 'billing@techstart.com',
    clientId: 'client-2',
    amount: 3500,
    currency: 'USD',
    status: 'pending',
    issueDate: '2024-07-20',
    dueDate: '2024-08-20',
    invoicePdfUrl: '#',
  },
  {
    id: 'INV-2024-003',
    clientName: 'Global Services',
    clientEmail: 'finance@globalservices.com',
    clientId: 'client-3',
    amount: 7500,
    currency: 'EUR',
    status: 'overdue',
    issueDate: '2024-06-10',
    dueDate: '2024-07-10',
    invoicePdfUrl: '#',
  },
  {
    id: 'INV-2024-004',
    clientName: 'Innovate Solutions',
    clientEmail: 'accounts@innovate.com',
    clientId: 'client-4',
    amount: 4200,
    currency: 'USD',
    status: 'draft',
    issueDate: '2024-07-25',
    dueDate: '2024-08-25',
    invoicePdfUrl: null,
  },
  {
    id: 'INV-2024-005',
    clientName: 'Digital Dynamics',
    clientEmail: 'billing@digitaldynamics.com',
    clientId: 'client-5',
    amount: 6800,
    currency: 'GBP',
    status: 'paid',
    issueDate: '2024-05-01',
    dueDate: '2024-06-01',
    invoicePdfUrl: '#',
  },
];

const ITEMS_PER_PAGE = 8;

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateRangeFilter, setDateRangeFilter] = useState({ start: '', end: '' });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setInvoices(mockInvoicesData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const statusColors = {
    paid: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    overdue: 'bg-red-100 text-red-700',
    draft: 'bg-gray-100 text-gray-700',
  };

  const filteredInvoices = useMemo(() => {
    setCurrentPage(1); // Reset to first page when filters change
    return invoices.filter(invoice => {
      // Status filter
      if (statusFilter !== 'All' && invoice.status !== statusFilter.toLowerCase()) {
        return false;
      }

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          invoice.clientName.toLowerCase().includes(searchLower) ||
          invoice.id.toLowerCase().includes(searchLower) ||
          invoice.clientEmail.toLowerCase().includes(searchLower)
        );
      }

      // Date range filter
      if (dateRangeFilter.start && new Date(invoice.dueDate) < new Date(dateRangeFilter.start)) {
        return false;
      }
      if (dateRangeFilter.end) {
        const endDate = new Date(dateRangeFilter.end);
        endDate.setDate(endDate.getDate() + 1);
        if (new Date(invoice.dueDate) >= endDate) {
          return false;
        }
      }

      return true;
    });
  }, [invoices, searchTerm, statusFilter, dateRangeFilter]);

  const paginatedInvoices = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredInvoices.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredInvoices, currentPage]);

  const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDeleteInvoice = (invoiceId) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const updatedInvoices = invoices.filter(inv => inv.id !== invoiceId);
        if (invoices.length - updatedInvoices.length === 1) {
          setInvoices(updatedInvoices);
          resolve('Invoice deleted successfully!');
        } else {
          reject(new Error('Failed to delete invoice.'));
        }
      }, 1000);
    });

    toast.promise(promise, {
      loading: 'Deleting invoice...',
      success: (message) => message,
      error: (err) => err.message,
    });
  };
  
  const handleSendReminder = (invoiceId) => {
    const selectedInvoice = invoices.find(inv => inv.id === invoiceId);
    const promise = new Promise((resolve, reject) => {
      if (!selectedInvoice) {
        reject(new Error('Invoice not found.'));
        return;
      }
      setTimeout(() => {
        resolve(`Reminder sent for ${invoiceId} to ${selectedInvoice.clientName}`);
      }, 1000);
    });

    toast.promise(promise, {
      loading: 'Sending reminder...',
      success: (message) => message,
      error: (err) => err.message,
    });
  };

  const handleMarkAsPaid = (invoiceId) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        let success = false;
        setInvoices(prevInvoices => 
          prevInvoices.map(inv => {
            if (inv.id === invoiceId) {
              success = true;
              return { ...inv, status: 'paid' };
            }
            return inv;
          })
        );
        if (success) {
          resolve(`Invoice ${invoiceId} marked as paid.`);
        } else {
          reject(new Error('Failed to mark invoice as paid.'));
        }
      }, 1000);
    });

    toast.promise(promise, {
      loading: 'Updating status...',
      success: (message) => message,
      error: (err) => err.message,
    });
  };

  const InvoiceTableSkeleton = () => (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="animate-pulse divide-y divide-gray-200">
        {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
          <div key={i} className="px-6 py-4 flex items-center justify-between space-x-4">
            <div className="w-1/6 h-4 bg-gray-200 rounded"></div>
            <div className="w-1/5 h-4 bg-gray-200 rounded"></div>
            <div className="w-1/6 h-4 bg-gray-200 rounded"></div>
            <div className="w-1/6 h-4 bg-gray-200 rounded"></div>
            <div className="w-1/12"><div className="h-6 w-16 bg-gray-200 rounded-full"></div></div>
            <div className="w-1/4 flex space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">My Invoices</h1>
        <Link
          to="/dashboard/create-invoice"
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create New Invoice
        </Link>
      </header>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={dateRangeFilter.start}
              onChange={(e) => setDateRangeFilter(prev => ({ ...prev, start: e.target.value }))}
            />
            <input
              type="date"
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={dateRangeFilter.end}
              onChange={(e) => setDateRangeFilter(prev => ({ ...prev, end: e.target.value }))}
            />
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('All');
              setDateRangeFilter({ start: '', end: '' });
            }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FunnelIcon className="h-5 w-5 mr-2 text-gray-400" />
            Clear Filters
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        {isLoading ? (
          <InvoiceTableSkeleton />
        ) : filteredInvoices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No invoices found</p>
            {searchTerm || statusFilter !== 'All' || dateRangeFilter.start || dateRangeFilter.end ? (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                  setDateRangeFilter({ start: '', end: '' });
                }}
                className="mt-4 text-indigo-600 hover:text-indigo-500"
              >
                Clear filters
              </button>
            ) : (
              <Link
                to="/dashboard/create-invoice"
                className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create your first invoice
              </Link>
            )}
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{invoice.clientName}</div>
                      <div className="text-xs text-gray-400">{invoice.clientEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: invoice.currency,
                      }).format(invoice.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[invoice.status]}`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/dashboard/invoices/edit/${invoice.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </Link>
                        {invoice.status !== 'paid' && (
                          <button
                            onClick={() => handleMarkAsPaid(invoice.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Mark as Paid"
                          >
                            <CheckCircleIcon className="h-5 w-5" />
                          </button>
                        )}
                        {invoice.status === 'pending' && (
                          <button
                            onClick={() => handleSendReminder(invoice.id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Send Reminder"
                          >
                            <PaperAirplaneIcon className="h-5 w-5" />
                          </button>
                        )}
                        {invoice.invoicePdfUrl && (
                          <a
                            href={invoice.invoicePdfUrl}
                            className="text-gray-600 hover:text-gray-900"
                            title="Download PDF"
                          >
                            <ArrowDownTrayIcon className="h-5 w-5" />
                          </a>
                        )}
                        <button
                          onClick={() => handleDeleteInvoice(invoice.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(currentPage * ITEMS_PER_PAGE, filteredInvoices.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredInvoices.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => handlePageChange(index + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === index + 1
                              ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Invoices; 