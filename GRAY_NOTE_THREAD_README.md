# Gray Note Thread - Professional Neutral Theme with Comments

## Overview
The **Gray Note Thread** is an enhanced version of the Gray Note with full commenting functionality, designed for professional environments where a neutral, minimalist aesthetic is preferred. It combines clean gray styling with collaborative features like comments, replies, and collapsible thread management.

## Visual Design

### Color Scheme
- **Header Background**: `#E8E8E8` (Light Gray)
- **Content Background**: `#F8F8F8` (Very Light Gray)
- **Primary Text**: `#4A4A4A` (Dark Gray)
- **Secondary Text**: `#6B7280` (Medium Gray)
- **Icon Background**: `#4A4A4A` (Dark Gray)
- **Icon Color**: `#E8E8E8` (Light Gray) and `#4A4A4A` (Dark Gray)
- **Border**: `rgba(0, 0, 0, 0.1)` (Subtle Black)
- **Comment Section**: `rgba(255, 255, 255, 0.8)` (Semi-transparent White)
- **Interactive Elements**: Gray-based hover states

### Design Features
- **Professional Theme**: Clean and corporate-friendly appearance
- **Excellent Readability**: High contrast gray combinations
- **Collapsible Comments**: Chevron-controlled expandable comment section
- **Rounded Corners**: `rounded-3xl` (24px border radius)
- **Width**: 320px (standard note width)
- **Shadow**: Professional drop shadow with backdrop blur
- **Neutral Aesthetic**: Perfect for business and formal environments

## Figma Design Guide

### Step 1: Create the Main Container
1. **Create Rectangle**: 320px × auto (minimum 180px height)
2. **Border Radius**: 24px on all corners
3. **Fill**: Solid color `#FFFFFF` (White base)
4. **Border**: 1px solid `#E5E5E5`
5. **Drop Shadow**: 
   - X: 0, Y: 8, Blur: 24
   - Color: `rgba(0, 0, 0, 0.15)`
   - Opacity: 15%
6. **Backdrop Filter**: Blur 12px (optional)

### Step 2: Design the Header Section
1. **Create Container**: 320px × 72px
2. **Fill**: `#E8E8E8`
3. **Border Bottom**: 1px solid `rgba(0, 0, 0, 0.1)`
4. **Padding**: 16px all sides

#### Header Elements:
- **Avatar Circle**: 
  - Size: 32px × 32px
  - Fill: `#4A4A4A`
  - Text: "YO" (14px, weight 600, color `#E8E8E8`)
- **User Info**:
  - Name: "You" (14px, weight 500, color `#374151`)
  - Timestamp: "just now" (12px, weight 400, color `#6B7280`)
- **Action Buttons**:
  - Edit Icon: 16px × 16px, color `#4A4A4A`
  - Delete Icon: 16px × 16px, color `#4A4A4A`
  - Button Background: `rgba(255, 255, 255, 0.5)` on hover

### Step 3: Content Area Design
1. **Create Container**: 320px × auto (minimum 96px)
2. **Fill**: `#F8F8F8`
3. **Padding**: 16px all sides

#### Content Elements:
- **Text Area** (when editing):
  - Size: 288px × 96px
  - Fill: `rgba(255, 255, 255, 0.8)`
  - Border: 1px solid `rgba(0, 0, 0, 0.2)`
  - Border Radius: 8px
  - Text: 14px, color `#4A4A4A`
  - Placeholder: "Share your thoughts..."
- **Display Text** (when saved):
  - Text: 14px, color `#4A4A4A`
  - Line Height: 1.5
  - Word Wrap: enabled

### Step 4: Comments Section Design

#### Comments Header
1. **Create Container**: 320px × 56px
2. **Fill**: `#F8F8F8`
3. **Border Top**: 1px solid `rgba(0, 0, 0, 0.1)`
4. **Padding**: 12px 16px

#### Header Elements:
- **Comments Icon**: 16px × 16px, color `#4A4A4A`
- **Comments Count**: "X Comments" (14px, weight 500, color `#374151`)
- **Chevron Icon**: 16px × 16px, color `#6B7280`
- **Interactive State**: Hover background `#F3F4F6`

#### Individual Comments
1. **Comment Container**: 288px × auto
2. **Fill**: `rgba(255, 255, 255, 0.8)`
3. **Border Radius**: 8px
4. **Padding**: 12px
5. **Margin**: 8px between comments

#### Comment Elements:
- **Avatar**: 24px × 24px circle, `#4A4A4A`
- **Author Name**: 14px, weight 500, color `#374151`
- **Timestamp**: 12px, color `#6B7280`
- **Comment Text**: 14px, color `#374151`, line height 1.4
- **Action Buttons**:
  - Like: Heart icon 12px, color `#6B7280`
  - Reply: Reply icon 12px, color `#6B7280`
  - Delete: X icon 16px (for owner only), color `#9CA3AF`

### Step 5: Add Comment Form
1. **Create Container**: 320px × auto
2. **Padding**: 16px
3. **Background**: `#F8F8F8`

#### Form Elements:
- **Avatar**: 24px × 24px, `#4A4A4A`, text color `#E8E8E8`
- **Text Area**: 
  - Size: 248px × 64px
  - Fill: `rgba(255, 255, 255, 0.8)`
  - Border: 1px solid `rgba(0, 0, 0, 0.2)`
  - Border Radius: 8px
  - Placeholder: "Add a comment..."
- **Submit Button**:
  - Size: auto × 36px
  - Fill: `#4A4A4A`
  - Text: "Comment" (14px, weight 500, color `#FFFFFF`)
  - Border Radius: 8px

### Step 6: Interaction States

#### Collapsed State
- **Comments Section**: Hidden
- **Chevron**: Pointing down (`ChevronDown`)
- **Indicator**: Small text showing comment count

#### Expanded State
- **Comments Section**: Visible
- **Chevron**: Pointing up (`ChevronUp`)
- **Full Comments**: All comments and form visible

#### Hover States
- **Buttons**: `#F3F4F6` background
- **Comment Actions**: `#F9FAFB` background
- **Form Elements**: Border color intensifies to `rgba(0, 0, 0, 0.3)`

### Step 7: Animation Guidelines

#### Expand/Collapse Animation
- **Duration**: 200ms
- **Easing**: ease-out
- **Properties**: height, opacity
- **Chevron Rotation**: 180° smooth transition

#### Hover Animations
- **Duration**: 150ms
- **Easing**: ease-in-out
- **Scale**: Subtle 1.01x for buttons
- **Color**: Smooth transitions between states

### Step 8: Typography System

#### Font Hierarchy
- **Headers**: 14px, weight 500-600
- **Body Text**: 14px, weight 400
- **Captions**: 12px, weight 400
- **Placeholders**: 14px, weight 400, color `#9CA3AF`

#### Font Family
- **Primary**: System font stack
- **Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto

### Step 9: Accessibility Considerations

#### Contrast Ratios
- **Primary Text**: Dark gray on light (8.6:1 ratio - WCAG AAA)
- **Secondary Text**: Medium gray on light (4.5:1 ratio - WCAG AA)
- **Interactive Elements**: Minimum 3:1 contrast

#### Focus States
- **Outline**: 2px solid `#4A4A4A`
- **Offset**: 2px from element
- **Border Radius**: Match element radius

### Step 10: Component Variations

#### Error States
- **Border**: Red accent `#EF4444`
- **Background**: `#FEF2F2`
- **Text**: Error message in `#DC2626`

#### Loading States
- **Spinner**: Gray rotating indicator
- **Disabled**: 50% opacity
- **Text**: "Adding..." or "Saving..."

#### Empty States
- **Placeholder**: "No comments yet"
- **Icon**: Message square outline in gray
- **Encourage**: "Start the conversation!"

