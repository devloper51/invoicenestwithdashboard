import React from 'react';
import BaseTemplate from './BaseTemplate';

const CorporateTemplate = (props) => (
  <BaseTemplate 
    {...props} 
    className="bg-white border-2 border-gray-800"
    style={{
      '--primary-color': '#1A365D',
      '--accent-color': '#2B6CB0',
      '--text-color': '#1A365D',
      '--border-color': '#2D3748',
    }}
  />
);

export default CorporateTemplate; 