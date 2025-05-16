import React from 'react';
import { format } from 'date-fns';

const SimpleTemplate = ({
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
      className={`min-h-[297mm] w-[210mm] p-12 font-sans bg-white ${className}`}
      style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#222', background: '#fff' }}
    >
      {/* Header */}
      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 1, marginBottom: 8, textAlign: 'left', color: '#222' }}>TAX INVOICE</div>
      <div style={{ fontSize: 13, color: '#888', marginBottom: 32, textAlign: 'left' }}>(Original for Recipient)</div>

      {/* Company & Client Details */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#bbb', marginBottom: 2 }}>FROM</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#222', marginBottom: 2 }}>{companyDetails?.name}</div>
          <div style={{ fontSize: 14, marginBottom: 1 }}>{companyDetails?.address}</div>
          <div style={{ fontSize: 14, marginBottom: 1 }}>Phone: {companyDetails?.phone}</div>
          <div style={{ fontSize: 14, marginBottom: 1 }}>Email: {companyDetails?.email}</div>
          <div style={{ fontSize: 14, marginBottom: 1 }}>GSTIN: {companyDetails?.gstin}</div>
          <div style={{ fontSize: 14, marginBottom: 1 }}>PAN: {companyDetails?.pan}</div>
        </div>
        <div style={{ minWidth: 0, flex: 1, marginLeft: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#bbb', marginBottom: 2 }}>TO</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#222', marginBottom: 2 }}>{clientDetails?.name}</div>
          <div style={{ fontSize: 14, marginBottom: 1 }}>{clientDetails?.address}</div>
          <div style={{ fontSize: 14, marginBottom: 1 }}>Email: {clientDetails?.email}</div>
          <div style={{ fontSize: 14, marginBottom: 1 }}>GSTIN: {clientDetails?.gstin}</div>
          <div style={{ fontSize: 14, marginBottom: 1 }}>PAN: {clientDetails?.pan}</div>
        </div>
      </div>

      {/* Invoice Meta Details */}
      <div style={{ display: 'flex', gap: 48, marginBottom: 32 }}>
        <div>
          <div style={{ fontSize: 12, color: '#bbb', fontWeight: 500, marginBottom: 2 }}>Invoice Number</div>
          <div style={{ fontSize: 16, color: '#222', fontWeight: 700 }}>{invoiceDetails?.invoiceNumber}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#bbb', fontWeight: 500, marginBottom: 2 }}>Issue Date</div>
          <div style={{ fontSize: 16, color: '#222', fontWeight: 700 }}>{formatDate(invoiceDetails?.issueDate)}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#bbb', fontWeight: 500, marginBottom: 2 }}>Due Date</div>
          <div style={{ fontSize: 16, color: '#222', fontWeight: 700 }}>{formatDate(invoiceDetails?.dueDate)}</div>
        </div>
      </div>

      {/* Items Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 32 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px 0', fontSize: 13, color: '#bbb', fontWeight: 700, borderBottom: '1px solid #eee' }}>DESCRIPTION</th>
            <th style={{ textAlign: 'center', padding: '8px 0', fontSize: 13, color: '#bbb', fontWeight: 700, borderBottom: '1px solid #eee' }}>QUANTITY</th>
            <th style={{ textAlign: 'center', padding: '8px 0', fontSize: 13, color: '#bbb', fontWeight: 700, borderBottom: '1px solid #eee' }}>RATE</th>
            <th style={{ textAlign: 'right', padding: '8px 0', fontSize: 13, color: '#bbb', fontWeight: 700, borderBottom: '1px solid #eee' }}>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td style={{ fontSize: 14, padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>{item.description}</td>
              <td style={{ fontSize: 14, textAlign: 'center', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>{item.quantity}</td>
              <td style={{ fontSize: 14, textAlign: 'center', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>{formatCurrency(item.rate)}</td>
              <td style={{ fontSize: 14, textAlign: 'right', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>{formatCurrency(item.quantity * item.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tax Summary & Amount in Words */}
      <div style={{ display: 'flex', gap: 48, marginBottom: 32 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#bbb', marginBottom: 4 }}>Tax Summary</div>
          <div style={{ fontSize: 14, marginBottom: 2 }}>Taxable Amount: {formatCurrency(totals.taxableAmount)}</div>
          <div style={{ fontSize: 14, marginBottom: 2 }}>GST @ {invoiceDetails?.taxRate}%: {formatCurrency(totals.taxAmount)}</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 8 }}>Total Amount: {formatCurrency(totals.total)}</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#bbb', marginBottom: 4 }}>Amount in Words</div>
          <div style={{ fontSize: 14 }}>{totals.amountInWords}</div>
        </div>
      </div>

      {/* Terms & Notes */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#bbb', marginBottom: 4 }}>Terms & Conditions</div>
        <div style={{ fontSize: 14, color: '#555' }}>{invoiceDetails?.terms}</div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #eee', paddingTop: 24, textAlign: 'left', fontSize: 13, color: '#bbb', marginTop: 32 }}>
        <p>We value your partnership and look forward to serving you again.</p>
        <p style={{ marginTop: 4 }}>Generated with InvoiceNest - Professional Invoice Management</p>
      </div>
    </div>
  );
};

export default SimpleTemplate; 