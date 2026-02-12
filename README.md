# COT Dashboard - CFTC Commitment of Traders Tracking

A modern, dark-themed dashboard for tracking CFTC Commitment of Traders (COT) reports across commodities, currencies, indices, and futures markets.

## Features

- 📊 **Real-time COT Data Dashboard** - Track commercial vs speculator positioning
- 📝 **Educational Blog** - Markdown-based blog system with category filtering
- 🎨 **Dark Minimalist Design** - Navy theme with green/red/purple signal colors
- 📱 **Fully Responsive** - Mobile-first design
- 🚀 **Fast & Optimized** - Built with Next.js 14+ and TypeScript
- 💹 **Featured Brokers** - Integrated broker comparison sidebar

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Markdown**: gray-matter + marked
- **Deployment**: Vercel

## Getting Started

### 1. Installation

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## How to Add Blog Posts

**The blog system is super simple - no code changes needed!**

### Step 1: Create a Markdown File

Create a new `.md` file in the `/app/blog/posts/` directory.

Example: `/app/blog/posts/my-new-post.md`

### Step 2: Add Frontmatter

Every blog post needs frontmatter at the top:

```markdown
---
title: "Understanding EUR/USD COT Data"
date: "2025-02-09"
tags: ["Currencies", "EUR/USD", "Trading"]
category: "Currencies"
---

Your blog content goes here in markdown format...

## Heading 2

- Bullet points
- Lists
- **Bold text**

etc.
```

### Step 3: That's It!

Your post will automatically appear on the `/blog` page with proper filtering. The system:
- ✅ Auto-reads all `.md` files from `/app/blog/posts/`
- ✅ Parses frontmatter (title, date, tags, category)
- ✅ Renders markdown to HTML with styling
- ✅ Sorts posts by date (newest first)
- ✅ Enables tag/category filtering

## Blog Post Structure

### Required Frontmatter Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | string | Post title | "Gold COT Analysis" |
| `date` | string | Publication date (YYYY-MM-DD) | "2025-02-09" |
| `tags` | array | Topic tags | ["Metals", "Gold"] |
| `category` | string | Primary category | "Metals" |

### Optional Frontmatter Fields

| Field | Type | Description |
|-------|------|-------------|
| `excerpt` | string | Custom excerpt (auto-generated if omitted) |

### Supported Categories

- Currencies
- Metals
- Indices
- Energy
- Grains
- Crypto
- Education
- Analysis

## Project Structure

```
cot-dashboard/
├── app/
│   ├── blog/
│   │   ├── posts/           # 📝 Add your .md files here!
│   │   │   ├── currencies-guide.md
│   │   │   ├── metals-analysis.md
│   │   │   └── ...
│   │   ├── [slug]/          # Dynamic blog post pages
│   │   └── page.tsx         # Blog index
│   ├── disclaimers/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Dashboard homepage
│   └── globals.css          # Global styles
├── components/              # React components
├── lib/
│   ├── types/              # TypeScript definitions
│   ├── utils/              # Utility functions
│   │   ├── blog.ts         # Blog post retrieval
│   │   ├── markdown.ts     # Markdown parsing
│   │   ├── formatters.ts   # Data formatting
│   │   └── data.ts         # Sample data
│   └── constants.ts        # Static data
├── public/                 # Static assets
└── package.json
```

## Color Theme

- **Background**: `#0f1419` (Navy Dark)
- **Cards/Panels**: `#1a1f29` (Navy Lighter)
- **Borders**: `#2a3040` (Navy Border)
- **Bullish**: `#10b981` (Green)
- **Bearish**: `#ef4444` (Red)
- **Extreme Bullish**: `#8b5cf6` (Purple)
- **Extreme Bearish**: `#3b82f6` (Blue)
- **Text Primary**: `#ffffff`
- **Text Secondary**: `#9ca3af`

## Customization

### Add New Markets

Edit `/lib/utils/data.ts` and add to `sampleCOTData` array:

```typescript
{
  market: 'Market Name',
  category: 'FX', // or Metals, Energy, etc.
  index: 100000,
  commercial: 50000,
  commercialChange: 5000,
  speculators: -45000,
  speculatorsChange: -4000,
  signal: 'Bullish',
  timestamp: new Date().toISOString(),
}
```

### Add New Brokers

Edit `/lib/constants.ts` and add to `FEATURED_BROKERS` array:

```typescript
{
  name: 'Broker Name',
  rating: 4.5,
  minDeposit: '$100',
  spreads: 'From 0.1 pips',
  regulation: 'FCA, ASIC',
  affiliateLink: 'https://...',
  features: ['Feature 1', 'Feature 2'],
}
```

## Environment Variables

Create `.env.local` for sensitive data:

```env
# CFTC API (for future integration)
CFTC_API_KEY=your_api_key_here

# Affiliate IDs (optional)
PEPPERSTONE_AFFILIATE_ID=your_id
IC_MARKETS_AFFILIATE_ID=your_id
```

## Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Deploy (auto-detects Next.js)
4. Add environment variables in Vercel dashboard

## Future Enhancements

- [ ] Live CFTC API integration
- [ ] Historical chart data
- [ ] Email alerts for extreme signals
- [ ] Advanced filtering
- [ ] User accounts & watchlists

## Disclaimers

This dashboard provides educational information only. It is not financial advice. Always consult with a qualified financial advisor before making trading decisions.

## License

MIT

## Support

For questions or issues, please open an issue on GitHub.

---

**Made with ❤️ for COT traders**
