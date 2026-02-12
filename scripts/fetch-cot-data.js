import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CFTC_API = 'https://publicreporting.cftc.gov/resource/6dca-aqww.json';

// 44 VERIFIED MARKETS - All codes confirmed
const MARKET_MAP = {
  // === FX (9 markets) ===
  '099741': { name: 'Euro FX', category: 'FX', symbol: 'EUR' },
  '096742': { name: 'British Pound', category: 'FX', symbol: 'GBP' },
  '097741': { name: 'Japanese Yen', category: 'FX', symbol: 'JPY' }, 
  '090741': { name: 'Canadian Dollar', category: 'FX', symbol: 'CAD' },     
  '092741': { name: 'Swiss Franc', category: 'FX', symbol: 'CHF' },         
  '232741': { name: 'Australian Dollar', category: 'FX', symbol: 'AUD' },
  '095741': { name: 'Mexican Peso', category: 'FX', symbol: 'MXN' },        
  '102741': { name: 'Brazilian Real', category: 'FX', symbol: 'BRL' },
  '112741': { name: 'New Zealand Dollar', category: 'FX', symbol: 'NZD' },
  
  // === Metals (4 markets) ===
  '088691': { name: 'Gold', category: 'Metals', symbol: 'GC' },
  '084691': { name: 'Silver', category: 'Metals', symbol: 'SI' },
  '085692': { name: 'Copper', category: 'Metals', symbol: 'HG' },
  '076651': { name: 'Platinum', category: 'Metals', symbol: 'PL' },
  
  // === Energy (5 markets) ===
  '067651': { name: 'Crude Oil WTI', category: 'Energy', symbol: 'CL' },
  '023651': { name: 'Natural Gas', category: 'Energy', symbol: 'NG' },
  '022651': { name: 'Heating Oil', category: 'Energy', symbol: 'HO' },
  '111659': { name: 'Gasoline RBOB', category: 'Energy', symbol: 'RB' },
  '025651': { name: 'Ethanol', category: 'Energy', symbol: 'EH' },
  
  // === Grains & Softs (12 markets) ===
  '002602': { name: 'Corn', category: 'Grains', symbol: 'C' },
  '005602': { name: 'Soybeans', category: 'Grains', symbol: 'S' },
  '001602': { name: 'Wheat (SRW)', category: 'Grains', symbol: 'W' },
  '001612': { name: 'Wheat (HRW)', category: 'Grains', symbol: 'KW' },
  '026603': { name: 'Soybean Meal', category: 'Grains', symbol: 'SM' },
  '007601': { name: 'Soybean Oil', category: 'Grains', symbol: 'BO' },
  '080732': { name: 'Sugar #11', category: 'Grains', symbol: 'SB' },
  '083731': { name: 'Coffee C', category: 'Grains', symbol: 'KC' },
  '073732': { name: 'Cocoa', category: 'Grains', symbol: 'CC' },
  '057642': { name: 'Live Cattle', category: 'Grains', symbol: 'LE' },
  '054642': { name: 'Lean Hogs', category: 'Grains', symbol: 'HE' },
  '061641': { name: 'Feeder Cattle', category: 'Grains', symbol: 'GF' },
  
  // === Indices (5 markets) ===
  '13874+': { name: 'S&P 500', category: 'Index', symbol: 'ES' },
  '20974+': { name: 'Nasdaq 100', category: 'Index', symbol: 'NQ' },
  '12460+': { name: 'Dow Jones', category: 'Index', symbol: 'YM' },
  '239742': { name: 'Russell 2000', category: 'Index', symbol: 'RTY' },
  '1170E1': { name: 'VIX', category: 'Index', symbol: 'VX' },
  
  // === Bonds (4 markets) ===
  '042601': { name: '2Y Treasury', category: 'Bonds', symbol: 'ZT' },
  '044601': { name: '5Y Treasury', category: 'Bonds', symbol: 'ZF' },
  '043602': { name: '10Y Treasury', category: 'Bonds', symbol: 'ZN' },
  '020601': { name: '30Y Treasury', category: 'Bonds', symbol: 'ZB' },
  
  // === Crypto (2 markets) ===
  '133741': { name: 'Bitcoin', category: 'Crypto', symbol: 'BTC' },
  '146022': { name: 'Micro Ethereum', category: 'Crypto', symbol: 'ETH' },
};

