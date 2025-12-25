# UDSM Startup Incubator - Design Guide

## 🎨 Color Palette

### Primary Colors
- **Main Blue**: `#2563EB` - Used for primary buttons and important actions
- **Dark Blue**: `#1D4ED8` - Hover states and active elements
- **Light Blue**: `#3B82F6` - Secondary actions and highlights

### Accent Colors
- **Success Green**: `#10B981` - Success messages and completed states
- **Warning Yellow**: `#F59E0B` - Warnings and important notices
- **Error Red**: `#EF4444` - Error messages and destructive actions

### Neutral Colors
- **Dark Gray**: `#1F2937` - Primary text
- **Medium Gray**: `#6B7280` - Secondary text and icons
- **Light Gray**: `#E5E7EB` - Borders and dividers
- **Background**: `#F9FAFB` - Page background

## 🖋️ Typography

### Font Family
- **Primary Font**: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Code Font**: 'Fira Code', 'Courier New', monospace

### Font Weights
- Regular: 400
- Medium: 500
- Semi-bold: 600
- Bold: 700

### Type Scale
- **H1**: 2.5rem (40px) - Page titles
- **H2**: 2rem (32px) - Section headers
- **H3**: 1.5rem (24px) - Subsection headers
- **H4**: 1.25rem (20px) - Card titles
- **Body**: 1rem (16px) - Main content
- **Small**: 0.875rem (14px) - Secondary text, captions
- **Tiny**: 0.75rem (12px) - Labels, helper text

## 🧩 UI Components

### Buttons
```css
/* Primary Button */
.btn-primary {
  background-color: #2563EB;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

/* Secondary Button */
.btn-secondary {
  background-color: white;
  color: #2563EB;
  border: 1px solid #2563EB;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
}