import { SignalType } from '@/lib/types';

/**
 * Format COT data for display
 */
export function formatCOTData(value: number, decimals: number = 0): string {
  if (Math.abs(value) >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toFixed(decimals);
}

/**
 * Format change value with + or - sign
 */
export function formatChange(value: number): string {
  const prefix = value >= 0 ? '+' : '';
  return `${prefix}${formatCOTData(value)}`;
}

/**
 * Get color class for signal type
 */
export function getColorForSignal(signal: SignalType): string {
  switch (signal) {
    case 'Bullish':
      return 'text-green-400';
    case 'Bearish':
      return 'text-red-400';
    case 'Extreme Bullish':
      return 'text-purple-400';
    case 'Extreme Bearish':
      return 'text-blue-400';
    case 'Neutral':
    default:
      return 'text-gray-400';
  }
}

/**
 * Get background color for signal badges
 */
export function getBgColorForSignal(signal: SignalType): string {
  switch (signal) {
    case 'Bullish':
      return 'bg-green-500/10 border-green-500';
    case 'Bearish':
      return 'bg-red-500/10 border-red-500';
    case 'Extreme Bullish':
      return 'bg-purple-500/10 border-purple-500';
    case 'Extreme Bearish':
      return 'bg-blue-500/10 border-blue-500';
    case 'Neutral':
    default:
      return 'bg-gray-700/10 border-gray-700';
  }
}

/**
 * Calculate signal based on COT data thresholds
 */
export function calculateSignal(
  commercial: number,
  speculators: number,
  historicalRange?: { min: number; max: number }
): SignalType {
  const netPosition = commercial - speculators;
  
  if (historicalRange) {
    const range = historicalRange.max - historicalRange.min;
    const threshold = range * 0.2; // 20% threshold for extreme
    
    if (netPosition > historicalRange.max - threshold) {
      return 'Extreme Bullish';
    }
    if (netPosition < historicalRange.min + threshold) {
      return 'Extreme Bearish';
    }
  }
  
  if (netPosition > 0) {
    return commercial > speculators * 1.5 ? 'Bullish' : 'Neutral';
  } else if (netPosition < 0) {
    return speculators > commercial * 1.5 ? 'Bearish' : 'Neutral';
  }
  
  return 'Neutral';
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format percentage change
 */
export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}

/**
 * Get category color
 */
export function getCategoryColor(category: string): string {
  const colors: { [key: string]: string } = {
    FX: 'text-blue-400',
    Metals: 'text-yellow-400',
    Energy: 'text-orange-400',
    Grains: 'text-green-400',
    Index: 'text-purple-400',
    Bonds: 'text-pink-400',
    Crypto: 'text-cyan-400',
  };
  return colors[category] || 'text-gray-400';
}
