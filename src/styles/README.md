# Datamonkey Design System

A modular CSS framework for building consistent Datamonkey applications.

## Structure

The framework is split into four main files:

1. `dm-core.css` - Core variables and base styles
   - Color system
   - Typography
   - Spacing
   - Base styles
   - Utility classes

2. `dm-components.css` - Reusable UI components
   - Cards
   - Buttons
   - Tables
   - Toggles
   - Form elements

3. `dm-layout.css` - Layout components
   - Container
   - Grid system
   - Sections
   - Hero components

4. `dm-animations.css` - Animations and effects
   - DNA rain animation
   - Circuit backgrounds
   - Glow effects

## Usage

1. Import all files in your main CSS:

```css
@import 'styles/dm-core.css';
@import 'styles/dm-components.css';
@import 'styles/dm-layout.css';
@import 'styles/dm-animations.css';
```

2. Add the `dm-app` class to your root element:

```html
<div class="dm-app">
  <!-- Your content here -->
</div>
```

3. Use the components with their respective `dm-` prefixes:

```html
<div class="dm-container">
  <div class="dm-grid dm-grid--auto-fit">
    <div class="dm-card">
      <h2 class="dm-card__title">Card Title</h2>
      <!-- Card content -->
    </div>
  </div>
</div>
```

## Customization

Override the CSS variables in your own stylesheet to customize the theme:

```css
:root {
  --dm-primary: #your-color;
  --dm-secondary: #your-color;
  --dm-accent: #your-color;
}
```
