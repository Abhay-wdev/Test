
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAllProducts } from "@/hooks/useAllProducts";
import { categoryNames } from "@/types";

const InventoryManagement = () => {
  const { data: products, isLoading } = useAllProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingStockId, setEditingStockId] = useState<number | null>(null);
  const [stockValue, setStockValue] = useState<number>(0);

  const lowStockThreshold = 25;

  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    categoryNames[product.category_id]?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const lowStockItems = products?.filter(product => product.stock_quantity < lowStockThreshold) || [];
  
  const startEditStock = (product: any) => {
    setEditingStockId(product.id);
    setStockValue(product.stock_quantity);
  };
  
  const saveStockUpdate = (id: number) => {
    // In a real app, this would update the database
    console.log(`Updating stock for product ${id} to ${stockValue}`);
    setEditingStockId(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-spice-earth">Inventory Management</h1>
          <p className="text-muted-foreground">Loading inventory data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-spice-earth">Inventory Management</h1>
        <p className="text-muted-foreground">Monitor and update product stock levels</p>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="border-orange-300 bg-orange-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-orange-800">Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700">
              {lowStockItems.length} {lowStockItems.length === 1 ? 'product' : 'products'} below the minimum stock threshold of {lowStockThreshold} units.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Inventory Status</CardTitle>
            <div className="w-64">
              <Input
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price (₹)</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{categoryNames[product.category_id]}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    {editingStockId === product.id ? (
                      <Input
                        type="number"
                        min="0"
                        value={stockValue}
                        onChange={(e) => setStockValue(Number(e.target.value))}
                        className="w-20"
                      />
                    ) : (
                      <span className={product.stock_quantity < lowStockThreshold ? "text-red-600 font-bold" : ""}>
                        {product.stock_quantity}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${product.stock_quantity === 0
                          ? "bg-red-100 text-red-800"
                          : product.stock_quantity < lowStockThreshold
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                        }`}
                    >
                      {product.stock_quantity === 0 
                        ? "Out of stock" 
                        : product.stock_quantity < lowStockThreshold 
                        ? "Low stock" 
                        : "In stock"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {editingStockId === product.id ? (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => saveStockUpdate(product.id)}
                        >
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setEditingStockId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => startEditStock(product)}
                      >
                        Update Stock
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Inventory Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products?.filter(item => item.stock_quantity === 0).length || 0}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryManagement;
