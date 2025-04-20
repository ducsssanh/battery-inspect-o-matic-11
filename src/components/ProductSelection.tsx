
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ViewInspectedProducts } from "./ViewInspectedProducts";

// In a real app, this would come from your database
const sampleProducts = [
  { id: "1", name: "MacBook Pro", type: "computers", status: "pending", model: "A2338" },
  { id: "2", name: "iPhone 15", type: "phones", status: "pending", model: "A2651" },
  { id: "3", name: "Dell XPS 15", type: "computers", status: "pending", model: "9510" },
];

interface ProductSelectionProps {
  onSelectProduct: (productId: string, productType: string) => void;
}

const ProductSelection: React.FC<ProductSelectionProps> = ({ onSelectProduct }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(sampleProducts);
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInspect = (productId: string, productType: string) => {
    // Remove the product from the list
    setProducts(products.filter(p => p.id !== productId));
    // Call the original handler
    onSelectProduct(productId, productType);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <CardHeader className="px-0">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">Product Inspection Queue</CardTitle>
            <CardDescription>
              Select a product from the list below to begin the inspection process
            </CardDescription>
          </div>
          <ViewInspectedProducts />
        </div>
      </CardHeader>

      <div className="flex items-center mb-6 mt-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search products by name, model or type..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.model}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {product.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="sm" 
                        onClick={() => handleInspect(product.id, product.type)}
                      >
                        Inspect
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No products found matching your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductSelection;
