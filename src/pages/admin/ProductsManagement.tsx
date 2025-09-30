
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/useProducts";
import { useAllProducts } from "@/hooks/useAllProducts";
import { categoryNames, DbProduct } from "@/types";
import ImageUpload from "@/components/ImageUpload";

const ProductsManagement = () => {
  const { data: products, isLoading } = useAllProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<DbProduct | null>(null);
  
  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    categoryNames[product.category_id]?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct.mutateAsync(id);
    }
  };
  
  const handleEditProduct = (product: DbProduct) => {
    setEditingProduct(product);
    setShowAddModal(true);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-spice-earth">Products Management</h1>
          <p className="text-muted-foreground">Manage your store's products</p>
        </div>
        <Button className="bg-spice-paprika hover:bg-spice-paprika/90" onClick={() => {
          setEditingProduct(null);
          setShowAddModal(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Products ({products?.length || 0})</CardTitle>
            <div className="w-64">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading products...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price (₹)</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="w-12 h-12 rounded-md overflow-hidden">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80";
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{product.id}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{categoryNames[product.category_id]}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock_quantity}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {showAddModal && (
        <ProductFormModal 
          product={editingProduct} 
          onClose={() => setShowAddModal(false)}
          onSave={async (productData) => {
            if (editingProduct) {
              await updateProduct.mutateAsync({ id: editingProduct.id, ...productData });
            } else {
              await createProduct.mutateAsync(productData);
            }
            setShowAddModal(false);
          }} 
        />
      )}
    </div>
  );
};

// Enhanced modal component for adding/editing products with image upload
const ProductFormModal = ({ 
  product, 
  onClose, 
  onSave 
}: { 
  product: DbProduct | null, 
  onClose: () => void, 
  onSave: (product: any) => void 
}) => {
  const [images, setImages] = useState<string[]>(
    product?.image_urls && product.image_urls.length > 0
      ? product.image_urls
      : product?.image_url
        ? [product.image_url]
        : []
  );
  
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    stock_quantity: product?.stock_quantity || 0,
    category_id: product?.category_id || 1,
    weight: product?.weight || "",
    sku: product?.sku || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "stock_quantity" || name === "category_id" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use the first image as the main image_url, or a default if no images
    const image_url = images.length > 0
      ? images[0]
      : "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    
    onSave({
      ...formData,
      image_url,
      image_urls: images
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Product Details */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block font-medium">Product Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category_id" className="block font-medium">Category</label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value={1}>Seasonings</option>
                  <option value={2}>Powdered Spices</option>
                  <option value={3}>Blended Spices</option>
                  <option value={4}>Whole Spices</option>
                  <option value={5}>Combo Packs</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="price" className="block font-medium">Price (₹)</label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="stock_quantity" className="block font-medium">Stock Quantity</label>
                  <Input
                    id="stock_quantity"
                    name="stock_quantity"
                    type="number"
                    min="0"
                    value={formData.stock_quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="weight" className="block font-medium">Weight</label>
                  <Input
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="e.g., 100g"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="sku" className="block font-medium">SKU</label>
                  <Input
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="e.g., TUR-100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block font-medium">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block font-medium">Product Images</label>
                <ImageUpload 
                  images={images}
                  onImagesChange={setImages}
                  maxImages={5}
                />
                <p className="text-sm text-gray-500">
                  Upload up to 5 images. The first image will be used as the main product image.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-spice-paprika hover:bg-spice-paprika/90">
              {product ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductsManagement;
