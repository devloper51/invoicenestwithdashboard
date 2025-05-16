import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { 
  // UserCircleIcon, // Will be separate page
  // BuildingOfficeIcon, // Will be separate page
  CreditCardIcon,
  BellIcon,
  // ShieldCheckIcon, // Can add later if needed
  DocumentTextIcon,
  PaintBrushIcon,
  // ServerStackIcon, // Not used in current tabs
  ArrowDownTrayIcon,
  Cog6ToothIcon,
  CloudArrowUpIcon, // For logo upload
  EyeDropperIcon, // For accent color
  GlobeAltIcon, // For timezone
  CalendarDaysIcon, // For date format
  CurrencyDollarIcon // For currency
} from '@heroicons/react/24/outline'

// Mock data for settings - these would be fetched
const mockSettingsData = {
  // companyName: 'InvoiceNest Inc.', // To be moved to a separate Company Profile page
  // email: 'contact@invoicenest.com', // To be moved to a separate User Profile page
  invoicePreferences: {
    defaultPaymentTerms: 'NET 30',
    defaultTaxRate: null, // e.g., 18 for 18%
    taxIsEnabled: false,
  },
  branding: {
    logoUrl: '', // Store URL of uploaded logo
    accentColor: '#1ABC9C',
  },
  paymentGateways: {
    stripe: {
      apiKey: '', // Placeholder
      isEnabled: false,
    },
    paypal: {
      clientId: '', // Placeholder
      isEnabled: false,
    }
  },
  notifications: {
    emailOnNewInvoice: true,
    emailOnPaymentReceived: true,
    invoiceReminders: true,
    paymentReminders: false,
  },
  systemPreferences: { // New section for system-wide preferences
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY',
    timezone: 'Asia/Kolkata',
  },
  dataExport: { // Placeholder for data export settings
    lastExportDate: null,
    defaultFormat: 'json',
  }
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState('invoiceDefaults')
  const [formData, setFormData] = useState(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  // State for logo preview
  const [logoPreview, setLogoPreview] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const initialData = JSON.parse(JSON.stringify(mockSettingsData));
      setFormData(initialData);
      if (initialData.branding && initialData.branding.logoUrl) {
        setLogoPreview(initialData.branding.logoUrl);
      }
      setIsLoading(false);
    }, 800);
  }, []);

  const handleInputChange = (e, section, subSection = null) => {
    const { name, value, type, checked, files } = e.target;
    let val;

    if (type === 'file') {
      if (files && files[0]) {
        const file = files[0];
        // For demo, we'll use a blob URL for preview. In a real app, you'd upload it.
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoPreview(reader.result);
          // Storing the file name or a placeholder; actual upload would set a URL from server
          setFormData(prev => updateNestedState(prev, section, subSection, name, file.name)); 
        };
        reader.readAsDataURL(file);
        return; // handleInputChange will be called again by setFormData in reader.onloadend
      }
      val = formData[section]?.[name] || ''; // Keep existing value if no file selected
    } else {
      val = type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value;
    }
    
    setFormData(prev => updateNestedState(prev, section, subSection, name, val));
  };

  // Helper function to update nested state
  const updateNestedState = (prevState, section, subSection, name, value) => {
    const newState = { ...prevState };
    if (section) {
      if (subSection) {
        newState[section] = {
          ...newState[section],
          [subSection]: {
            ...newState[section][subSection],
            [name]: value,
          },
        };
      } else {
        newState[section] = {
          ...newState[section],
          [name]: value,
        };
      }
    } else {
      newState[name] = value;
    }
    return newState;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    // --- TODO: Replace with Appwrite SDK call: await appwriteSettingsService.updateSettings(formData); ---
    // In a real scenario, if logoUrl in formData.branding.logoUrl is a File object or just a name, 
    // you'd handle file upload here first, get the URL, then update formData before saving.
    // For this demo, we assume logoUrl is already a string path or becomes one.
    console.log('Simulated: Form data before saving:', formData);

    const savePromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Simulated: Saving settings:', formData);
            // Update mockSettingsData if you want changes to persist across reloads (for demo only)
            Object.assign(mockSettingsData, JSON.parse(JSON.stringify(formData)));
            // If logoUrl was just a name for demo, it would be "saved" as such.
            // If it were a real URL from an upload, that would be saved.
            resolve(formData);
        }, 1500);
    });

    toast.promise(
        savePromise,
        {
            loading: 'Saving settings...',
            success: 'Settings updated successfully!',
            error: 'Failed to update settings.',
        }
    ).finally(() => {
        setIsSaving(false);
    });
  };
  
  const handleLogoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result); 
      };
      reader.readAsDataURL(file);
      // Update formData; in a real app, this might store the File object for upload
      // For mock, let's store the name. The actual upload logic would be in handleSubmit.
      setFormData(prev => ({
        ...prev,
        branding: {
          ...prev.branding,
          logoUrl: file.name // Or file object: file
        }
      }));
    }
  };

  const tabs = [
    { id: 'invoiceDefaults', name: 'Invoice Defaults', icon: DocumentTextIcon },
    { id: 'branding', name: 'Branding', icon: PaintBrushIcon },
    { id: 'paymentGateways', name: 'Payment Gateways', icon: CreditCardIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'systemPreferences', name: 'System Preferences', icon: Cog6ToothIcon }, 
    { id: 'dataExport', name: 'Data & Export', icon: ArrowDownTrayIcon },
  ];

  if (isLoading || !formData) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="bg-white shadow-lg rounded-lg">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 md:col-span-3 border-b md:border-b-0 md:border-r border-gray-200 p-4 space-y-2">
                        {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-gray-200 rounded"></div>)}
                    </div>
                    <div className="col-span-12 md:col-span-9 p-6">
                        <div className="h-10 bg-gray-300 rounded w-1/2 mb-6"></div>
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-gray-200 rounded"></div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#2C3E50] flex items-center">
            <Cog6ToothIcon className="h-8 w-8 mr-3 text-[#1ABC9C]"/> Application Settings
          </h1>
          <p className="mt-1.5 text-gray-500">
            Manage your global application settings, invoice defaults, and integrations.
          </p>
        </header>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="grid grid-cols-12">
            {/* Sidebar Navigation */}
            <aside className="col-span-12 md:col-span-3 border-b md:border-b-0 md:border-r border-gray-200 bg-white">
              <nav className="p-3 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-150 ease-in-out group ${
                      activeTab === tab.id
                        ? 'bg-[#1ABC9C] text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className={`h-5 w-5 mr-3 flex-shrink-0 ${activeTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'}`} />
                    <span className="truncate">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content Area */}
            <main className="col-span-12 md:col-span-9">
              <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
                {/* Invoice Defaults Tab */}
                {activeTab === 'invoiceDefaults' && (
                  <div className="p-6 lg:p-8 space-y-6">
                    <div className="pb-4 border-b border-gray-200">
                      <h3 className="text-xl font-semibold text-[#2C3E50]">Invoice Defaults</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Set default values for new invoices, including payment terms and tax settings.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="defaultPaymentTerms" className="block text-sm font-medium text-gray-700 mb-1">
                                Default Payment Terms
                            </label>
                            <input
                                type="text"
                                name="defaultPaymentTerms"
                                id="defaultPaymentTerms"
                                value={formData.invoicePreferences.defaultPaymentTerms}
                                onChange={(e) => handleInputChange(e, 'invoicePreferences')}
                                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] sm:text-sm"
                                placeholder="e.g., NET 30, Due on Receipt"
                            />
                        </div>

                        <div className="sm:col-span-3 flex items-end space-x-3">
                            <div>
                                <label htmlFor="defaultTaxRate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Default Tax Rate (%)
                                </label>
                                <input
                                    type="number"
                                    name="defaultTaxRate"
                                    id="defaultTaxRate"
                                    value={formData.invoicePreferences.defaultTaxRate || ''} // Handle null for empty display
                                    onChange={(e) => handleInputChange(e, 'invoicePreferences')}
                                    disabled={!formData.invoicePreferences.taxIsEnabled}
                                    className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] sm:text-sm disabled:bg-gray-100"
                                    placeholder="e.g., 18"
                                    step="0.01"
                                />
                            </div>
                            <div className="flex items-center h-10 mb-0.5">
                                <input
                                    id="taxIsEnabled"
                                    name="taxIsEnabled"
                                    type="checkbox"
                                    checked={formData.invoicePreferences.taxIsEnabled}
                                    onChange={(e) => handleInputChange(e, 'invoicePreferences')}
                                    className="h-4 w-4 text-[#1ABC9C] focus:ring-[#1ABC9C] border-gray-300 rounded"
                                />
                                <label htmlFor="taxIsEnabled" className="ml-2 block text-sm text-gray-700">
                                    Enable Tax
                                </label>
                            </div>
                        </div>
                    </div>
                  </div>
                )}

                {/* Branding Tab */}
                {activeTab === 'branding' && (
                  <div className="p-6 lg:p-8 space-y-6">
                    <div className="pb-4 border-b border-gray-200">
                      <h3 className="text-xl font-semibold text-[#2C3E50]">Branding & Appearance</h3>
                      <p className="mt-1 text-sm text-gray-500">Customize the look of your invoices and application.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                          Company Logo
                        </label>
                        <div className="mt-1 flex items-center space-x-4">
                          <span className="inline-block h-20 w-20 rounded-md overflow-hidden bg-gray-100">
                            {logoPreview ? (
                              <img src={logoPreview} alt="Logo Preview" className="h-full w-full object-contain" />
                            ) : (
                              <CloudArrowUpIcon className="h-full w-full text-gray-300" />
                            )}
                          </span>
                          <input
                            type="file"
                            name="logoUrl"
                            id="logoUrl"
                            onChange={handleLogoFileChange} // Use specific handler for file
                            accept="image/png, image/jpeg, image/svg+xml"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#1ABC9C] file:text-white hover:file:bg-[#16A085] disabled:opacity-50"
                            disabled={isSaving}
                          />
                        </div>
                        <p className="mt-2 text-xs text-gray-500">PNG, JPG, SVG up to 2MB. Recommended size: 200x80px.</p>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700 mb-1">
                          Accent Color
                        </label>
                        <div className="relative mt-1">
                          <input
                            type="text" // Consider type="color" for a native picker, but styling is tricky
                            name="accentColor"
                            id="accentColor"
                            value={formData.branding.accentColor}
                            onChange={(e) => handleInputChange(e, 'branding')}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] sm:text-sm"
                            placeholder="#1ABC9C"
                            disabled={isSaving}
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <EyeDropperIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                          {/* Color preview square */}
                          <div 
                            className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                          >
                             <span 
                                className="block h-5 w-5 rounded border border-gray-300"
                                style={{ backgroundColor: formData.branding.accentColor }}
                             ></span>
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">Used for highlights, buttons, and active elements.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Gateways Tab */}
                {activeTab === 'paymentGateways' && (
                  <div className="p-6 lg:p-8 space-y-6">
                    <div className="pb-4 border-b border-gray-200">
                      <h3 className="text-xl font-semibold text-[#2C3E50]">Payment Gateways</h3>
                      <p className="mt-1 text-sm text-gray-500">Connect your payment providers like Stripe and PayPal.</p>
                    </div>
                    {/* Stripe Settings */}
                    <div className="pt-6">
                      <h4 className="text-lg font-medium text-gray-900">Stripe</h4>
                      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-4">
                        <div className="sm:col-span-4">
                          <label htmlFor="stripeApiKey" className="block text-sm font-medium text-gray-700">API Key</label>
                          <input 
                            type="password" 
                            name="apiKey" 
                            id="stripeApiKey" 
                            value={formData.paymentGateways.stripe.apiKey}
                            onChange={(e) => handleInputChange(e, 'paymentGateways', 'stripe')}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                            placeholder="sk_test_... or pk_test_..."
                            disabled={isSaving || !formData.paymentGateways.stripe.isEnabled}
                          />
                        </div>
                        <div className="sm:col-span-2 flex items-end pb-1">
                          <div className="flex items-center">
                            <input 
                              id="stripeIsEnabled" 
                              name="isEnabled" 
                              type="checkbox" 
                              checked={formData.paymentGateways.stripe.isEnabled}
                              onChange={(e) => handleInputChange(e, 'paymentGateways', 'stripe')}
                              className="h-4 w-4 text-[#1ABC9C] focus:ring-[#1ABC9C] border-gray-300 rounded"
                              disabled={isSaving}
                            />
                            <label htmlFor="stripeIsEnabled" className="ml-2 block text-sm font-medium text-gray-700">Enable Stripe</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* PayPal Settings (similar structure) */}
                    <div className="pt-6 border-t border-gray-200 mt-6">
                      <h4 className="text-lg font-medium text-gray-900">PayPal</h4>
                      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-4">
                        <div className="sm:col-span-4">
                          <label htmlFor="paypalClientId" className="block text-sm font-medium text-gray-700">Client ID</label>
                          <input 
                            type="text" 
                            name="clientId" 
                            id="paypalClientId" 
                            value={formData.paymentGateways.paypal.clientId}
                            onChange={(e) => handleInputChange(e, 'paymentGateways', 'paypal')}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                            placeholder="Your PayPal Client ID"
                            disabled={isSaving || !formData.paymentGateways.paypal.isEnabled}
                          />
                        </div>
                        <div className="sm:col-span-2 flex items-end pb-1">
                          <div className="flex items-center">
                            <input 
                              id="paypalIsEnabled" 
                              name="isEnabled" 
                              type="checkbox" 
                              checked={formData.paymentGateways.paypal.isEnabled}
                              onChange={(e) => handleInputChange(e, 'paymentGateways', 'paypal')}
                              className="h-4 w-4 text-[#1ABC9C] focus:ring-[#1ABC9C] border-gray-300 rounded"
                              disabled={isSaving}
                            />
                            <label htmlFor="paypalIsEnabled" className="ml-2 block text-sm font-medium text-gray-700">Enable PayPal</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="p-6 lg:p-8 space-y-6">
                    <div className="pb-4 border-b border-gray-200">
                      <h3 className="text-xl font-semibold text-[#2C3E50]">Notification Settings</h3>
                      <p className="mt-1 text-sm text-gray-500">Manage email notifications for various events.</p>
                    </div>
                    <fieldset className="space-y-4">
                      <legend className="sr-only">Notification Preferences</legend>
                      {[ 
                        {id: 'emailOnNewInvoice', label: 'Email on new invoice creation'},
                        {id: 'emailOnPaymentReceived', label: 'Email on payment received'},
                        {id: 'invoiceReminders', label: 'Send invoice reminders'},
                        {id: 'paymentReminders', label: 'Send payment reminders'},
                      ].map(notification => (
                        <div key={notification.id} className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id={notification.id}
                              name={notification.id}
                              type="checkbox"
                              checked={formData.notifications[notification.id]}
                              onChange={(e) => handleInputChange(e, 'notifications')}
                              className="focus:ring-[#1ABC9C] h-4 w-4 text-[#1ABC9C] border-gray-300 rounded"
                              disabled={isSaving}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor={notification.id} className="font-medium text-gray-700">
                              {notification.label}
                            </label>
                          </div>
                        </div>
                      ))}
                    </fieldset>
                  </div>
                )}

                {/* System Preferences Tab */}
                {activeTab === 'systemPreferences' && (
                  <div className="p-6 lg:p-8 space-y-6">
                    <div className="pb-4 border-b border-gray-200">
                      <h3 className="text-xl font-semibold text-[#2C3E50]">System Preferences</h3>
                      <p className="mt-1 text-sm text-gray-500">Configure application-wide settings like currency, date format, and timezone.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-2">
                        <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                          Currency
                        </label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <CurrencyDollarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <select
                                id="currency"
                                name="currency"
                                value={formData.systemPreferences.currency}
                                onChange={(e) => handleInputChange(e, 'systemPreferences')}
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] sm:text-sm"
                                disabled={isSaving}
                            >
                                <option value="USD">USD - US Dollar</option>
                                <option value="EUR">EUR - Euro</option>
                                <option value="GBP">GBP - British Pound</option>
                                <option value="INR">INR - Indian Rupee</option>
                                <option value="JPY">JPY - Japanese Yen</option>
                                <option value="CAD">CAD - Canadian Dollar</option>
                                <option value="AUD">AUD - Australian Dollar</option>
                            </select>
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-1">
                          Date Format
                        </label>
                        <div className="relative mt-1">
                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <CalendarDaysIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <select
                                id="dateFormat"
                                name="dateFormat"
                                value={formData.systemPreferences.dateFormat}
                                onChange={(e) => handleInputChange(e, 'systemPreferences')}
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] sm:text-sm"
                                disabled={isSaving}
                            >
                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                <option value="MMM D, YYYY">MMM D, YYYY (e.g., Jan 1, 2024)</option>
                                <option value="D MMMM YYYY">D MMMM YYYY (e.g., 1 January 2024)</option>
                            </select>
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                          Timezone
                        </label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <GlobeAltIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <select
                                id="timezone"
                                name="timezone"
                                value={formData.systemPreferences.timezone}
                                onChange={(e) => handleInputChange(e, 'systemPreferences')}
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] sm:text-sm"
                                disabled={isSaving}
                            >
                                {/* Add more timezones as needed */}
                                <option value="Etc/GMT+12">(GMT-12:00) International Date Line West</option>
                                <option value="Pacific/Midway">(GMT-11:00) Midway Island, Samoa</option>
                                <option value="Pacific/Honolulu">(GMT-10:00) Hawaii</option>
                                <option value="America/Anchorage">(GMT-09:00) Alaska</option>
                                <option value="America/Los_Angeles">(GMT-08:00) Pacific Time (US & Canada)</option>
                                <option value="America/Denver">(GMT-07:00) Mountain Time (US & Canada)</option>
                                <option value="America/Chicago">(GMT-06:00) Central Time (US & Canada)</option>
                                <option value="America/New_York">(GMT-05:00) Eastern Time (US & Canada)</option>
                                <option value="Atlantic/Bermuda">(GMT-04:00) Atlantic Time (Canada)</option>
                                <option value="Etc/GMT+3">(GMT-03:00) Buenos Aires, Georgetown</option>
                                <option value="Etc/GMT+2">(GMT-02:00) Mid-Atlantic</option>
                                <option value="Atlantic/Cape_Verde">(GMT-01:00) Cape Verde Is.</option>
                                <option value="Etc/UTC">UTC (GMT+00:00) Universal Time Coordinated</option>
                                <option value="Europe/London">(GMT+00:00) London, Lisbon</option>
                                <option value="Europe/Paris">(GMT+01:00) Amsterdam, Berlin, Paris, Rome</option>
                                <option value="Europe/Helsinki">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia</option>
                                <option value="Europe/Moscow">(GMT+03:00) Moscow, St. Petersburg</option>
                                <option value="Asia/Tehran">(GMT+03:30) Tehran</option>
                                <option value="Asia/Dubai">(GMT+04:00) Abu Dhabi, Muscat</option>
                                <option value="Asia/Kabul">(GMT+04:30) Kabul</option>
                                <option value="Asia/Karachi">(GMT+05:00) Islamabad, Karachi, Tashkent</option>
                                <option value="Asia/Kolkata">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                                <option value="Asia/Kathmandu">(GMT+05:45) Kathmandu</option>
                                <option value="Asia/Dhaka">(GMT+06:00) Astana, Dhaka</option>
                                <option value="Asia/Yangon">(GMT+06:30) Yangon (Rangoon)</option>
                                <option value="Asia/Bangkok">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                                <option value="Asia/Hong_Kong">(GMT+08:00) Beijing, Hong Kong, Singapore</option>
                                <option value="Asia/Tokyo">(GMT+09:00) Osaka, Sapporo, Tokyo, Seoul</option>
                                <option value="Australia/Adelaide">(GMT+09:30) Adelaide</option>
                                <option value="Australia/Sydney">(GMT+10:00) Canberra, Melbourne, Sydney</option>
                                <option value="Pacific/Auckland">(GMT+12:00) Auckland, Wellington</option>
                                <option value="Pacific/Fiji">(GMT+12:00) Fiji, Marshall Is.</option>
                            </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data & Export Tab */}
                {activeTab === 'dataExport' && (
                  <div className="p-6 lg:p-8 space-y-6">
                    <div className="pb-4 border-b border-gray-200">
                      <h3 className="text-xl font-semibold text-[#2C3E50]">Data & Export</h3>
                      <p className="mt-1 text-sm text-gray-500">Export your application data or manage backups.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="defaultFormat" className="block text-sm font-medium text-gray-700 mb-1">
                                Default Export Format
                            </label>
                            <select
                                id="defaultFormat"
                                name="defaultFormat"
                                value={formData.dataExport.defaultFormat}
                                onChange={(e) => handleInputChange(e, 'dataExport')}
                                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] sm:text-sm"
                                disabled={isSaving}
                            >
                                <option value="json">JSON</option>
                                <option value="csv">CSV (Coming Soon)</option>
                                <option value="xml">XML (Coming Soon)</option>
                            </select>
                        </div>
                        <div className="sm:col-span-6">
                            <button 
                                type="button" 
                                onClick={() => toast.success('Data export started (simulated)!')}
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] disabled:opacity-50"
                                disabled={isSaving}
                            >
                                <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5" />
                                Export All Data Now
                            </button>
                            {formData.dataExport.lastExportDate && (
                                <p className="mt-2 text-sm text-gray-500">
                                    Last export: {new Date(formData.dataExport.lastExportDate).toLocaleString()}
                                </p>
                            )}
                        </div>
                    </div>
                  </div>
                )}

                {/* Common Save Button for all tabs */}
                <div className="px-6 py-4 bg-gray-50 text-right">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#2C3E50] hover:bg-[#34495E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2C3E50] disabled:opacity-50 transition-colors duration-150"
                  >
                    {isSaving ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </>
                    ) : 'Save All Settings'}
                  </button>
                </div>
              </form>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings; 