-- Migration: Add image_urls column to products table for multi-image support
ALTER TABLE products
ADD COLUMN image_urls text[] DEFAULT ARRAY[]::text[];