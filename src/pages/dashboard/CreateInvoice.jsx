import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  PlusIcon,
  TrashIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

const CreateInvoice = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: 'INV-001',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    client: '',
    items: [
      {
        id: 1,
        description: '',
        quantity: 1,
        rate: 0,
        amount: 0
      }
    ],
    notes: '',
    terms: '',
    subtotal: 0,
    tax: 0,
    total: 0
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleItemChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            [field]: value
          }
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate
          }
          return updatedItem
        }
        return item
      })
    }))
  }

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: prev.items.length + 1,
          description: '',
          quantity: 1,
          rate: 0,
          amount: 0
        }
      ]
    }))
  }

  const removeItem = (id) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }))
  }

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.amount, 0)
    const tax = subtotal * 0.18 // 18% GST
    const total = subtotal + tax

    setFormData(prev => ({
      ...prev,
      subtotal,
      tax,
      total
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    calculateTotals()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/dashboard/invoices"
            className="inline-flex items-center text-sm text-[#34495E] hover:text-[#2C3E50]"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Invoices
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-[#2C3E50]">Create New Invoice</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Invoice Details */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-[#2C3E50] mb-4">Invoice Details</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="invoiceNumber" className="block text-sm font-medium text-[#34495E]">
                  Invoice Number
                </label>
                <input
                  type="text"
                  name="invoiceNumber"
                  id="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-[#BDC3C7] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="issueDate" className="block text-sm font-medium text-[#34495E]">
                  Issue Date
                </label>
                <input
                  type="date"
                  name="issueDate"
                  id="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-[#BDC3C7] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-[#34495E]">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-[#BDC3C7] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-[#2C3E50] mb-4">Client Information</h2>
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-[#34495E]">
                Select Client
              </label>
              <select
                name="client"
                id="client"
                value={formData.client}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-[#BDC3C7] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
              >
                <option value="">Select a client</option>
                <option value="acme">Acme Corporation</option>
                <option value="techstart">TechStart Solutions</option>
                <option value="global">Global Services Ltd</option>
              </select>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-[#2C3E50]">Invoice Items</h2>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C]"
              >
                <PlusIcon className="h-5 w-5 mr-1" />
                Add Item
              </button>
            </div>

            <div className="space-y-4">
              {formData.items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-5">
                    <label className="block text-sm font-medium text-[#34495E]">
                      Description
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                      className="mt-1 block w-full border border-[#BDC3C7] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-[#34495E]">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value))}
                      className="mt-1 block w-full border border-[#BDC3C7] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-[#34495E]">
                      Rate (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={item.rate}
                      onChange={(e) => handleItemChange(item.id, 'rate', parseFloat(e.target.value))}
                      className="mt-1 block w-full border border-[#BDC3C7] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-[#34495E]">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={item.amount}
                      readOnly
                      className="mt-1 block w-full border border-[#BDC3C7] rounded-md shadow-sm py-2 px-3 bg-gray-50 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-1">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="inline-flex items-center p-2 border border-transparent rounded-md text-[#E74C3C] hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-8 border-t border-[#BDC3C7] pt-4">
              <div className="flex justify-end space-y-2">
                <div className="w-64">
                  <div className="flex justify-between py-2">
                    <span className="text-[#34495E]">Subtotal:</span>
                    <span className="font-medium">₹{formData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#34495E]">Tax (18%):</span>
                    <span className="font-medium">₹{formData.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t border-[#BDC3C7]">
                    <span className="text-[#2C3E50] font-medium">Total:</span>
                    <span className="font-bold text-[#2C3E50]">₹{formData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-[#2C3E50] mb-4">Additional Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-[#34495E]">
                  Notes
                </label>
                <textarea
                  name="notes"
                  id="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-[#BDC3C7] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="terms" className="block text-sm font-medium text-[#34495E]">
                  Terms & Conditions
                </label>
                <textarea
                  name="terms"
                  id="terms"
                  rows={3}
                  value={formData.terms}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-[#BDC3C7] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <Link
              to="/dashboard/invoices"
              className="inline-flex justify-center py-2 px-4 border border-[#BDC3C7] shadow-sm text-sm font-medium rounded-md text-[#34495E] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C]"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C]"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateInvoice 