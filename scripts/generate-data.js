/**
 * COT Data Generator (Starter Version)
 * Generates realistic COT data based on market patterns
 * 
 * This is a starter version. Once tested, we'll switch to real CFTC API fetching.
 * For now, this generates data that looks and behaves like real COT data.
 */

const fs = require('fs');
const path = require('path');

// Import our market definitions
const markets = [
  // FX (7 - removed MXN, keeping major pairs only)
  { cftcCode: '099741', symbol: 'EUR/USD', name: 'Euro FX', category: 'FX', exchange: 'CME' },
  { cftcCode: '096742', symbol: 'GBP/USD', name: 'British Pound', category: 'FX', exchange: 'CME' },
  { cftcCode: '097741', symbol: 'JPY/USD', name: 'Japanese Yen', category: 'FX', exchange: 'CME' },
  { cftcCode: '232741', symbol: 'AUD/USD', name: 'Australian Dollar', category: 'FX', exchange: 'CME' },
  { cftcCode: '090741', symbol: 'CAD/USD', name: 'Canadian Dollar', category: 'FX', exchange: 'CME' },
  { cftcCode: '092741', symbol: 'CHF/USD', name: 'Swiss Franc', category: 'FX', exchange: 'CME' },
  { cftcCode: '112741', symbol: 'NZD/USD', name: 'New Zealand Dollar', category: 'FX', exchange: 'CME' },
  
  // Metals (4 - removed Palladium, keeping most liquid)
  { cftcCode: '088691', symbol: 'GC', name: 'Gold', category: 'Metals', exchange: 'COMEX' },
  { cftcCode: '084691', symbol: 'SI', name: 'Silver', category: 'Metals', exchange: 'COMEX' },
  { cftcCode: '085692', symbol: 'HG', name: 'Copper', category: 'Metals', exchange: 'COMEX' },
  { cftcCode: '076651', symbol: 'PL', name: 'Platinum', category: 'Metals', exchange: 'NYMEX' },
  
  // Energy (4 - all highly liquid)
  { cftcCode: '067651', symbol: 'CL', name: 'Crude Oil WTI', category: 'Energy', exchange: 'NYMEX' },
  { cftcCode: '023651', symbol: 'NG', name: 'Natural Gas', category: 'Energy', exchange: 'NYMEX' },
  { cftcCode: '022651', symbol: 'HO', name: 'Heating Oil', category: 'Energy', exchange: 'NYMEX' },
  { cftcCode: '026651', symbol: 'RB', name: 'Gasoline RBOB', category: 'Energy', exchange: 'NYMEX' },
  
  // Grains & Softs (13 - added Coffee, OJ, Lumber, Cattle, Hogs)
  { cftcCode: '002602', symbol: 'C', name: 'Corn', category: 'Grains', exchange: 'CBOT' },
  { cftcCode: '001602', symbol: 'W', name: 'Wheat', category: 'Grains', exchange: 'CBOT' },
  { cftcCode: '005602', symbol: 'S', name: 'Soybeans', category: 'Grains', exchange: 'CBOT' },
  { cftcCode: '007602', symbol: 'SM', name: 'Soybean Meal', category: 'Grains', exchange: 'CBOT' },
  { cftcCode: '006602', symbol: 'BO', name: 'Soybean Oil', category: 'Grains', exchange: 'CBOT' },
  { cftcCode: '083731', symbol: 'CC', name: 'Cocoa', category: 'Grains', exchange: 'ICE' },
  { cftcCode: '083661', symbol: 'KC', name: 'Coffee', category: 'Grains', exchange: 'ICE' },  // ← FIXED!
  { cftcCode: '080731', symbol: 'SB', name: 'Sugar #11', category: 'Grains', exchange: 'ICE' },
  { cftcCode: '033661', symbol: 'CT', name: 'Cotton', category: 'Grains', exchange: 'ICE' },
  { cftcCode: '040701', symbol: 'OJ', name: 'Orange Juice', category: 'Grains', exchange: 'ICE' },  // NEW
  { cftcCode: '058643', symbol: 'LB', name: 'Lumber', category: 'Grains', exchange: 'CME' },  // NEW
  { cftcCode: '057642', symbol: 'LE', name: 'Live Cattle', category: 'Grains', exchange: 'CME' },  // NEW
  { cftcCode: '054642', symbol: 'HE', name: 'Lean Hogs', category: 'Grains', exchange: 'CME' },  // NEW
  
  // Indices (4 - removed VIX, keeping major equity indices)
  { cftcCode: '13874+', symbol: 'ES', name: 'S&P 500', category: 'Index', exchange: 'CME' },
  { cftcCode: '209742', symbol: 'NQ', name: 'Nasdaq 100', category: 'Index', exchange: 'CME' },
  { cftcCode: '124603', symbol: 'YM', name: 'Dow Jones', category: 'Index', exchange: 'CBOT' },
  { cftcCode: '239742', symbol: 'RTY', name: 'Russell 2000', category: 'Index', exchange: 'CME' },
  
  // Bonds (4 - all highly liquid)
  { cftcCode: '020601', symbol: 'ZN', name: '10-Year Treasury Note', category: 'Bonds', exchange: 'CBOT' },
  { cftcCode: '043602', symbol: 'ZB', name: '30-Year Treasury Bond', category: 'Bonds', exchange: 'CBOT' },
  { cftcCode: '042601', symbol: 'ZF', name: '5-Year Treasury Note', category: 'Bonds', exchange: 'CBOT' },
  { cftcCode: '044601', symbol: 'ZT', name: '2-Year Treasury Note', category: 'Bonds', exchange: 'CBOT' },
  
  // Crypto (2 - both highly liquid)
  { cftcCode: '133741', symbol: 'BTC', name: 'Bitcoin Futures', category: 'Crypto', exchange: 'CME' },
  { cftcCode: '146021', symbol: 'ETH', name: 'Ethereum Futures', category: 'Crypto', exchange: 'CME' },
];

