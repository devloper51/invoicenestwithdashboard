import React from 'react';
import { format } from 'date-fns';

const splitLines = (str, chunkSize = 25) => {
  if (!str) return [];
  const result = [];
  for (let i = 0; i < str.length; i += chunkSize) {
    result.push(str.slice(i, i + chunkSize));
  }
  return result;
};

const ProfessionalTemplate = ({
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

  const textBlock = (text, style = {}, split = false, mono = false) => (
    split
      ? splitLines(text).map((line, idx) => (
          <div key={idx} style={{ wordBreak: 'break-all', overflowWrap: 'break-word', lineHeight: 1.5, fontFamily: mono ? 'monospace' : undefined, fontSize: 11, fontWeight: 400, ...style }}>{line}</div>
        ))
      : <div style={{ wordBreak: 'break-all', overflowWrap: 'break-word', lineHeight: 1.5, fontFamily: mono ? 'monospace' : undefined, fontSize: 11, fontWeight: 400, ...style }}>{text}</div>
  );

  return (
    <div
      className={`min-h-[297mm] bg-white font-sans ${className}`}
      style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#1A365D', background: '#fff', width: '190mm', margin: '0 auto' }}
    >
      {/* Header */}
      <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 2, marginBottom: 8, textAlign: 'left', color: '#2B6CB0', textTransform: 'uppercase', padding: 0 }}>TAX INVOICE</div>
      <div style={{ fontSize: 12, color: '#4A5568', marginBottom: 24, textAlign: 'left', padding: 0 }}>(Original for Recipient)</div>

      {/* Company & Client Details (Manual line splitting, monospace, small font) */}
      <div style={{ width: '100%', background: '#fff', minHeight: 120, marginBottom: 12, padding: 0 }}>
        {textBlock('FROM', { fontSize: 10, fontWeight: 700, color: '#A0AEC0', marginBottom: 2 }, false)}
        {textBlock(companyDetails?.name, { fontSize: 16, fontWeight: 800, color: '#1A365D', marginBottom: 2 }, false)}
        {textBlock(companyDetails?.address, {}, true, true)}
        {textBlock(`Phone: ${companyDetails?.phone}`, {}, false, true)}
        {textBlock(`Email: ${companyDetails?.email}`, {}, true, true)}
        {textBlock(`GSTIN: ${companyDetails?.gstin}`, {}, true, true)}
        {textBlock(`PAN: ${companyDetails?.pan}`, {}, true, true)}
      </div>
      <div style={{ height: 10 }} />
      <div style={{ width: '100%', background: '#fff', minHeight: 120, marginBottom: 24, padding: 0 }}>
        {textBlock('TO', { fontSize: 10, fontWeight: 700, color: '#A0AEC0', marginBottom: 2 }, false)}
        {textBlock(clientDetails?.name, { fontSize: 16, fontWeight: 800, color: '#1A365D', marginBottom: 2 }, false)}
        {textBlock(clientDetails?.address, {}, true, true)}
        {textBlock(`Email: ${clientDetails?.email}`, {}, true, true)}
        {textBlock(`GSTIN: ${clientDetails?.gstin}`, {}, true, true)}
        {textBlock(`PAN: ${clientDetails?.pan}`, {}, true, true)}
      </div>

      {/* Invoice Meta Details (Table layout) */}
      <table style={{ width: '100%', marginBottom: 24, tableLayout: 'fixed' }}>
        <tbody>
          <tr>
            <td style={{ width: '33%', verticalAlign: 'top', paddingRight: 12 }}>
              <div style={{ fontSize: 11, color: '#A0AEC0', fontWeight: 700, marginBottom: 2 }}>Invoice Number</div>
              <div style={{ fontSize: 12, color: '#2B6CB0', fontWeight: 800, wordBreak: 'break-all' }}>{invoiceDetails?.invoiceNumber}</div>
            </td>
            <td style={{ width: '33%', verticalAlign: 'top', padding: '0 6px' }}>
              <div style={{ fontSize: 11, color: '#A0AEC0', fontWeight: 700, marginBottom: 2 }}>Issue Date</div>
              <div style={{ fontSize: 12, color: '#2B6CB0', fontWeight: 800 }}>{formatDate(invoiceDetails?.issueDate)}</div>
            </td>
            <td style={{ width: '33%', verticalAlign: 'top', paddingLeft: 12 }}>
              <div style={{ fontSize: 11, color: '#A0AEC0', fontWeight: 700, marginBottom: 2 }}>Due Date</div>
              <div style={{ fontSize: 12, color: '#2B6CB0', fontWeight: 800 }}>{formatDate(invoiceDetails?.dueDate)}</div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Items Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px 0', fontSize: 11, color: '#2B6CB0', fontWeight: 900, borderBottom: '2px solid #2B6CB0', background: '#F7FAFC' }}>DESCRIPTION</th>
            <th style={{ textAlign: 'center', padding: '8px 0', fontSize: 11, color: '#2B6CB0', fontWeight: 900, borderBottom: '2px solid #2B6CB0', background: '#F7FAFC' }}>QUANTITY</th>
            <th style={{ textAlign: 'center', padding: '8px 0', fontSize: 11, color: '#2B6CB0', fontWeight: 900, borderBottom: '2px solid #2B6CB0', background: '#F7FAFC' }}>RATE</th>
            <th style={{ textAlign: 'right', padding: '8px 0', fontSize: 11, color: '#2B6CB0', fontWeight: 900, borderBottom: '2px solid #2B6CB0', background: '#F7FAFC' }}>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td style={{ fontSize: 11, padding: '8px 0', borderBottom: '1px solid #E2E8F0' }}>{item.description}</td>
              <td style={{ fontSize: 11, textAlign: 'center', padding: '8px 0', borderBottom: '1px solid #E2E8F0' }}>{item.quantity}</td>
              <td style={{ fontSize: 11, textAlign: 'center', padding: '8px 0', borderBottom: '1px solid #E2E8F0' }}>{formatCurrency(item.rate)}</td>
              <td style={{ fontSize: 11, textAlign: 'right', padding: '8px 0', borderBottom: '1px solid #E2E8F0' }}>{formatCurrency(item.quantity * item.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tax Summary & Amount in Words */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: '#2B6CB0', marginBottom: 4 }}>Tax Summary</div>
          <div style={{ fontSize: 11, marginBottom: 2 }}>Taxable Amount: {formatCurrency(totals.taxableAmount)}</div>
          <div style={{ fontSize: 11, marginBottom: 2 }}>GST @ {invoiceDetails?.taxRate}%: {formatCurrency(totals.taxAmount)}</div>
        </div>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: '#2B6CB0', marginBottom: 4 }}>Total Amount</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#1A365D', marginBottom: 8 }}>{formatCurrency(totals.total)}</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', marginBottom: 4 }}>Amount in Words</div>
          <div style={{ fontSize: 11 }}>{totals.amountInWords}</div>
        </div>
      </div>

      {/* Terms & Notes */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 900, color: '#2B6CB0', marginBottom: 4 }}>Terms & Conditions</div>
        <div style={{ fontSize: 11, color: '#4A5568' }}>{invoiceDetails?.terms}</div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '2px solid #2B6CB0', paddingTop: 16, textAlign: 'right', fontSize: 11, color: '#A0AEC0', marginTop: 24 }}>
        <p>We value your partnership and look forward to serving you again.</p>
        <p style={{ marginTop: 4 }}>Generated with InvoiceNest - Professional Invoice Management</p>
      </div>
    </div>
  );
};

export default ProfessionalTemplate; 