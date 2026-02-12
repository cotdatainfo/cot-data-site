'use client';

import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

export default function COTLegend() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6 bg-blue-500/10 border border-blue-500/30 rounded-lg overflow-hidden">
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-blue-500/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-400" />
          <h3 className="text-blue-400 font-semibold">Understanding COT Data</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-blue-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-blue-400" />
        )}
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          <p className="text-gray-400 text-sm">
            Commitment of Traders (COT) reports show how different market participants are positioned. 
            Here's what each column means:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Index */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">📊 Index (Open Interest)</h4>
              <p className="text-gray-400 text-sm">
                Total number of outstanding futures contracts. Higher numbers indicate more market 
                participation and liquidity. This is the "size" of the market.
              </p>
            </div>

            {/* Commercial */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">🏢 Commercial</h4>
              <p className="text-gray-400 text-sm">
                Net position of businesses that use futures to hedge (airlines, miners, farmers, banks). 
                They typically buy/sell to protect against price changes in their business. Often considered 
                the "smart money" as they know their industries well.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                <strong>CHG:</strong> Change from last week
              </p>
            </div>

            {/* Speculators */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">💰 Speculators</h4>
              <p className="text-gray-400 text-sm">
                Net position of traders seeking profit (hedge funds, managed money, retail traders). 
                They don't need the actual commodity—they're betting on price movements. When speculators 
                are heavily positioned one way, it can signal potential reversals.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                <strong>CHG:</strong> Change from last week
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">🎯 How to Read This</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>
                <strong className="text-white">Positive numbers:</strong> Net long position (more buyers than sellers)
              </li>
              <li>
                <strong className="text-white">Negative numbers:</strong> Net short position (more sellers than buyers)
              </li>
              <li>
                <strong className="text-white">Green CHG:</strong> Position increased from last week
              </li>
              <li>
                <strong className="text-white">Red CHG:</strong> Position decreased from last week
              </li>
              <li>
                <strong className="text-white">Opposite positions:</strong> Commercials and speculators often take 
                opposite sides—when one is long, the other is usually short
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">📚 What is CFTC?</h4>
            <p className="text-gray-400 text-sm mb-2">
              The <strong className="text-white">Commodity Futures Trading Commission (CFTC)</strong> is a U.S. 
              government agency that regulates commodity futures and options markets. Every week, they publish 
              the Commitment of Traders report showing how different traders are positioned.
            </p>
            <p className="text-gray-400 text-sm">
              This data is publicly available and comes from{' '}
              <a 
                href="https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                CFTC.gov
              </a>
            </p>
          </div>

          <p className="text-xs text-gray-500 italic">
            💡 <strong>Important:</strong> This data is factual reporting from the CFTC, not trading advice. 
            Past positioning doesn't predict future price movements. Always do your own research.
          </p>
        </div>
      )}
    </div>
  );
}
