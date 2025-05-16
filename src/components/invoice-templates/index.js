import ClassicTemplate from './ClassicTemplate';
import ModernTemplate from './ModernTemplate';
import SimpleTemplate from './SimpleTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import MinimalTemplate from './MinimalTemplate';
import ElegantTemplate from './ElegantTemplate';
import CorporateTemplate from './CorporateTemplate';

export const invoiceTemplates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional design with clear sections',
    thumbnail: '/templates/classic.png',
    component: ClassicTemplate
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with accent colors',
    thumbnail: '/templates/modern.png',
    component: ModernTemplate
  },
  {
    id: 'simple',
    name: 'Simple',
    description: 'Clean and minimal design',
    thumbnail: '/templates/simple.png',
    component: SimpleTemplate
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Business-focused design with emphasis on details',
    thumbnail: '/templates/professional.png',
    component: ProfessionalTemplate
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean design with essential information',
    thumbnail: '/templates/minimal.png',
    component: MinimalTemplate
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated design with premium feel',
    thumbnail: '/templates/elegant.png',
    component: ElegantTemplate
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Formal design suitable for large organizations',
    thumbnail: '/templates/corporate.png',
    component: CorporateTemplate
  }
];

export {
  ClassicTemplate,
  ModernTemplate,
  SimpleTemplate,
  ProfessionalTemplate,
  MinimalTemplate,
  ElegantTemplate,
  CorporateTemplate
}; 