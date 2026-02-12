// scripts/generate-blog.js
// Enhanced version: Uses 52-week history for tiered analysis based on available data
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Blog generator started...');
console.log('📂 Current directory:', __dirname);

const apiKey = process.env.ANTHROPIC_API_KEY;
console.log('🔑 API key exists:', apiKey ? 'YES ✅' : 'NO ❌');
if (!apiKey) {
  console.error('❌ ANTHROPIC_API_KEY not found in environment variables!');
  console.error('💡 Make sure .env file exists with your API key');
  process.exit(1);
}

console.log('🔑 API key starts with:', apiKey.substring(0, 15) + '...');

const anthropic = new Anthropic({
  apiKey: apiKey
});

async function generateWeeklyBlog() {
  try {
    console.log('🤖 Generating weekly blog post with historical analysis...');
    
    // Load latest data
    const latestPath = path.join(__dirname, '../public/data/cot-latest.json');
    console.log('📂 Looking for latest data at:', latestPath);
    
    if (!fs.existsSync(latestPath)) {
      throw new Error(`Latest data file not found at: ${latestPath}`);
    }
    
    console.log('✅ Latest data file found!');
    const cotLatest = JSON.parse(fs.readFileSync(latestPath, 'utf8'));
    console.log('📊 Markets in latest data:', cotLatest.markets?.length || 0);
    console.log('📅 Report date:', cotLatest.reportDate);
    
    // Load historical data
    const historyPath = path.join(__dirname, '../public/data/cot-history.json');
    console.log('📂 Looking for historical data at:', historyPath);
    
    if (!fs.existsSync(historyPath)) {
      console.warn('⚠️ Historical data not found. Generating basic blog without percentiles.');
      const basicAnalysis = { percentiles: null, weeksAvailable: 1 };
      const prompt = createBlogPrompt(cotLatest, basicAnalysis);
      return await generateBlogContent(prompt, cotLatest.reportDate);
    }
    
    console.log('✅ Historical data file found!');
    const cotHistory = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    console.log('📊 Historical weeks available:', cotHistory.weeks?.length || 0);
    console.log('📅 Oldest date:', cotHistory.oldestDate);
    console.log('📅 Newest date:', cotHistory.newestDate);
    
    // Calculate historical context
    console.log('🧮 Calculating historical context...');
    const analysis = calculateHistoricalContext(cotLatest, cotHistory);
    console.log('✅ Analysis complete!');
    console.log('📊 Weeks available for analysis:', analysis.weeksAvailable);
    
    // Generate blog with appropriate level of context
    console.log('✍️ Creating prompt for Claude...');
    const prompt = createBlogPrompt(cotLatest, analysis);
    console.log('📝 Prompt length:', prompt.length, 'characters');
    
    return await generateBlogContent(prompt, cotLatest.reportDate);
    
  } catch (error) {
    console.error('❌ Error generating blog:');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    if (error.response) {
      console.error('API Response:', error.response);
    }
    console.error('Full error:', error);
    throw error;
  }
}

