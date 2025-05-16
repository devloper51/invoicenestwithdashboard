import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom' // Added useParams
import toast from 'react-hot-toast'
import { 
  PlusIcon,
  TrashIcon,
  ArrowLeftIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  PencilSquareIcon, // Keep for consistency, or replace with SaveIcon
  EyeIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon // For not found state
} from '@heroicons/react/24/outline'

// Mock data - reuse or adapt
const mockClients = [
  { id: 'client-1', name: 'Acme Corporation', email: 'contact@acme.com', address: '123 Industrial Way, Anytown USA' },
  { id: 'client-2', name: 'TechStart Solutions', email: 'hello@techstart.io', address: '456 Innovation Drive, Techtropolis USA' },
  { id: 'client-3', name: 'Global Services Ltd.', email: 'support@globalservices.com', address: '789 Commerce Blvd, World City USA' },
];

// Assuming mockInvoicesData is similar to the one in Invoices.jsx for fetching
// For simplicity, let's define a version here or import if it becomes a shared utility
const mockInvoicesDB = [
  { 
    id: 'INV-2024-001', clientName: 'Acme Corp', clientId: 'client-1', clientEmail: 'contact@acme.com', 
    amount: 5000, currency: 'USD', status: 'paid', issueDate: '2024-07-15', dueDate: '2024-08-15',
    items: [
      { id: 1, description: 'Web Development Services', quantity: 50, rate: 80 },
      { id: 2, description: 'Logo Design Package', quantity: 1, rate: 1000 }
    ],
    notes: 'Thank you for your business!', terms: 'Payment due within 30 days.', 
    discountType: 'percentage', discountValue: 10, taxRate: 5, 
    subtotal: 5000, discountAmount: 500, taxAmount: 225, total: 4725
  },
  { 
    id: 'INV-2024-002', clientName: 'TechStart Inc', clientId: 'client-2', clientEmail: 'hello@techstart.io', 
    amount: 3500, currency: 'USD', status: 'pending', issueDate: '2024-07-20', dueDate: '2024-08-20',
    items: [{ id: 1, description: 'Cloud Consulting Hours', quantity: 20, rate: 175 }],
    notes: 'Monthly retainer.', terms: 'NET 15',
    discountType: 'fixed', discountValue: 0, taxRate: 0,
    subtotal: 3500, discountAmount: 0, taxAmount: 0, total: 3500
  },
   // Add more mock invoices if needed to test various scenarios
];

// Helper to find an invoice (simulates DB call)
const findInvoiceById = (id) => {
    return mockInvoicesDB.find(inv => inv.id === id);
};


const mockCompanyProfile = {
  name: 'Your Company LLC',
  address: '100 Business Rd, Suite 10, Your City, ST 12345',
  phone: '(555) 000-1234',
  email: 'billing@yourcompany.com',
  logoUrl: '/logo.png', // Commented out to avoid missing image issues for now
  taxRate: 10, 
  currency: 'USD', 
  defaultPaymentTerms: 'NET 30',
};

const invoiceTemplates = [
  { id: 'classic', name: 'Classic', thumbnailUrl: 'https://via.placeholder.com/150/E0E0E0/333333?text=Classic' },
  { id: 'modern', name: 'Modern', thumbnailUrl: 'https://via.placeholder.com/150/D0D0D0/333333?text=Modern' },
  { id: 'simple', name: 'Simple', thumbnailUrl: 'https://via.placeholder.com/150/C0C0C0/333333?text=Simple' },
  { id: 'formal', name: 'Formal Blue', thumbnailUrl: 'https://via.placeholder.com/150/A0B0D0/333333?text=Formal' },
  { id: 'creative', name: 'Creative Green', thumbnailUrl: 'https://via.placeholder.com/150/A0D0B0/333333?text=Creative' },
];

const initialItem = { description: '', quantity: 1, rate: 0 };

