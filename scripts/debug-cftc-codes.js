// scripts/debug-cftc-codes.js
const CFTC_API = 'https://publicreporting.cftc.gov/resource/6dca-aqww.json';

async function debugCodes() {
  console.log('📡 Fetching CFTC data for 2026-02-03...\n');
  
  const response = await fetch(
    `${CFTC_API}?report_date_as_yyyy_mm_dd=2026-02-03&$limit=500`
  );
  const data = await response.json();
  
  console.log(`✅ Received ${data.length} records\n`);
  
  // Create a map of code -> market info
  const codeMap = {};
  
  data.forEach(item => {
    const code = item.cftc_contract_market_code;
    const name = item.market_and_exchange_names;
    const nonCommLong = parseInt(item.noncomm_positions_long_all || 0);
    const nonCommShort = parseInt(item.noncomm_positions_short_all || 0);
    const net = nonCommLong - nonCommShort;
    
    if (!codeMap[code]) {
      codeMap[code] = {
        code: code,
        name: name,
        net: net,
        long: nonCommLong,
        short: nonCommShort
      };
    }
  });
  
  // Now check your current mappings
  console.log('🔍 CHECKING YOUR CURRENT MAPPINGS:\n');
  console.log('=' .repeat(80));
  
  const YOUR_MAP = {
    '232741': 'Swiss Franc',
    '095741': 'Australian Dollar',
    '090741': 'Canadian Dollar',
    '097741': 'Japanese Yen',
    '020601': '10Y Treasury',
    '043602': '30Y Treasury',
    '042601': '5Y Treasury',
    '088691': 'Gold',
    '067651': 'Crude Oil WTI',
    '023651': 'Natural Gas',
    '13874+': 'S&P 500',
    '239742': 'Nasdaq 100'
  };
  
  Object.entries(YOUR_MAP).forEach(([code, yourName]) => {
    const actual = codeMap[code];
    if (actual) {
      const status = '✅';
      console.log(`\n${status} CODE: ${code}`);
      console.log(`   You labeled it: "${yourName}"`);
      console.log(`   CFTC calls it:  "${actual.name}"`);
      console.log(`   Net position:   ${actual.net.toLocaleString()}`);
      console.log(`   Long: ${actual.long.toLocaleString()} | Short: ${actual.short.toLocaleString()}`);
    } else {
      console.log(`\n❌ CODE: ${code}`);
      console.log(`   You labeled it: "${yourName}"`);
      console.log(`   ⚠️  CODE NOT FOUND IN CFTC DATA`);
    }
  });
  
  // Find the key markets we care about
  console.log('\n\n' + '='.repeat(80));
  console.log('🎯 SEARCHING FOR KEY MARKETS IN CFTC DATA:\n');
  
  const searchTerms = [
    'SWISS FRANC',
    'AUSTRALIAN DOLLAR', 
    'MEXICAN PESO',
    'TREASURY NOTE - 2',
    'TREASURY NOTE - 5',
    'TREASURY NOTE - 10',
    'TREASURY BOND'
  ];
  
  searchTerms.forEach(term => {
    console.log(`\nSearching for: "${term}"`);
    const matches = Object.values(codeMap).filter(m => 
      m.name.toUpperCase().includes(term)
    );
    
    if (matches.length > 0) {
      matches.forEach(m => {
        console.log(`  ✅ ${m.code}: ${m.name}`);
        console.log(`     Net: ${m.net.toLocaleString()}`);
      });
    } else {
      console.log(`  ❌ No matches found`);
    }
  });
  
  // Show top markets by absolute net position
  console.log('\n\n' + '='.repeat(80));
  console.log('📊 TOP 20 MARKETS BY ABSOLUTE NET POSITION:\n');
  
  const sorted = Object.values(codeMap)
    .filter(m => !m.name.includes('REC') && !m.name.includes('CARBON') && !m.name.includes('RIN'))
    .sort((a, b) => Math.abs(b.net) - Math.abs(a.net))
    .slice(0, 20);
  
  sorted.forEach((item, i) => {
    const netStr = item.net.toLocaleString().padStart(12);
    console.log(`${(i+1).toString().padStart(2)}. ${item.code} | Net: ${netStr} | ${item.name.substring(0, 60)}`);
  });
}

debugCodes().catch(console.error);