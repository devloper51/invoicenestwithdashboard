import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { 
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

const InvoicePreview = () => {
  const { id } = useParams()
  
  const [invoice] = useState({
    id: 'INV-001',
    issueDate: '2024-03-15',
    dueDate: '2024-04-15',
    status: 'pending',
    client: {
      name: 'Acme Corporation',
      email: 'contact@acmecorp.com',
      phone: '+91 9876543210',
      address: '123 Business Park, Mumbai, Maharashtra 400001'
    },
    items: [
      {
        id: 1,
        description: 'Web Development Services',
        quantity: 1,
        rate: 50000,
        amount: 50000
      },
      {
        id: 2,
        description: 'UI/UX Design',
        quantity: 1,
        rate: 25000,
        amount: 25000
      },
      {
        id: 3,
        description: 'SEO Optimization',
        quantity: 1,
        rate: 15000,
        amount: 15000
      }
    ],
    subtotal: 90000,
    tax: 16200, // 18% GST
    total: 106200,
    notes: 'Payment is due within 30 days. Please include the invoice number in your payment reference.',
    terms: 'All services are subject to our standard terms and conditions.'
  })

  const handleDownload = () => {
    // Handle PDF download
    console.log('Downloading invoice...')
  }

  const handlePrint = () => {
    // Handle printing
    window.print()
  }

  const handleSendEmail = () => {
    // Handle sending email
    console.log('Sending invoice via email...')
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/dashboard/invoices"
            className="inline-flex items-center text-sm text-[#34495E] hover:text-[#2C3E50]"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Invoices
          </Link>
          <div className="mt-2 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#2C3E50]">Invoice #{invoice.id}</h1>
            <div className="flex space-x-3">
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-3 py-2 border border-[#BDC3C7] rounded-md shadow-sm text-sm font-medium text-[#34495E] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C]"
              >
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                Download
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center px-3 py-2 border border-[#BDC3C7] rounded-md shadow-sm text-sm font-medium text-[#34495E] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C]"
              >
                <PrinterIcon className="h-5 w-5 mr-2" />
                Print
              </button>
              <button
                onClick={handleSendEmail}
                className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C]"
              >
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-[#BDC3C7]">
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#2C3E50]">InvoiceNest</h2>
                <p className="mt-1 text-[#7F8C8D]">123 Business Street</p>
                <p className="text-[#7F8C8D]">Mumbai, Maharashtra 400001</p>
                <p className="text-[#7F8C8D]">India</p>
              </div>
              <div className="text-right">
                <h3 className="text-lg font-medium text-[#2C3E50]">INVOICE</h3>
                <p className="mt-1 text-[#7F8C8D]">#{invoice.id}</p>
                <p className="mt-1 text-[#7F8C8D]">Issue Date: {invoice.issueDate}</p>
                <p className="text-[#7F8C8D]">Due Date: {invoice.dueDate}</p>
                <span className={`mt-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  invoice.status === 'paid' 
                    ? 'bg-green-100 text-green-800'
                    : invoice.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {invoice.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="p-8 border-b border-[#BDC3C7]">
            <h3 className="text-sm font-medium text-[#34495E] uppercase tracking-wider">Bill To</h3>
            <div className="mt-2">
              <p className="text-lg font-medium text-[#2C3E50]">{invoice.client.name}</p>
              <p className="text-[#7F8C8D]">{invoice.client.email}</p>
              <p className="text-[#7F8C8D]">{invoice.client.phone}</p>
              <p className="text-[#7F8C8D]">{invoice.client.address}</p>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="p-8">
            <table className="min-w-full divide-y divide-[#BDC3C7]">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#34495E] uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#34495E] uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#34495E] uppercase tracking-wider">
                    Rate
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#34495E] uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#BDC3C7]">
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#34495E]">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#34495E] text-right">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#34495E] text-right">
                      ₹{item.rate.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#34495E] text-right">
                      ₹{item.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="mt-8 flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-2">
                  <span className="text-[#34495E]">Subtotal:</span>
                  <span className="font-medium">₹{invoice.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#34495E]">Tax (18%):</span>
                  <span className="font-medium">₹{invoice.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-[#BDC3C7]">
                  <span className="text-[#2C3E50] font-medium">Total:</span>
                  <span className="font-bold text-[#2C3E50]">₹{invoice.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes and Terms */}
          <div className="p-8 border-t border-[#BDC3C7] bg-[#F8F9FA]">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-[#34495E] uppercase tracking-wider">Notes</h3>
                <p className="mt-2 text-sm text-[#7F8C8D]">{invoice.notes}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#34495E] uppercase tracking-wider">Terms & Conditions</h3>
                <p className="mt-2 text-sm text-[#7F8C8D]">{invoice.terms}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoicePreview 