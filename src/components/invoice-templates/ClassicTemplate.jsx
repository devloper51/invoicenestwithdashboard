import React from 'react';
import { format } from 'date-fns';

const ClassicTemplate = ({
  companyDetails,
  clientDetails,
  invoiceDetails,
  items,
  totals,
  currency,
  className = '',
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div
      className={`relative min-h-[297mm] w-[210mm] bg-white p-10 shadow-lg font-sans border-2 border-gray-900 ${className}`}
      style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#222', background: '#fff' }}
    >
      {/* Header */}
      <table style={{ width: '100%', marginBottom: 24 }}>
        <tbody>
          <tr>
            <td colSpan={3} style={{ textAlign: 'center', padding: 0 }}>
              <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>TAX INVOICE</div>
              <div style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>(Original for Recipient)</div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Company & Client Details */}
      <div className="flex justify-between mb-6">
        <div>
          <div className="text-xs font-semibold text-gray-500 mb-1">BILL FROM</div>
          <div className="text-lg font-bold mb-1" style={{ color: '#2C3E50' }}>{companyDetails?.name}</div>
          <div className="text-sm mb-1">{companyDetails?.address}</div>
          <div className="text-sm mb-1">Phone: {companyDetails?.phone}</div>
          <div className="text-sm mb-1">Email: {companyDetails?.email}</div>
          <div className="text-sm mb-1">GSTIN: {companyDetails?.gstin}</div>
          <div className="text-sm mb-1">PAN: {companyDetails?.pan}</div>
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-500 mb-1">BILL TO</div>
          <div className="text-lg font-bold mb-1" style={{ color: '#2C3E50' }}>{clientDetails?.name}</div>
          <div className="text-sm mb-1">{clientDetails?.address}</div>
          <div className="text-sm mb-1">Email: {clientDetails?.email}</div>
          <div className="text-sm mb-1">GSTIN: {clientDetails?.gstin}</div>
          <div className="text-sm mb-1">PAN: {clientDetails?.pan}</div>
        </div>
      </div>

      {/* Invoice Meta Details */}
      <table style={{ width: '100%', marginBottom: 24 }}>
        <tbody>
          <tr>
            <td style={{ minWidth: 140, padding: '0 24px 0 0', verticalAlign: 'top' }}>
              <div style={{ fontSize: 13, color: '#555', fontWeight: 400, marginBottom: 8 }}>Invoice Number</div>
              <div style={{ fontSize: 18, color: '#222', fontWeight: 700, lineHeight: 1.4 }}>{invoiceDetails?.invoiceNumber}</div>
            </td>
            <td style={{ minWidth: 140, padding: '0 24px', verticalAlign: 'top' }}>
              <div style={{ fontSize: 13, color: '#555', fontWeight: 400, marginBottom: 8 }}>Issue Date</div>
              <div style={{ fontSize: 18, color: '#222', fontWeight: 700, lineHeight: 1.4 }}>{formatDate(invoiceDetails?.issueDate)}</div>
            </td>
            <td style={{ minWidth: 140, padding: '0 0 0 24px', verticalAlign: 'top' }}>
              <div style={{ fontSize: 13, color: '#555', fontWeight: 400, marginBottom: 8 }}>Due Date</div>
              <div style={{ fontSize: 18, color: '#222', fontWeight: 700, lineHeight: 1.4 }}>{formatDate(invoiceDetails?.dueDate)}</div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Items Table */}
      <table className="w-full mb-6" style={{ borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #222' }}>
            <th className="text-xs text-left py-2 px-2 font-semibold">DESCRIPTION</th>
            <th className="text-xs text-center py-2 px-2 font-semibold">QUANTITY</th>
            <th className="text-xs text-center py-2 px-2 font-semibold">RATE</th>
            <th className="text-xs text-right py-2 px-2 font-semibold">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
              <td className="text-sm py-2 px-2">{item.description}</td>
              <td className="text-sm text-center py-2 px-2">{item.quantity}</td>
              <td className="text-sm text-center py-2 px-2">{formatCurrency(item.rate)}</td>
              <td className="text-sm text-right py-2 px-2">{formatCurrency(item.quantity * item.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tax Summary & Amount in Words */}
      <table style={{ width: '100%', marginBottom: 24 }}>
        <tbody>
          <tr>
            <td style={{ width: '50%', verticalAlign: 'top', paddingRight: 24 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Tax Summary</div>
              <div style={{ fontSize: 14, marginBottom: 2 }}>Taxable Amount: {formatCurrency(totals.taxableAmount)}</div>
              <div style={{ fontSize: 14, marginBottom: 2 }}>GST @ {invoiceDetails?.taxRate}%: {formatCurrency(totals.taxAmount)}</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginTop: 8 }}>Total Amount: {formatCurrency(totals.total)}</div>
            </td>
            <td style={{ width: '50%', verticalAlign: 'top', paddingLeft: 24 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Amount in Words</div>
              <div style={{ fontSize: 14 }}>{totals.amountInWords}</div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Terms & Notes */}
      <div className="mb-6">
        <div className="text-sm font-semibold mb-1">Terms & Conditions</div>
        <div className="text-sm text-gray-700">{invoiceDetails?.terms}</div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500 mt-8">
        <p>We value your partnership and look forward to serving you again.</p>
        <p className="mt-1">Generated with InvoiceNest - Professional Invoice Management</p>
      </div>
    </div>
  );
};

export default ClassicTemplate; 