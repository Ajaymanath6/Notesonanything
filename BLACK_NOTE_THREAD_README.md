# Black Note Thread - Developer-Focused Dark Theme with Comments

## Overview
The **Black Note Thread** is an enhanced version of the Black Note with full commenting functionality, specifically designed for developers who need collaborative features in their dark-themed note-taking environment. It combines the eye-friendly dark interface with social interaction capabilities like comments, replies, and thread management.

## Visual Design

### Color Scheme
- **Primary Background**: `#03190F` (Deep Dark Green/Black)
- **Secondary Background**: `#03190F` (Consistent Dark Color)
- **Primary Text**: `#FFFFFF` (Pure White)
- **Secondary Text**: `#D1D5DB` (Light Gray)
- **Icon Background**: `rgba(255, 255, 255, 0.1)` (Semi-transparent White)
- **Icon Color**: `#FFFFFF` (White)
- **Border**: `rgba(255, 255, 255, 0.1)` (Semi-transparent White)
- **Comment Section**: `rgba(255, 255, 255, 0.05)` (Very Subtle White)
- **Interactive Elements**: `rgba(255, 255, 255, 0.1)` (Semi-transparent White)

### Design Features
- **Dark Theme**: Perfect for long coding sessions and late-night work
- **High Contrast**: White text on dark background for excellent readability
- **Collapsible Comments**: Chevron-controlled expandable comment section
- **Rounded Corners**: `rounded-3xl` (24px border radius)
- **Width**: 320px (compact and focused)
- **Shadow**: Elegant drop shadow with backdrop blur
- **Developer-Friendly**: Optimized for code discussions and technical collaboration

## Figma Design Guide

### Step 1: Create the Main Container
1. **Create Rectangle**: 320px × auto (minimum 180px height)
2. **Border Radius**: 24px on all corners
3. **Fill**: Solid color `#03190F`
4. **Border**: 1px solid `rgba(255, 255, 255, 0.1)`
5. **Drop Shadow**: 
   - X: 0, Y: 8, Blur: 24
   - Color: `rgba(0, 0, 0, 0.3)`
   - Opacity: 30%

### Step 2: Design the Header Section
1. **Create Container**: 320px × 72px
2. **Fill**: Same as main container `#03190F`
3. **Border Bottom**: 1px solid `rgba(255, 255, 255, 0.1)`
4. **Padding**: 16px all sides

#### Header Elements:
- **Avatar Circle**: 
  - Size: 32px × 32px
  - Fill: `rgba(255, 255, 255, 0.1)`
  - Text: "YO" (14px, weight 600, color `#FFFFFF`)
- **User Info**:
  - Name: "You" (14px, weight 500, color `#FFFFFF`)
  - Timestamp: "just now" (12px, weight 400, color `#D1D5DB`)
- **Action Buttons**:
  - Edit Icon: 16px × 16px, color `#FFFFFF`
  - Delete Icon: 16px × 16px, color `#FFFFFF`
  - Button Background: `rgba(255, 255, 255, 0.05)` on hover

### Step 3: Content Area Design
1. **Create Container**: 320px × auto (minimum 96px)
2. **Fill**: `#03190F`
3. **Padding**: 16px all sides

#### Content Elements:
- **Text Area** (when editing):
  - Size: 288px × 96px
  - Fill: `rgba(255, 255, 255, 0.05)`
  - Border: 1px solid `rgba(255, 255, 255, 0.2)`
  - Border Radius: 8px
  - Text: 14px, color `#FFFFFF`
  - Placeholder: "Type your code notes here..."
- **Display Text** (when saved):
  - Text: 14px, color `#FFFFFF`
  - Line Height: 1.5
  - Word Wrap: enabled

### Step 4: Comments Section Design

#### Comments Header
1. **Create Container**: 320px × 56px
2. **Fill**: `rgba(255, 255, 255, 0.05)`
3. **Border Top**: 1px solid `rgba(255, 255, 255, 0.1)`
4. **Padding**: 12px 16px

#### Header Elements:
- **Comments Icon**: 16px × 16px, color `#FFFFFF`
- **Comments Count**: "X Comments" (14px, weight 500, color `#FFFFFF`)
- **Chevron Icon**: 16px × 16px, color `rgba(255, 255, 255, 0.7)`
- **Interactive State**: Hover background `rgba(255, 255, 255, 0.05)`

#### Individual Comments
1. **Comment Container**: 288px × auto
2. **Fill**: `rgba(255, 255, 255, 0.05)`
3. **Border Radius**: 8px
4. **Padding**: 12px
5. **Margin**: 8px between comments

#### Comment Elements:
- **Avatar**: 24px × 24px circle, `rgba(255, 255, 255, 0.1)`
- **Author Name**: 14px, weight 500, color `#FFFFFF`
- **Timestamp**: 12px, color `rgba(255, 255, 255, 0.7)`
- **Comment Text**: 14px, color `#FFFFFF`, line height 1.4
- **Action Buttons**:
  - Like: Heart icon 12px, color `rgba(255, 255, 255, 0.7)`
  - Reply: Reply icon 12px, color `rgba(255, 255, 255, 0.7)`
  - Delete: X icon 16px (for owner only)

