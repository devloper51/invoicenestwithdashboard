import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

const Clients = () => {
  const [clients] = useState([
    {
      id: 1,
      name: 'Acme Corporation',
      email: 'contact@acmecorp.com',
      phone: '+91 9876543210',
      address: '123 Business Park, Mumbai, Maharashtra',
      totalInvoices: 15,
      totalAmount: 150000,
    },
    {
      id: 2,
      name: 'TechStart Solutions',
      email: 'info@techstart.com',
      phone: '+91 9876543211',
      address: '456 Tech Hub, Bangalore, Karnataka',
      totalInvoices: 8,
      totalAmount: 85000,
    },
    {
      id: 3,
      name: 'Global Services Ltd',
      email: 'support@globalservices.com',
      phone: '+91 9876543212',
      address: '789 Corporate Plaza, Delhi, NCR',
      totalInvoices: 12,
      totalAmount: 120000,
    },
    {
      id: 4,
      name: 'Innovate Digital',
      email: 'hello@innovatedigital.com',
      phone: '+91 9876543213',
      address: '321 Digital Park, Hyderabad, Telangana',
      totalInvoices: 6,
      totalAmount: 65000,
    },
    {
      id: 5,
      name: 'Future Systems',
      email: 'contact@futuresystems.com',
      phone: '+91 9876543214',
      address: '654 Tech Valley, Pune, Maharashtra',
      totalInvoices: 10,
      totalAmount: 95000,
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#2C3E50]">Clients</h1>
          <Link
            to="/dashboard/clients/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] transition-colors duration-200"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Client
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-[#95A5A6]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search clients..."
              className="block w-full pl-10 pr-3 py-2 border border-[#BDC3C7] rounded-md leading-5 bg-white placeholder-[#95A5A6] focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
            />
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => (
            <div key={client.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-[#2C3E50]">{client.name}</h3>
                    <p className="text-sm text-[#7F8C8D]">Client ID: {client.id}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-[#1ABC9C] hover:text-[#16A085]">
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button className="text-[#E74C3C] hover:text-[#C0392B]">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-sm text-[#34495E]">
                    <EnvelopeIcon className="h-5 w-5 mr-2 text-[#95A5A6]" />
                    {client.email}
                  </div>
                  <div className="flex items-center text-sm text-[#34495E]">
                    <PhoneIcon className="h-5 w-5 mr-2 text-[#95A5A6]" />
                    {client.phone}
                  </div>
                  <div className="flex items-center text-sm text-[#34495E]">
                    <BuildingOfficeIcon className="h-5 w-5 mr-2 text-[#95A5A6]" />
                    {client.address}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#BDC3C7]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#7F8C8D]">Total Invoices</p>
                      <p className="text-lg font-semibold text-[#2C3E50]">{client.totalInvoices}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#7F8C8D]">Total Amount</p>
                      <p className="text-lg font-semibold text-[#2C3E50]">₹{client.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to={`/dashboard/clients/${client.id}`}
                    className="block w-full text-center px-4 py-2 border border-[#1ABC9C] rounded-md text-sm font-medium text-[#1ABC9C] hover:bg-[#1ABC9C] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] transition-colors duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Clients 