'use client'

import { useState } from 'react'

interface Market {
  name: string
  symbol: string
  category: string
  positions: {
    commercial: {
      long: number
      short: number
      net: number
    }
    nonCommercial: {
      long: number
      short: number
      net: number
    }
  }
  changes: {
    net: number
    percent: number
  }
  openInterest: number
}

interface Props {
  data: Market[]
}

function formatNumber(num: number): string {
  const absNum = Math.abs(num)
  if (absNum >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (absNum >= 1000) {
    return `${Math.round(num / 1000)}K`
  }
  return num.toString()
}

function getCategoryStyle(category: string) {
  const styles: Record<string, string> = {
    'FX': 'bg-blue-900/50 text-blue-300',
    'Metals': 'bg-yellow-900/50 text-yellow-300',
    'Energy': 'bg-orange-900/50 text-orange-300',
    'Grains': 'bg-green-900/50 text-green-300',
    'Index': 'bg-purple-900/50 text-purple-300',
    'Indices': 'bg-purple-900/50 text-purple-300',
    'Bonds': 'bg-indigo-900/50 text-indigo-300',
    'Crypto': 'bg-pink-900/50 text-pink-300',
  }
  return styles[category] || 'bg-gray-900/50 text-gray-300'
}

function getFilterButtonStyle(category: string, isActive: boolean) {
  if (!isActive) {
    return 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
  }
  
  const activeStyles: Record<string, string> = {
    'All': 'bg-green-600 text-white',
    'FX': 'bg-blue-600 text-white',
    'Metals': 'bg-yellow-600 text-white',
    'Energy': 'bg-orange-600 text-white',
    'Grains': 'bg-green-600 text-white',
    'Index': 'bg-purple-600 text-white',
    'Bonds': 'bg-indigo-600 text-white',
    'Crypto': 'bg-pink-600 text-white',
  }
  return activeStyles[category] || 'bg-gray-600 text-white'
}

export default function COTDataTable({ data }: Props) {
  const [filter, setFilter] = useState('All')

  if (!data || !Array.isArray(data)) {
    return (
      <div className="text-center py-8 text-gray-400">
        No data available. Please run: node scripts/fetch-cot-data.js
      </div>
    )
  }

  const filtered = filter === 'All' 
    ? data 
    : data.filter(item => item.category.toLowerCase() === filter.toLowerCase())

  // Sort by category first, then by name within category
  const sorted = [...filtered].sort((a, b) => {
    if (a.category !== b.category) {
      // Sort by category order
      const categoryOrder = ['FX', 'Metals', 'Energy', 'Grains', 'Index', 'Bonds', 'Crypto']
      return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
    }
    // Within same category, sort by name
    return a.name.localeCompare(b.name)
  })

  const categories = ['All', 'FX', 'Metals', 'Energy', 'Grains', 'Index', 'Bonds', 'Crypto']

  return (
    // BORDER FRAME WRAPS EVERYTHING
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/30" style={{ minHeight: 'calc(100vh - 300px)' }}>
      <div className="p-4 space-y-4">
        {/* Filter by Category */}
        <div>
          <h3 className="text-sm text-gray-400 mb-2">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded font-medium text-sm transition-colors ${getFilterButtonStyle(cat, filter === cat)}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* All Markets Title */}
        <div className="text-gray-300">
          <h2 className="text-lg font-semibold">
            All Markets <span className="text-gray-500">({sorted.length} markets)</span>
          </h2>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gray-800/95">
            <tr className="border-t border-b border-gray-700 text-gray-400 text-xs uppercase">
              <th className="px-4 py-3 text-left font-medium">MARKET</th>
              <th className="px-4 py-3 text-left font-medium">CATEGORY</th>
              <th className="px-4 py-3 text-right font-medium">INDEX</th>
              <th className="px-4 py-3 text-right font-medium">COMMERCIAL</th>
              <th className="px-4 py-3 text-right font-medium">CHG</th>
              <th className="px-4 py-3 text-right font-medium">SPECULATORS</th>
              <th className="px-4 py-3 text-right font-medium">CHG</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item, index) => {
              const commercialChange = item.changes.net
              const speculatorChange = -item.changes.net
              
              return (
                <tr
                  key={index}
                  className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-white">
                    {item.name}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getCategoryStyle(item.category)}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-300">
                    {formatNumber(item.openInterest)}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-300">
                    {formatNumber(item.positions.commercial.net)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={commercialChange > 0 ? 'text-green-400' : commercialChange < 0 ? 'text-red-400' : 'text-gray-400'}>
                      {commercialChange > 0 ? '+' : ''}{formatNumber(commercialChange)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-300">
                    {formatNumber(item.positions.nonCommercial.net)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={speculatorChange > 0 ? 'text-green-400' : speculatorChange < 0 ? 'text-red-400' : 'text-gray-400'}>
                      {speculatorChange > 0 ? '+' : ''}{formatNumber(speculatorChange)}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No markets found in this category
        </div>
      )}
    </div>
  )
}
