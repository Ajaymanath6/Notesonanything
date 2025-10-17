# Oval Note Thread - Colorful Social Theme with Comments

## Overview
The **Oval Note Thread** is an enhanced version of the Oval Note with full commenting functionality, designed for creative expression and social interaction. It combines the vibrant, social-media inspired design with collaborative features like comments, replies, color switching, and collapsible thread management.

## Visual Design

### Color Schemes
The Oval Note Thread comes in three beautiful color variants with threading capabilities:

#### Red Theme (Default)
- **Primary**: `#DF6D7A` (Soft Rose)
- **Secondary**: `#F8BA9D` (Peach)
- **Shadow**: `#C85A67` (Deep Rose)

#### Orange Theme
- **Primary**: `#F8BA9D` (Warm Peach)
- **Secondary**: `#FFD4B8` (Light Peach)
- **Shadow**: `#E5A584` (Burnt Orange)

#### Green Theme
- **Primary**: `#B8CFB2` (Sage Green)
- **Secondary**: `#D4E6CF` (Light Sage)
- **Shadow**: `#A2BF9C` (Forest Green)

### Design Features
- **Oval Shape**: Distinctive rounded design with `2rem` border radius
- **3D Shadow Effect**: Layered shadows create depth and dimension
- **Color Switcher**: Three circular buttons for instant theme switching
- **Social Button Group**: Multiple action buttons for interaction
- **Collapsible Comments**: Expandable comment section with chevron control
- **Soft Gradients**: Subtle color transitions throughout
- **Width**: 280px (optimized for social content)

## Figma Design Guide

### Step 1: Create the Main Oval Container
1. **Create Rectangle**: 280px × auto (minimum 160px height)
2. **Border Radius**: 32px on all corners (2rem equivalent)
3. **Fill**: Gradient from primary color to slightly lighter shade
4. **Shadow Stack**:
   - **Main Shadow**: X: 0, Y: 8, Blur: 0, Color: shadow color
   - **Depth Shadow**: X: 0, Y: 12, Blur: 24, Color: `rgba(0,0,0,0.15)`

### Step 2: Design the Header Section
1. **Create Container**: 280px × 72px
2. **Fill**: Transparent (inherits from main container)
3. **Padding**: 16px all sides

#### Header Elements:
- **Avatar Circle**: 
  - Size: 32px × 32px
  - Fill: `rgba(255, 255, 255, 0.9)`
  - Border: 2px solid white
  - Text: "YO" (14px, weight 600, color: primary theme color)
- **User Info**:
  - Name: "You" (14px, weight 500, color: white)
  - Timestamp: "just now" (12px, weight 400, color: white, opacity 80%)

#### Color Switcher (Right Side):
- **Color Dots**: 3 circles, 20px × 20px each
- **Spacing**: 4px between dots
- **Border**: 2px solid white (opacity varies by selection)
- **Active State**: Scale 1.1x, full opacity border
- **Inactive State**: Scale 1.0x, 50% opacity border

### Step 3: Content Area Design
1. **Create Container**: 280px × auto (minimum 80px)
2. **Padding**: 0px 16px 16px 16px (top padding handled by header)

#### Content Elements:
- **Text Area** (when editing):
  - Size: 248px × 80px
  - Fill: `rgba(255, 255, 255, 0.9)`
  - Border Radius: 12px
  - Text: 14px, weight 500, color: primary theme color
  - Placeholder: "What's on your mind?"
- **Display Text** (when saved):
  - Background: `rgba(255, 255, 255, 0.9)`
  - Border Radius: 12px
  - Padding: 12px
  - Text: 14px, weight 500, color: primary theme color

### Step 4: Social Action Buttons
1. **Create Container**: 248px × 44px
2. **Position**: Centered horizontally with 16px margin from sides
3. **Fill**: `rgba(255, 255, 255, 0.95)`
4. **Border Radius**: 22px (pill shape)
5. **Shadow**: Subtle inner shadow

#### Button Layout:
- **6 Buttons**: Edit, Delete, Comments, Share, Like, Bookmark
- **Button Size**: 32px × 32px each
- **Icon Size**: 16px × 16px
- **Spacing**: 4px between buttons
- **Color**: Primary theme color
- **Hover**: Background `#F3F4F6`

### Step 5: Comments Section Design

