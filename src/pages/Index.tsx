import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import InspectionHeader from "@/components/InspectionHeader";
import InspectionCriteriaList from "@/components/InspectionCriteriaList";
import InspectionTableView from "@/components/InspectionTableView";
import InspectionSummary from "@/components/InspectionSummary";
import ReportPreview from "@/components/ReportPreview";
import ProductSelection from "@/components/ProductSelection";
import { 
  fetchProductTemplates,
  InspectionCriterion, 
  InspectionTable, 
  determineTestTableStatus,
  determineParentStatus
} from "@/data/inspectionData";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { toast } = useToast();
  const [criteria, setCriteria] = useState<InspectionCriterion[]>([]);
  const [tables, setTables] = useState<InspectionTable[]>([]);
  const [reportOpen, setReportOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("tables"); // Default to tables tab
  const [selectedProduct, setSelectedProduct] = useState<{ id: string, type: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  // Load templates when a product is selected
  useEffect(() => {
    if (selectedProduct) {
      loadProductTemplate(selectedProduct.type);
    }
  }, [selectedProduct]);

  // Update criteria status based on test table results
  useEffect(() => {
    if (tables.length === 0 || criteria.length === 0) return;
    
    const updatedCriteria = [...criteria];
    
    // First, update criteria directly linked to tables
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
    
    // Then propagate changes upward through the hierarchy (level 3 to level 1)
    // Process level 3 to level 2
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
    
    // Process level 2 to level 1
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
    
    // Only update if there are actual changes
    if (JSON.stringify(criteria) !== JSON.stringify(updatedCriteria)) {
      setCriteria(updatedCriteria);
    }
  }, [tables, criteria]);

  const loadProductTemplate = async (productType: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
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
      
      // Find the updated table and its associated criterion
      const updatedTable = updatedTables.find(t => t.id === tableId);
      if (updatedTable) {
        const tableStatus = determineTestTableStatus(updatedTable);
        
        if (tableStatus) {
          // Find and update the associated criterion
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
      
      // Switch to tables tab
      setActiveTab("tables");
    }
  };

  const handleGenerateReport = () => {
    setReportOpen(true);
    toast({
      title: "Report Generated",
      description: "Your inspection report has been generated successfully.",
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await login(email, password);
      toast.success('Welcome to TestQuest');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error(error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleQuickLogin = async (role: string) => {
    setIsLoggingIn(true);
    try {
      await login(`${role}@example.com`, 'password');
      toast.success(`Logged in as ${role}`);
    } catch (error) {
      toast.error('Login failed.');
      console.error(error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Render product selection if no product is selected
  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ProductSelection onSelectProduct={handleSelectProduct} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-6 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            className="gap-1" 
            onClick={handleBackToProducts}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
          <h2 className="text-xl font-semibold">
            Product Inspection: {selectedProduct.type.charAt(0).toUpperCase() + selectedProduct.type.slice(1)}
          </h2>
        </div>
        
        <InspectionHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="criteria">Inspection Criteria</TabsTrigger>
                <TabsTrigger value="tables">Test Tables</TabsTrigger>
              </TabsList>
              <TabsContent value="criteria" className="mt-0">
                <ScrollArea className="h-[calc(100vh-280px)] pr-4">
                  <InspectionCriteriaList 
                    criteria={criteria} 
                    tables={tables}
                    onStatusChange={handleStatusChange}
                    onShowTable={handleShowTableForCriterion}
                  />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="tables" className="mt-0">
                <ScrollArea className="h-[calc(100vh-280px)] pr-4">
                  <div className="pb-12">
                    {tables.map(table => (
                      <InspectionTableView 
                        key={table.id} 
                        table={table} 
                        onResultChange={handleTableResultChange}
                        onToggleVisibility={handleToggleTableVisibility}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Inspection Overview</h2>
              <InspectionSummary 
                criteria={criteria}
                onGenerateReport={handleGenerateReport}
              />
              
              <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-sm text-gray-700 mb-2">Instructions</h3>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Complete test tables for detailed results</li>
                  <li>• Results will automatically update criteria status</li>
                  <li>• Click the clipboard icon to view associated test table</li>
                  <li>• Generate the report when all items are completed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReportPreview 
        open={reportOpen} 
        onOpenChange={setReportOpen} 
        criteria={criteria}
      />
    </div>
  );
};

export default Index;
