# Product Page Optimization Plan

## Objective
Optimize the loading time and performance of the product listing page (`ProductsPage`) by addressing data fetching, filtering, and image loading inefficiencies.

## Summary of Findings
*   **Data Fetching:** The `useProducts` hook fetches all active products at once, without pagination. This can lead to large data payloads for many products.
*   **Product Filtering:** Filtering by category and search term is done client-side after all products are fetched, which is inefficient for large datasets.
*   **Image Loading:** Product images in `ProductCard.tsx` are not lazy-loaded, meaning all images attempt to load immediately, regardless of whether they are in the viewport.

## Proposed Plan

### Phase 1: Optimize Data Fetching and Filtering

1.  **Implement Pagination in `useProducts.tsx`:**
    *   Modify the `useProducts` hook to accept `page` and `pageSize` parameters.
    *   Use Supabase's `range()` method in the query to fetch only a subset of products based on the provided `page` and `pageSize`. This will significantly reduce the initial data load.

2.  **Implement Server-Side Filtering in `useProducts.tsx`:**
    *   Update `useProducts.tsx` to accept `category_id` and `search_term` parameters.
    *   Apply these filters directly within the Supabase query using `.eq()` for category and `.ilike()` or `.textSearch()` for search terms. This shifts the filtering workload to the database, improving efficiency for large datasets.

3.  **Update `ProductsPage.tsx`:**
    *   Adjust `ProductsPage` to utilize the new pagination and server-side filtering capabilities of `useProducts`.
    *   Implement state management for current page, page size, and total product count to support pagination controls.
    *   Modify the `useEffect` and `useMemo` hooks to pass the category and search terms to `useProducts` for server-side filtering.

### Phase 2: Optimize Image Loading

1.  **Implement Lazy Loading in `ProductCard.tsx`:**
    *   Add the `loading="lazy"` attribute to the `<img>` tags within `ProductCard.tsx`. This ensures that images only load when they are about to enter the user's viewport, reducing initial page load time and bandwidth consumption.

2.  **Recommend External Image Optimization:**
    *   Suggest considering Supabase's built-in image transformation features or integrating with a Content Delivery Network (CDN) that offers image resizing, compression, and format optimization (e.g., WebP). This is a crucial step for real-world performance but will not be implemented as part of this immediate task.

### Phase 3: Optimize Component Rendering (Advanced - if needed)

1.  **Consider Virtualization/Windowing:**
    *   If the above optimizations are insufficient for extremely large product lists (e.g., thousands of products), explore libraries like `react-window` or `react-virtualized`. These libraries render only the visible items in a long list, significantly improving performance by reducing the number of DOM nodes. This is a more complex change and will only be considered if Phase 1 and 2 do not yield satisfactory performance improvements.

## Mermaid Diagram of the Plan

```mermaid
graph TD
    A[User reports slow Product Page] --> B{Identify Root Cause};
    B --> C[Analyze ProductsPage.tsx];
    B --> D[Analyze useProducts.tsx];
    B --> E[Analyze ProductCard.tsx];
    C & D & E --> F[Findings: No Pagination, Client-side Filtering, No Image Lazy Loading];

    F --> G[Phase 1: Optimize Data Fetching & Filtering];
    G --> G1[Modify useProducts for Pagination];
    G --> G2[Update ProductsPage to use Pagination];
    G --> G3[Implement Server-Side Filtering in useProducts];
    G --> G4[Update ProductsPage to use Server-Side Filtering];

    F --> H[Phase 2: Optimize Image Loading];
    H --> H1[Add loading="lazy" to ProductCard images];
    H --> H2[Recommend External Image Optimization];

    G1 & G2 & G3 & G4 & H1 --> I[Review and Test Performance];
    I --> J{Performance Improved?};
    J -- Yes --> K[Task Complete];
    J -- No --> L[Phase 3: Consider Virtualization (Advanced)];