import React from 'react';
import { format } from 'date-fns';

const BaseTemplate = ({ 
  companyDetails,
  clientDetails,
  invoiceDetails,
  items,
  totals,
  currency,
  children,
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
      className={`relative min-h-[297mm] w-[210mm] bg-white p-10 shadow-lg font-sans ${className}`}
      style={{ 
        fontFamily: 'Arial, Helvetica, sans-serif', 
        color: 'var(--text-color, #222)', 
        background: '#fff',
        '--primary-color': 'var(--primary-color, #222)',
        '--accent-color': 'var(--accent-color, #3498db)',
        '--text-color': 'var(--text-color, #222)',
        '--border-color': 'var(--border-color, #ddd)'
      }}
    >
      {/* Watermark - always behind content */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 0, opacity: 0.03 }}
      >
        <div
          style={{
            fontSize: '120px',
            fontWeight: 'bold',
            color: 'var(--primary-color)',
            transform: 'rotate(-45deg)',
            userSelect: 'none',
            lineHeight: 1,
            letterSpacing: '2px',
          }}
        >
          InvoiceNest
        </div>
      </div>

      {/* Main Content - always above watermark */}
      <div className="relative z-10">
        {/* Header */}
        <table style={{ width: '100%', marginBottom: 24 }}>
          <tbody>
            <tr>
              <td colSpan={3} style={{ textAlign: 'center', padding: 0 }}>
                <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 1, marginBottom: 4, color: 'var(--primary-color)' }}>TAX INVOICE</div>
                <div style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>(Original for Recipient)</div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Company & Client Details */}
        <table style={{ width: '100%', marginBottom: 24 }}>
          <tbody>
            <tr>
              <td style={{ width: '50%', verticalAlign: 'top', paddingRight: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 4 }}>BILL FROM</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary-color)', marginBottom: 4 }}>{companyDetails?.name}</div>
                <div style={{ fontSize: 14, marginBottom: 2 }}>{companyDetails?.address}</div>
                <div style={{ fontSize: 14, marginBottom: 2 }}>Phone: {companyDetails?.phone}</div>
                <div style={{ fontSize: 14, marginBottom: 2 }}>Email: {companyDetails?.email}</div>
                <div style={{ fontSize: 14, marginBottom: 2 }}>GSTIN: {companyDetails?.gstin}</div>
                <div style={{ fontSize: 14, marginBottom: 2 }}>PAN: {companyDetails?.pan}</div>
              </td>
              <td style={{ width: '50%', verticalAlign: 'top', paddingLeft: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 4 }}>BILL TO</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary-color)', marginBottom: 4 }}>{clientDetails?.name}</div>
                <div style={{ fontSize: 14, marginBottom: 2 }}>{clientDetails?.address}</div>
                <div style={{ fontSize: 14, marginBottom: 2 }}>Email: {clientDetails?.email}</div>
                <div style={{ fontSize: 14, marginBottom: 2 }}>GSTIN: {clientDetails?.gstin}</div>
                <div style={{ fontSize: 14, marginBottom: 2 }}>PAN: {clientDetails?.pan}</div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Invoice Meta Details */}
        <table style={{ width: '100%', marginBottom: 24 }}>
          <tbody>
            <tr>
              <td style={{ minWidth: 140, padding: '0 24px 0 0', verticalAlign: 'top' }}>
                <div style={{ fontSize: 13, color: '#555', fontWeight: 400, marginBottom: 8 }}>Invoice Number</div>
                <div style={{ fontSize: 18, color: 'var(--primary-color)', fontWeight: 700, lineHeight: 1.4 }}>{invoiceDetails?.invoiceNumber}</div>
              </td>
              <td style={{ minWidth: 140, padding: '0 24px', verticalAlign: 'top' }}>
                <div style={{ fontSize: 13, color: '#555', fontWeight: 400, marginBottom: 8 }}>Issue Date</div>
                <div style={{ fontSize: 18, color: 'var(--primary-color)', fontWeight: 700, lineHeight: 1.4 }}>{formatDate(invoiceDetails?.issueDate)}</div>
              </td>
              <td style={{ minWidth: 140, padding: '0 0 0 24px', verticalAlign: 'top' }}>
                <div style={{ fontSize: 13, color: '#555', fontWeight: 400, marginBottom: 8 }}>Due Date</div>
                <div style={{ fontSize: 18, color: 'var(--primary-color)', fontWeight: 700, lineHeight: 1.4 }}>{formatDate(invoiceDetails?.dueDate)}</div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Items Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', marginBottom: 24 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ textAlign: 'left', padding: '8px', fontSize: 13, color: 'var(--primary-color)', fontWeight: 700 }}>DESCRIPTION</th>
              <th style={{ textAlign: 'center', padding: '8px', fontSize: 13, color: 'var(--primary-color)', fontWeight: 700 }}>QUANTITY</th>
              <th style={{ textAlign: 'center', padding: '8px', fontSize: 13, color: 'var(--primary-color)', fontWeight: 700 }}>RATE</th>
              <th style={{ textAlign: 'right', padding: '8px', fontSize: 13, color: 'var(--primary-color)', fontWeight: 700 }}>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ fontSize: 14, padding: '8px' }}>{item.description}</td>
                <td style={{ fontSize: 14, textAlign: 'center', padding: '8px' }}>{item.quantity}</td>
                <td style={{ fontSize: 14, textAlign: 'center', padding: '8px' }}>{formatCurrency(item.rate)}</td>
                <td style={{ fontSize: 14, textAlign: 'right', padding: '8px' }}>{formatCurrency(item.quantity * item.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tax Summary & Amount in Words */}
        <table style={{ width: '100%', marginBottom: 24 }}>
          <tbody>
            <tr>
              <td style={{ width: '50%', verticalAlign: 'top', paddingRight: 24 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: 'var(--primary-color)' }}>Tax Summary</div>
                <div style={{ fontSize: 14, marginBottom: 2 }}>Taxable Amount: {formatCurrency(totals.taxableAmount)}</div>
                <div style={{ fontSize: 14, marginBottom: 2 }}>GST @ {invoiceDetails?.taxRate}%: {formatCurrency(totals.taxAmount)}</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginTop: 8, color: 'var(--primary-color)' }}>Total Amount: {formatCurrency(totals.total)}</div>
              </td>
              <td style={{ width: '50%', verticalAlign: 'top', paddingLeft: 24 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: 'var(--primary-color)' }}>Amount in Words</div>
                <div style={{ fontSize: 14 }}>{totals.amountInWords}</div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Terms & Notes */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: 'var(--primary-color)' }}>Terms & Conditions</div>
          <div style={{ fontSize: 14, color: '#555' }}>{invoiceDetails?.terms}</div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, textAlign: 'center', fontSize: 14, color: '#888', marginTop: 32 }}>
          <p>We value your partnership and look forward to serving you again.</p>
          <p style={{ marginTop: 4 }}>Generated with InvoiceNest - Professional Invoice Management</p>
        </div>
      </div>
    </div>
  );
};

export default BaseTemplate; 