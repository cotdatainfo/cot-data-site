/**
 * CFTC Market Mappings
 * Maps CFTC commodity codes to our dashboard format
 * CFTC publishes COT reports with specific market codes
 */

export interface CFTCMarket {
  cftcCode: string;        // CFTC's internal code
  symbol: string;          // Our display symbol (e.g., 'EUR/USD', 'GC')
  name: string;            // Full name
  category: 'FX' | 'Metals' | 'Energy' | 'Grains' | 'Index' | 'Bonds' | 'Crypto';
  exchange: string;        // CME, COMEX, NYMEX, etc.
  contractSize?: string;   // Optional - for reference
}

/**
 * All markets we track from CFTC reports
 * These codes come from CFTC's "Disaggregated Futures Only" reports
 */
export const CFTC_MARKETS: CFTCMarket[] = [
  // ========== CURRENCIES (FX) ==========
  {
    cftcCode: '099741',
    symbol: 'EUR/USD',
    name: 'Euro FX',
    category: 'FX',
    exchange: 'CME',
    contractSize: '125,000 EUR'
  },
  {
    cftcCode: '096742',
    symbol: 'GBP/USD',
    name: 'British Pound',
    category: 'FX',
    exchange: 'CME',
    contractSize: '62,500 GBP'
  },
  {
    cftcCode: '097741',
    symbol: 'JPY/USD',
    name: 'Japanese Yen',
    category: 'FX',
    exchange: 'CME',
    contractSize: '12,500,000 JPY'
  },
  {
    cftcCode: '232741',
    symbol: 'AUD/USD',
    name: 'Australian Dollar',
    category: 'FX',
    exchange: 'CME',
    contractSize: '100,000 AUD'
  },
  {
    cftcCode: '090741',
    symbol: 'CAD/USD',
    name: 'Canadian Dollar',
    category: 'FX',
    exchange: 'CME',
    contractSize: '100,000 CAD'
  },
  {
    cftcCode: '092741',
    symbol: 'CHF/USD',
    name: 'Swiss Franc',
    category: 'FX',
    exchange: 'CME',
    contractSize: '125,000 CHF'
  },
  {
    cftcCode: '112741',
    symbol: 'NZD/USD',
    name: 'New Zealand Dollar',
    category: 'FX',
    exchange: 'CME',
    contractSize: '100,000 NZD'
  },
  {
    cftcCode: '095741',
    symbol: 'MXN/USD',
    name: 'Mexican Peso',
    category: 'FX',
    exchange: 'CME',
    contractSize: '500,000 MXN'
  },

  // ========== METALS ==========
  {
    cftcCode: '088691',
    symbol: 'GC',
    name: 'Gold',
    category: 'Metals',
    exchange: 'COMEX',
    contractSize: '100 troy oz'
  },
  {
    cftcCode: '084691',
    symbol: 'SI',
    name: 'Silver',
    category: 'Metals',
    exchange: 'COMEX',
    contractSize: '5,000 troy oz'
  },
  {
    cftcCode: '085692',
    symbol: 'HG',
    name: 'Copper',
    category: 'Metals',
    exchange: 'COMEX',
    contractSize: '25,000 lbs'
  },
  {
    cftcCode: '076651',
    symbol: 'PL',
    name: 'Platinum',
    category: 'Metals',
    exchange: 'NYMEX',
    contractSize: '50 troy oz'
  },
  {
    cftcCode: '080732',
    symbol: 'PA',
    name: 'Palladium',
    category: 'Metals',
    exchange: 'NYMEX',
    contractSize: '100 troy oz'
  },

  // ========== ENERGY ==========
  {
    cftcCode: '067651',
    symbol: 'CL',
    name: 'Crude Oil WTI',
    category: 'Energy',
    exchange: 'NYMEX',
    contractSize: '1,000 barrels'
  },
  {
    cftcCode: '023651',
    symbol: 'NG',
    name: 'Natural Gas',
    category: 'Energy',
    exchange: 'NYMEX',
    contractSize: '10,000 MMBtu'
  },
  {
    cftcCode: '022651',
    symbol: 'HO',
    name: 'Heating Oil',
    category: 'Energy',
    exchange: 'NYMEX',
    contractSize: '42,000 gallons'
  },
  {
    cftcCode: '026651',
    symbol: 'RB',
    name: 'Gasoline RBOB',
    category: 'Energy',
    exchange: 'NYMEX',
    contractSize: '42,000 gallons'
  },

  // ========== GRAINS ==========
  {
    cftcCode: '002602',
    symbol: 'C',
    name: 'Corn',
    category: 'Grains',
    exchange: 'CBOT',
    contractSize: '5,000 bushels'
  },
  {
    cftcCode: '001602',
    symbol: 'W',
    name: 'Wheat',
    category: 'Grains',
    exchange: 'CBOT',
    contractSize: '5,000 bushels'
  },
  {
    cftcCode: '005602',
    symbol: 'S',
    name: 'Soybeans',
    category: 'Grains',
    exchange: 'CBOT',
    contractSize: '5,000 bushels'
  },
  {
    cftcCode: '007602',
    symbol: 'SM',
    name: 'Soybean Meal',
    category: 'Grains',
    exchange: 'CBOT',
    contractSize: '100 short tons'
  },
  {
    cftcCode: '006602',
    symbol: 'BO',
    name: 'Soybean Oil',
    category: 'Grains',
    exchange: 'CBOT',
    contractSize: '60,000 lbs'
  },
  {
    cftcCode: '004603',
    symbol: 'KW',
    name: 'Kansas Wheat',
    category: 'Grains',
    exchange: 'KCBT',
    contractSize: '5,000 bushels'
  },

  // ========== SOFTS (part of Grains category) ==========
  {
    cftcCode: '083731',
    symbol: 'CC',
    name: 'Cocoa',
    category: 'Grains',
    exchange: 'ICE',
    contractSize: '10 metric tons'
  },
  {
    cftcCode: '080732',
    symbol: 'KC',
    name: 'Coffee',
    category: 'Grains',
    exchange: 'ICE',
    contractSize: '37,500 lbs'
  },
  {
    cftcCode: '080731',
    symbol: 'SB',
    name: 'Sugar #11',
    category: 'Grains',
    exchange: 'ICE',
    contractSize: '112,000 lbs'
  },
  {
    cftcCode: '033661',
    symbol: 'CT',
    name: 'Cotton',
    category: 'Grains',
    exchange: 'ICE',
    contractSize: '50,000 lbs'
  },

  // ========== INDICES ==========
  {
    cftcCode: '13874+',
    symbol: 'ES',
    name: 'S&P 500',
    category: 'Index',
    exchange: 'CME',
    contractSize: '$50 x index'
  },
  {
    cftcCode: '209742',
    symbol: 'NQ',
    name: 'Nasdaq 100',
    category: 'Index',
    exchange: 'CME',
    contractSize: '$20 x index'
  },
  {
    cftcCode: '124603',
    symbol: 'YM',
    name: 'Dow Jones',
    category: 'Index',
    exchange: 'CBOT',
    contractSize: '$5 x index'
  },
  {
    cftcCode: '239742',
    symbol: 'RTY',
    name: 'Russell 2000',
    category: 'Index',
    exchange: 'CME',
    contractSize: '$50 x index'
  },
  {
    cftcCode: '1170E1',
    symbol: 'VIX',
    name: 'VIX Volatility Index',
    category: 'Index',
    exchange: 'CFE',
    contractSize: '$1000 x index'
  },

  // ========== BONDS ==========
  {
    cftcCode: '020601',
    symbol: 'ZN',
    name: '10-Year Treasury Note',
    category: 'Bonds',
    exchange: 'CBOT',
    contractSize: '$100,000'
  },
  {
    cftcCode: '043602',
    symbol: 'ZB',
    name: '30-Year Treasury Bond',
    category: 'Bonds',
    exchange: 'CBOT',
    contractSize: '$100,000'
  },
  {
    cftcCode: '042601',
    symbol: 'ZF',
    name: '5-Year Treasury Note',
    category: 'Bonds',
    exchange: 'CBOT',
    contractSize: '$100,000'
  },
  {
    cftcCode: '044601',
    symbol: 'ZT',
    name: '2-Year Treasury Note',
    category: 'Bonds',
    exchange: 'CBOT',
    contractSize: '$200,000'
  },

  // ========== CRYPTO ==========
  {
    cftcCode: '133741',
    symbol: 'BTC',
    name: 'Bitcoin Futures',
    category: 'Crypto',
    exchange: 'CME',
    contractSize: '5 BTC'
  },
  {
    cftcCode: '146021',
    symbol: 'ETH',
    name: 'Ethereum Futures',
    category: 'Crypto',
    exchange: 'CME',
    contractSize: '50 ETH'
  },
];

/**
 * Get market info by CFTC code
 */
export function getMarketByCode(cftcCode: string): CFTCMarket | undefined {
  return CFTC_MARKETS.find(m => m.cftcCode === cftcCode);
}

/**
 * Get all markets by category
 */
export function getMarketsByCategory(category: string): CFTCMarket[] {
  if (category === 'All') return CFTC_MARKETS;
  return CFTC_MARKETS.filter(m => m.category === category);
}

/**
 * Get list of all CFTC codes we track
 */
export function getAllCFTCCodes(): string[] {
  return CFTC_MARKETS.map(m => m.cftcCode);
}