#### Comments Toggle (Part of Social Buttons)
- **Comments Button**: MessageSquare icon
- **Interaction**: Toggles comment section visibility
- **State Indicator**: Different visual state when comments are expanded

#### Comments Header (When Expanded)
1. **Create Container**: 280px × 56px
2. **Fill**: `rgba(255, 255, 255, 0.1)` (overlay on main color)
3. **Border Top**: 1px solid `rgba(255, 255, 255, 0.3)`
4. **Padding**: 12px 16px

#### Header Elements:
- **Comments Icon**: 16px × 16px, color: white
- **Comments Count**: "X Comments" (14px, weight 500, color: white)
- **Collapse Button**: ChevronUp icon 16px × 16px, color: white opacity 70%

#### Individual Comments
1. **Comment Container**: 248px × auto
2. **Fill**: `rgba(255, 255, 255, 0.9)`
3. **Border Radius**: 8px
4. **Padding**: 12px
5. **Margin**: 8px horizontal, 8px vertical

#### Comment Elements:
- **Avatar**: 24px × 24px circle, primary theme color with white text
- **Author Name**: 14px, weight 500, color: primary theme color
- **Timestamp**: 12px, color: primary theme color, opacity 70%
- **Comment Text**: 14px, color: primary theme color, line height 1.4
- **Action Buttons**:
  - Like: Heart icon 12px, color: primary theme color
  - Reply: Reply icon 12px, color: primary theme color
  - Delete: X icon 16px (for owner only), color: `#9CA3AF`

### Step 6: Add Comment Form
1. **Create Container**: 280px × auto
2. **Padding**: 16px
3. **Background**: Transparent

#### Form Elements:
- **Avatar**: 24px × 24px, primary theme color, white text, white border
- **Text Area**: 
  - Size: 216px × 64px
  - Fill: `rgba(255, 255, 255, 0.9)`
  - Border: None
  - Border Radius: 8px
  - Placeholder: "Add a comment..."
- **Submit Button**:
  - Size: auto × 32px
  - Fill: `rgba(255, 255, 255, 0.9)`
  - Text: "Comment" (14px, weight 500, color: primary theme color)
  - Border Radius: 8px

### Step 7: Interaction States

#### Color Switching
- **Immediate Update**: All elements change color instantly
- **Smooth Transition**: 200ms ease-out for all color properties
- **Persistent State**: Selected color is remembered

#### Comments Visibility
- **Collapsed State**: Only social buttons visible
- **Expanded State**: Full comment section visible
- **Toggle Animation**: 200ms height/opacity transition

#### Hover States
- **Social Buttons**: Light gray background `#F3F4F6`
- **Comment Actions**: Subtle opacity changes
- **Color Switchers**: Scale and border animations

### Step 8: Animation Guidelines

#### Color Transition
- **Duration**: 200ms
- **Easing**: ease-out
- **Properties**: background-color, color, border-color
- **Scope**: Entire component updates simultaneously

#### Expand/Collapse Animation
- **Duration**: 200ms
- **Easing**: ease-out
- **Properties**: height, opacity
- **Comment List**: Staggered entrance (50ms delay between comments)

#### Hover Animations
- **Duration**: 150ms
- **Easing**: ease-in-out
- **Scale**: 1.05x for color switchers
- **Opacity**: Smooth transitions

### Step 9: Typography System

#### Font Hierarchy
- **Headers**: 14px, weight 500-600
- **Body Text**: 14px, weight 500 (slightly bolder for social feel)
- **Captions**: 12px, weight 400
- **Placeholders**: 14px, weight 400

#### Font Family
- **Primary**: System font stack optimized for readability
- **Social Feel**: Slightly heavier weights for engaging appearance

### Step 10: Accessibility Considerations

#### Contrast Ratios
- **White on Colors**: All theme colors tested for WCAG AA compliance
- **Color Independence**: Functionality doesn't rely solely on color
- **Focus States**: Clear outlines for keyboard navigation

#### Interactive Elements
- **Large Targets**: All buttons meet 44px minimum touch target
- **Clear Labels**: ARIA labels for all interactive elements
- **Keyboard Navigation**: Full keyboard accessibility

## Color System Implementation