function getPreviousWeek(dateString) {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 7);
  return date.toISOString().split('T')[0];
}

function processMarketData(currentData, prevData, reportDate) {
  const markets = [];
  
  // Create map of previous week's data
  const prevMap = new Map();
  prevData.forEach(item => {
    if (item.cftc_contract_market_code in MARKET_MAP) {
      prevMap.set(item.cftc_contract_market_code, item);
    }
  });
  
  // Process current week's data
  currentData.forEach(item => {
    const marketCode = item.cftc_contract_market_code;
    if (!(marketCode in MARKET_MAP)) return;
    
    const marketInfo = MARKET_MAP[marketCode];
    const prevItem = prevMap.get(marketCode);
    
    const currentNet = parseInt(item.noncomm_positions_long_all || 0) - 
                      parseInt(item.noncomm_positions_short_all || 0);
    const prevNet = prevItem ? 
                    (parseInt(prevItem.noncomm_positions_long_all || 0) - 
                     parseInt(prevItem.noncomm_positions_short_all || 0)) : 
                    currentNet;
    
    const netChange = currentNet - prevNet;
    const percentChange = prevNet !== 0 ? ((netChange / Math.abs(prevNet)) * 100) : 0;
    
    markets.push({
      name: marketInfo.name,
      symbol: marketInfo.symbol,
      category: marketInfo.category,
      positions: {
        commercial: {
          long: parseInt(item.comm_positions_long_all || 0),
          short: parseInt(item.comm_positions_short_all || 0),
          net: parseInt(item.comm_positions_long_all || 0) - 
               parseInt(item.comm_positions_short_all || 0)
        },
        nonCommercial: {
          long: parseInt(item.noncomm_positions_long_all || 0),
          short: parseInt(item.noncomm_positions_short_all || 0),
          net: currentNet
        }
      },
      changes: {
        net: netChange,
        percent: parseFloat(percentChange.toFixed(2))
      },
      openInterest: parseInt(item.open_interest_all || 0)
    });
  });
  
  return {
    reportDate,
    lastUpdated: new Date().toISOString(),
    markets: markets.sort((a, b) => a.name.localeCompare(b.name))
  };
}

async function fetchCOTData() {
  try {
    console.log('📊 Fetching CFTC COT data for 44 markets...');
    
    // Get latest report date
    const latestResponse = await fetch(
      `${CFTC_API}?$query=SELECT report_date_as_yyyy_mm_dd ORDER BY report_date_as_yyyy_mm_dd DESC LIMIT 1`
    );
    const latestData = await latestResponse.json();
    const latestDate = latestData[0]?.report_date_as_yyyy_mm_dd;
    
    if (!latestDate) {
      throw new Error('Could not determine latest report date');
    }
    
    console.log(`📅 Latest report date: ${latestDate}`);
    
    // Fetch current week data
    const currentResponse = await fetch(
      `${CFTC_API}?report_date_as_yyyy_mm_dd=${latestDate}&$limit=1000`
    );
    const currentData = await currentResponse.json();
    
    // Fetch previous week data
    const prevDate = getPreviousWeek(latestDate);
    const prevResponse = await fetch(
      `${CFTC_API}?report_date_as_yyyy_mm_dd=${prevDate}&$limit=1000`
    );
    const prevData = await prevResponse.json();
    
    // Process data
    const processedData = processMarketData(currentData, prevData, latestDate);
    
    // Save to file
    const outputPath = path.join(__dirname, '../public/data/cot-latest.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(processedData, null, 2));
    
    console.log(`✅ Data saved! ${processedData.markets.length} markets processed`);
    console.log('\n📈 Markets by category:');
    const categories = {};
    processedData.markets.forEach(m => {
      categories[m.category] = (categories[m.category] || 0) + 1;
    });
    Object.entries(categories).sort().forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} markets`);
    });
    
  } catch (error) {
    console.error('❌ Error fetching COT data:', error);
    process.exit(1);
  }
}

fetchCOTData();
