
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { fetchProductTemplates, InspectionCriterion, InspectionTable } from "@/data/inspectionData";

export const useProductTemplate = () => {
  const { toast } = useToast();
  const [criteria, setCriteria] = useState<InspectionCriterion[]>([]);
  const [tables, setTables] = useState<InspectionTable[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ id: string, type: string } | null>(null);

  const loadProductTemplate = async (productType: string) => {
    setIsLoading(true);
    try {
      const { criteria: templateCriteria, tables: templateTables } = await fetchProductTemplates(productType);
      
      setCriteria(templateCriteria);
      setTables(templateTables);
      
      toast({
        title: "Template Loaded",
        description: `Inspection template for ${productType} loaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error Loading Template",
        description: "Failed to load the inspection template. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectProduct = (productId: string, productType: string) => {
    setSelectedProduct({ id: productId, type: productType });
    toast({
      title: "Product Selected",
      description: `Loading inspection template for ${productType}...`,
    });
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setCriteria([]);
    setTables([]);
  };

  return {
    criteria,
    setCriteria,
    tables,
    setTables,
    isLoading,
    selectedProduct,
    loadProductTemplate,
    handleSelectProduct,
    handleBackToProducts,
  };
};