### Theme Variables
```css
:root {
  /* Red Theme */
  --oval-red-primary: #DF6D7A;
  --oval-red-secondary: #F8BA9D;
  --oval-red-shadow: #C85A67;
  
  /* Orange Theme */
  --oval-orange-primary: #F8BA9D;
  --oval-orange-secondary: #FFD4B8;
  --oval-orange-shadow: #E5A584;
  
  /* Green Theme */
  --oval-green-primary: #B8CFB2;
  --oval-green-secondary: #D4E6CF;
  --oval-green-shadow: #A2BF9C;
  
  /* Common */
  --oval-white-overlay: rgba(255, 255, 255, 0.9);
  --oval-white-transparent: rgba(255, 255, 255, 0.3);
}
```

### Component Variations

#### Error States
- **Content Border**: Red accent for validation errors
- **Message**: Error text in red below content area

#### Loading States
- **Comment Submission**: Spinner in submit button
- **Text**: "Adding..." feedback

#### Empty States
- **No Comments**: Encouraging message with icon
- **First Comment**: "Start the conversation!" prompt

## File Structure for Figma

```
Oval Thread Note Component/
├── 🎨 Main Oval Container
├── 📄 Header Section
│   ├── Avatar
│   ├── User Info
│   └── Color Switcher
├── ✏️ Content Area
│   ├── Edit Mode
│   └── Display Mode
├── 🎯 Social Actions
│   ├── Edit Button
│   ├── Delete Button
│   ├── Comments Toggle
│   ├── Share Button
│   ├── Like Button
│   └── Bookmark Button
├── 💬 Comments Section
│   ├── Header (Collapsible)
│   ├── Comment List
│   └── Add Comment Form
├── 🎨 Color Themes
│   ├── Red Variant
│   ├── Orange Variant
│   └── Green Variant
├── 🎭 States
│   ├── Comments Collapsed
│   ├── Comments Expanded
│   ├── Hover
│   └── Focus
└── 📱 Responsive
    ├── Mobile
    └── Desktop
```

## Export Settings

### For Development
- **Format**: SVG for icons, PNG for complex gradients
- **Scale**: 1x, 2x, 3x for all screen densities
- **Naming**: oval-thread-[theme]-[state]-[size].ext

### For Documentation
- **Format**: PNG at 2x resolution
- **Include**: All color themes and states
- **Annotations**: Color codes and measurements

## Implementation Notes

### Key Measurements
- **Container Width**: 280px
- **Border Radius**: 32px (main), 12px (content), 8px (comments)
- **Padding**: 16px (standard), 12px (compact)
- **Icon Sizes**: 16px (actions), 12px (inline), 24px (avatars), 20px (color switchers)
- **Font Sizes**: 14px (primary), 12px (secondary)

### Shadow System
- **Primary Shadow**: `0 8px 0 [shadow-color]` (3D effect)
- **Depth Shadow**: `0 12px 24px rgba(0,0,0,0.15)` (floating effect)
- **Combination**: Both shadows applied for full 3D appearance

## Social Design Principles

### Visual Hierarchy
1. **Color**: Primary theme color draws attention
2. **Size**: Larger elements indicate importance
3. **Position**: Top-to-bottom reading flow
4. **Contrast**: White overlays provide text clarity

### Interaction Design
1. **Immediate Feedback**: Color changes happen instantly
2. **Clear Affordances**: Buttons look clickable
3. **Social Cues**: Familiar social media patterns
4. **Engagement**: Multiple interaction points encourage participation

### Personality Expression
1. **Color Choice**: Reflects user mood/preference
2. **Oval Shape**: Friendly, approachable form
3. **Vibrant Colors**: Energetic and positive
4. **Social Features**: Encourages community interaction

## Use Cases

### Creative Expression
- **Mood Boards**: Color-coded emotional states
- **Art Projects**: Visual brainstorming with team feedback
- **Personal Journaling**: Expressive color choices
- **Creative Writing**: Collaborative story development

### Social Collaboration
- **Team Brainstorming**: Colorful idea categorization
- **Event Planning**: Different colors for different aspects
- **Feedback Collection**: Engaging comment system
- **Community Building**: Social interaction features

### Educational Settings
- **Student Projects**: Collaborative learning with comments
- **Peer Review**: Social feedback mechanisms
- **Group Work**: Color-coded team contributions
- **Discussion Forums**: Threaded conversations

---

**Express yourself with colors and connect through comments! Perfect for creative minds and social thinkers! 🎨✨💬**