async function generateBlogContent(prompt, reportDate) {
  console.log('🌐 Calling Claude API...');
  console.log('⏱️ This may take 10-20 seconds...');
  
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: prompt
    }]
  });
  
  console.log('✅ Got response from Claude!');
  console.log('📝 Response length:', message.content[0].text.length, 'characters');
  
  const blogContent = message.content[0].text;
  
  const date = new Date(reportDate);
  const filename = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-weekly-cot-analysis.md`;
  const blogPath = path.join(__dirname, '../app/blog/posts', filename);
  
  console.log('💾 Saving blog post to:', blogPath);
  
  fs.mkdirSync(path.dirname(blogPath), { recursive: true });
  fs.writeFileSync(blogPath, blogContent);
  
  console.log('✅ Blog post generated successfully!');
  console.log(`📄 File: ${filename}`);
  console.log(`📁 Full path: ${blogPath}`);
  
  return { filename, content: blogContent };
}

function calculateHistoricalContext(latest, history) {
  const percentiles = {};
  const extremes = {};
  const averages = {};
  
  // Get current positions by market name
  const currentPositions = {};
  latest.markets.forEach(m => {
    currentPositions[m.name] = m.positions.nonCommercial.net;
  });
  
  // For each market, analyze historical data
  latest.markets.forEach(market => {
    const marketName = market.name;
    
    // Extract historical net positions for this market
    const historicalPositions = history.weeks
      .map(week => {
        const marketData = week.markets.find(m => m.name === marketName);
        return marketData ? marketData.positions.nonCommercial.net : null;
      })
      .filter(pos => pos !== null);
    
    if (historicalPositions.length === 0) {
      return; // Skip if no history
    }
    
    const currentNet = market.positions.nonCommercial.net;
    
    // Calculate percentile rank using median rank method
    const sorted = [...historicalPositions].sort((a, b) => a - b);
    const rank = sorted.filter(pos => pos <= currentNet).length;
    // Use (rank - 0.5) / n for better small-sample behavior
    const rawPercentile = ((rank - 0.5) / sorted.length) * 100;
    
    // For small samples (<26 weeks), report as bands not exact percentiles
    let percentile;
    let percentileBand = null;
    
    if (historicalPositions.length < 26) {
      // Use bands for small samples to avoid false precision
      if (rawPercentile >= 90) {
        percentileBand = 'top decile';
        percentile = 95; // Representative value for display
      } else if (rawPercentile <= 10) {
        percentileBand = 'bottom decile';
        percentile = 5;
      } else if (rawPercentile >= 75) {
        percentileBand = 'upper quartile';
        percentile = 80;
      } else if (rawPercentile <= 25) {
        percentileBand = 'lower quartile';
        percentile = 20;
      } else {
        percentileBand = 'mid-range';
        percentile = 50;
      }
    } else {
      // With 26+ weeks, clamp to 1-99 range (avoid claiming "100th percentile")
      percentile = Math.max(1, Math.min(99, Math.round(rawPercentile)));
      percentileBand = null;
    }
    
    // Find extremes (only meaningful with sufficient data)
    const max = Math.max(...historicalPositions);
    const min = Math.min(...historicalPositions);
    const isExtreme = currentNet === max || currentNet === min;
    // Only flag as "near extreme" if we have 26+ weeks AND z-score is significant
    const requiresZScoreCheck = historicalPositions.length >= 52;
    const isNearExtreme = (percentile >= 97 || percentile <= 3) && historicalPositions.length >= 26;
    
    // Calculate moving averages
    const avg4Week = historicalPositions.slice(0, Math.min(4, historicalPositions.length))
      .reduce((sum, pos) => sum + pos, 0) / Math.min(4, historicalPositions.length);
    
    const avg13Week = historicalPositions.slice(0, Math.min(13, historicalPositions.length))
      .reduce((sum, pos) => sum + pos, 0) / Math.min(13, historicalPositions.length);
    
    const avg52Week = historicalPositions
      .reduce((sum, pos) => sum + pos, 0) / historicalPositions.length;
    
    // Calculate standard deviation and z-score (before storing percentile data)
    const mean = avg52Week;
    const variance = historicalPositions
      .reduce((sum, pos) => sum + Math.pow(pos - mean, 2), 0) / historicalPositions.length;
    const stdDev = Math.sqrt(variance);
    const zScore = stdDev !== 0 ? (currentNet - mean) / stdDev : 0;
    
    // Only flag as truly extreme if 52+ weeks AND (97/3 percentile OR z-score > 2.0)
    const isTrueExtreme = requiresZScoreCheck && 
                          ((percentile >= 97 || percentile <= 3) || Math.abs(zScore) > 2.0);
    
    // Check for largest change in recent periods
    const change = market.changes.net;
    const recentChanges = [];
    
    for (let i = 0; i < Math.min(13, history.weeks.length - 1); i++) {
      const thisWeek = history.weeks[i].markets.find(m => m.name === marketName);
      const nextWeek = history.weeks[i + 1].markets.find(m => m.name === marketName);
      
      if (thisWeek && nextWeek) {
        const weekChange = thisWeek.positions.nonCommercial.net - nextWeek.positions.nonCommercial.net;
        recentChanges.push(Math.abs(weekChange));
      }
    }
    
    const largestRecentChange = Math.max(...recentChanges, 0);
    const isLargestChange = Math.abs(change) >= largestRecentChange && recentChanges.length > 0;
    
    // Store analysis
    percentiles[marketName] = {
      percentile: percentile,
      percentileBand: percentileBand, // For small samples
      isExtreme: isExtreme,
      isNearExtreme: isNearExtreme, // Only with 26+ weeks
      isTrueExtreme: isTrueExtreme, // Only with 52+ weeks AND strong signal
      extremeType: percentile >= 97 ? 'high' : percentile <= 3 ? 'low' : null,
      historicalRange: { min, max },
      historicalWeeks: historicalPositions.length,
      zScore: parseFloat(zScore.toFixed(2))
    };
    
    extremes[marketName] = {
      isLargestChange: isLargestChange,
      largestRecentChange: largestRecentChange,
      currentChange: change,
      weeksAnalyzed: recentChanges.length
    };
    
    averages[marketName] = {
      avg4Week: Math.round(avg4Week),
      avg13Week: Math.round(avg13Week),
      avg52Week: Math.round(avg52Week),
      current: currentNet,
      vsAvg4Week: Math.round(currentNet - avg4Week),
      vsAvg13Week: Math.round(currentNet - avg13Week),
      vsAvg52Week: Math.round(currentNet - avg52Week),
      stdDev: Math.round(stdDev),
      zScore: zScore.toFixed(2)
    };
  });
  
  return {
    percentiles,
    extremes,
    averages,
    weeksAvailable: history.weeks.length
  };
}

function createBlogPrompt(cotData, analysis) {
  const weeksAvailable = analysis.weeksAvailable || 1;
  
  // Choose prompt type based on available data
  if (weeksAvailable < 5) {
    return createBaselinePrompt(cotData, weeksAvailable);
  } else if (weeksAvailable < 13) {
    return createEmergingTrendsPrompt(cotData, analysis, weeksAvailable);
  } else {
    return createFullAnalysisPrompt(cotData, analysis, weeksAvailable);
  }
}

function createBaselinePrompt(cotData, weeksAvailable) {
  const { reportDate, markets } = cotData;
  
  // ✅ FIX: Calculate summary since fetch script doesn't provide it
  const summary = {
    totalMarkets: markets.length,
    sentiment: {
      bullish: markets.filter(m => m.positions.nonCommercial.net > 0).length,
      bearish: markets.filter(m => m.positions.nonCommercial.net < 0).length
    }
  };
  
  // Focus on absolute positioning and cross-sectional comparisons
  const topMovers = markets.slice(0, 5);
  
  // Find largest absolute positions
  const largestLong = [...markets]
    .filter(m => m.positions.nonCommercial.net > 0)
    .sort((a, b) => b.positions.nonCommercial.net - a.positions.nonCommercial.net)
    .slice(0, 3);
    
  const largestShort = [...markets]
    .filter(m => m.positions.nonCommercial.net < 0)
    .sort((a, b) => a.positions.nonCommercial.net - b.positions.nonCommercial.net)
    .slice(0, 3);
  
  // Group by category - INCLUDE ALL MARKETS (not just top 3)
  const categoryData = ['FX', 'Metals', 'Energy', 'Grains', 'Index', 'Bonds', 'Crypto']
    .map(cat => {
      const categoryMarkets = markets.filter(m => m.category === cat);
      return {
        category: cat,
        markets: categoryMarkets,  // ✅ ALL MARKETS, not slice(0, 3)
        count: categoryMarkets.length
      };
    })
    .filter(c => c.markets.length > 0);

  const promptText = `You are a financial data analyst writing a weekly baseline report tracking COT (Commitment of Traders) positioning data. This is PURELY INFORMATIONAL and NOT financial advice.

