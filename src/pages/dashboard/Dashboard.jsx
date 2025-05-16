import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CurrencyDollarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline'

// Mock data that would typically come from an API
const mockStatsData = {
  totalRevenue: 12500,
  totalInvoices: 45,
  totalClients: 12,
  revenueChange: 12.5, // Percentage
  invoiceChange: 8.2,  // Percentage
  clientChange: 5.7    // Percentage
};

const mockRecentInvoicesData = [
  {
    id: 'INV-001',
    clientName: 'Acme Corp', // Changed from client to clientName for clarity
    amount: 2500,
    status: 'paid',
    date: '2024-07-15'
  },
  {
    id: 'INV-002',
    clientName: 'TechStart Inc',
    amount: 1800,
    status: 'pending',
    date: '2024-07-14'
  },
  {
    id: 'INV-003',
    clientName: 'Global Services',
    amount: 3200,
    status: 'overdue',
    date: '2024-07-10'
  }
];

const mockRecentClientsData = [
  {
    id: 'CL-001',
    name: 'Acme Corp',
    email: 'contact@acmecorp.com',
    // totalInvoices: 5, (These would be derived or fetched separately in a real app)
    // totalAmount: 12500
    joinedDate: '2023-01-10'
  },
  {
    id: 'CL-002',
    name: 'TechStart Inc',
    email: 'info@techstart.com',
    joinedDate: '2023-03-22'
  },
  {
    id: 'CL-003',
    name: 'Global Services',
    email: 'support@globalservices.com',
    joinedDate: '2023-05-15'
  }
];

const Dashboard = () => {
  const [stats, setStats] = useState(null); // Initialize as null or an object with loading states
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [recentClients, setRecentClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls to fetch dashboard data
    setIsLoading(true);
    const fetchData = async () => {
      // --- TODO: Replace with Appwrite SDK calls --- 
      // const fetchedStats = await appwriteDashboardService.getStats();
      // const fetchedInvoices = await appwriteInvoiceService.getRecentInvoices({ limit: 3 });
      // const fetchedClients = await appwriteClientService.getRecentClients({ limit: 3 });
      
      // Simulating a delay
      await new Promise(resolve => setTimeout(resolve, 1200)); 

      setStats(mockStatsData);
      setRecentInvoices(mockRecentInvoicesData);
      setRecentClients(mockRecentClientsData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'overdue':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const StatCard = ({ title, value, change, icon: Icon, currency = false, unit = '%' }) => {
    if (isLoading || !stats) {
        return (
            <div className="bg-white overflow-hidden shadow-lg rounded-lg p-5 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        );
    }
    const isPositiveChange = change !== undefined && change >= 0;
    return (
        <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 bg-sky-100 rounded-full">
                        <Icon className="h-6 w-6 text-sky-600" aria-hidden="true" />
                    </div>
                    <div className="ml-4 w-0 flex-1">
                        <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                        <dd className="text-2xl font-semibold text-gray-800">
                            {currency ? `₹${value?.toLocaleString() || '0'}` : value?.toLocaleString() || '0'}
                        </dd>
                    </div>
                </div>
            </div>
            {change !== undefined && (
                <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm flex items-center">
                        {isPositiveChange ? (
                            <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                            <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={`${isPositiveChange ? 'text-green-600' : 'text-red-600'} font-medium`}>
                            {Math.abs(change)}{unit}
                        </span>
                        <span className="ml-1 text-gray-500">from last month</span>
                    </div>
                </div>
            )}
        </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-[#2C3E50]">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your business.</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
            <Link
                to="/dashboard/create-invoice"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] transition-colors duration-200"
            >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                New Invoice
            </Link>
            <Link
                to="/dashboard/clients/new"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-[#2C3E50] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] transition-colors duration-200"
            >
                <UserGroupIcon className="h-5 w-5 mr-2 text-[#1ABC9C]" />
                Add Client
            </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <StatCard title="Total Revenue" value={stats?.totalRevenue} change={stats?.revenueChange} icon={CurrencyDollarIcon} currency={true} />
        <StatCard title="Total Invoices" value={stats?.totalInvoices} change={stats?.invoiceChange} icon={DocumentTextIcon} />
        <StatCard title="Active Clients" value={stats?.totalClients} change={stats?.clientChange} icon={UserGroupIcon} />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Invoices */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
            <h3 className="text-xl font-semibold text-[#2C3E50]">Recent Invoices</h3>
            <Link
              to="/dashboard/my-invoices" // Corrected link
              className="text-sm font-medium text-[#1ABC9C] hover:text-[#16A085] hover:underline"
            >
              View all
            </Link>
          </div>
          {isLoading ? (
            <ul className="divide-y divide-gray-200">
                {[...Array(3)].map((_, i) => (
                    <li key={i} className="px-4 py-4 sm:px-6 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-1.5"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </li>
                ))}
            </ul>
          ) : recentInvoices.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {recentInvoices.map((invoice) => (
                <li key={invoice.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center justify-between">
                    <div className="truncate">
                      <p className="text-sm font-medium text-[#1ABC9C] truncate">{invoice.id}</p>
                      <p className="text-sm text-gray-500 truncate">To: {invoice.clientName}</p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex flex-col items-end">
                      <p className="text-sm font-medium text-gray-800">₹{invoice.amount.toLocaleString()}</p>
                      <span
                        className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          invoice.status
                        )}`}
                      >
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    {new Date(invoice.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-5 sm:px-6 text-sm text-gray-500">No recent invoices to display.</p>
          )}
        </div>

        {/* Recent Clients */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
            <h3 className="text-xl font-semibold text-[#2C3E50]">New Clients</h3>
            <Link
              to="/dashboard/clients" // Correct link
              className="text-sm font-medium text-[#1ABC9C] hover:text-[#16A085] hover:underline"
            >
              View all
            </Link>
          </div>
          {isLoading ? (
             <ul className="divide-y divide-gray-200">
                {[...Array(3)].map((_, i) => (
                    <li key={i} className="px-4 py-4 sm:px-6 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-1.5"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </li>
                ))}
            </ul>
          ) : recentClients.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {recentClients.map((client) => (
                <li key={client.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center justify-between">
                    <div className="truncate">
                      <p className="text-sm font-medium text-gray-800 truncate">{client.name}</p>
                      <p className="text-sm text-gray-500 truncate">{client.email}</p>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <Link 
                        to={`/dashboard/clients/${client.id.replace('CL-','')}`} // Assuming client.id is like 'CL-001'
                        className="text-xs font-medium text-[#1ABC9C] hover:underline"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                   <div className="mt-1 text-xs text-gray-400">
                    Joined: {new Date(client.joinedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </li>
              ))}
            </ul>
             ) : (
            <p className="px-4 py-5 sm:px-6 text-sm text-gray-500">No recent clients to display.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard 