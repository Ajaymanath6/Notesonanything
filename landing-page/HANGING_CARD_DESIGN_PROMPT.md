# Hanging Card Design Prompt

## 🎯 Complete Prompt for Hanging Note Card Animation

Use this exact prompt to create the sophisticated hanging card note system with realistic physics:

---

## **CORE CONCEPT**

Create a spatial note system where feedback cards appear to "hang" from invisible pins with realistic swaying motion, like physical cards suspended by thread or chain.

## **VISUAL DESIGN SPECIFICATIONS**

### **Pin Point System**
```css
.pin-point {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background: #374151;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(55, 65, 81, 0.3);
  z-index: 40;
}
```

### **Connection Chain/String**
```css
.connection-chain {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 48px;
  background: linear-gradient(to bottom, #6b7280, #9ca3af);
  transform-origin: top center;
  z-index: 30;
}
```

### **Hanging Card Container**
```css
.hanging-card {
  background: white;
  border-radius: 16px;
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(229, 231, 235, 0.5);
  backdrop-filter: blur(12px);
  max-width: 320px;
  transform-origin: center -48px; /* Key: Sets pivot point at pin */
}
```

## **ANIMATION SYSTEM**

### **Realistic Swaying Motion**
```jsx
// Framer Motion configuration
const swayAnimation = {
  rotate: [-2, 2, -2], // Gentle pendulum motion
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const chainAnimation = {
  rotate: [-3, 3, -3], // Chain follows with slight delay
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};
```

### **Entry Animation Sequence**
1. **Pin appears** (scale 0 → 1, 0.3s)
2. **Chain drops down** (height 0 → 48px, 0.4s)
3. **Card swings in** (opacity 0 → 1, scale 0.8 → 1, 0.6s)
4. **Gentle sway begins** (continuous)

## **IMPLEMENTATION EXAMPLE**

```jsx
const HangingNoteCard = ({ 
  content = "This button needs more padding and better contrast for accessibility",
  author = "Designer",
  avatar = "DS", 
  timestamp = "now",
  position = { x: 0, y: 0 },
  delay = 0
}) => (
  <motion.div
    className="absolute z-30"
    style={{ left: position.x, top: position.y }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, delay }}
  >
    {/* Pin Point */}
    <motion.div 
      className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-700 rounded-full shadow-lg z-40"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, delay: delay + 0.2 }}
    />
    
    {/* String/Chain */}
    <motion.div 
      className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-400 origin-top z-30"
      style={{ height: '48px' }}
      initial={{ scaleY: 0 }}
      animate={{ 
        scaleY: 1,
        rotate: [-3, 3, -3] 
      }}
      transition={{ 
        scaleY: { duration: 0.4, delay: delay + 0.4 },
        rotate: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay + 1 }
      }}
    />
    
    {/* Swinging Card Container */}
    <motion.div
      className="transform-gpu"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotate: [-2, 2, -2] 
      }}
      transition={{ 
        opacity: { duration: 0.6, delay: delay + 0.6 },
        scale: { duration: 0.6, delay: delay + 0.6 },
        rotate: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay + 1.2 }
      }}
      style={{ transformOrigin: 'center -48px' }}
    >
      {/* Main Note Card */}
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-xl max-w-80 overflow-hidden">
        {/* Card Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                {avatar}
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{author}</div>
                <div className="text-xs text-gray-500">{timestamp}</div>
              </div>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-4">
          <p className="text-gray-800 text-sm leading-relaxed mb-4">
            {content}
          </p>
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MessageSquare className="h-4 w-4" />
              </button>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
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
    </motion.div>
  </motion.div>
);
```

## **PHYSICS PRINCIPLES**

### **Natural Pendulum Motion**
- **Period**: 3 seconds for realistic feel
- **Amplitude**: ±2 degrees rotation
- **Easing**: `easeInOut` for natural acceleration/deceleration
- **Transform Origin**: Critical - must be set to pin point location

### **Multi-Element Coordination**
- **Chain leads**: Starts motion slightly before card
- **Card follows**: Responds to chain movement with slight delay
- **Dampening effect**: Motion gradually becomes more subtle

## **INTERACTION ENHANCEMENTS**

### **Hover Effects**
```jsx
// On hover, reduce sway and lift slightly
whileHover={{
  rotate: 0, // Stop swaying
  y: -4,     // Lift up slightly
  scale: 1.02 // Subtle scale increase
}}
```

### **Click Response**
```jsx
// On click, brief swing motion
whileTap={{
  rotate: [0, -5, 5, 0], // Quick swing
  transition: { duration: 0.5 }
}}
```

## **VISUAL POLISH**

### **Shadow System**
- **Pin**: `box-shadow: 0 2px 8px rgba(55, 65, 81, 0.3)`
- **Chain**: Subtle gradient from dark to light
- **Card**: Dynamic shadow that follows sway motion

### **Lighting Effects**
- **Top edge highlight**: Simulates overhead lighting
- **Bottom shadow**: Grounds the card in space
- **Gradient backgrounds**: Adds depth and dimension

## **PERFORMANCE OPTIMIZATION**

### **GPU Acceleration**
- Use `transform-gpu` class for hardware acceleration
- Prefer `transform` over position changes
- Limit simultaneous animations

### **Reduced Motion Support**
```css
@media (prefers-reduced-motion: reduce) {
  .hanging-card {
    animation: none;
    transform: none;
  }
}
```

## **USE CASES**

### **Single Card Demo**
Perfect for showcasing the hanging card concept in isolation

### **Multiple Cards**
Stagger delays to create natural, non-synchronized motion

### **Interactive Feedback**
Combine with click-to-place functionality for spatial annotation

---

## **DESIGN PSYCHOLOGY**

The hanging card design creates:
- **Spatial relationship** between feedback and content
- **Visual hierarchy** through depth and motion
- **Attention direction** via gentle, organic movement
- **Approachable interface** that feels less rigid than static cards

This creates a more natural, less intimidating feedback experience that encourages interaction and engagement.

---

*This hanging card system bridges the gap between digital annotation tools and physical feedback methods, creating an intuitive and visually appealing spatial feedback experience.* 