# NOA Landing Page - Orange/Amber Design Backup

## Current Design State (Before Apple Transformation)

This file contains the exact code and prompts needed to recreate the current orange/amber warm design theme.

### Design Description
- **Header**: Dark theme with black background, white NOA logo
- **Hero Section**: Warm orange/amber gradient background with brown text
- **Note Design**: Apple-inspired gray/black/white floating notes
- **Overall Aesthetic**: Warm, welcoming orange theme with professional note components

### Current Color Palette
```css
/* Hero Section Colors */
--hero-bg: linear-gradient(135deg, #fef3c7, #fed7aa, #fef3c7); /* amber-50 to orange-50 */
--hero-text-primary: #92400e; /* amber-800 */
--hero-text-secondary: #b45309; /* amber-700 */
--hero-accent: #d97706; /* orange-600 */

/* Header Colors */
--header-bg: var(--color-glass); /* Dark theme */
--header-border: var(--color-border-primary);

/* Note Colors (Already Apple-themed) */
--note-avatar: linear-gradient(135deg, #4b5563, #374151); /* gray-600 to gray-700 */
--note-pin: #374151; /* gray-700 */
--note-connection: linear-gradient(to bottom, #9ca3af, transparent); /* gray-400 */
```

### Key Sections

#### 1. Hero Section Classes
```jsx
// Current warm orange/amber hero background
<section className="px-6 py-20 relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">

// Background decorative elements
<div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
<div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-orange-200/40 to-amber-300/40 rounded-full blur-3xl"></div>

// Text colors
<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-amber-900">
<p className="text-xl mb-10 leading-relaxed text-amber-800">

// CTA buttons
<button className="bg-amber-800 text-white px-8 py-4 rounded-xl hover:bg-amber-900">
<button className="border-2 border-amber-800 text-amber-800 px-8 py-4 rounded-xl hover:bg-amber-800 hover:text-white">
```

#### 2. Header Classes
```jsx
// Dark header with backdrop blur
<header className="sticky top-0 z-50 backdrop-blur-md border-b" 
  style={{ 
    backgroundColor: 'var(--color-glass)', 
    borderColor: 'var(--color-border-primary)' 
  }}>
```

#### 3. Note Design (Already Apple-themed)
```jsx
// Gray/black/white note design - keep this as is
<div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full">
<div className="absolute -top-2 -left-2 w-6 h-6 bg-gray-700 rounded-full">
<button className="px-3 py-1.5 bg-gray-900 hover:bg-black text-white">
```

### Recreation Prompts

#### To Recreate This Orange Design:
```
"Create a warm, welcoming landing page for NOA with:
- Orange/amber gradient hero section (from-amber-50 via-orange-50 to-amber-100)
- Amber-900 main headings, amber-800 body text
- Amber-800 primary CTA button with hover:amber-900
- Dark header with backdrop blur and border
- Keep the Apple-inspired gray/black/white note design
- Warm orange decorative background elements with blur effects
- Professional but approachable aesthetic"
```

#### Current File Structure:
- `landing-page/src/App.jsx` - Main landing page component
- `SingleNoteDesign.jsx` - Standalone note component
- `SINGLE_NOTE_DESIGN_README.md` - Note component documentation

### Exact Code Sections

#### Hero Section Background:
```jsx
<section className="px-6 py-20 relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
  {/* Background Pattern */}
  <div className="absolute inset-0">
    <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-orange-200/40 to-amber-300/40 rounded-full blur-3xl"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-amber-100/50 to-orange-100/50 rounded-full blur-2xl"></div>
  </div>
```

#### Typography:
```jsx
<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-amber-900">
  Stop saying{' '}
  <span className="text-orange-600">&ldquo;something&rsquo;s broken&rdquo;</span>
  <br />
  <span className="bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
    Show exactly what and where
  </span>
</h1>

<p className="text-xl mb-10 leading-relaxed text-amber-800">
  Transform any webpage into a collaborative feedback canvas. 
  Click, annotate, collaborate, resolve. No more guessing games.
</p>
```

#### CTA Buttons:
```jsx
<button className="bg-amber-800 text-white px-8 py-4 rounded-xl hover:bg-amber-900 transition-all duration-200 flex items-center justify-center space-x-2 text-lg font-semibold transform hover:-translate-y-0.5 shadow-lg shadow-amber-800/25">
  <span>Try Free Forever</span>
  <ArrowRight className="h-5 w-5" />
</button>

<button className="border-2 border-amber-800 text-amber-800 px-8 py-4 rounded-xl hover:bg-amber-800 hover:text-white transition-all duration-200 text-lg font-semibold backdrop-blur-sm flex items-center space-x-2">
  <Play className="h-5 w-5" />
  <span>Watch Demo</span>
</button>
```

### Notes
- The note design components are already Apple-themed (gray/black/white)
- Only the page background, text colors, and CTA buttons use the orange/amber theme
- Header remains dark-themed for contrast
- This design balances warmth (orange) with professionalism (dark header, clean notes)

---

*Save this file to recreate the current orange/amber design before applying Apple transformation.* 