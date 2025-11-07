# Hanging Card Design - Complete Recreation Guide

## 🎯 **Master Prompt for Hanging Card Recreation**

Use this exact prompt to recreate the sophisticated hanging note card with physics-based swinging animation:

---

## **COMPLETE HANGING CARD PROMPT**

Create a sophisticated hanging note card component with realistic physics animation using the following exact specifications:

### **VISUAL DESIGN SPECIFICATIONS**

#### **Pin Point System:**
- **Pin Point**: 3x3 rounded circle, `bg-gray-700`, positioned 48px above card center
- **String**: 0.5px width, `bg-gray-400`, connects pin to card top-center
- **Shadow**: Subtle `shadow-lg` on pin point for depth

#### **Card Container:**
- **Base Style**: White background with `rounded-2xl`, `shadow-2xl`
- **Border**: `border border-gray-200/50` with `backdrop-blur-xl`
- **Max Width**: 320px (80 in Tailwind)
- **Overflow**: Hidden for clean edges

#### **Card Header:**
- **Background**: `bg-gradient-to-r from-gray-50 to-white`
- **Border**: `border-b border-gray-100`
- **Padding**: `px-4 py-3`
- **Avatar**: 8x8 circle, `bg-gray-900`, white text, font-semibold
- **Author Info**: Name in `text-gray-900 font-semibold`, timestamp in `text-gray-500`
- **Status Dot**: 2x2 `bg-gray-400 rounded-full` on right side

#### **Card Content:**
- **Text**: `text-gray-800 text-sm leading-relaxed`
- **Padding**: `p-4`
- **Action Buttons**: Reply (gray) and Resolve (black) buttons

#### **Physics Animation:**
- **Pendulum Motion**: Rotate between -2° and +2°
- **Transform Origin**: Center point 48px above card (pin location)  
- **Duration**: 3 seconds per complete swing
- **Easing**: `easeInOut` for natural pendulum feel
- **Infinite Repeat**: Continuous subtle motion

### **TECHNICAL IMPLEMENTATION**

```jsx
// Complete Hanging Card Component
const HangingNoteCard = ({ 
  content = "This button needs more padding and better contrast for accessibility",
  author = "Designer",
  avatar = "DS", 
  timestamp = "now",
  position = { x: 0, y: 0 }
}) => (
  <motion.div
    className="absolute z-30"
    style={{ left: position.x, top: position.y }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 1.4 }}
  >
    {/* Pin Point */}
    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-700 rounded-full shadow-lg z-40"></div>
    
    {/* String/Chain */}
    <motion.div 
      className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-400 origin-top z-30"
      style={{ height: '48px' }}
      animate={{ rotate: [-3, 3, -3] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    ></motion.div>
    
    {/* Swinging Card Container */}
    <motion.div
      className="transform-gpu"
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: 'center -48px' }}
    >
      <div className="scale-125">
        {/* Card Content */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-xl max-w-80 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                  {avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{author}</div>
                  <div className="text-xs text-gray-500">{timestamp}</div>
                </div>
              </div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4">
            <p className="text-gray-800 text-sm leading-relaxed mb-4">
              {content}
            </p>
            
            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <MessageSquare className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Target className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 text-gray-600 hover:text-gray-800 text-xs font-medium transition-colors">
                  Reply
                </button>
                <button className="px-3 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-medium rounded-lg transition-colors">
                  Resolve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
)
```

### **PLACEMENT STRATEGIES**

#### **Option 1: Hero Section (Current)**
- Position: `-right-32 top-1/2` 
- Purpose: Shows instant feedback capability
- Scale: `scale-125` for emphasis

#### **Option 2: Problem Section**
- Position: `right-8 top-20`
- Purpose: Demonstrates solution during problem explanation
- Animation: Delayed appearance after problem statement

#### **Option 3: Feature Section**  
- Position: `left-0 bottom-10`
- Purpose: Interactive element during feature demonstration
- Behavior: Swings in response to user scroll

#### **Option 4: Floating Sidebar**
- Position: `fixed right-4 top-1/2`
- Purpose: Persistent demonstration element
- Interaction: Click to expand/collapse

### **ANIMATION TIMELINE**

```javascript
// Complete Animation Sequence
const hangingCardAnimation = {
  // Entry Animation
  initial: { opacity: 0, scale: 0.8, y: -20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.6, delay: 1.4 },
  
  // Pendulum Physics
  pendulumMotion: {
    rotate: [-2, 2, -2],
    transition: { 
      duration: 3, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  },
  
  // String Motion (synchronized)
  stringMotion: {
    rotate: [-3, 3, -3],
    transition: { 
      duration: 3, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  }
}
```

### **CUSTOMIZATION VARIABLES**

```css
/* Core Design Variables */
:root {
  --pin-size: 12px;
  --string-width: 2px;
  --string-length: 48px;
  --card-max-width: 320px;
  --swing-angle: 2deg;
  --swing-duration: 3s;
  --card-scale: 1.25;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  :root {
    --card-max-width: 280px;
    --card-scale: 1.0;
    --swing-angle: 1.5deg;
  }
}
```

### **USAGE INSTRUCTIONS**

1. **Copy the complete component code above**
2. **Import required dependencies**: `framer-motion`, `lucide-react`  
3. **Place component using absolute positioning**
4. **Customize content, author, and position props**
5. **Adjust animation timing and scale as needed**

### **EXPECTED RESULT**

The component should create:
- ✅ Realistic pendulum physics motion
- ✅ Professional note card design
- ✅ Smooth entry animation with delay
- ✅ Consistent gray/white color scheme
- ✅ Interactive hover states on buttons
- ✅ Responsive scaling for mobile devices

---

*This guide ensures 100% accurate recreation of the sophisticated hanging note card with realistic physics animation.* 