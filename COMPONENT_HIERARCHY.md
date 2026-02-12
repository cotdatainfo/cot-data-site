# Component Hierarchy - Phase 2

## Visual Structure

```
RootLayout (app/layout.tsx)
│
├── Header (components/Header.tsx)
│   ├── Logo (Next.js Image)
│   └── Hamburger Button
│       └── HamburgerMenu (components/HamburgerMenu.tsx)
│           ├── Backdrop Overlay
│           └── Slide-in Panel (from RIGHT)
│               ├── Close Button (×)
│               ├── Navigation Links
│               │   ├── Dashboard (/)
│               │   ├── Blog (/blog)
│               │   └── Disclaimers (/disclaimers)
│               └── Info Text
│
├── Main Content (children)
│   │
│   └── HomePage (app/page.tsx) - Client Component
│       │
│       ├── Page Title & Description
│       │
│       ├── Metric Cards Row (4 cards)
│       │   ├── MetricCard: Bullish (green) 📈
│       │   ├── MetricCard: Bearish (red) 📉
│       │   ├── MetricCard: Extreme (purple) ⚡
│       │   └── MetricCard: Total Markets (blue) 🎯
│       │
│       └── 2-Column Grid (desktop) / Stack (mobile)
│           │
│           ├── Left Column (2/3 width)
│           │   ├── Filter Section
│           │   │   └── FilterButtons (8 categories)
│           │   │       ├── All
│           │   │       ├── FX
│           │   │       ├── Metals
│           │   │       ├── Energy
│           │   │       ├── Grains
│           │   │       ├── Index
│           │   │       ├── Bonds
│           │   │       └── Crypto
│           │   │
│           │   ├── COTDataTable
│           │   │   ├── Desktop View: <table>
│           │   │   │   ├── Headers (8 cols)
│           │   │   │   └── Data Rows
│           │   │   │       ├── Market name
│           │   │   │       ├── Category (color-coded)
│           │   │   │       ├── Index value
│           │   │   │       ├── Commercial position
│           │   │   │       ├── Commercial change (±)
│           │   │   │       ├── Speculator position
│           │   │   │       ├── Speculator change (±)
│           │   │   │       └── Signal badge
│           │   │   │
│           │   │   └── Mobile View: Card Stack
│           │   │       └── Each market as card
│           │   │
│           │   └── Info Box (COT explanation)
│           │
│           └── Right Column (1/3 width)
│               └── FeaturedBrokers
│                   ├── Title & Description
│                   ├── Broker Cards (5)
│                   │   ├── Name + Rating ★
│                   │   ├── Min Deposit
│                   │   ├── Spreads
│                   │   ├── Regulation
│                   │   ├── Feature Tags (3)
│                   │   └── "Visit Broker" Button
│                   └── Affiliate Disclosure
│
└── Footer (components/Footer.tsx)
    ├── Copyright
    ├── Links
    │   ├── Disclaimers
    │   └── CFTC Official
    └── Disclaimer Text
```

## Component Sizes

| Component | Lines | Purpose |
|-----------|-------|---------|
| Header.tsx | ~50 | Logo + hamburger button |
| HamburgerMenu.tsx | ~90 | Slide-in navigation |
| Footer.tsx | ~45 | Footer links + disclaimer |
| MetricCard.tsx | ~25 | Stat display card |
| FilterButtons.tsx | ~30 | Category filter chips |
| COTDataTable.tsx | ~160 | Responsive data table |
| FeaturedBrokers.tsx | ~70 | Broker sidebar |
| page.tsx (Homepage) | ~120 | Dashboard orchestration |
| **Total** | **590 lines** | **Complete dashboard** |

## State Management

```typescript
HomePage (Client Component)
├── activeFilter: FilterType ('All' | 'FX' | 'Metals' | ...)
│   └── Changes trigger data re-filter
│
├── filteredData: COTMarketData[]
│   └── useMemo: filters sampleCOTData based on activeFilter
│
└── metrics: DashboardMetrics
    └── useMemo: calculates from all data (not filtered)
        ├── bullishCount
        ├── bearishCount
        ├── extremeCount
        └── totalTracked
```

## Data Flow

```
1. sampleCOTData (16 markets)
   └── lib/utils/data.ts
       └── Static data for now
       └── Will be replaced by CFTC API

2. calculateDashboardMetrics()
   └── Returns: { bullishCount, bearishCount, extremeCount, totalTracked }

3. filterCOTDataByCategory()
   └── Filters by: All, FX, Metals, Energy, Grains, Index, Bonds, Crypto

4. Formatters
   ├── formatCOTData(125000) → "125K"
   ├── formatChange(5000) → "+5K"
   ├── getColorForSignal('Bullish') → "text-bullish-green"
   └── getBgColorForSignal('Bullish') → "bg-bullish-green/10"
```

## Responsive Behavior

| Screen | Metrics | Grid | Table | Brokers |
|--------|---------|------|-------|---------|
| Mobile (<640px) | 1 col | 1 col | Cards | Below |
| Tablet (640-1024px) | 2 cols | 1 col | Table | Below |
| Desktop (>1024px) | 4 cols | 2+1 cols | Table | Right |

## Color Coding

| Signal | Text Color | Background | Border |
|--------|-----------|------------|--------|
| Bullish | Green (#10b981) | Green/10 | Green |
| Bearish | Red (#ef4444) | Red/10 | Red |
| Extreme Bullish | Purple (#8b5cf6) | Purple/10 | Purple |
| Extreme Bearish | Blue (#3b82f6) | Blue/10 | Blue |
| Neutral | Gray (#9ca3af) | Gray/10 | Gray |

## Interactive Elements

1. **Hamburger Menu**
   - Click ☰ → Menu slides in from right
   - Click backdrop → Menu closes
   - Press ESC → Menu closes
   - Click link → Navigate + close

2. **Filter Buttons**
   - Click category → Filter updates
   - Active state: Green background
   - Hover: Lighter background

3. **Data Table**
   - Desktop: Hover row → Highlight
   - Mobile: Tap card → Full info

4. **Broker Cards**
   - Hover → Border color changes
   - Click button → Open broker site (new tab)

---

**Component Tree Depth**: 4 levels
**Total React Components**: 8
**Client Components**: 4 (page, HamburgerMenu, FilterButtons, Header state)
**Server Components**: 5 (layout, Footer, MetricCard, COTDataTable, FeaturedBrokers)