**Your Task:** Write a data-focused weekly positioning report establishing the baseline for future historical analysis.

**Report Date:** ${reportDate}
**Data Status:** Baseline tracking (Week ${weeksAvailable} of historical database build)

**This Week's Largest Position Changes:**
${topMovers.map((m, i) => `${i + 1}. **${m.name}**: ${m.changes.percent > 0 ? '+' : ''}${m.changes.percent}% change | Net: ${m.positions.nonCommercial.net.toLocaleString()} contracts`).join('\n')}

**Largest Net Long Positions (Absolute):**
${largestLong.map(m => `- **${m.name}**: ${m.positions.nonCommercial.net.toLocaleString()} contracts (${m.category})`).join('\n')}

**Largest Net Short Positions (Absolute):**
${largestShort.map(m => `- **${m.name}**: ${m.positions.nonCommercial.net.toLocaleString()} contracts (${m.category})`).join('\n')}

**Category Breakdown:**
${categoryData.map(c => `
**${c.category}:** (${c.count} markets tracked)
${c.markets.map(m => `- ${m.name}: ${m.changes.percent > 0 ? '+' : ''}${m.changes.percent}% | Net: ${m.positions.nonCommercial.net.toLocaleString()}`).join('\n')}
`).join('\n')}

**Market Overview:**
- Total markets: ${summary.totalMarkets}
- Net long positioning: ${summary.sentiment.bullish} markets
- Net short positioning: ${summary.sentiment.bearish} markets

---

**CRITICAL REQUIREMENTS:**

**Accuracy First:**
- VERIFY all markets in a category before making generalizations
- If you say "all markets show X", check EVERY market listed
- Do math calculations carefully (don't estimate ratios)
- Never skip markets when describing category patterns

**Tone & Approach:**
- Matter-of-fact data reporting, NOT predictive analysis
- Focus on current snapshot and cross-sectional comparisons
- Explain you're building historical baseline (not yet enough data for trends)
- Educational about what the data represents

**FORBIDDEN - DO NOT USE:**
- Percentile rankings (not meaningful with <5 weeks)
- "Extreme" or "historic" language
- Time-series trend language ("highest since...", "lowest in X weeks")
- Bullish/bearish (use "net long" / "net short")
- Any trading advice or action verbs

**REQUIRED LANGUAGE:**
- "The data shows...", "Large speculators hold..."
- "Cross-market comparison reveals..."
- "This establishes the baseline for future tracking..."
- "Net positioning increased/decreased by X%"
- "Absolute position of X contracts represents..."

**Structure:**
1. **Title**: Simple, factual - "COT Positioning Report: Week of [Date]"
2. **Executive Summary** (2-3 sentences): Week-over-week changes, absolute positioning highlights
3. **Top 5 Weekly Changes**: Focus on percentage moves
4. **Absolute Position Analysis**: Largest long/short across all markets
5. **Category Breakdown**: By FX, Metals, Energy, etc.
6. **Cross-Sectional Insights**: Compare positioning ACROSS markets (not over time)
7. **Data Context Note**: Explain this is baseline-building phase

**Cross-Sectional Analysis Examples (DO use):**
- "Treasury complex shows concentrated short positioning across all maturities"
- "Currency markets split: 3 net long, 3 net short"
- "Energy sector net long positioning outweighs metals by 2:1 ratio"
- "Equity indices show mixed positioning with S&P net short while Nasdaq net long"

**WARNING - Common Errors to Avoid:**
- ❌ DON'T say "all markets in category X are net long" without checking EVERY market
- ❌ DON'T skip markets when describing a category (use ALL markets provided)
- ❌ DON'T estimate ratios - calculate them precisely
- ❌ Example: If Energy has 5 markets and 2 are net short, you CANNOT say "energy markets are uniformly net long"
- ✅ Instead say: "Energy markets show mixed positioning: 3 net long, 2 net short"

**Content Guidelines:**
- Focus on what's happening THIS week
- Compare markets to EACH OTHER (cross-sectional), not to history (time-series)
- Explain concentration patterns (where is positioning clustered?)
- Discuss divergences within sectors
- Note which markets had largest absolute changes
- Avoid overstating significance
- **When describing a category, reference ALL markets listed in that category**

**Legal Protection:**
- Disclaimer: "Weekly positioning snapshot for educational purposes. Not financial advice."
- Frame as data observation only
- No predictions or implications
- Acknowledge limited time series

**Length:** 600-800 words (shorter than future reports with more context)

**Frontmatter:**
---
title: "COT Positioning Report: Week of ${reportDate}"
date: "${reportDate}"
excerpt: "[Highlight top 2-3 position changes and notable absolute positions]"
author: "COT Analytics Team"
readTime: "4 min"
category: "Market Data"
tags: ["COT Report", "Position Data", "Weekly Tracking"]
disclaimer: "Educational content only. Not financial advice."
dataStatus: "Baseline tracking - Week ${weeksAvailable}"
---

**Key Principle:** You're a data clerk recording observations, not an analyst making historical claims. Focus on WHAT the numbers are, not what they MEAN relative to history (because you don't have enough history yet).