## Design Best Practices

### Professional Design Principles
1. **Subtle Contrast**: Gentle color differences for sophistication
2. **Consistent Spacing**: Use 4px grid system throughout
3. **Clear Hierarchy**: Visual weight guides attention naturally
4. **Corporate Friendly**: Neutral enough for any business environment

### Gray Theme Optimization
1. **Balanced Grays**: Multiple gray tones create depth without distraction
2. **Sufficient Contrast**: Ensure readability for all users
3. **Warm Undertones**: Slight warmth prevents sterile appearance
4. **Accessible Colors**: All combinations meet WCAG AA standards

### Comment System UX
1. **Professional Tone**: Visual design supports formal communication
2. **Clear Organization**: Hierarchical structure for easy scanning
3. **Subtle Interactions**: Hover states are noticeable but not distracting
4. **Efficient Workflow**: Quick access to common actions

## File Structure for Figma

```
Gray Thread Note Component/
├── 🎨 Main Container
├── 📄 Header Section
│   ├── Avatar
│   ├── User Info
│   └── Action Buttons
├── ✏️ Content Area
│   ├── Edit Mode
│   └── Display Mode
├── 💬 Comments Section
│   ├── Header (Collapsible)
│   ├── Comment List
│   │   ├── Individual Comments
│   │   └── Reply Threads
│   └── Add Comment Form
├── 🎭 States
│   ├── Collapsed
│   ├── Expanded
│   ├── Hover
│   └── Focus
└── 📱 Responsive
    ├── Mobile
    └── Desktop
```

## Export Settings

### For Development
- **Format**: SVG for icons, PNG for complex elements
- **Scale**: 1x, 2x, 3x for different screen densities
- **Naming**: gray-thread-component-state-size.ext

### For Documentation
- **Format**: PNG at 2x resolution
- **Include**: All states and variations
- **Annotations**: Measurements and color codes

## Implementation Notes

### CSS Custom Properties
```css
:root {
  --gray-header: #E8E8E8;
  --gray-content: #F8F8F8;
  --gray-text-primary: #4A4A4A;
  --gray-text-secondary: #6B7280;
  --gray-text-muted: #9CA3AF;
  --gray-border: rgba(0, 0, 0, 0.1);
  --gray-hover: #F3F4F6;
  --shadow-professional: 0 8px 24px rgba(0, 0, 0, 0.15);
}
```

### Key Measurements
- **Container Width**: 320px
- **Border Radius**: 24px (main), 8px (internal elements)
- **Padding**: 16px (standard), 12px (compact)
- **Icon Sizes**: 16px (actions), 12px (inline), 24px (avatars)
- **Font Sizes**: 14px (primary), 12px (secondary)

## Color Palette Reference

### Primary Grays
- **Lightest**: `#F8F8F8` (Content background)
- **Light**: `#E8E8E8` (Header background)
- **Medium**: `#9CA3AF` (Muted text)
- **Dark**: `#6B7280` (Secondary text)
- **Darkest**: `#4A4A4A` (Primary text)

### Supporting Colors
- **White**: `#FFFFFF` (Base container)
- **Border**: `rgba(0, 0, 0, 0.1)` (Subtle divisions)
- **Hover**: `#F3F4F6` (Interactive states)
- **Shadow**: `rgba(0, 0, 0, 0.15)` (Depth)

## Use Cases

### Professional Environments
- **Corporate Documentation**: Clean, distraction-free appearance
- **Team Collaboration**: Professional comment threading
- **Meeting Notes**: Formal discussion tracking
- **Project Planning**: Structured feedback collection

### Business Applications
- **Client Communication**: Professional presentation
- **Internal Reviews**: Clean feedback system
- **Documentation**: Clear comment hierarchy
- **Approval Workflows**: Formal discussion trails

---

**Perfect for professional environments that need clean, collaborative note-taking! 🔘💼💬**