const EditInvoice = () => {
  const navigate = useNavigate();
  const { id: invoiceId } = useParams(); // Get invoice ID from URL

  const [companyProfile, setCompanyProfile] = useState(null);
  const [clients, setClients] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(invoiceTemplates[0].id);
  
  const [formData, setFormData] = useState({
    invoiceNumber: '', 
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    selectedClientId: '',
    clientDetails: {}, 
    items: [{ ...initialItem, id: Date.now() }],
    notes: '',
    terms: '',
    discountType: 'percentage', 
    discountValue: 0,
    taxRate: 0, 
    subtotal: 0,
    discountAmount: 0,
    taxAmount: 0,
    total: 0,
    currency: 'USD' 
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [invoiceNotFound, setInvoiceNotFound] = useState(false);

  // Fetch initial data (company profile, clients, and the specific invoice)
  useEffect(() => {
    setIsLoading(true);
    setInvoiceNotFound(false);

    setTimeout(() => {
      const profile = JSON.parse(JSON.stringify(mockCompanyProfile));
      setCompanyProfile(profile);
      setClients(mockClients);

      const existingInvoice = findInvoiceById(invoiceId);

      if (existingInvoice) {
        const MOCK_CLIENTS_TEMP = [
          { id: 'client-1', name: 'Acme Corporation', email: 'contact@acme.com', address: '123 Industrial Way, Anytown USA' },
          { id: 'client-2', name: 'TechStart Solutions', email: 'hello@techstart.io', address: '456 Innovation Drive, Techtropolis USA' },
          { id: 'client-3', name: 'Global Services Ltd.', email: 'support@globalservices.com', address: '789 Commerce Blvd, World City USA' },
        ];
        const clientDetail = MOCK_CLIENTS_TEMP.find(c => c.id === existingInvoice.clientId) || {};

        setFormData({
          invoiceNumber: existingInvoice.id, // Usually non-editable
          issueDate: existingInvoice.issueDate,
          dueDate: existingInvoice.dueDate,
          selectedClientId: existingInvoice.clientId,
          clientDetails: clientDetail, // Populate with actual client details
          items: existingInvoice.items.map(item => ({ ...item, id: item.id || Date.now() + Math.random()})), // ensure items have unique IDs
          notes: existingInvoice.notes || '',
          terms: existingInvoice.terms || profile.defaultPaymentTerms || '',
          discountType: existingInvoice.discountType || 'percentage',
          discountValue: existingInvoice.discountValue || 0,
          taxRate: existingInvoice.taxRate !== undefined ? existingInvoice.taxRate : profile.taxRate || 0,
          currency: existingInvoice.currency || profile.currency || 'USD',
          // Calculated values will be updated by calculateTotals
          subtotal: 0, // Recalculate
          discountAmount: 0, // Recalculate
          taxAmount: 0, // Recalculate
          total: 0 // Recalculate
        });
        // Potentially set selectedTemplateId if stored with invoice
      } else {
        setInvoiceNotFound(true);
      }
      setIsLoading(false);
    }, 800);
  }, [invoiceId]);

  const calculateTotals = useCallback(() => {
    setFormData(prev => {
      if (!prev || !prev.items) return prev; // Guard clause

      const subtotal = prev.items.reduce((sum, item) => sum + (Number(item.quantity || 0) * Number(item.rate || 0)), 0);
      
      let discountAmount = 0;
      if (Number(prev.discountValue || 0) > 0) {
        if (prev.discountType === 'percentage') {
          discountAmount = (subtotal * Number(prev.discountValue)) / 100;
        } else {
          discountAmount = Number(prev.discountValue);
        }
      }
      
      const taxableAmount = subtotal - discountAmount;
      const taxAmount = (taxableAmount * Number(prev.taxRate || 0)) / 100;
      const total = taxableAmount + taxAmount;

      return {
        ...prev,
        subtotal: parseFloat(subtotal.toFixed(2)),
        discountAmount: parseFloat(discountAmount.toFixed(2)),
        taxAmount: parseFloat(taxAmount.toFixed(2)),
        total: parseFloat(total.toFixed(2))
      };
    });
  }, []);

  useEffect(() => {
    if (!isLoading && !invoiceNotFound) {
        calculateTotals();
    }
  }, [formData.items, formData.discountValue, formData.discountType, formData.taxRate, calculateTotals, isLoading, invoiceNotFound]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };
  
  const handleClientChange = (e) => {
    const clientId = e.target.value;
    const selected = clients.find(c => c.id === clientId);
    setFormData(prev => ({
      ...prev,
      selectedClientId: clientId,
      clientDetails: selected || {}
    }));
  };

  const handleItemChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { ...initialItem, id: Date.now() + Math.random() }] // Ensure unique ID
    }));
  };

  const removeItem = (itemId) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const handleSubmit = async () => { 
    setIsSaving(true);
    console.log('Updating Invoice Data:', { ...formData, selectedTemplateId });

    const promise = new Promise((resolve, reject) => setTimeout(() => {
      // Simulate API call to update invoice
      const invoiceIndex = mockInvoicesDB.findIndex(inv => inv.id === invoiceId);
      if (invoiceIndex > -1) {
        mockInvoicesDB[invoiceIndex] = { ...mockInvoicesDB[invoiceIndex], ...formData, id: invoiceId }; // Ensure ID is not changed
        console.log('Updated mockInvoicesDB:', mockInvoicesDB);
        resolve(`Invoice ${invoiceId} updated successfully!`);
      } else {
        reject(new Error('Failed to update invoice. Invoice not found in DB.'));
      }
    }, 1500));

    toast.promise(promise, {
      loading: 'Updating Invoice...',
      success: (message) => {
        navigate('/dashboard/my-invoices');
        return message;
      },
      error: (err) => err.message || 'Failed to update invoice.'
    }).finally(() => setIsSaving(false));
  };

  if (isLoading || !companyProfile && !invoiceNotFound) { // Adjusted loading condition
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-2"></div> {/* Shorter for Edit title */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 shadow rounded-lg p-6 h-48"></div>
            ))}
          </div>
          <div className="bg-gray-200 shadow rounded-lg p-6 h-96"></div>
        </div>
      </div>
    );
  }

  if (invoiceNotFound) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="mt-4 text-3xl font-bold text-gray-800">Invoice Not Found</h1>
        <p className="mt-2 text-gray-600">The invoice you are looking for (ID: {invoiceId}) could not be found. It might have been deleted or the ID is incorrect.</p>
        <Link
          to="/dashboard/my-invoices"
          className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Go Back to Invoices
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <Link
              to="/dashboard/my-invoices" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 mb-1"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Invoices
            </Link>
            <h1 className="text-3xl font-bold text-[#2C3E50] flex items-center">
              <PencilSquareIcon className="h-8 w-8 mr-3 text-[#2980B9]"/> {/* Changed icon & color */}
              Edit Invoice: <span className="text-[#3498DB]">{formData.invoiceNumber}</span>
            </h1>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            {/* Preview Button - Optional, current CreateInvoice has it as toast */}
             <button 
              type="button" 
              onClick={() => toast('Preview functionality coming soon!')}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] disabled:opacity-50"
            >
              <EyeIcon className="h-5 w-5 mr-2" /> Preview
            </button>
            <button 
              type="button" 
              onClick={handleSubmit} // Simplified to one update action
              disabled={isSaving || isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#2ECC71] hover:bg-[#27AE60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ECC71] disabled:opacity-50"
            >
              {isSaving ? <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" /> : <PencilSquareIcon className="h-5 w-5 mr-2" />}
              Update Invoice
            </button>
          </div>
        </div>

        {/* Main Form Area & Template Selector (Two Column Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Invoice Form Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Details (FROM) - Display only or pre-filled from profile */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <BuildingOfficeIcon className="h-6 w-6 mr-2 text-gray-500" /> From
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{companyProfile.name}</h3>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{companyProfile.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600"><strong>Email:</strong> {companyProfile.email}</p>
                  <p className="text-sm text-gray-600"><strong>Phone:</strong> {companyProfile.phone}</p>
                  {/* <img src={companyProfile.logoUrl} alt="Company Logo" className="mt-2 h-12" /> */}
                </div>
              </div>
            </div>

            {/* Client Details (TO) */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <UserGroupIcon className="h-6 w-6 mr-2 text-gray-500" /> To (Client)
              </h2>
              <label htmlFor="selectedClientId" className="block text-sm font-medium text-gray-700 mb-1">Select Client</label>
              <select
                id="selectedClientId"
                name="selectedClientId"
                value={formData.selectedClientId}
                onChange={handleClientChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
              >
                <option value="" disabled>-- Select a Client --</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name} ({client.email})</option>
                ))}
              </select>
              {formData.selectedClientId && formData.clientDetails && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <h4 className="font-medium text-gray-700">{formData.clientDetails.name}</h4>
                  <p className="text-sm text-gray-500">{formData.clientDetails.email}</p>
                  <p className="text-sm text-gray-500 whitespace-pre-line">{formData.clientDetails.address}</p>
                </div>
              )}
            </div>

            {/* Invoice Meta (Number, Dates) */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <CalendarDaysIcon className="h-6 w-6 mr-2 text-gray-500" /> Invoice Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
                <div>
                  <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700">Invoice Number</label>
                  <input 
                    type="text" 
                    name="invoiceNumber" 
                    id="invoiceNumber" 
                    value={formData.invoiceNumber} 
                    readOnly // Invoice number should generally not be changed after creation
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700">Issue Date</label>
                  <input 
                    type="date" 
                    name="issueDate" 
                    id="issueDate" 
                    value={formData.issueDate} 
                    onChange={handleInputChange} 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                  <input 
                    type="date" 
                    name="dueDate" 
                    id="dueDate" 
                    value={formData.dueDate} 
                    onChange={handleInputChange} 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                  <DocumentTextIcon className="h-6 w-6 mr-2 text-gray-500" /> Items
                </h2>
                <button 
                  type="button" 
                  onClick={addItem} 
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusIcon className="h-5 w-5 mr-1" /> Add Item
                </button>
              </div>
              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-x-3 gap-y-2 p-3 border border-gray-200 rounded-md relative">
                    <div className="col-span-12 sm:col-span-5">
                      <label htmlFor={`item-description-${item.id}`} className="text-xs text-gray-600">Description</label>
                      <input 
                        type="text" 
                        id={`item-description-${item.id}`}
                        placeholder="Item description"
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-2">
                      <label htmlFor={`item-quantity-${item.id}`} className="text-xs text-gray-600">Quantity</label>
                      <input 
                        type="number" 
                        id={`item-quantity-${item.id}`}
                        placeholder="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        min="0"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-2">
                      <label htmlFor={`item-rate-${item.id}`} className="text-xs text-gray-600">Rate</label>
                      <input 
                        type="number" 
                        id={`item-rate-${item.id}`}
                        placeholder="0.00"
                        value={item.rate}
                        onChange={(e) => handleItemChange(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-2 flex items-end">
                       <p className="text-sm text-gray-700 w-full text-right pr-2">
                        {formData.currency} {(item.quantity * item.rate).toFixed(2)}
                      </p>
                    </div>
                    {formData.items.length > 1 && (
                      <div className="col-span-12 sm:col-span-1 flex items-center justify-end sm:justify-center">
                        <button 
                          type="button" 
                          onClick={() => removeItem(item.id)} 
                          className="text-red-500 hover:text-red-700 p-1 mt-4 sm:mt-0"
                          title="Remove Item"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Notes & Terms */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                  <textarea 
                    id="notes" 
                    name="notes" 
                    rows="3" 
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any additional notes for the client..."
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="terms" className="block text-sm font-medium text-gray-700">Payment Terms</label>
                  <textarea 
                    id="terms" 
                    name="terms" 
                    rows="3" 
                    value={formData.terms}
                    onChange={handleInputChange}
                    placeholder="e.g., Payment due within 30 days"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Totals & Template Selector */}
          <div className="lg:col-span-1 space-y-6">
            {/* Totals Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 sticky top-24"> {/* Sticky for long forms */}
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <CurrencyDollarIcon className="h-6 w-6 mr-2 text-gray-500" /> Totals
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Currency:</span>
                  <select 
                    name="currency" 
                    value={formData.currency} 
                    onChange={handleInputChange} 
                    className="text-sm border-gray-300 rounded-md shadow-sm py-1 w-1/2 text-right focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                    {/* Add more currencies as needed */}
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subtotal:</span>
                  <span className="text-sm font-medium text-gray-800">{formData.currency} {formData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <label htmlFor="discountValue" className="text-sm text-gray-600">Discount:</label>
                  <div className="flex items-center w-1/2">
                    <input 
                      type="number" 
                      name="discountValue"
                      id="discountValue"
                      value={formData.discountValue}
                      onChange={handleInputChange}
                      className="text-sm border-gray-300 rounded-l-md shadow-sm py-1 w-2/3 text-right focus:ring-indigo-500 focus:border-indigo-500"
                      min="0"
                    />
                    <select 
                      name="discountType" 
                      value={formData.discountType} 
                      onChange={handleInputChange}
                      className="text-xs border-gray-300 rounded-r-md shadow-sm py-1.5 w-1/3 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                    >
                      <option value="percentage">%</option>
                      <option value="fixed">{formData.currency}</option>
                    </select>
                  </div>
                </div>
                 {formData.discountAmount > 0 && (
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Discount Applied:</span>
                        <span>-{formData.currency} {formData.discountAmount.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between items-center">
                  <label htmlFor="taxRate" className="text-sm text-gray-600">Tax Rate (%):</label>
                  <input 
                    type="number" 
                    name="taxRate"
                    id="taxRate"
                    value={formData.taxRate}
                    onChange={handleInputChange}
                    className="text-sm border-gray-300 rounded-md shadow-sm py-1 w-1/2 text-right focus:ring-indigo-500 focus:border-indigo-500"
                    min="0"
                  />
                </div>
                {formData.taxAmount > 0 && (
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Tax Amount:</span>
                        <span>+{formData.currency} {formData.taxAmount.toFixed(2)}</span>
                    </div>
                )}
                <hr className="my-2"/>
                <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
                  <span>Total:</span>
                  <span>{formData.currency} {formData.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <button 
                  type="button" 
                  onClick={handleSubmit}
                  disabled={isSaving || isLoading}
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#2ECC71] hover:bg-[#27AE60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ECC71] disabled:opacity-50"
                >
                  {isSaving ? <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" /> : <PencilSquareIcon className="h-5 w-5 mr-2" />}
                  Update Invoice
                </button>
              </div>
            </div>

            {/* Template Selector - Keep as is or simplify if template choice is fixed post-creation */}
            <div className="bg-white shadow-lg rounded-lg p-6 sticky top-[calc(theme(spacing.24)_+_16rem)]"> {/* Adjust top if totals section height changes */}
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <SparklesIcon className="h-6 w-6 mr-2 text-gray-500" /> Invoice Template
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {invoiceTemplates.map(template => (
                  <div 
                    key={template.id} 
                    onClick={() => setSelectedTemplateId(template.id)}
                    className={`rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ease-in-out 
                                ${selectedTemplateId === template.id ? 'border-indigo-500 shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
                  >
                    <img src={template.thumbnailUrl} alt={template.name} className="w-full h-auto object-cover"/>
                    <p className={`text-xs p-1.5 text-center ${selectedTemplateId === template.id ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                      {template.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInvoice; 