import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

const Invoices = () => {
  const [invoices] = useState([
    {
      id: 'INV-001',
      client: 'Acme Corp',
      amount: 5000,
      status: 'paid',
      date: '2024-03-15',
      dueDate: '2024-04-15',
    },
    {
      id: 'INV-002',
      client: 'TechStart Inc',
      amount: 3500,
      status: 'pending',
      date: '2024-03-14',
      dueDate: '2024-04-14',
    },
    {
      id: 'INV-003',
      client: 'Global Services',
      amount: 7500,
      status: 'paid',
      date: '2024-03-13',
      dueDate: '2024-04-13',
    },
    {
      id: 'INV-004',
      client: 'Innovate Solutions',
      amount: 4200,
      status: 'overdue',
      date: '2024-03-12',
      dueDate: '2024-04-12',
    },
    {
      id: 'INV-005',
      client: 'Digital Dynamics',
      amount: 6800,
      status: 'pending',
      date: '2024-03-11',
      dueDate: '2024-04-11',
    },
  ])

  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    search: '',
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const filteredInvoices = invoices.filter(invoice => {
    if (filters.status !== 'all' && invoice.status !== filters.status) return false
    if (filters.search && !invoice.client.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#2C3E50]">Invoices</h1>
          <Link
            to="/dashboard/invoices/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] transition-colors duration-200"
          >
            Create Invoice
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-[#95A5A6]" />
                </div>
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search clients..."
                  className="block w-full pl-10 pr-3 py-2 border border-[#BDC3C7] rounded-md leading-5 bg-white placeholder-[#95A5A6] focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                />
              </div>

              <div>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-[#BDC3C7] focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              <div>
                <select
                  name="dateRange"
                  value={filters.dateRange}
                  onChange={handleFilterChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-[#BDC3C7] focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm rounded-md"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white shadow rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#BDC3C7]">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#34495E] uppercase tracking-wider">
                    Invoice ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#34495E] uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#34495E] uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#34495E] uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#34495E] uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#34495E] uppercase tracking-wider">
                    Due Date
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#BDC3C7]">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C3E50]">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#34495E]">
                      {invoice.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#34495E]">
                      ₹{invoice.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        invoice.status === 'paid' 
                          ? 'bg-green-100 text-green-800'
                          : invoice.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#34495E]">
                      {invoice.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#34495E]">
                      {invoice.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button className="text-[#3498DB] hover:text-[#2980B9]">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button className="text-[#1ABC9C] hover:text-[#16A085]">
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button className="text-[#E74C3C] hover:text-[#C0392B]">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                        <button className="text-[#2C3E50] hover:text-[#34495E]">
                          <ArrowDownTrayIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoices 