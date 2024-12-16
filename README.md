# Smart Watch Product Page Documentation

## Project Overview

A responsive single-page e-commerce interface for a smart watch product with dynamic cart functionality.

## Core Features

- Product image gallery with color variants
- Size selection with dynamic pricing
- Quantity controls
- Shopping cart management
- Checkout modal

## Technical Implementation

### 1. Layout Structure

- CSS Grid-based responsive layout
- Two-column design for product display

```css
.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1200px;
}
```

### 2. State Management

```javascript
const state = {
  cart: [],
  selectedColor: "purple",
  selectedSize: "M",
  selectedPrice: 79,
  quantity: 1,
};
```

### 3. Key Components

#### Product Image Gallery

- Dynamic image swapping based on color selection
- Maintains aspect ratio with `object-fit: contain`

#### Price Display

- Shows original and discounted prices
- Updates dynamically based on size selection

#### Cart Modal

- Grid-based layout for cart items
- Displays item details, quantity, and total
- Responsive design with max-width constraints

### 4. Style Variables

Key colors:

- Primary: `#6576ff`
- Text: `#364a63`
- Secondary text: `#8091a7`
- Border: `#ddd`

### 5. Responsive Behavior

- Mobile-friendly layout
- Flexible grid system
- Adaptive image sizing

## Usage Notes

- Images should be placed in `/assets/` directory
- Required image formats: PNG
- All prices should be in USD format

## Dependencies

- No external libraries required
- Uses vanilla JavaScript
- Modern CSS features (Grid, Flexbox)
