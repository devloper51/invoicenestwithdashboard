import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CurrencyDollarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline'

const Dashboard = () => {
  const [stats] = useState({
    totalRevenue: 12500,
    totalInvoices: 45,
    totalClients: 12,
    revenueChange: 12.5,
    invoiceChange: 8.2,
    clientChange: 5.7
  })

  const [recentInvoices] = useState([
    {
      id: 'INV-001',
      client: 'Acme Corp',
      amount: 2500,
      status: 'paid',
      date: '2024-03-15'
    },
    {
      id: 'INV-002',
      client: 'TechStart Inc',
      amount: 1800,
      status: 'pending',
      date: '2024-03-14'
    },
    {
      id: 'INV-003',
      client: 'Global Services',
      amount: 3200,
      status: 'overdue',
      date: '2024-03-10'
    }
  ])

  const [recentClients] = useState([
    {
      id: 1,
      name: 'Acme Corp',
      email: 'contact@acmecorp.com',
      totalInvoices: 5,
      totalAmount: 12500
    },
    {
      id: 2,
      name: 'TechStart Inc',
      email: 'info@techstart.com',
      totalInvoices: 3,
      totalAmount: 5400
    },
    {
      id: 3,
      name: 'Global Services',
      email: 'support@globalservices.com',
      totalInvoices: 2,
      totalAmount: 3200
    }
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <h1 className="text-2xl font-semibold text-[#2C3E50]">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Revenue */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon className="h-6 w-6 text-[#1ABC9C]" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-[#7F8C8D] truncate">Total Revenue</dt>
                  <dd>
                    <div className="text-lg font-medium text-[#2C3E50]">
                      ${stats.totalRevenue.toLocaleString()}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-[#F8F9FA] px-5 py-3">
            <div className="text-sm">
              <div className="flex items-center">
                {stats.revenueChange > 0 ? (
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
                )}
                <span className={`ml-2 ${stats.revenueChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stats.revenueChange}% from last month
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Invoices */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentTextIcon className="h-6 w-6 text-[#1ABC9C]" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-[#7F8C8D] truncate">Total Invoices</dt>
                  <dd>
                    <div className="text-lg font-medium text-[#2C3E50]">
                      {stats.totalInvoices}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-[#F8F9FA] px-5 py-3">
            <div className="text-sm">
              <div className="flex items-center">
                {stats.invoiceChange > 0 ? (
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
                )}
                <span className={`ml-2 ${stats.invoiceChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stats.invoiceChange}% from last month
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Clients */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-6 w-6 text-[#1ABC9C]" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-[#7F8C8D] truncate">Total Clients</dt>
                  <dd>
                    <div className="text-lg font-medium text-[#2C3E50]">
                      {stats.totalClients}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-[#F8F9FA] px-5 py-3">
            <div className="text-sm">
              <div className="flex items-center">
                {stats.clientChange > 0 ? (
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
                )}
                <span className={`ml-2 ${stats.clientChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stats.clientChange}% from last month
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent Invoices */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-[#2C3E50]">Recent Invoices</h3>
              <Link
                to="/invoices"
                className="text-sm font-medium text-[#1ABC9C] hover:text-[#16A085]"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {recentInvoices.map((invoice) => (
                <li key={invoice.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-[#1ABC9C] truncate">{invoice.id}</p>
                      <p className="ml-2 text-sm text-[#7F8C8D]">{invoice.client}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm text-[#2C3E50]">${invoice.amount}</p>
                      <span
                        className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          invoice.status
                        )}`}
                      >
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-[#7F8C8D]">
                        {new Date(invoice.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Clients */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-[#2C3E50]">Recent Clients</h3>
              <Link
                to="/clients"
                className="text-sm font-medium text-[#1ABC9C] hover:text-[#16A085]"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {recentClients.map((client) => (
                <li key={client.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-[#2C3E50]">{client.name}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm text-[#7F8C8D]">{client.email}</p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-[#7F8C8D]">
                        {client.totalInvoices} invoices
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-[#2C3E50] sm:mt-0">
                      <p>${client.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 