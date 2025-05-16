import React from 'react';
import BaseTemplate from './BaseTemplate';

const ElegantTemplate = (props) => (
  <BaseTemplate 
    {...props} 
    className="bg-gradient-to-br from-white to-gray-50 border border-gray-200"
    style={{
      '--primary-color': '#2C3E50',
      '--accent-color': '#E74C3C',
      '--text-color': '#2C3E50',
      '--border-color': '#E5E7EB',
    }}
  />
);

export default ElegantTemplate; 