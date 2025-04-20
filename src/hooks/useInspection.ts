
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { toast as sonnerToast } from "sonner";
import { 
  fetchProductTemplates, 
  InspectionCriterion, 
  InspectionTable,
  determineTestTableStatus,
  determineParentStatus 
} from "@/data/inspectionData";

export const useInspection = () => {
  const { toast } = useToast();
  const [criteria, setCriteria] = useState<InspectionCriterion[]>([]);
  const [tables, setTables] = useState<InspectionTable[]>([]);
  const [reportOpen, setReportOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("tables");
  const [selectedProduct, setSelectedProduct] = useState<{ id: string, type: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      loadProductTemplate(selectedProduct.type);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (tables.length === 0 || criteria.length === 0) return;
    
    const updatedCriteria = [...criteria];
    
    tables.forEach(table => {
      const tableStatus = determineTestTableStatus(table);
      if (tableStatus) {
        const criterionIndex = updatedCriteria.findIndex(c => c.id === table.criterionId);
        if (criterionIndex !== -1) {
          updatedCriteria[criterionIndex] = {
            ...updatedCriteria[criterionIndex],
            status: tableStatus
          };
        }
      }
    });
    
    const level2Criteria = updatedCriteria.filter(c => c.level === 2);
    level2Criteria.forEach(parentCriterion => {
      const childrenStatuses = updatedCriteria
        .filter(c => c.parentId === parentCriterion.id)
        .map(c => c.status);
      
      const parentStatus = determineParentStatus(childrenStatuses);
      
      const parentIndex = updatedCriteria.findIndex(c => c.id === parentCriterion.id);
      if (parentIndex !== -1 && parentStatus !== null) {
        updatedCriteria[parentIndex] = {
          ...updatedCriteria[parentIndex],
          status: parentStatus
        };
      }
    });
    
    const level1Criteria = updatedCriteria.filter(c => c.level === 1);
    level1Criteria.forEach(parentCriterion => {
      const childrenStatuses = updatedCriteria
        .filter(c => c.parentId === parentCriterion.id)
        .map(c => c.status);
      
      const parentStatus = determineParentStatus(childrenStatuses);
      
      const parentIndex = updatedCriteria.findIndex(c => c.id === parentCriterion.id);
      if (parentIndex !== -1 && parentStatus !== null) {
        updatedCriteria[parentIndex] = {
          ...updatedCriteria[parentIndex],
          status: parentStatus
        };
      }
    });
    
    if (JSON.stringify(criteria) !== JSON.stringify(updatedCriteria)) {
      setCriteria(updatedCriteria);
    }
  }, [tables, criteria]);

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

  const handleStatusChange = (id: string, status: "P" | "F" | "N/A") => {
    setCriteria(prevCriteria => 
      prevCriteria.map(item => 
        item.id === id ? { ...item, status } : item
      )
    );

    toast({
      title: "Status updated",
      description: `Item ${id} marked as ${status === "P" ? "Pass" : status === "F" ? "Fail" : "Not Applicable"}`,
    });
  };

  const handleTableResultChange = (tableId: string, sampleId: string, result: string) => {
    setTables(prevTables => {
      const updatedTables = prevTables.map(table => 
        table.id === tableId 
          ? { 
              ...table, 
              results: { 
                ...table.results, 
                [sampleId]: result 
              } 
            } 
          : table
      );
      
      const updatedTable = updatedTables.find(t => t.id === tableId);
      if (updatedTable) {
        const tableStatus = determineTestTableStatus(updatedTable);
        
        if (tableStatus) {
          setCriteria(prevCriteria => 
            prevCriteria.map(item => 
              item.id === updatedTable.criterionId 
                ? { ...item, status: tableStatus } 
                : item
            )
          );
        }
      }
      
      return updatedTables;
    });
  };

  const handleToggleTableVisibility = (tableId: string) => {
    setTables(prevTables => 
      prevTables.map(table => 
        table.id === tableId 
          ? { ...table, visible: !table.visible } 
          : table
      )
    );
  };

  const handleShowTableForCriterion = (criterionId: string) => {
    const tableToShow = tables.find(table => table.criterionId === criterionId);
    if (tableToShow) {
      setTables(prevTables => 
        prevTables.map(table => 
          table.id === tableToShow.id
            ? { ...table, visible: true }
            : table
        )
      );
      
      setActiveTab("tables");
    }
  };

  return {
    criteria,
    tables,
    reportOpen,
    setReportOpen,
    activeTab,
    setActiveTab,
    selectedProduct,
    isLoading,
    handleSelectProduct,
    handleBackToProducts,
    handleStatusChange,
    handleTableResultChange,
    handleToggleTableVisibility,
    handleShowTableForCriterion
  };
};