### Step 5: Add Comment Form
1. **Create Container**: 320px × auto
2. **Padding**: 16px
3. **Background**: `#03190F`

#### Form Elements:
- **Avatar**: 24px × 24px, `rgba(255, 255, 255, 0.1)`
- **Text Area**: 
  - Size: 248px × 64px
  - Fill: `rgba(255, 255, 255, 0.05)`
  - Border: 1px solid `rgba(255, 255, 255, 0.2)`
  - Border Radius: 8px
  - Placeholder: "Add a comment..."
- **Submit Button**:
  - Size: auto × 36px
  - Fill: `#FFFFFF`
  - Text: "Comment" (14px, weight 500, color `#000000`)
  - Border Radius: 8px

### Step 6: Interaction States

#### Collapsed State
- **Comments Section**: Hidden
- **Chevron**: Pointing down
- **Indicator**: Small text showing comment count

#### Expanded State
- **Comments Section**: Visible
- **Chevron**: Pointing up
- **Full Comments**: All comments and form visible

#### Hover States
- **Buttons**: `rgba(255, 255, 255, 0.05)` background
- **Comment Actions**: `rgba(255, 255, 255, 0.1)` background
- **Form Elements**: Subtle glow or border highlight

### Step 7: Animation Guidelines

#### Expand/Collapse Animation
- **Duration**: 200ms
- **Easing**: ease-out
- **Properties**: height, opacity
- **Chevron Rotation**: 180° smooth transition

#### Hover Animations
- **Duration**: 150ms
- **Easing**: ease-in-out
- **Scale**: 1.02x for buttons
- **Opacity**: fade transitions

### Step 8: Typography System

#### Font Hierarchy
- **Headers**: 14px, weight 500-600
- **Body Text**: 14px, weight 400
- **Captions**: 12px, weight 400
- **Placeholders**: 14px, weight 400, opacity 70%

#### Font Family
- **Primary**: System font stack
- **Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto

### Step 9: Accessibility Considerations

#### Contrast Ratios
- **Primary Text**: White on dark (21:1 ratio - WCAG AAA)
- **Secondary Text**: Light gray on dark (7:1 ratio - WCAG AA)
- **Interactive Elements**: Minimum 3:1 contrast

#### Focus States
- **Outline**: 2px solid `rgba(255, 255, 255, 0.5)`
- **Offset**: 2px from element
- **Border Radius**: Match element radius

### Step 10: Component Variations

#### Error States
- **Border**: Red accent `#EF4444`
- **Background**: `rgba(239, 68, 68, 0.1)`
- **Text**: Error message in red

#### Loading States
- **Spinner**: White rotating indicator
- **Disabled**: 50% opacity
- **Text**: "Adding..." or "Saving..."

#### Empty States
- **Placeholder**: "No comments yet"
- **Icon**: Message square outline
- **Encourage**: "Be the first to comment!"

## Design Best Practices

### Developer-Focused Design
1. **High Contrast**: Ensure readability in all lighting conditions
2. **Consistent Spacing**: Use 4px grid system
3. **Clear Hierarchy**: Visual weight guides attention
4. **Familiar Patterns**: Follow IDE and terminal conventions

### Dark Theme Optimization
1. **Avoid Pure Black**: Use dark green (`#03190F`) for better contrast
2. **Subtle Borders**: Semi-transparent whites for definition
3. **Layered Backgrounds**: Different opacity levels for depth
4. **Comfortable Brightness**: Not too bright, not too dim

### Comment System UX
1. **Collapsible by Default**: Don't overwhelm with too much content
2. **Clear Threading**: Visual hierarchy for replies
3. **Quick Actions**: Easy access to like, reply, delete
4. **Contextual Feedback**: Clear states for all interactions

## File Structure for Figma

```
Black Thread Note Component/
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
- **Naming**: component-name-state-size.ext

### For Documentation
- **Format**: PNG at 2x resolution
- **Include**: All states and variations
- **Annotations**: Measurements and color codes

## Implementation Notes

### CSS Custom Properties
```css
:root {
  --black-primary: #03190F;
  --white-primary: #FFFFFF;
  --white-secondary: rgba(255, 255, 255, 0.7);
  --white-muted: rgba(255, 255, 255, 0.1);
  --border-subtle: rgba(255, 255, 255, 0.1);
  --shadow-depth: 0 8px 24px rgba(0, 0, 0, 0.3);
}
```

### Key Measurements
- **Container Width**: 320px
- **Border Radius**: 24px (main), 8px (internal elements)
- **Padding**: 16px (standard), 12px (compact)
- **Icon Sizes**: 16px (actions), 12px (inline), 24px (avatars)
- **Font Sizes**: 14px (primary), 12px (secondary)

---

**Perfect for developers who need collaborative dark-themed note-taking! 🖤💻💬**