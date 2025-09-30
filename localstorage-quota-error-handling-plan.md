# Plan: Handling localStorage QuotaExceededError

This document outlines the plan to address the `QuotaExceededError` that occurs when saving the shopping cart to `localStorage` if the storage limit is reached.

## Problem Diagnosis

When a user adds an item to the cart:
1.  The `cart` state in `CartContext.tsx` is updated.
2.  A `useEffect` hook attempts to persist the `cart` state to `localStorage` using `localStorage.setItem('cart', JSON.stringify(cart))`.
3.  If `localStorage` is full, this operation throws a `QuotaExceededError`.
4.  Currently, this error is unhandled, causing the React application to crash or render a blank page.

The error originates in [`src/context/CartContext.tsx`](src/context/CartContext.tsx:50) within the `useEffect` hook that listens to `cart` changes.

## Proposed Solution

The primary goal is to make the application more resilient by gracefully handling this error, preventing a crash, and informing the user.

1.  **Modify `useEffect` in `CartContext.tsx`**:
    *   Locate the `useEffect` hook responsible for saving the cart to `localStorage` (around line [`src/context/CartContext.tsx:49`](src/context/CartContext.tsx:49)).
    *   Wrap the `localStorage.setItem("cart", JSON.stringify(cart));` call in a `try...catch` block.

2.  **Error Handling Logic within `catch` block**:
    *   Log the caught error to the console for debugging purposes (e.g., `console.error("Failed to save cart to localStorage:", error);`).
    *   Check if the error is a `DOMException` and its `name` property is `'QuotaExceededError'`.
        *   If true, display a specific user-friendly toast notification: `"Could not save cart. Storage is full."`
    *   For any other type of error that might occur during `localStorage.setItem`, display a more generic toast notification: `"An error occurred while saving your cart."`
    *   The cart total calculation (`setCartTotal`) should remain outside the `try...catch` block as it does not directly interact with `localStorage` and should proceed regardless of `setItem` success or failure.

**Example Code Snippet for `CartContext.tsx`:**

```typescript
// Inside CartContext.tsx, useEffect for localStorage
useEffect(() => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      toast.error("Could not save cart. Storage is full.");
    } else {
      toast.error("An error occurred while saving your cart.");
    }
  }
  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  setCartTotal(total);
}, [cart]);
```

## Expected Outcome

*   The application will no longer crash when `localStorage` quota is exceeded.
*   Users will be informed via a toast message if their cart cannot be saved due to storage limitations.
*   The cart will still function correctly in memory for the current session, but persistence across sessions might be affected if the quota issue isn't resolved by the user (e.g., by clearing some `localStorage` data).

## Mermaid Diagram of the Plan

```mermaid
graph TD
    A[User clicks "Add to Cart"] --> B{ProductCard.handleAddToCart};
    B --> C{CartContext.addToCart};
    C --> D[Updates cart state];
    D --> E{useEffect in CartContext (cart dependency)};
    E --> F{Attempt localStorage.setItem};
    F -- Success --> G[Cart saved to localStorage];
    F -- Failure (e.g., QuotaExceededError) --> H{Catch Error};
    H --> I[Log error to console];
    H --> J{Display toast notification to user};
    J --> K[Application continues without crashing];
    G --> L[Calculate cart total];
    K --> L;
```

This plan focuses on immediate error handling. Long-term solutions could involve cart compression, using `sessionStorage` (which has different persistence characteristics), or moving cart management to a backend service.