# Plan: Add USP Ribbon Section

This plan outlines the steps to create a new section below the hero banner, featuring a running text ribbon and Unique Selling Proposition (USP) items.

**I. Create a New Component: `UspRibbonSection.tsx`**

1.  Create a new file named `src/components/UspRibbonSection.tsx`.
2.  This component will encapsulate both the running ribbon and the USP items.

**II. Implement the "Running Ribbon" Feature**

1.  **Structure (JSX in `UspRibbonSection.tsx`):**
    *   A main container `div` for the ribbon.
    *   An inner `div` that will contain the repeating text: "❤️ Zone of Fresh Food". To achieve a seamless scroll, this text will need to be duplicated (e.g., "❤️ Zone of Fresh Food ❤️ Zone of Fresh Food ❤️ Zone of Fresh Food").
2.  **Styling (Tailwind CSS / Custom CSS):**
    *   **Ribbon Container:**
        *   Background color: `#A52A2A` (Brown - placeholder).
        *   `overflow-x: hidden;` to hide the parts of the text that are outside the viewport.
        *   `white-space: nowrap;` on the inner text container to prevent text wrapping.
    *   **Text:**
        *   Color: White.
        *   Font size, weight, and padding to match the image.
3.  **Animation (CSS):**
    *   Create a CSS `@keyframes` animation (e.g., `scrollText`).
    *   This animation will use `transform: translateX()` to move the inner text `div` horizontally.
    *   The animation will be `linear` and `infinite` for a continuous scroll.
    *   The `translateX` will go from `0%` to a negative percentage (e.g., `-50%` if text is duplicated once) to ensure a smooth loop.

**III. Implement the USP (Unique Selling Proposition) Items**

1.  **Data Structure (in `UspRibbonSection.tsx`):**
    *   Create an array of objects, where each object represents a USP item. Example:

    ```typescript
    const uspItems = [
      {
        id: 1,
        iconName: "Award", // Lucide icon name (lucide-react)
        title: "100% Satisfaction",
        subtitle: "Try it to love it!",
        // Placeholder colors, to be updated with user's hex codes
        badgeBgColorClass: "bg-green-100", // Example: Tailwind class
        iconColorClass: "text-green-600",   // Example: Tailwind class
        wavyShapeAttempt: true // Flag to attempt wavy background shape
      },
      {
        id: 2,
        iconName: "Star",
        title: "100% Genuine Products",
        subtitle: "Guaranteed quality",
        badgeBgColorClass: "bg-yellow-100",
        iconColorClass: "text-yellow-600",
        wavyShapeAttempt: true
      },
      {
        id: 3,
        iconName: "Percent",
        title: "Membership Discounts",
        subtitle: "Join \"ZING\" and get 40% off",
        badgeBgColorClass: "bg-blue-100", // Placeholder, image shows a teal/blue
        iconColorClass: "text-blue-600",
        wavyShapeAttempt: true
      },
      {
        id: 4,
        iconName: "Truck",
        title: "Free Shipping",
        subtitle: "On orders above Rs 249/-",
        badgeBgColorClass: "bg-purple-100",
        iconColorClass: "text-purple-600",
        wavyShapeAttempt: true
      }
    ];
    ```
    *   We'll use `lucide-react` icons for the first pass: `Award`, `Star`, `Percent`, `Truck`.

2.  **Structure (JSX in `UspRibbonSection.tsx`):**
    *   A main container `div` below the ribbon, styled with appropriate `padding` (e.g., `py-8` or `py-12`).
    *   This container will use a CSS Grid (e.g., `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8`) to lay out the USP items.
    *   Iterate over the `uspItems` array to render each USP item.
    *   **For each USP item:**
        *   A container `div` with `text-align: center;`.
        *   **Icon Badge:**
            *   A `div` for the badge background.
            *   **Attempt Wavy Shape (CSS/SVG):** Attempt to create the wavy badge shape using CSS (e.g., multiple pseudo-elements, `border-radius` combinations, or `clip-path`). If this proves too complex for a clean first pass or doesn't render consistently, default to a simple circular background.
            *   This `div` will use the `badgeBgColorClass` for its background.
            *   The `lucide-react` icon (dynamically rendered based on `iconName` and styled with `iconColorClass`) will be placed inside this badge `div`.
        *   **Text Content:**
            *   An `<h3>` or `<h4>` for the `title`.
            *   A `<p>` for the `subtitle`.
3.  **Styling (Tailwind CSS / Custom CSS):**
    *   **Badge:**
        *   Size (e.g., `w-24 h-24` or `w-28 h-28`).
        *   Padding to position the icon correctly within the badge.
        *   Icon size (e.g., `w-10 h-10` or `w-12 h-12`).
    *   **Text:**
        *   Font sizes, weights, and colors for titles and subtitles to match the image.
        *   Spacing between the badge, title, and subtitle.

**IV. Integrate the `UspRibbonSection` into the Page**

1.  Open `src/pages/Index.tsx`.
2.  Import the `UspRibbonSection` component: `import UspRibbonSection from "@/components/UspRibbonSection";`
3.  Render the `<UspRibbonSection />` component immediately below the `<Hero />` component:

    ```tsx
    // ...
    return (
      <div className="bg-gray-50">
        {/* Hero Section */}
        <Hero />

        {/* USP Ribbon Section - NEW */}
        <UspRibbonSection />

        {/* Product Showcase Section */}
        <section className="pt-0 pb-12 bg-white"> {/* May need to adjust pt-0 if UspRibbonSection has bottom margin */}
          <ProductShowcase />
        </section>
        {/* ... rest of the page */}
      </div>
    );
    ```

**V. Styling and Refinements**

1.  **Colors:** Update placeholder colors with specific hex codes when provided by the user.
2.  **Spacing:** Fine-tune margins and paddings within the `UspRibbonSection` and between it and adjacent sections (`Hero`, `ProductShowcase`) to achieve the desired layout.
3.  **Responsiveness:** Ensure the USP items stack appropriately on smaller screens (e.g., 2 columns on tablets, 1 column on mobile). The running ribbon should also adapt gracefully.

**Mermaid Diagram:**
```mermaid
graph TD
    Start((Start Task: Add USP Ribbon Section)) --> A[1. Create UspRibbonSection.tsx];
    A --> B{Implement Running Ribbon};
    B -- Structure --> B1[JSX for Ribbon Container & Text];
    B -- Styling --> B2[CSS for Ribbon BG (#A52A2A), Text, Overflow];
    B -- Animation --> B3[CSS @keyframes for Scrolling];

    A --> C{Implement USP Items};
    C -- Data --> C1[Define uspItems Array (iconName, text, colors)];
    C -- Structure --> C2[JSX for USP Grid & Individual Items];
    C2 -- Icon Badge --> C2a[Attempt Wavy Shape (CSS/SVG) or Circle];
    C2a -- Icon --> C2b[Use Lucide Icons (Award, Star, Percent, Truck)];
    C2 -- Text --> C2c[JSX for Title & Subtitle];
    C -- Styling --> C3[CSS for Badge, Icon, Text, Layout];

    A --> D[2. Integrate UspRibbonSection in Index.tsx];
    D --> D1[Import Component];
    D1 --> D2[Place <UspRibbonSection /> below <Hero />];

    A --> E{3. Styling & Refinements};
    E --> E1[Apply Provided Hex Colors for USP items];
    E --> E2[Adjust Spacing & Margins];
    E --> E3[Ensure Responsiveness];
    E3 --> End((End Task));