import COTDataTable from '@/components/COTDataTable'
import AdSpace from '@/components/AdSpace'
import COTLegend from '@/components/COTLegend'
import fs from 'fs'
import path from 'path'

export default async function Home() {
  // Load COT data
  let cotData = { markets: [], reportDate: '', lastUpdated: '' }
  
  try {
    const dataPath = path.join(process.cwd(), 'public', 'data', 'cot-latest.json')
    
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, 'utf8')
      cotData = JSON.parse(fileContent)
    }
  } catch (error) {
    console.error('Error loading COT data:', error)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">COT Dashboard</h1>
          <p className="text-gray-400">
            Commitment of Traders Report Analysis
          </p>
          {cotData.reportDate && (
            <p className="text-sm text-gray-500 mt-2">
              Report Date: {cotData.reportDate} | Last Updated: {new Date(cotData.lastUpdated).toLocaleString()}
            </p>
          )}
        </header>

        {/* Grid Layout: Main Content + Sidebar - Heights must match */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 self-stretch">
            {/* COT Legend - Educational Section */}
            <COTLegend />
            
            {cotData.markets && cotData.markets.length > 0 ? (
              <COTDataTable data={cotData.markets} />
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">No Data Available</h2>
                <p className="text-gray-400 mb-4">
                  Run the data fetcher to get the latest COT data:
                </p>
                <code className="bg-gray-900 px-4 py-2 rounded inline-block">
                  node scripts/fetch-cot-data.js
                </code>
              </div>
            )}
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1 self-stretch">
            <AdSpace />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
          <h3 className="text-yellow-500 font-bold mb-2">Important Disclaimer</h3>
          <p className="text-gray-400 text-sm">
            This data is provided for informational purposes only. COT data represents factual positioning 
            from CFTC reports and should not be interpreted as investment advice. Trading carries risk. 
            Always conduct your own research and consult with a qualified financial advisor before making 
            investment decisions.
          </p>
        </div>
      </div>
    </div>
  )
}
