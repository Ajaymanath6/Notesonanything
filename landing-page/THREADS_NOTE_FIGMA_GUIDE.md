# Threads Note - Interactive Yellow Theme with Comments Figma Recreation Guide

## **Overview**
The Threads Note combines the bright yellow aesthetic of the Noty note with an integrated comment system, creating an interactive discussion platform. Features include a 100-character limit with visual feedback, real-time commenting, and comprehensive social interaction capabilities.

## **1. Container Structure**

**Main Container:**
- **Dimensions:** 320px width × auto height (expands with comments)
- **Corner Radius:** 24px (rounded-3xl equivalent)
- **Background:** White (#FFFFFF)
- **Shadow:** 
  - X: 0, Y: 8, Blur: 32, Spread: 0
  - Color: #000000 at 12% opacity
- **Border:** 1px solid #E5E7EB (gray-200)
- **Position:** Absolute positioning

## **2. Header Section**

**Header Container:**
- **Height:** 72px (estimated from padding)
- **Background:** #FFF097 (bright yellow)
- **Padding:** 16px all sides
- **Border-bottom:** 1px solid rgba(55, 40, 4, 0.2)

**Avatar Circle:**
- **Size:** 32px × 32px
- **Background:** #372804 (dark brown/black)
- **Corner Radius:** 16px (full circle)
- **Text:** 
  - Font: System font, Semi-bold, 14px
  - Color: #FFF097 (yellow - matches header)
  - Content: "YO" (or user initials)
  - Alignment: Center

**Author Name:**
- **Font:** System font, Medium, 14px
- **Color:** #372804 (dark brown)
- **Text:** "You" (or actual author name)

**Timestamp:**
- **Font:** System font, Regular, 12px
- **Color:** #372804 (dark brown)
- **Opacity:** 70%
- **Text:** "just now" (or actual timestamp)

**Action Buttons (Edit & Delete):**
- **Size:** 32px × 32px each
- **Background:** Transparent (hover: white with 20% opacity)
- **Corner Radius:** 8px
- **Icon Size:** 16px × 16px
- **Icon Color:** #372804
- **Spacing:** 8px between buttons

## **3. Note Content Area**

**Content Container:**
- **Background:** #FFFBED (light cream/yellow)
- **Padding:** 16px all sides

**Textarea (Edit Mode):**
- **Dimensions:** 288px width × 96px height
- **Background:** rgba(255, 255, 255, 0.8) (normal) / #FEF2F2 (error state)
- **Border:** 1px solid rgba(55, 40, 4, 0.3) (normal) / #FCA5A5 (error state)
- **Corner Radius:** 8px
- **Padding:** 12px
- **Font:** System font, Regular, 14px
- **Text Color:** #372804
- **Placeholder:** "Share your thoughts... (Press Enter to save)"

**Word Count Indicator:**
- **Position:** Absolute, bottom-right of textarea (8px from edges)
- **Font:** System font, Regular, 12px
- **Color:** #6B7280 (normal) / #DC2626 (over limit)
- **Text:** "{count}/100"

**Error Message (Over Limit):**
- **Position:** Absolute, below textarea
- **Background:** #FEF2F2 (red-50)
- **Border:** 1px solid #FECACA (red-200)
- **Corner Radius:** 6px
- **Padding:** 8px horizontal, 4px vertical
- **Font:** System font, Regular, 12px
- **Text Color:** #DC2626 (red-600)
- **Animation:** Fade in/out with motion
- **Content:** "Message too long. Please keep it under 100 characters."

**Content Display (View Mode):**
- **Min Height:** 96px
- **Padding:** 12px
- **Font:** System font, Regular, 14px
- **Text Color:** #372804
- **Background:** Transparent
- **Border:** 1px solid transparent
- **Hover State:** Border becomes #E5E7EB
- **Placeholder:** "Click to start a thread..."

## **4. Comments Section**

**Comments Container:**
- **Background:** #FFFBED (matches content area)
- **Border-top:** 1px solid rgba(55, 40, 4, 0.2)
- **Display:** Only when not in editing mode

### **Comments Header**
- **Padding:** 12px horizontal, 16px vertical
- **Border-bottom:** 1px solid rgba(55, 40, 4, 0.1)

**Comments Icon & Label:**
- **Icon:** MessageSquare, 16px × 16px, color #372804
- **Text:** System font, Medium, 14px, color #372804
- **Content:** "{count} Comment" / "{count} Comments"
- **Spacing:** 8px between icon and text

### **Comments List**
- **Container:** 
  - Padding: 16px
  - Max Height: 192px (12rem)
  - Overflow: Vertical scroll
  - Spacing: 12px between comments

**Individual Comment:**
- **Background:** rgba(255, 255, 255, 0.8) (semi-transparent white)
- **Corner Radius:** 8px
- **Padding:** 12px
- **Spacing:** 8px between comments

**Comment Avatar:**
- **Size:** 24px × 24px
- **Background:** #372804 (dark brown)
- **Corner Radius:** 12px (full circle)
- **Text:** System font, Semi-bold, 12px, color #FFFFFF
- **Content:** User initials

**Comment Author & Timestamp:**
- **Author:** System font, Medium, 14px, color #372804
- **Timestamp:** System font, Regular, 12px, color rgba(55, 40, 4, 0.7)
- **Spacing:** 8px margin-left between author and timestamp

**Comment Content:**
- **Font:** System font, Regular, 14px
- **Color:** #372804
- **Line Height:** 1.5
- **Margin:** 8px top

**Comment Actions:**
- **Like Button:** Heart icon (12px), color #372804, opacity 70%
- **Reply Button:** Reply icon (12px), color #372804, opacity 70%
- **Spacing:** 16px between actions
- **Hover State:** Opacity 100%

### **Add Comment Form**
- **Padding:** 16px
- **Layout:** Flex with avatar and form side-by-side

**Comment Avatar (User):**
- **Size:** 24px × 24px
- **Background:** #372804
- **Color:** #FFF097 (yellow)
- **Content:** "YO"

**Comment Textarea:**
- **Dimensions:** Full width × 64px (2 rows)
- **Background:** rgba(255, 255, 255, 0.8)
- **Border:** 1px solid rgba(55, 40, 4, 0.3)
- **Corner Radius:** 8px
- **Padding:** 12px horizontal, 8px vertical
- **Font:** System font, Regular, 14px
- **Text Color:** #372804
- **Placeholder:** "Add a comment..."

**Comment Submit Area:**
- **Layout:** Flex, space-between
- **Margin:** 8px top

**Keyboard Hint:**
- **Font:** System font, Regular, 12px
- **Color:** rgba(55, 40, 4, 0.7)
- **Content:** "Press Ctrl + Enter to comment"

**Submit Button:**
- **Background:** #372804 (enabled) / #9CA3AF (disabled)
- **Color:** #FFFFFF
- **Padding:** 6px horizontal, 12px vertical
- **Corner Radius:** 8px
- **Font:** System font, Medium, 14px
- **Icon:** Send (12px)
- **Spacing:** 4px between icon and text
- **States:**
  - Enabled: "Comment"
  - Loading: Spinning animation + "Adding..."
  - Disabled: 50% opacity, cursor not-allowed

## **5. Nested Replies**

**Reply Container:**
- **Margin-left:** 16px
- **Border-left:** 2px solid rgba(55, 40, 4, 0.2)
- **Padding-left:** 12px
- **Spacing:** 8px between replies

**Reply Form:**
- **Layout:** Horizontal flex
- **Input:** Same styling as main comment form but smaller (single line)
- **Submit:** Same button style, smaller size

## **6. Color Palette Reference**

| Element | Color Code | Description |
|---------|------------|-------------|
| Header Background | #FFF097 | Bright yellow |
| Content Background | #FFFBED | Light cream/yellow |
| Comments Background | #FFFBED | Same as content |
| Text Primary | #372804 | Dark brown/black |
| Text Secondary | rgba(55, 40, 4, 0.7) | Semi-transparent brown |
| Avatar Background | #372804 | Dark brown/black |
| Avatar Text | #FFF097 | Yellow (header) / #FFFFFF (comments) |
| Border Primary | rgba(55, 40, 4, 0.2) | Semi-transparent brown |
| Border Secondary | rgba(55, 40, 4, 0.1) | Lighter border |
| Input Background | rgba(255, 255, 255, 0.8) | Semi-transparent white |
| Input Border | rgba(55, 40, 4, 0.3) | Semi-transparent brown |
| Error Background | #FEF2F2 | Red-50 |
| Error Border | #FCA5A5 | Red-300 |
| Error Text | #DC2626 | Red-600 |
| Comment Background | rgba(255, 255, 255, 0.8) | Semi-transparent white |
| Button Primary | #372804 | Dark brown |
| Button Disabled | #9CA3AF | Gray-400 |

## **7. Typography Specifications**

**Header Text:**
- **Author Name:** System UI, Medium (500), 14px, #372804
- **Timestamp:** System UI, Regular (400), 12px, #372804 at 70% opacity

**Content Text:**
- **Main Content:** System UI, Regular (400), 14px, #372804, line-height 1.5
- **Word Count:** System UI, Regular (400), 12px, #6B7280 / #DC2626 (error)
- **Error Message:** System UI, Regular (400), 12px, #DC2626

**Comments Text:**
- **Comments Header:** System UI, Medium (500), 14px, #372804
- **Comment Author:** System UI, Medium (500), 14px, #372804
- **Comment Timestamp:** System UI, Regular (400), 12px, rgba(55, 40, 4, 0.7)
- **Comment Content:** System UI, Regular (400), 14px, #372804, line-height 1.5
- **Form Hint:** System UI, Regular (400), 12px, rgba(55, 40, 4, 0.7)
- **Button Text:** System UI, Medium (500), 14px, #FFFFFF

## **8. Step-by-Step Figma Creation**

### **Phase 1: Base Note Structure**
1. **Create Main Frame:**
   - Rectangle: 320px × 500px (expandable)
   - Fill: #FFFFFF
   - Corner radius: 24px
   - Add shadow effect

2. **Add Header Section:**
   - Rectangle: 320px × 72px
   - Fill: #FFF097
   - Position at top
   - Add bottom border

3. **Create Avatar:**
   - Circle: 32px × 32px
   - Fill: #372804
   - Add "YO" text in center (#FFF097 color)

4. **Add Header Info:**
   - Text layers for author name and timestamp
   - Position next to avatar
   - Apply header typography

5. **Create Action Buttons:**
   - Two 32px × 32px squares
   - Corner radius: 8px
   - Add edit and delete icons (#372804 color)

6. **Add Content Area:**
   - Rectangle: 320px × auto
   - Fill: #FFFBED
   - Add content text or textarea

### **Phase 2: Content Area with Validation**
7. **Create Textarea Container:**
   - Rectangle: 288px × 96px
   - Fill: rgba(255, 255, 255, 0.8)
   - Border: 1px solid rgba(55, 40, 4, 0.3)
   - Corner radius: 8px

8. **Add Word Count Indicator:**
   - Text: "0/100"
   - Position: bottom-right of textarea
   - Create variant for error state (red color)

9. **Create Error Message:**
   - Rectangle with red background
   - Position below textarea
   - Add error text
   - Create hide/show states

### **Phase 3: Comments Section**
10. **Add Comments Container:**
    - Rectangle: full width × auto
    - Fill: #FFFBED
    - Border-top: rgba(55, 40, 4, 0.2)

11. **Create Comments Header:**
    - MessageSquare icon + text
    - Proper spacing and typography

12. **Design Individual Comment:**
    - Container with white background
    - Avatar circle (24px)
    - Author info
    - Comment content
    - Action buttons (like, reply)

13. **Create Comment Form:**
    - User avatar
    - Textarea input
    - Submit button with states
    - Keyboard hint text

14. **Add Nested Reply System:**
    - Indented replies
    - Left border styling
    - Smaller reply form

### **Phase 4: Interactive States**
15. **Create Component Variants:**
    - Normal state
    - Editing state
    - Error state (over character limit)
    - Loading state (submitting comment)

16. **Add Micro-interactions:**
    - Hover states for buttons
    - Focus states for inputs
    - Error state animations
    - Loading spinner animation

## **9. Interactive States & Behaviors**

**Character Limit States:**
- **0-99 characters:** Normal styling, gray counter
- **100 characters:** At limit, orange counter
- **100+ characters:** Error state, red styling, error message
- **Error Message:** Fade in/out animation (0.3s)

**Comment Submission:**
- **Empty:** Button disabled, gray background
- **With Text:** Button enabled, dark background
- **Submitting:** Loading spinner, "Adding..." text
- **Success:** Form resets, new comment appears

**Hover States:**
- **Action Buttons:** Background becomes white with 20% opacity
- **Comment Actions:** Opacity changes from 70% to 100%
- **Submit Button:** Slight opacity change (90%)

**Focus States:**
- **Textarea:** Border color intensifies
- **Comment Input:** Same border behavior
- **No Blue Rings:** Custom styling throughout

## **10. Responsive Considerations**

**Mobile Adaptations:**
- Touch-friendly button sizes (44px minimum)
- Adequate spacing for finger taps
- Readable text at smaller sizes
- Scrollable comments section

**Content Overflow:**
- Comments list: max-height with scroll
- Long comment text: word wrapping
- Note positioning: boundary detection

## **11. Accessibility Features**

**Keyboard Navigation:**
- Tab order: Header actions → Content → Comment form → Comments
- Enter key: Submit forms
- Escape key: Cancel editing
- Ctrl/Cmd + Enter: Submit comment

**Screen Reader Support:**
- Proper ARIA labels
- Comment count announcements
- Character limit announcements
- Error message associations

**Color Contrast:**
- All text meets WCAG AA standards
- Error states clearly distinguishable
- Focus indicators clearly visible

## **12. Animation Specifications**

**Entrance Animation:**
- **Type:** Spring animation
- **Duration:** 0.4s
- **Initial:** opacity: 0, scale: 0.8
- **Final:** opacity: 1, scale: 1

**Error Message:**
- **Fade In:** opacity: 0 → 1, y: -10 → 0
- **Duration:** 0.3s
- **Auto Hide:** 3 seconds

**Loading Spinner:**
- **Rotation:** 360° continuous
- **Duration:** 1s linear infinite
- **Element:** 12px × 12px circle with border

**Hover Transitions:**
- **Duration:** 0.2s
- **Easing:** ease-out
- **Properties:** opacity, background-color

## **13. Component Variants**

**Note States:**
1. **New Note:** Editing mode, empty content
2. **Existing Note:** Display mode, with content
3. **Editing:** Edit mode, existing content
4. **Error State:** Over character limit
5. **With Comments:** Multiple comments visible

**Comment States:**
1. **Empty Comments:** No comments, form only
2. **With Comments:** Comments list + form
3. **Adding Comment:** Loading state
4. **Error Adding:** Error state (rare)

## **14. Technical Notes**

**State Management:**
- Character count reactive to input
- Real-time validation feedback
- Comment list updates immediately
- Form resets after submission

**Performance:**
- Comment virtualization for large lists
- Debounced character counting
- Optimized re-renders

**Data Structure:**
```javascript
{
  id: Number,
  content: String,
  position: { x: Number, y: Number },
  timestamp: String,
  comments: [{
    id: Number,
    content: String,
    author: String,
    timestamp: String,
    likes: Number,
    isLiked: Boolean,
    replies: Array
  }]
}
```

## **15. Implementation Priority**

**Phase 1 (Core):**
- Basic note structure
- Yellow theme application
- Character limit validation
- Basic commenting

**Phase 2 (Enhanced):**
- Nested replies
- Like functionality
- Animation polish
- Error handling

**Phase 3 (Advanced):**
- Real-time updates
- Advanced interactions
- Performance optimization
- Accessibility improvements

---

**Created for NOA Landing Page Project**  
**Component:** ThreadsNote.jsx  
**Theme:** Interactive Yellow with Comments  
**Use Case:** Discussion threads and collaborative feedback  
**Character Limit:** 100 characters with visual feedback  
**Special Features:** Real-time commenting, nested replies, character validation

**Key Differentiators:**
- ✅ Character limit with error states
- ✅ Integrated comment system
- ✅ Yellow theme consistency
- ✅ Real-time interaction
- ✅ Figma-style activation pattern
- ✅ Social interaction features