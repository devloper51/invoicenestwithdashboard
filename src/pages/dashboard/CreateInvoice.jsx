import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  PencilSquareIcon,
  EyeIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  ArrowPathIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline'
import { invoiceTemplates } from '../../components/invoice-templates'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import ReactDOM from 'react-dom/client'
import React from 'react'

// Mock data (replace with API calls)
const mockClients = [
  { 
    id: 'client-1', 
    name: 'Acme Corporation', 
    email: 'contact@acme.com', 
    phone: '+1 (555) 123-4567',
    address: '123 Industrial Way, Anytown USA',
    gstin: '22AAAAA0000A1Z5',
    pan: 'AAAAA1234A'
  },
  { 
    id: 'client-2', 
    name: 'TechStart Solutions', 
    email: 'hello@techstart.io', 
    phone: '+1 (555) 987-6543',
    address: '456 Innovation Drive, Techtropolis USA',
    gstin: '22BBBBB0000B1Z5',
    pan: 'BBBBB1234B'
  },
  { 
    id: 'client-3', 
    name: 'Global Services Ltd.', 
    email: 'support@globalservices.com', 
    phone: '+1 (555) 456-7890',
    address: '789 Commerce Blvd, World City USA',
    gstin: '22CCCCC0000C1Z5',
    pan: 'CCCCC1234C'
  },
];

const initialItem = { description: '', quantity: 1, rate: 0 };

const templatePreviews = {
  classic: '/images/templates/classic-preview.svg',
  modern: '/images/templates/modern-preview.svg',
  simple: '/images/templates/simple-preview.svg',
  professional: '/images/templates/professional-preview.svg',
  minimal: '/images/templates/minimal-preview.svg',
  elegant: '/images/templates/elegant-preview.svg',
  corporate: '/images/templates/corporate-preview.svg'
};

// Update the numberToWords function
const numberToWords = (amount) => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  const convertLessThanThousand = (num) => {
    if (num === 0) return '';
    
    let words = '';
    
    if (num >= 100) {
      words += ones[Math.floor(num / 100)] + ' Hundred ';
      num %= 100;
    }
    
    if (num >= 10) {
      if (num < 20) {
        words += teens[num - 10] + ' ';
        return words;
      } else {
        words += tens[Math.floor(num / 10)] + ' ';
        num %= 10;
      }
    }
    
    if (num > 0) {
      words += ones[num] + ' ';
    }
    
    return words;
  };

  // Split amount into rupees and paise
  const [rupees, paise] = amount.toFixed(2).split('.');
  let num = parseInt(rupees);
  
  if (num === 0) return 'Zero Rupees Only';

  let words = '';
  
  if (num >= 10000000) {
    words += convertLessThanThousand(Math.floor(num / 10000000)) + 'Crore ';
    num %= 10000000;
  }
  
  if (num >= 100000) {
    words += convertLessThanThousand(Math.floor(num / 100000)) + 'Lakh ';
    num %= 100000;
  }
  
  if (num >= 1000) {
    words += convertLessThanThousand(Math.floor(num / 1000)) + 'Thousand ';
    num %= 1000;
  }
  
  words += convertLessThanThousand(num);
  
  // Remove extra spaces and add proper spacing
  words = words.trim().replace(/\s+/g, ' ');
  
  // Add Rupees
  words = words + 'Rupees';
  
  // Add paise if present
  if (parseInt(paise) > 0) {
    words += ' and ' + convertLessThanThousand(parseInt(paise)) + 'Paise';
  }
  
  return words + ' Only';
};

// Function to convert any color format to RGB
const convertToRGB = (color) => {
  if (!color) return '';
  
  // Handle transparent colors
  if (color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
    return 'rgba(0, 0, 0, 0)';
  }

  // Handle oklch colors by converting to standard colors
  if (color.includes('oklch')) {
    // Replace oklch colors with standard RGB colors
    if (color.includes('oklch(0.2 0.03 240)')) return 'rgb(51, 51, 51)'; // Dark gray
    if (color.includes('oklch(0.5 0.03 240)')) return 'rgb(128, 128, 128)'; // Medium gray
    if (color.includes('oklch(0.8 0.03 240)')) return 'rgb(204, 204, 204)'; // Light gray
    if (color.includes('oklch(0.9 0.03 240)')) return 'rgb(230, 230, 230)'; // Very light gray
    if (color.includes('oklch(0.95 0.03 240)')) return 'rgb(242, 242, 242)'; // Almost white
    if (color.includes('oklch(0.98 0.03 240)')) return 'rgb(250, 250, 250)'; // Nearly white
    if (color.includes('oklch(1 0 0)')) return 'rgb(255, 255, 255)'; // White
    if (color.includes('oklch(0 0 0)')) return 'rgb(0, 0, 0)'; // Black
    // Default fallback for any other oklch color
    return 'rgb(128, 128, 128)';
  }
  
  // Create a temporary div to use the browser's color parsing
  const temp = document.createElement('div');
  temp.style.color = color;
  document.body.appendChild(temp);
  const rgbColor = window.getComputedStyle(temp).color;
  document.body.removeChild(temp);
  
  return rgbColor;
};

// Function to force RGB colors in styles
const forceRGBColors = (element) => {
  const style = element.style;
  const computedStyle = window.getComputedStyle(element);
  
  // Convert all color properties
  const colorProps = ['color', 'backgroundColor', 'borderColor', 'borderTopColor', 
                     'borderRightColor', 'borderBottomColor', 'borderLeftColor'];
  
  colorProps.forEach(prop => {
    const value = computedStyle[prop];
    if (value && value !== 'rgba(0, 0, 0, 0)') {
      style[prop] = convertToRGB(value);
    }
  });
  
  // Process all children
  Array.from(element.children).forEach(forceRGBColors);
};