Write the complete report now:`;

  return promptText;
}

function createEmergingTrendsPrompt(cotData, analysis, weeksAvailable) {
  const { reportDate, markets } = cotData;
  const { averages } = analysis;
  
  // ✅ FIX: Calculate summary
  const summary = {
    totalMarkets: markets.length,
    sentiment: {
      bullish: markets.filter(m => m.positions.nonCommercial.net > 0).length,
      bearish: markets.filter(m => m.positions.nonCommercial.net < 0).length
    }
  };
  
  const topMovers = markets.slice(0, 5).map(m => ({
    ...m,
    avgData: averages?.[m.name] || null
  }));
  
  const categoryData = ['FX', 'Metals', 'Energy', 'Grains', 'Index', 'Bonds', 'Crypto']
    .map(cat => {
      const categoryMarkets = markets
        .filter(m => m.category === cat)
        .map(m => ({
          ...m,
          avgData: averages?.[m.name] || null
        }));
      
      return {
        category: cat,
        markets: categoryMarkets,  // ✅ ALL MARKETS
        count: categoryMarkets.length
      };
    })
    .filter(c => c.markets.length > 0);

  const weekKey = `avg${weeksAvailable}Week`;
  const vsAvgKey = `vsAvg${weeksAvailable}Week`;

  const promptText = `You are a financial data analyst writing a weekly COT (Commitment of Traders) report with emerging historical context. This is PURELY INFORMATIONAL and NOT financial advice.

**Your Task:** Write a data-focused weekly report using ${weeksAvailable} weeks of positioning history to identify early trends.

**Report Date:** ${reportDate}
**Historical Context:** ${weeksAvailable} weeks of tracking (emerging trends phase)

**Top 5 Weekly Position Changes:**
${topMovers.map((m, i) => {
  const avgInfo = m.avgData ? `- vs ${weeksAvailable}-week average: ${m.avgData[vsAvgKey] > 0 ? '+' : ''}${m.avgData[vsAvgKey].toLocaleString()} contracts` : '';
  return `${i + 1}. **${m.name}**: ${m.changes.percent > 0 ? '+' : ''}${m.changes.percent}% change | Net: ${m.positions.nonCommercial.net.toLocaleString()} contracts\n   ${avgInfo}`;
}).join('\n\n')}

**Category Breakdown:**
${categoryData.map(c => `
**${c.category}:** (${c.count} markets)
${c.markets.map(m => {
  const avgInfo = m.avgData ? `  vs ${weeksAvailable}-week avg: ${m.avgData[vsAvgKey] > 0 ? '+' : ''}${m.avgData[vsAvgKey].toLocaleString()} (avg was ${m.avgData[weekKey].toLocaleString()})` : '';
  return `- **${m.name}**: ${m.changes.percent > 0 ? '+' : ''}${m.changes.percent}% | Net: ${m.positions.nonCommercial.net.toLocaleString()}\n${avgInfo}`;
}).join('\n')}
`).join('\n')}

**Market Overview:**
- Total markets: ${summary.totalMarkets}
- Net long positioning: ${summary.sentiment.bullish} markets
- Net short positioning: ${summary.sentiment.bearish} markets

---

**CRITICAL REQUIREMENTS:**

**Tone & Approach:**
- Educational data analysis with emerging historical perspective
- Focus on comparisons to ${weeksAvailable}-week averages
- Identify early directional trends (without overstating significance)
- Explain data limitations clearly

**FORBIDDEN - STILL DO NOT USE:**
- "Extreme" positioning language (not enough history for percentiles yet)
- "Historic high/low" claims (need 26+ weeks minimum)
- Bullish/bearish (use "net long" / "net short")
- Trading recommendations or predictions

**REQUIRED LANGUAGE:**
- "Compared to the ${weeksAvailable}-week average..."
- "Positions have moved X contracts above/below the recent average"
- "Over the past ${weeksAvailable} weeks, this market has shown..."
- "The data suggests emerging positioning trends in..."
- "Current positioning stands X% above/below the ${weeksAvailable}-week mean"

**Structure:**
1. **Title**: Factual with context - "COT Report: Week ${weeksAvailable} Analysis"
2. **Executive Summary** (3-4 sentences): Top changes + notable deviations from averages
3. **Top 5 Changes**: With comparison to ${weeksAvailable}-week averages
4. **Emerging Trends**: Markets consistently above/below their averages
5. **Category Analysis**: Sector-level patterns vs averages
6. **Cross-Sectional Patterns**: Inter-market divergences
7. **Data Context**: Acknowledge ${weeksAvailable}-week window limitations

**Analysis to Include:**
- Which markets are currently above/below their ${weeksAvailable}-week average?
- Are there consistent directional trends forming (e.g., 3+ weeks same direction)?
- Which categories show uniform positioning vs mixed?
- How do current absolute positions compare to recent norms?

**Content Guidelines:**
- Focus on deviations from ${weeksAvailable}-week averages (not broader history)
- Note consistent trends but don't overstate significance
- Compare positioning within and across categories
- Discuss concentration and dispersion patterns
- Acknowledge you're still building historical baseline

**Legal Protection:**
- Disclaimer: "Educational analysis with ${weeksAvailable} weeks of context. Not financial advice."
- Frame as early pattern observation
- No predictions or implications about future moves
- Note limited statistical significance

**Length:** 700-900 words

**Frontmatter:**
---
title: "COT Analysis: Week ${weeksAvailable} – Emerging Positioning Patterns"
date: "${reportDate}"
excerpt: "[Focus on largest deviations from ${weeksAvailable}-week averages]"
author: "COT Analytics Team"
readTime: "5 min"
category: "Market Data"
tags: ["COT Report", "Position Data", "Trend Analysis"]
disclaimer: "Educational content only. Not financial advice."
dataContext: "${weeksAvailable} weeks of historical tracking"
---

**Key Principle:** You're identifying early-stage patterns using recent averages as reference points, NOT making claims about extremes or long-term significance. Focus on "vs recent average" framing.

Write the complete report now:`;

  return promptText;
}

function createFullAnalysisPrompt(cotData, analysis, weeksAvailable) {
  const { reportDate, markets } = cotData;
  const { percentiles, extremes, averages } = analysis;
  
  // ✅ FIX: Calculate summary
  const summary = {
    totalMarkets: markets.length,
    sentiment: {
      bullish: markets.filter(m => m.positions.nonCommercial.net > 0).length,
      bearish: markets.filter(m => m.positions.nonCommercial.net < 0).length
    }
  };
  
  const topMovers = markets
    .slice(0, 5)
    .map(m => ({
      ...m,
      percentile: percentiles?.[m.name]?.percentile || null,
      isExtreme: percentiles?.[m.name]?.isNearExtreme || false,
      isLargestChange: extremes?.[m.name]?.isLargestChange || false,
      avgData: averages?.[m.name] || null
    }));
  
  const categoryData = ['FX', 'Metals', 'Energy', 'Grains', 'Index', 'Bonds', 'Crypto']
    .map(cat => {
      const categoryMarkets = markets
        .filter(m => m.category === cat)
        .map(m => ({
          ...m,
          percentile: percentiles?.[m.name]?.percentile || null,
          extremeType: percentiles?.[m.name]?.extremeType || null,
          avgData: averages?.[m.name] || null
        }));
      
      return {
        category: cat,
        markets: categoryMarkets,  // ✅ ALL MARKETS
        count: categoryMarkets.length
      };
    })
    .filter(c => c.markets.length > 0);
  
  const extremePositions = markets
    .filter(m => percentiles?.[m.name]?.isNearExtreme)
    .map(m => ({
      name: m.name,
      percentile: percentiles[m.name].percentile,
      type: percentiles[m.name].extremeType,
      net: m.positions.nonCommercial.net
    }));

  const promptText = `You are a quantitative analyst writing an educational report about COT (Commitment of Traders) positioning data with ${weeksAvailable} weeks of historical context. This is PURELY INFORMATIONAL and NOT financial advice.

**Your Task:** Write a data-focused educational blog post analyzing this week's COT report with rich historical context.

**Report Date:** ${reportDate}
**Historical Data Available:** ${weeksAvailable} weeks

**Top 5 Biggest Position Changes (with Historical Context):**
${topMovers.map((m, i) => {
  let lines = [];
  lines.push(`${i + 1}. **${m.name}**: ${m.changes.percent > 0 ? '+' : ''}${m.changes.percent}% change`);
  lines.push(`   - Net position: ${m.positions.nonCommercial.net.toLocaleString()} contracts`);
  if (m.percentile !== null) {
    lines.push(`   - **Percentile rank: ${m.percentile}th** (vs last ${weeksAvailable} weeks)`);
  }
  if (m.isExtreme) {
    lines.push(`   - 🔥 **EXTREME POSITION** (${m.percentile >= 95 ? 'historically high' : 'historically low'})`);
  }
  if (m.isLargestChange) {
    const weeksAnalyzed = extremes[m.name]?.weeksAnalyzed || 13;
    lines.push(`   - 📈 **Largest weekly change in ${weeksAnalyzed} weeks**`);
  }
  if (m.avgData) {
    lines.push(`   - vs 4-week avg: ${m.avgData.vsAvg4Week > 0 ? '+' : ''}${m.avgData.vsAvg4Week.toLocaleString()} | vs 13-week avg: ${m.avgData.vsAvg13Week > 0 ? '+' : ''}${m.avgData.vsAvg13Week.toLocaleString()}`);
  }
  return lines.join('\n');
}).join('\n\n')}

${extremePositions.length > 0 ? `
**🎯 Extreme Positions (95th+ or 5th- percentile):**
${extremePositions.map(e => `- **${e.name}**: ${e.percentile}th percentile (${e.type === 'high' ? 'near highest' : 'near lowest'} in ${weeksAvailable} weeks) - Net: ${e.net.toLocaleString()}`).join('\n')}
` : ''}

**Category Breakdown:**
${categoryData.map(c => `
**${c.category}:** (${c.count} markets)
${c.markets.map(m => {
  let lines = [];
  lines.push(`- **${m.name}**: ${m.changes.percent > 0 ? 'Increased' : 'Decreased'} ${Math.abs(m.changes.percent)}% | Net: ${m.positions.nonCommercial.net.toLocaleString()} contracts`);
  if (m.percentile !== null) {
    const extremeTag = m.extremeType ? ` (${m.extremeType === 'high' ? '🔴 near high' : '🔵 near low'})` : '';
    lines.push(`  Percentile: ${m.percentile}th${extremeTag}`);
  }
  if (m.avgData) {
    lines.push(`  vs 52-week avg: ${m.avgData.vsAvg52Week > 0 ? '+' : ''}${m.avgData.vsAvg52Week.toLocaleString()} (Z-score: ${m.avgData.zScore})`);
  }
  return lines.join('\n');
}).join('\n')}
`).join('\n')}

**Overall Statistics:**
- Total markets tracked: ${summary.totalMarkets}
- Markets with net long positions: ${summary.sentiment.bullish}
- Markets with net short positions: ${summary.sentiment.bearish}

