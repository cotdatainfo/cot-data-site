import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        'navy-dark': '#0f1419',
        'navy-lighter': '#1a1f29',
        'navy-border': '#2a3040',
        // Signal colors
        'bullish-green': '#10b981',
        'bearish-red': '#ef4444',
        'extreme-purple': '#8b5cf6',
        'extreme-blue': '#3b82f6',
        // Text
        'text-primary': '#ffffff',
        'text-secondary': '#9ca3af',
        'text-muted': '#6b7280',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