const CreateInvoice = () => {
  const navigate = useNavigate();
  const [companyProfile, setCompanyProfile] = useState(null);
  const [clients, setClients] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(invoiceTemplates[0].id);
  const [showPreview, setShowPreview] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const [formData, setFormData] = useState({
    invoiceNumber: '', // Will be auto-generated or fetched
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    selectedClientId: '', // Store ID of selected client
    clientDetails: {}, // Store details of selected client
    items: [{ ...initialItem, id: Date.now() }],
    notes: '',
    terms: '', // Will be pre-filled from companyProfile.defaultPaymentTerms
    discountType: 'percentage', // 'percentage' or 'fixed'
    discountValue: 0,
    taxRate: 0, // Will be pre-filled from companyProfile.taxRate
    // Calculated values
    subtotal: 0,
    discountAmount: 0,
    taxAmount: 0,
    total: 0,
    currency: 'INR', // Will be pre-filled from companyProfile.currency
    amountInWords: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  // Fetch initial data
  useEffect(() => {
    setIsLoading(true);
    // Simulate fetching company profile and clients
    setTimeout(() => {
      // Fetch user's company profile from localStorage
      const userProfile = JSON.parse(localStorage.getItem('userProfile'));
      
      if (!userProfile) {
        toast.error('Please complete your company profile first');
        navigate('/dashboard/profile');
        return;
      }

      // Transform user profile into company profile format
      const profile = {
        name: userProfile.companyName,
        address: userProfile.companyAddress,
        phone: userProfile.phone,
        email: userProfile.email,
        gstin: userProfile.companyTaxId,
        pan: userProfile.companyTaxId,
        taxRate: userProfile.taxRate,
        currency: userProfile.currency,
        defaultPaymentTerms: userProfile.defaultPaymentTerms
      };

      setCompanyProfile(profile);
      setClients(mockClients);
      
      // Initialize form data based on company profile
      setFormData(prev => ({
        ...prev,
        invoiceNumber: `INV-${String(Date.now()).slice(-6)}`,
        taxRate: profile.taxRate,
        terms: profile.defaultPaymentTerms,
        currency: profile.currency
      }));
      setIsLoading(false);
    }, 800);
  }, [navigate]);

  const calculateTotals = useCallback(() => {
    setFormData(prev => {
      // Calculate subtotal
      const subtotal = prev.items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.rate)), 0);
      
      // Calculate discount
      let discountAmount = 0;
      if (prev.discountValue > 0) {
        if (prev.discountType === 'percentage') {
          discountAmount = (subtotal * Number(prev.discountValue)) / 100;
        } else {
          discountAmount = Number(prev.discountValue);
        }
      }
      
      // Calculate taxable amount (after discount)
      const taxableAmount = subtotal - discountAmount;
      
      // Calculate GST on taxable amount
      const taxAmount = (taxableAmount * Number(prev.taxRate)) / 100;
      
      // Calculate total (taxable amount + GST)
      const total = taxableAmount + taxAmount;

      // Convert total to words with proper formatting
      const amountInWords = numberToWords(total);

      return {
        ...prev,
        subtotal: parseFloat(subtotal.toFixed(2)),
        discountAmount: parseFloat(discountAmount.toFixed(2)),
        taxableAmount: parseFloat(taxableAmount.toFixed(2)),
        taxAmount: parseFloat(taxAmount.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
        amountInWords
      };
    });
  }, []);

  // Recalculate totals whenever items, discount, or tax rate change
  useEffect(() => {
    if (!isLoading) { // Ensure calculations don't run on initial empty/loading data
        calculateTotals();
    }
  }, [formData.items, formData.discountValue, formData.discountType, formData.taxRate, calculateTotals, isLoading]);


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
    // Handle number fields (quantity and rate)
          if (field === 'quantity' || field === 'rate') {
      try {
        // Remove any non-numeric characters except decimal point
        const sanitizedValue = value.replace(/[^0-9.]/g, '');
        
        // Ensure only one decimal point
        const parts = sanitizedValue.split('.');
        if (parts.length > 2) {
          value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        // Limit to 2 decimal places
        if (parts.length === 2 && parts[1].length > 2) {
          value = parts[0] + '.' + parts[1].slice(0, 2);
        }

        // Handle empty value
        if (sanitizedValue === '') {
          setFormData(prev => ({
            ...prev,
            items: prev.items.map(item =>
              item.id === id ? { ...item, [field]: 0 } : item
            )
          }));
          return;
        }

        // Convert to number and validate
        const numValue = parseFloat(sanitizedValue);
        
        // Check if the number is valid and within reasonable limits (up to 1 crore)
        if (!isNaN(numValue) && numValue >= 0 && numValue <= 10000000) {
          setFormData(prev => ({
            ...prev,
            items: prev.items.map(item =>
              item.id === id ? { ...item, [field]: numValue } : item
            )
          }));
        } else if (numValue > 10000000) {
          // If number is too large, cap it at 1 crore
          setFormData(prev => ({
            ...prev,
            items: prev.items.map(item =>
              item.id === id ? { ...item, [field]: 10000000 } : item
            )
          }));
          toast.error('Maximum value allowed is 1 crore');
        }
      } catch (error) {
        console.error('Error handling number input:', error);
        // If there's any error, set to 0
        setFormData(prev => ({
          ...prev,
          items: prev.items.map(item =>
            item.id === id ? { ...item, [field]: 0 } : item
          )
        }));
      }
    } else {
      // Handle non-number fields (like description)
      setFormData(prev => ({
        ...prev,
        items: prev.items.map(item =>
          item.id === id ? { ...item, [field]: value } : item
        )
      }));
    }
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { ...initialItem, id: Date.now() }]
    }));
  };

  const removeItem = (itemId) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const handleSubmit = async (action) => {
    setIsSaving(true);
    
    try {
      // Here you would integrate with your backend (e.g., Appwrite)
      console.log('Generating Invoice:', { ...formData, selectedTemplateId });

      const promise = new Promise(resolve => setTimeout(() => {
        // Simulate API call
        resolve('Invoice generated successfully!');
      }, 1500));

      toast.promise(promise, {
        loading: 'Generating Invoice...',
        success: (message) => {
          // After successful generation, show download button
          setShowDownloadButton(true);
          return message;
        },
        error: 'Failed to generate invoice.'
      });
    } catch (error) {
      console.error('Error generating invoice:', error);
      toast.error('Failed to generate invoice. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTemplateSelect = (templateId) => {
    if (isGeneratingPDF) return; // Prevent template change while generating PDF
    setSelectedTemplateId(templateId);
    setShowPreview(false); // Close preview when changing template
  };

  const handlePreview = () => {
    const selectedTemplate = invoiceTemplates.find(t => t.id === selectedTemplateId);
    if (!selectedTemplate) {
      toast.error('Please select a template first');
      return;
    }
    setShowPreview(true);
  };

  const handleGeneratePDF = async () => {
    if (!formData.invoiceNumber) {
      toast.error('Please fill in all required fields first');
      return;
    }

    setIsGeneratingPDF(true);
    const loadingToast = toast.loading('Generating PDF...');

    try {
      const selectedTemplate = invoiceTemplates.find(t => t.id === selectedTemplateId);
      if (!selectedTemplate) {
        throw new Error('Template not found');
      }

      const TemplateComponent = selectedTemplate.component;
      const invoiceData = {
        companyDetails: companyProfile,
        clientDetails: formData.clientDetails,
        invoiceDetails: {
          invoiceNumber: formData.invoiceNumber,
          issueDate: formData.issueDate,
          dueDate: formData.dueDate,
          notes: formData.notes,
          terms: formData.terms,
          taxRate: formData.taxRate
        },
        items: formData.items,
        totals: {
          subtotal: formData.subtotal,
          discountAmount: formData.discountAmount,
          taxableAmount: formData.taxableAmount,
          taxAmount: formData.taxAmount,
          total: formData.total,
          amountInWords: formData.amountInWords
        },
        currency: formData.currency
      };

      // Create a hidden div
      const tempDiv = document.createElement('div');
      tempDiv.className = 'invoice-pdf-root';
      tempDiv.style.position = 'fixed';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.width = '210mm';
      tempDiv.style.minHeight = '297mm';
      tempDiv.style.background = 'white';
      tempDiv.style.zIndex = '-1';
      document.body.appendChild(tempDiv);

      // Render the template into the hidden div using React 18 API
      const root = ReactDOM.createRoot(tempDiv);
      root.render(<TemplateComponent {...invoiceData} />);

      // Wait for rendering and images to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate PDF from the rendered template
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#fff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice-${formData.invoiceNumber}.pdf`);

      // Clean up
      root.unmount();
      document.body.removeChild(tempDiv);
      toast.dismiss(loadingToast);
      toast.success('Invoice PDF downloaded successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF. Please try again.');
      console.error(error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const renderPreview = () => {
    const selectedTemplate = invoiceTemplates.find(t => t.id === selectedTemplateId);
    if (!selectedTemplate) return null;

    const TemplateComponent = selectedTemplate.component;
    const invoiceData = {
      companyDetails: companyProfile,
      clientDetails: formData.clientDetails,
      invoiceDetails: {
        invoiceNumber: formData.invoiceNumber,
        issueDate: formData.issueDate,
        dueDate: formData.dueDate,
        notes: formData.notes,
        terms: formData.terms,
        taxRate: formData.taxRate
      },
      items: formData.items,
      totals: {
        subtotal: formData.subtotal,
        discountAmount: formData.discountAmount,
        taxableAmount: formData.taxableAmount,
        taxAmount: formData.taxAmount,
        total: formData.total,
        amountInWords: formData.amountInWords
      },
      currency: formData.currency
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Invoice Preview</h3>
            <button
              onClick={() => setShowPreview(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <TemplateComponent {...invoiceData} />
          </div>
        </div>
      </div>
    );
  };

  if (isLoading || !companyProfile) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {showPreview && renderPreview()}
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
              <DocumentTextIcon className="h-8 w-8 mr-3 text-[#1ABC9C]"/>
              Create New Invoice
            </h1>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button 
              type="button" 
              onClick={() => handleSubmit('generate_invoice')}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] disabled:opacity-50"
            >
              {isSaving ? <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" /> : <DocumentTextIcon className="h-5 w-5 mr-2" />}
              Generate Invoice
            </button>
          </div>
        </div>

        {/* Main Content: Form + Template Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Invoice Form */}
          <form onSubmit={(e) => e.preventDefault()} className="lg:col-span-8 space-y-6">
            {/* From/To Section */}
            <div className="bg-white shadow-xl rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* From (Company Details) */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 mb-3">FROM</h3>
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold text-[#2C3E50]">{companyProfile.name}</h2>
                            <p className="text-sm text-gray-600">{companyProfile.address}</p>
                            <p className="text-sm text-gray-600">{companyProfile.phone}</p>
                            <p className="text-sm text-gray-600">{companyProfile.email}</p>
                            <p className="text-sm text-gray-600">GSTIN: {companyProfile.gstin}</p>
                            <p className="text-sm text-gray-600">PAN: {companyProfile.pan}</p>
                        </div>
                    </div>
                    {/* To (Client Details) */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 mb-3">TO</h3>
                        <div className="space-y-2">
                            <label htmlFor="selectedClientId" className="sr-only">Select Client</label>
                            <select
                                name="selectedClientId"
                                id="selectedClientId"
                                value={formData.selectedClientId}
                                onChange={handleClientChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] sm:text-sm"
                            >
                                <option value="">-- Select a Client --</option>
                                {clients.map(client => (
                                    <option key={client.id} value={client.id}>{client.name}</option>
                                ))}
                            </select>
                            {formData.selectedClientId && formData.clientDetails.name && (
                                <div className="space-y-2">
                                    <h2 className="text-lg font-semibold text-[#2C3E50]">{formData.clientDetails.name}</h2>
                                    <p className="text-sm text-gray-600">{formData.clientDetails.address}</p>
                                    <p className="text-sm text-gray-600">{formData.clientDetails.phone}</p>
                                    <p className="text-sm text-gray-600">{formData.clientDetails.email}</p>
                                    {formData.clientDetails.gstin && (
                                        <p className="text-sm text-gray-600">GSTIN: {formData.clientDetails.gstin}</p>
                                    )}
                                    {formData.clientDetails.pan && (
                                        <p className="text-sm text-gray-600">PAN: {formData.clientDetails.pan}</p>
                                    )}
                                </div>
                            )}
                            {!formData.selectedClientId && (
                                <p className="text-sm text-gray-500">
                                    Select a client or <Link to="/dashboard/clients/new" className="text-[#1ABC9C] hover:underline">add new client</Link>.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Invoice Meta Details */}
            <div className="bg-white shadow-xl rounded-lg p-6">
                <h2 className="text-lg font-medium text-[#2C3E50] mb-4 flex items-center">
                    <CalendarDaysIcon className="h-6 w-6 mr-2 text-gray-400"/> Invoice Details
                </h2>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
              <div>
                        <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                <input
                  type="text"
                  name="invoiceNumber"
                  id="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                            placeholder="Enter invoice number"
                />
              </div>
              <div>
                        <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                <input
                  type="date"
                  name="issueDate"
                  id="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                />
              </div>
              <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                />
              </div>
            </div>
          </div>

            {/* Currency Selection */}
            <div className="bg-white shadow-xl rounded-lg p-6">
                <h2 className="text-lg font-medium text-[#2C3E50] mb-4 flex items-center">
                    <CurrencyDollarIcon className="h-6 w-6 mr-2 text-gray-400"/> Currency Settings
                </h2>
                <div className="grid grid-cols-1 gap-4">
            <div>
                        <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">Select Currency</label>
              <select
                            name="currency"
                            id="currency"
                            value={formData.currency}
                onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                        >
                            <option value="INR">INR - Indian Rupee</option>
                            <option value="USD">USD - US Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - British Pound</option>
                            <option value="AED">AED - UAE Dirham</option>
              </select>
            </div>
          </div>
            </div>

            {/* Items Section */}
            <div className="bg-white shadow-xl rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-[#2C3E50] flex items-center">
                  <CurrencyDollarIcon className="h-6 w-6 mr-2 text-gray-400"/>Invoice Items
                </h2>
                <button type="button" onClick={addItem} className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-[#1ABC9C] hover:bg-[#16A085]">
                  <PlusIcon className="h-5 w-5 mr-1" /> Add Item
                </button>
              </div>
            <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-x-4 gap-y-2 items-end p-4 rounded-lg border border-gray-200 hover:border-[#1ABC9C] transition-colors duration-200">
                    <div className="col-span-12 sm:col-span-5">
                      <label htmlFor={`item-desc-${item.id}`} className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                    <input
                      type="text"
                        id={`item-desc-${item.id}`} 
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                        placeholder="Enter item description" 
                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm px-3 py-2"
                    />
                  </div>
                    <div className="col-span-4 sm:col-span-2">
                      <label htmlFor={`item-qty-${item.id}`} className="block text-xs font-medium text-gray-600 mb-1">Quantity</label>
                    <input
                      type="number"
                        id={`item-qty-${item.id}`} 
                      value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)} 
                        min="0" 
                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm px-3 py-2"
                    />
                  </div>
                    <div className="col-span-4 sm:col-span-2">
                      <label htmlFor={`item-rate-${item.id}`} className="block text-xs font-medium text-gray-600 mb-1">Rate ({formData.currency})</label>
                    <input
                        type="text"
                        inputMode="decimal"
                        id={`item-rate-${item.id}`} 
                      value={item.rate}
                        onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)} 
                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm px-3 py-2"
                        placeholder="0.00"
                        style={{ maxLength: 'none' }}
                    />
                  </div>
                    <div className="col-span-3 sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Amount</label>
                      <p className="mt-1.5 text-sm text-gray-800 font-medium py-2 px-3 bg-gray-50 rounded-lg border border-gray-200">{(item.quantity * item.rate).toFixed(2)}</p>
                  </div>
                    <div className="col-span-1 flex items-center justify-end pt-5">
                      {formData.items.length > 1 && (
                        <button type="button" onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 transition-colors duration-200">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                      )}
                    </div>
                </div>
              ))}
            </div>
          </div>

            {/* Summary & Totals */}
            <div className="bg-white shadow-xl rounded-lg p-6">
                <h2 className="text-lg font-medium text-[#2C3E50] mb-4 flex items-center">
                    <PencilSquareIcon className="h-6 w-6 mr-2 text-gray-400"/>Notes, Terms & Totals
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Notes & Terms */}
            <div className="space-y-4">
              <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  id="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                              rows={3} 
                              placeholder="Add any additional notes for the client..." 
                              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm px-3 py-2"
                            ></textarea>
              </div>
              <div>
                            <label htmlFor="terms" className="block text-sm font-medium text-gray-700">Terms & Conditions</label>
                <textarea
                  name="terms"
                  id="terms"
                  value={formData.terms}
                  onChange={handleInputChange}
                              rows={3} 
                              placeholder="Add payment terms, late fee policy, etc..." 
                              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm px-3 py-2"
                            ></textarea>
                        </div>
                    </div>
                    {/* Calculations */}
                    <div className="space-y-3 rounded-lg bg-gray-50 p-6 border border-gray-200">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Subtotal:</span>
                            <span className="text-sm font-medium text-gray-800">{formData.currency} {formData.subtotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                             <label htmlFor="discountValue" className="text-sm text-gray-600">Discount:</label>
                             <div className="flex items-center space-x-2">
                                <input 
                                  type="number" 
                                  name="discountValue" 
                                  id="discountValue" 
                                  value={formData.discountValue} 
                                  onChange={handleInputChange} 
                                  min="0" 
                                  className="w-24 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm text-right px-3 py-2"
                                />
                                <select 
                                  name="discountType" 
                                  value={formData.discountType} 
                                  onChange={handleInputChange} 
                                  className="border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm px-3 py-2"
                                >
                                    <option value="percentage">%</option>
                                    <option value="fixed">{formData.currency}</option>
                                </select>
                             </div>
                        </div>
                         {formData.discountAmount > 0 && (
                            <div className="flex justify-between items-center text-sm text-gray-500 pl-4 bg-gray-100 p-2 rounded-lg">
                                <span>Discount Applied:</span>
                                <span>- {formData.currency} {formData.discountAmount.toFixed(2)}</span>
                            </div>
                        )}

                        <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                           <label htmlFor="taxRate" className="text-sm text-gray-600">Tax (%):</label>
                           <input 
                             type="number" 
                             name="taxRate" 
                             id="taxRate" 
                             value={formData.taxRate} 
                             onChange={handleInputChange} 
                             min="0" 
                             className="w-20 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm text-right px-3 py-2"
                           />
                        </div>
                        {formData.taxAmount > 0 && (
                             <div className="flex justify-between items-center text-sm text-gray-500 pl-4 bg-gray-100 p-2 rounded-lg">
                                <span>Tax Applied:</span>
                                <span>+ {formData.currency} {formData.taxAmount.toFixed(2)}</span>
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-300">
                            <span className="text-lg font-semibold text-[#2C3E50]">Total:</span>
                            <span className="text-lg font-semibold text-[#1ABC9C]">{formData.currency} {formData.total.toFixed(2)}</span>
                        </div>
                    </div>
              </div>
            </div>
          </form>

          {/* Template Selection Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white shadow-xl rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-medium text-[#2C3E50] mb-4 flex items-center">
                <SparklesIcon className="h-6 w-6 mr-2 text-gray-400"/>Select Template
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {invoiceTemplates.map(template => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => handleTemplateSelect(template.id)}
                    disabled={isGeneratingPDF}
                    className={`block rounded-lg border-2 p-4 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] ${
                      selectedTemplateId === template.id 
                        ? 'border-[#1ABC9C] shadow-md bg-[#1ABC9C]/5' 
                        : 'border-gray-300 hover:border-gray-400'
                    } ${isGeneratingPDF ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-32 rounded bg-gray-100 overflow-hidden border border-gray-200">
                          <img 
                            src={templatePreviews[template.id]} 
                            alt={`${template.name} template preview`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/images/templates/placeholder.png';
                            }}
                          />
            </div>
          </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${
                          selectedTemplateId === template.id 
                            ? 'text-[#1ABC9C]' 
                            : 'text-gray-900'
                        }`}>
                          {template.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {template.description}
                        </p>
                        <div className="mt-2">
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTemplateSelect(template.id);
                              setShowPreview(true);
                            }}
                            className="text-xs text-[#1ABC9C] hover:text-[#16A085] font-medium cursor-pointer"
                          >
                            Preview Template
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  {isGeneratingPDF 
                    ? 'Generating PDF... Please wait.' 
                    : 'The selected template will be used for the final invoice PDF.'}
                </p>
            <button
                  type="button"
                  onClick={handlePreview}
                  disabled={isGeneratingPDF}
                  className={`inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] ${
                    isGeneratingPDF ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <EyeIcon className="h-4 w-4 mr-1.5" />
                  Preview Current
            </button>
          </div>
            </div>
          </aside>
        </div>
      </div>
      {/* Add download button after successful generation */}
      {showDownloadButton && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={handleGeneratePDF}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#3498DB] hover:bg-[#2980B9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3498DB]"
          >
            <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateInvoice;