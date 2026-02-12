// Types for COT Data Dashboard

export interface COTData {
  symbol: string;
  name: string;
  category: 'FX' | 'Metals' | 'Energy' | 'Grains' | 'Index' | 'Bonds' | 'Crypto';
  exchange: string;
  index: number;
  commercial: number;
  commercialChange: number;
  speculators: number;
  speculatorsChange: number;
  lastUpdated: string;
}

export type SignalType = 'Bullish' | 'Bearish' | 'Extreme Bullish' | 'Extreme Bearish' | 'Neutral';

export interface COTMarketData {
  symbol: string;
  name: string;
  signal: SignalType;
  commercialPosition: number;
  speculatorsPosition: number;
  openInterest: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
  tags: string[];
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface Broker {
  name: string;
  rating: number;
  minDeposit: string;
  spreads: string;
  regulation: string;
  affiliateLink: string;
  features: string[];
}

export type CategoryFilter = 'All' | 'FX' | 'Metals' | 'Energy' | 'Grains' | 'Index' | 'Bonds' | 'Crypto';
