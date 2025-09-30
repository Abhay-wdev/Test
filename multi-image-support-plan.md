# Plan to Implement Multi-Image Support and Square Display

## Objective
Modify the product image display on the product detail page to:
1.  Ensure images are square.
2.  Show the full product image without cropping.
3.  Allow users to scroll through multiple images horizontally.

## Detailed Plan

1.  **Examine Existing Product Detail Page:**
    *   Read `src/pages/ProductDetail.tsx` to understand how product images are currently rendered and identify the relevant components.
    *   Check `src/components/ProductShowcase.tsx` if it's used for image display, as its name suggests.

2.  **Review Product Data Structure:**
    *   Read `src/types.ts` to see the current `Product` type definition and determine if it already supports multiple image URLs (e.g., an array of strings).
    *   Review `src/hooks/useProducts.tsx` to understand how product data, including image URLs, is fetched.
    *   Examine `supabase/add-image-urls-column.sql` to confirm if a database migration for multiple image URLs is already in place or planned.

3.  **Implement Image Carousel Component:**
    *   Utilize the existing `src/components/ui/carousel.tsx` component to create a horizontally scrollable image gallery.
    *   Ensure images within the carousel are displayed in a square aspect ratio and `object-fit: contain` is applied to show the full product without cropping. This might involve styling the `img` tags within the carousel.

4.  **Integrate Carousel into Product Detail Page:**
    *   Modify `src/pages/ProductDetail.tsx` to replace the current single-image display with the new carousel component.
    *   Pass the array of image URLs (once confirmed from step 2) to the carousel component.

5.  **Refine Styling and Responsiveness:**
    *   Adjust CSS as needed to ensure the square images and horizontal scrolling work well across different screen sizes.

## Flow Diagram

```mermaid
graph TD
    A[User Request: Square, Scrollable Product Images] --> B{Analyze Current Implementation};
    B --> C[Read src/pages/ProductDetail.tsx];
    B --> D[Read src/types.ts];
    B --> E[Read src/hooks/useProducts.tsx];
    B --> F[Read supabase/add-image-urls-column.sql];
    C --> G{Identify Image Display Component};
    D --> H{Check Product Image Type};
    E --> I{Understand Image Fetching};
    F --> J{Confirm Multi-Image DB Support};
    G & H & I & J --> K[Develop Image Carousel Component];
    K --> L[Use src/components/ui/carousel.tsx];
    K --> M[Apply Square Aspect Ratio & object-fit: contain];
    L --> N[Integrate Carousel into ProductDetail.tsx];
    N --> O[Pass Image URLs Array to Carousel];
    O --> P[Test & Refine Styling/Responsiveness];
    P --> Q[Task Complete];