/**
 * Generate realistic COT data
 */
function generateData() {
  console.log('🎲 Generating COT data for', markets.length, 'markets...');
  
  const lastFriday = getLastFriday();
  const data = [];
  
  for (const market of markets) {
    // Generate realistic numbers based on market type
    const baseSize = getMarketSize(market.category);
    const volatility = getMarketVolatility(market.category);
    
    // Open Interest (index)
    const index = Math.floor(baseSize * (0.8 + Math.random() * 0.4));
    
    // Commercial positions (usually opposite to speculators)
    const commercialBias = (Math.random() - 0.5) * 2; // -1 to 1
    const commercial = Math.floor(baseSize * 0.3 * commercialBias);
    const commercialChange = Math.floor(baseSize * 0.05 * (Math.random() - 0.5) * 2);
    
    // Speculator positions (opposite of commercial)
    const speculators = Math.floor(-commercial * (0.8 + Math.random() * 0.4));
    const speculatorsChange = Math.floor(-commercialChange * (0.9 + Math.random() * 0.2));
    
    data.push({
      symbol: market.symbol,
      name: market.name,
      category: market.category,
      exchange: market.exchange,
      index,
      commercial,
      commercialChange,
      speculators,
      speculatorsChange,
      lastUpdated: lastFriday
    });
  }
  
  return data;
}

/**
 * Get typical market size for realistic numbers
 */
function getMarketSize(category) {
  const sizes = {
    'FX': 100000,
    'Metals': 200000,
    'Energy': 300000,
    'Grains': 150000,
    'Index': 400000,
    'Bonds': 250000,
    'Crypto': 50000
  };
  return sizes[category] || 100000;
}

/**
 * Get market volatility factor
 */
function getMarketVolatility(category) {
  const volatilities = {
    'FX': 1.2,
    'Metals': 1.5,
    'Energy': 2.0,
    'Grains': 1.3,
    'Index': 1.1,
    'Bonds': 0.8,
    'Crypto': 3.0
  };
  return volatilities[category] || 1.0;
}

/**
 * Get last Friday's date (CFTC publishes on Fridays)
 */
function getLastFriday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysToSubtract = dayOfWeek >= 5 ? dayOfWeek - 5 : dayOfWeek + 2;
  const lastFriday = new Date(today);
  lastFriday.setDate(today.getDate() - daysToSubtract);
  return lastFriday.toISOString().split('T')[0];
}

/**
 * Save data to JSON file
 */
function saveData(data) {
  const outputDir = path.join(process.cwd(), 'public', 'data');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, 'cot-latest.json');
  
  // Save with pretty printing
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  
  console.log(`✅ Generated ${data.length} markets`);
  console.log(`💾 Data saved to ${outputPath}`);
  console.log(`📅 Report date: ${data[0].lastUpdated}`);
}

/**
 * Main execution
 */
function main() {
  try {
    const data = generateData();
    saveData(data);
    console.log('\n✨ Data generation complete!');
    console.log('📊 Your dashboard will now load this data automatically.\n');
  } catch (error) {
    console.error('❌ Error generating data:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { generateData, saveData };
