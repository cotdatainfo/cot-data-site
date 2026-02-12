# COT Data System Setup Guide

## 🎯 Overview

Your dashboard now has a **real data engine** that can:
1. Generate realistic COT data for testing
2. Fetch real CFTC data (ready for Phase 2)
3. Auto-update daily via GitHub Actions

---

## 📊 Quick Start (5 minutes)

### Step 1: Generate Initial Data

```bash
npm run generate-data
```

This creates `/public/data/cot-latest.json` with data for **36 markets**:
- 8 FX pairs (EUR/USD, GBP/USD, etc.)
- 5 Metals (Gold, Silver, Copper, Platinum, Palladium)
- 4 Energy (Crude Oil, Natural Gas, Heating Oil, Gasoline)
- 8 Grains/Softs (Corn, Wheat, Soybeans, Cotton, Coffee, Sugar, etc.)
- 5 Indices (S&P 500, Nasdaq, Dow, Russell 2000, VIX)
- 4 Bonds (2Y, 5Y, 10Y, 30Y Treasuries)
- 2 Crypto (Bitcoin, Ethereum futures)

### Step 2: View Your Dashboard

```bash
npm run dev
```

Visit http://localhost:3000

You should now see:
✅ All 36 markets loaded
✅ Filter buttons work (FX, Metals, Energy, etc.)
✅ Last updated date shown
✅ Data changes weekly (mimics Friday CFTC reports)

---

## 🚀 What Just Happened?

### Data Flow:

```
1. scripts/generate-data.js 
   ↓ 
2. Creates /public/data/cot-latest.json
   ↓
3. Homepage fetches /data/cot-latest.json
   ↓
4. Dashboard displays your data!
```

### File Structure:

```
your-project/
├── scripts/
│   ├── generate-data.js      ← Generates sample data (testing)
│   └── fetch-cot-data.js     ← Fetches real CFTC data (Phase 2)
├── lib/
│   └── cftc-markets.ts       ← Market definitions & mappings
├── public/
│   └── data/
│       ├── cot-latest.json   ← Current data (auto-generated)
│       └── cot-2024-02-09.json  ← Historical backup
└── app/page.tsx              ← Dashboard (loads from JSON)
```

---

## 🔄 Phase 2: Real CFTC Data (Next Step)

Currently using: **Sample data** (realistic but generated)

**To switch to real CFTC data:**

1. Run the CFTC fetcher:
```bash
npm run fetch-cot
```

2. This will:
   - Connect to CFTC's public API
   - Download latest COT report
   - Parse 36 markets
   - Save to same JSON file
   - Your dashboard auto-updates!

**Note:** CFTC publishes reports:
- **Every Tuesday at 3:30 PM ET**
- Data covers through previous Friday
- ~5-day delay is normal

---

## ⚙️ Automation Setup (Phase 3)

### Option A: GitHub Actions (Recommended)

Create `.github/workflows/update-data.yml`:

```yaml
name: Update COT Data

on:
  schedule:
    # Run every Tuesday at 4 PM ET (after CFTC publishes)
    - cron: '0 21 * * 2'  # 9 PM UTC = 4 PM ET
  workflow_dispatch:  # Manual trigger

jobs:
  update-data:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Fetch CFTC Data
        run: npm run fetch-cot
      
      - name: Commit updated data
        run: |
          git config --local user.email "github-actions@github.com"
          git config --local user.name "GitHub Actions"
          git add public/data/*.json
          git commit -m "Update COT data" || exit 0
          git push
```

**Result:** Data updates automatically every Tuesday. Vercel redeploys automatically.

### Option B: Manual Updates

Just run `npm run fetch-cot` whenever you want fresh data.

---

## 📈 Data Structure

Each market has this format:

```json
{
  "symbol": "EUR/USD",
  "name": "Euro FX",
  "category": "FX",
  "exchange": "CME",
  "index": 125000,              // Open Interest
  "commercial": 85000,           // Commercial net position
  "commercialChange": 5000,      // Week-over-week change
  "speculators": -75000,         // Speculator net position
  "speculatorsChange": -3000,    // Week-over-week change
  "lastUpdated": "2024-02-06"   // Report date
}
```

---

## 🎨 Customization

### Add More Markets

Edit `lib/cftc-markets.ts`:

```typescript
{
  cftcCode: '099741',  // CFTC's code
  symbol: 'EUR/USD',
  name: 'Euro FX',
  category: 'FX',
  exchange: 'CME'
}
```

Find CFTC codes here: https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm

### Change Update Frequency

Edit GitHub Actions cron:
- Daily: `'0 21 * * *'`
- Weekly (Tuesday): `'0 21 * * 2'`
- Twice weekly: `'0 21 * * 2,5'`

---

## 🐛 Troubleshooting

**No data showing?**
1. Check `/public/data/cot-latest.json` exists
2. Run `npm run generate-data` again
3. Hard refresh browser (Ctrl+Shift+R)

**Data looks wrong?**
- Check console for errors
- Verify JSON is valid: `cat public/data/cot-latest.json | jq`

**CFTC fetch fails?**
- CFTC API can be slow/timeout
- Gracefully falls back to existing data
- Try again in a few minutes

---

## 📝 Next Steps

1. ✅ **You are here:** Data engine working
2. ⏭️ **Next:** Set up GitHub Actions automation
3. ⏭️ **Then:** Add AI blog generator
4. ⏭️ **Finally:** Deploy to production

---

## 🚀 Ready to Deploy?

Once you've tested locally:

```bash
# Build for production
npm run build

# Push to GitHub
git add .
git commit -m "Add real COT data engine"
git push

# Deploy on Vercel (auto-deploys from GitHub)
```

Your dashboard will:
- Show real data ✅
- Update automatically ✅
- Look professional ✅
- Be fully automated ✅

---

**Questions?** Check the main README or the deployment guide!
