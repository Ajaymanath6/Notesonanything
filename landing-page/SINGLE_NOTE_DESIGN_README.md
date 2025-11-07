# NOA Single Note Design

## Apple-Inspired Floating Note Component

### Overview
This is a standalone, production-ready note component inspired by Apple's design philosophy and Figma's comment system. Perfect for adding contextual feedback and annotations to any web application.

![Single Note Preview](https://via.placeholder.com/400x300/f8fafc/1e293b?text=NOA+Single+Note+Design)

---

## 🎯 Key Features

- **Apple-Inspired Design**: Clean, minimal aesthetics with subtle shadows
- **AI-Powered Enhancements**: Smart rephrasing and tone adjustment
- **Pixel-Perfect Positioning**: Floating pin indicator with connection line
- **Smooth Animations**: Framer Motion-powered micro-interactions
- **Fully Responsive**: Works seamlessly across all device sizes
- **Accessibility Ready**: WCAG AA compliant with proper ARIA labels

---

## 🚀 Quick Start

### Installation
```bash
npm install framer-motion lucide-react
```

### Basic Usage
```jsx
import { SingleSleekNote } from './SingleNoteDesign'

function App() {
  return (
    <div className="p-8">
      <SingleSleekNote 
        content="The button needs better contrast for accessibility."
        author="Design Lead"
        avatar="DL"
        timestamp="5 min ago"
        tone="professional"
        isAiEnhanced={true}
      />
    </div>
  )
}
```

---

## 📋 Component API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | string | "The button color doesn't match..." | Main note content/message |
| `author` | string | "Sarah Chen" | Display name of note author |
| `avatar` | string | "SC" | 2-letter avatar initials |
| `timestamp` | string | "2 min ago" | Relative time display |
| `tone` | string | "professional" | AI tone setting |
| `isAiEnhanced` | boolean | true | Shows AI enhancement features |
| `delay` | number | 0 | Animation delay in seconds |

### Example Variations

```jsx
// Basic Note
<SingleSleekNote 
  content="This looks great!"
  author="John Doe"
  avatar="JD"
  isAiEnhanced={false}
/>

// Technical Note
<SingleSleekNote 
  content="Consider using semantic HTML elements for better accessibility."
  author="Senior Dev"
  avatar="SD"
  tone="technical"
  isAiEnhanced={true}
/>

// Friendly Note
<SingleSleekNote 
  content="Love the new design! 🎉"
  author="Marketing"
  avatar="MK"
  tone="friendly"
  timestamp="just now"
/>
```

---

## 🎨 Design Specifications

### Visual Hierarchy
```css
.note-container {
  max-width: 320px;
  border-radius: 16px;
  background: white;
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

### Typography
- **Header**: 14px, semibold, #111827
- **Content**: 14px, regular, #374151
- **Timestamp**: 12px, regular, #6b7280
- **Actions**: 12px, medium, #4b5563

### Color Palette
```css
:root {
  --note-bg: #ffffff;
  --note-border: rgba(229, 231, 235, 0.5);
  --note-shadow: rgba(0, 0, 0, 0.1);
  --avatar-bg: linear-gradient(135deg, #3b82f6, #2563eb);
  --ai-badge-bg: #f3e8ff;
  --ai-badge-text: #7c3aed;
  --pin-bg: #2563eb;
  --connection-line: linear-gradient(to bottom, #3b82f6, transparent);
}
```

---

## 🎬 Animation Details

### Entry Animation
```jsx
initial={{ opacity: 0, scale: 0.8, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
transition={{ duration: 0.6, delay: props.delay }}
```

### Hover Effects
- **Container**: Subtle lift (-2px) with enhanced shadow
- **Buttons**: Color transitions (0.2s ease)
- **Pin**: Continuous pulse animation (2s infinite)

---

## 🛠️ Customization

### Styling
Override default styles using Tailwind classes:

```jsx
<SingleSleekNote 
  className="max-w-md border-purple-200"
  content="Custom styled note"
/>
```

### AI Features
Toggle AI enhancements:

```jsx
// Enable all AI features
<SingleSleekNote isAiEnhanced={true} tone="professional" />

// Disable AI features
<SingleSleekNote isAiEnhanced={false} />
```

### Tone Options
- `professional` - Formal, business-appropriate
- `friendly` - Casual, approachable
- `technical` - Precise, specification-focused
- `constructive` - Helpful, solution-oriented
- `enthusiastic` - Positive, energetic

---

## 📱 Responsive Behavior

### Breakpoints
- **Mobile** (< 768px): max-width: 280px
- **Tablet** (768px - 1024px): max-width: 300px  
- **Desktop** (> 1024px): max-width: 320px

### Mobile Optimizations
- Larger touch targets (44px minimum)
- Simplified AI controls
- Optimized text sizing

---

## ♿ Accessibility

### ARIA Labels
```jsx
<div role="note" aria-label={`Note by ${author}`}>
  <button aria-label="Reply to note">Reply</button>
  <button aria-label="Resolve note">Resolve</button>
</div>
```

### Keyboard Navigation
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons
- **Escape**: Close expanded views

### Screen Reader Support
- Semantic HTML structure
- Descriptive alt text for icons
- Status announcements for AI features

---

## 🔧 Implementation Examples

### With State Management
```jsx
const [note, setNote] = useState({
  content: "Initial feedback",
  isResolved: false,
  aiSuggestions: []
})

<SingleSleekNote 
  content={note.content}
  onResolve={() => setNote(prev => ({ ...prev, isResolved: true }))}
  onReply={(reply) => handleReply(note.id, reply)}
/>
```

### With Form Integration
```jsx
const handleNoteSubmit = (noteData) => {
  // Save note to backend
  api.createNote(noteData)
}

<SingleSleekNote 
  {...noteData}
  onSubmit={handleNoteSubmit}
/>
```

---

## 🎭 Animation Presets

### Entrance Animations
```jsx
// Slide up
<SingleSleekNote delay={0} />

// Staggered entrance
{notes.map((note, index) => (
  <SingleSleekNote 
    key={note.id} 
    {...note} 
    delay={index * 0.1} 
  />
))}
```

### Custom Transitions
```jsx
// Bounce entrance
<motion.div
  initial={{ opacity: 0, scale: 0.3 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ 
    type: "spring", 
    stiffness: 260, 
    damping: 20 
  }}
>
  <SingleSleekNote />
</motion.div>
```

---

## 🧪 Testing

### Unit Tests
```jsx
import { render, screen } from '@testing-library/react'
import { SingleSleekNote } from './SingleNoteDesign'

test('renders note content', () => {
  render(<SingleSleekNote content="Test note" />)
  expect(screen.getByText('Test note')).toBeInTheDocument()
})

test('shows AI badge when enhanced', () => {
  render(<SingleSleekNote isAiEnhanced={true} />)
  expect(screen.getByText('AI')).toBeInTheDocument()
})
```

### Visual Testing
- Chromatic integration for visual regression
- Cross-browser compatibility testing
- Mobile device testing

---

## 📦 Bundle Size

- **Component**: ~2.1KB gzipped
- **Dependencies**: 
  - framer-motion: ~28KB
  - lucide-react: ~1.2KB per icon
- **Total Impact**: ~32KB gzipped

---

## 🔮 Future Enhancements

### Planned Features
- [ ] Rich text editing support
- [ ] File attachment capabilities
- [ ] Emoji reactions
- [ ] Mention system (@username)
- [ ] Thread replies
- [ ] Real-time collaboration cursors

### AI Improvements
- [ ] Context-aware suggestions
- [ ] Auto-translation
- [ ] Sentiment analysis
- [ ] Smart categorization

---

## 📄 License

MIT License - feel free to use in your projects!

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

---

## 💬 Support

- **Documentation**: [Full API Reference](./docs)
- **Examples**: [CodeSandbox Demos](./examples)
- **Issues**: [GitHub Issues](./issues)
- **Community**: [Discord Channel](./discord)

---

*This single note component is part of the larger NOA (Notes on Anything) design system, bringing Apple-quality design to web annotations.* 