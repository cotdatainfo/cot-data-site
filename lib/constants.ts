import { Broker } from '@/lib/types';

/**
 * Featured brokers for the sidebar
 * Note: Replace affiliate links with actual URLs when ready
 */
export const FEATURED_BROKERS: Broker[] = [
  {
    name: 'Pepperstone',
    rating: 4.8,
    minDeposit: '$200',
    spreads: 'From 0.0 pips',
    regulation: 'FCA, ASIC, CySEC',
    affiliateLink: '#',
    features: ['Low spreads', 'Fast execution', 'MetaTrader 4/5'],
  },
  {
    name: 'IC Markets',
    rating: 4.7,
    minDeposit: '$200',
    spreads: 'From 0.0 pips',
    regulation: 'ASIC, CySEC',
    affiliateLink: '#',
    features: ['Raw spreads', 'High leverage', 'cTrader'],
  },
  {
    name: 'XM',
    rating: 4.6,
    minDeposit: '$5',
    spreads: 'From 0.6 pips',
    regulation: 'CySEC, ASIC, IFSC',
    affiliateLink: '#',
    features: ['Low minimum', 'Education', 'Bonuses'],
  },
  {
    name: 'eToro',
    rating: 4.5,
    minDeposit: '$50',
    spreads: 'Variable',
    regulation: 'FCA, CySEC, ASIC',
    affiliateLink: '#',
    features: ['Social trading', 'Copy trading', 'Stocks & Crypto'],
  },
  {
    name: 'Plus500',
    rating: 4.4,
    minDeposit: '$100',
    spreads: 'Tight spreads',
    regulation: 'FCA, CySEC, ASIC',
    affiliateLink: '#',
    features: ['CFD trading', 'Simple platform', '2000+ instruments'],
  },
];

/**
 * Blog categories for filtering
 */
export const BLOG_CATEGORIES = [
  'Currencies',
  'Metals',
  'Indices',
  'Energy',
  'Grains',
  'Crypto',
  'Education',
  'Analysis',
];

/**
 * Market categories for dashboard filtering
 */
export const MARKET_CATEGORIES = [
  'All',
  'FX',
  'Metals',
  'Energy',
  'Grains',
  'Index',
  'Bonds',
  'Crypto',
];

/**
 * Navigation menu items
 */
export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Disclaimers', href: '/disclaimers' },
];

/**
 * Site metadata
 */
export const SITE_CONFIG = {
  name: 'COT Dashboard',
  description: 'Track CFTC Commitment of Traders reports for commodities, currencies, and futures markets.',
  url: 'https://cotdashboard.com',
  logo: '/images/logo.png',
  ogImage: '/og-image.png',
  keywords: [
    'COT',
    'CFTC',
    'Commitment of Traders',
    'commodity trading',
    'futures trading',
    'market analysis',
    'trading dashboard',
  ],
};
