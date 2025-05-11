import { useState } from 'react'
import { 
  UserCircleIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  BellIcon,
  ShieldCheckIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    companyName: 'InvoiceNest',
    email: 'contact@invoicenest.com',
    phone: '+91 9876543210',
    address: '123 Business Street, Mumbai, Maharashtra 400001',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    notifications: {
      email: true,
      browser: true,
      invoiceReminders: true,
      paymentReminders: true,
    }
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checked
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
    { id: 'company', name: 'Company', icon: BuildingOfficeIcon },
    { id: 'billing', name: 'Billing', icon: CreditCardIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'preferences', name: 'Preferences', icon: DocumentTextIcon },
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#2C3E50]">Settings</h1>
          <p className="mt-1 text-sm text-[#7F8C8D]">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="grid grid-cols-12">
            {/* Sidebar */}
            <div className="col-span-12 md:col-span-3 border-b md:border-b-0 md:border-r border-[#BDC3C7]">
              <nav className="p-4 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === tab.id
                        ? 'bg-[#1ABC9C] text-white'
                        : 'text-[#34495E] hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <tab.icon className="h-5 w-5 mr-3" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="col-span-12 md:col-span-9 p-6">
              <form onSubmit={handleSubmit}>
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-[#2C3E50]">Profile Information</h3>
                      <p className="mt-1 text-sm text-[#7F8C8D]">
                        Update your account's profile information
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-[#34495E]">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          id="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-[#BDC3C7] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#34495E]">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-[#BDC3C7] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-[#34495E]">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-[#BDC3C7] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-[#34495E]">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-[#BDC3C7] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-[#2C3E50]">Preferences</h3>
                      <p className="mt-1 text-sm text-[#7F8C8D]">
                        Set your default preferences for invoices and notifications
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="currency" className="block text-sm font-medium text-[#34495E]">
                          Currency
                        </label>
                        <select
                          name="currency"
                          id="currency"
                          value={formData.currency}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-[#BDC3C7] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                        >
                          <option value="INR">Indian Rupee (₹)</option>
                          <option value="USD">US Dollar ($)</option>
                          <option value="EUR">Euro (€)</option>
                          <option value="GBP">British Pound (£)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="timezone" className="block text-sm font-medium text-[#34495E]">
                          Timezone
                        </label>
                        <select
                          name="timezone"
                          id="timezone"
                          value={formData.timezone}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-[#BDC3C7] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                        >
                          <option value="Asia/Kolkata">India (IST)</option>
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="Europe/London">London (GMT)</option>
                          <option value="Asia/Dubai">Dubai (GST)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="dateFormat" className="block text-sm font-medium text-[#34495E]">
                          Date Format
                        </label>
                        <select
                          name="dateFormat"
                          id="dateFormat"
                          value={formData.dateFormat}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-[#BDC3C7] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                        >
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-[#2C3E50]">Notification Settings</h3>
                      <p className="mt-1 text-sm text-[#7F8C8D]">
                        Choose how you want to be notified
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="email"
                          id="email"
                          checked={formData.notifications.email}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-[#1ABC9C] focus:ring-[#1ABC9C] border-[#BDC3C7] rounded"
                        />
                        <label htmlFor="email" className="ml-2 block text-sm text-[#34495E]">
                          Email Notifications
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="browser"
                          id="browser"
                          checked={formData.notifications.browser}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-[#1ABC9C] focus:ring-[#1ABC9C] border-[#BDC3C7] rounded"
                        />
                        <label htmlFor="browser" className="ml-2 block text-sm text-[#34495E]">
                          Browser Notifications
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="invoiceReminders"
                          id="invoiceReminders"
                          checked={formData.notifications.invoiceReminders}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-[#1ABC9C] focus:ring-[#1ABC9C] border-[#BDC3C7] rounded"
                        />
                        <label htmlFor="invoiceReminders" className="ml-2 block text-sm text-[#34495E]">
                          Invoice Reminders
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="paymentReminders"
                          id="paymentReminders"
                          checked={formData.notifications.paymentReminders}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-[#1ABC9C] focus:ring-[#1ABC9C] border-[#BDC3C7] rounded"
                        />
                        <label htmlFor="paymentReminders" className="ml-2 block text-sm text-[#34495E]">
                          Payment Reminders
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings 