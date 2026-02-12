# Logo Assets

## Main Logo
**File**: `/public/images/logo.png`
- Size: 101KB
- Colors: Navy blue (#1e3a5f approximately) with candlestick icon
- Usage: Header navigation, homepage, promotional materials
- Background: Light gray (transparent recommended for production)

## Usage in Components

```tsx
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/constants';

<Image 
  src={SITE_CONFIG.logo} 
  alt="COT Data Logo" 
  width={200} 
  height={60}
  priority
/>
```

## Favicon
For production, consider creating:
- `favicon.ico` (16x16, 32x32)
- `apple-touch-icon.png` (180x180)
- `favicon-16x16.png`
- `favicon-32x32.png`

These can be generated from the main logo using tools like:
- https://realfavicongenerator.net/
- Or manually with image editing software

## Color Reference
The logo navy blue complements our site theme:
- Site navy dark: #0f1419
- Site navy lighter: #1a1f29
- Logo blue: ~#1e3a5f (darker, professional)

## Recommendations
1. Consider creating a white/inverted version for dark backgrounds
2. Create SVG version for perfect scaling
3. Generate favicon set for all devices
4. Add to app/layout.tsx metadata for SEO

---

✅ Logo successfully integrated into project
✅ Path stored in SITE_CONFIG.logo constant
✅ Ready to use in PHASE 2 navigation header
