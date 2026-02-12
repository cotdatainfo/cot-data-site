import { COTData } from '../types';

/**
 * Load COT data from JSON file
 * Falls back to empty array if file doesn't exist yet
 */
export function getCOTData(): COTData[] {
  // In browser environment, this will be fetched via API route
  // For now, return empty array - will be populated by client-side fetch
  if (typeof window !== 'undefined') {
    // Browser - data will be loaded by the component
    return [];
  }
  
  // Server-side - try to load from file
  try {
    const fs = require('fs');
    const path = require('path');
    const dataPath = path.join(process.cwd(), 'public', 'data', 'cot-latest.json');
    
    if (fs.existsSync(dataPath)) {
      const fileData = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.warn('Could not load COT data:', error);
  }
  
  // Return empty array if no data available
  return [];
}

export function filterByCategory(data: COTData[], category: string): COTData[] {
  if (category === 'All') return data;
  return data.filter(item => item.category === category);
}