---

**CRITICAL REQUIREMENTS - READ CAREFULLY:**

**Tone & Style:**
- Educational and informational ONLY
- Explain what the data shows, not what readers should do
- Use academic/journalistic tone, not trading advice tone
- Focus on historical context and data patterns
- Heavily emphasize percentile rankings and historical extremes

**FORBIDDEN WORDS/PHRASES - NEVER USE:**
- Bullish, bearish (use "net long" or "net short" instead)
- Buy, sell, long, short (as verbs)
- "You should...", "Traders should...", "Consider..."
- "Position accordingly", "Take profit", "Stop loss"
- Any imperative language suggesting actions
- "Recommendation", "Target", "Entry/Exit"
- "Opportunity", "Signal", "Setup"

**REQUIRED LANGUAGE:**
- "The data shows...", "According to the report..."
- "Positions increased/decreased by X%"
- "This ranks in the Xth percentile vs the last ${weeksAvailable} weeks"
- "Historically, when positions reached this level..."
- "Large speculators hold net long/short positions of..."
- "This compares to the 52-week average of..."
- "Standard deviation analysis suggests..."

**Structure:**
1. **Title and Frontmatter** - Focus on unique historical insights
2. **Executive Summary** (2-3 sentences) - Highlight percentile extremes
3. **Extreme Positions Analysis** - Focus on 95th+ percentile markets first
4. **Top Weekly Changes** - With historical context (largest in X weeks, etc.)
5. **Category Breakdown** - Include percentile rankings
6. **Historical Context** - Compare current positions to moving averages
7. **Statistical Analysis** - Z-scores, standard deviations
8. **Educational Notes** - What these extremes historically meant

**Content Guidelines:**
- Start with most extreme positions (95th+ percentile) - these are newsworthy
- Highlight "largest change in X weeks" findings
- Compare current net positions to 4/13/52-week averages
- Explain what percentile rankings mean (e.g., "95th percentile = near historic highs")
- Use Z-scores to contextualize how unusual current positions are
- Discuss what COT data measures and what it doesn't
- Include limitations and caveats about the data

**Historical Context Tips:**
${weeksAvailable >= 52 ? `- You have a full year of data - use it!
- "This is the highest/lowest position in 52 weeks"
- "Only X times in the past year has this market been this bullish"
- Compare current quarter to previous quarters` : weeksAvailable >= 13 ? `- You have quarterly context - leverage it!
- "Highest in ${weeksAvailable} weeks"
- Compare to recent trends` : `- Limited history - focus on week-over-week changes
- Build anticipation for future reports with more context`}

**Legal Protection:**
- Add disclaimer: "This report is for educational purposes only and does not constitute financial advice."
- Frame everything as data observation, not prediction
- Use past tense and conditional language
- Never imply causation, only correlation

**Length:** ${weeksAvailable >= 13 ? '1000-1200 words' : '800-1000 words'}

**Frontmatter:**
---
title: "COT Report Analysis: [Include percentile insights]"
date: "${reportDate}"
excerpt: "[Highlight most extreme positions or largest changes]"
author: "COT Analytics Team"
readTime: "${weeksAvailable >= 13 ? '6 min' : '5 min'}"
category: "Market Data"
tags: ["COT Report", "Position Data", "Historical Analysis", "Percentile Rankings"]
disclaimer: "Educational content only. Not financial advice."
dataSource: "CFTC - ${weeksAvailable} weeks analyzed"
---

**Remember:** You are a quantitative analyst presenting statistical findings, NOT a trading advisor making recommendations. Let the numbers tell the story!

Write the complete blog post now:`;

  return promptText;
}

console.log('🎬 Calling generateWeeklyBlog...');
generateWeeklyBlog()
  .then((result) => {
    console.log('🎉 Success! Blog generated.');
    console.log('📄 Preview (first 200 chars):');
    console.log(result.content.substring(0, 200) + '...');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Script failed!');
    console.error(error);
    process.exit(1);
  });

export { generateWeeklyBlog };
