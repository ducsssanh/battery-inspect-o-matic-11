
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import InspectionHeader from "@/components/InspectionHeader";
import InspectionContent from "@/components/inspection/InspectionContent";
import InspectionSummary from "@/components/InspectionSummary";
import ReportPreview from "@/components/ReportPreview";
import ProductSelection from "@/components/ProductSelection";
import { useInspection } from "@/hooks/useInspection";

const TesterDashboard = () => {
  const {
    criteria,
    tables,
    reportOpen,
    setReportOpen,
    activeTab,
    setActiveTab,
    selectedProduct,
    handleSelectProduct,
    handleBackToProducts,
    handleStatusChange,
    handleTableResultChange,
    handleToggleTableVisibility,
    handleShowTableForCriterion
  } = useInspection();

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
          <InspectionContent 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            criteria={criteria}
            tables={tables}
            onStatusChange={handleStatusChange}
            onShowTable={handleShowTableForCriterion}
            onTableResultChange={handleTableResultChange}
            onToggleTableVisibility={handleToggleTableVisibility}
          />
          
          <div>
            <div className="sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Inspection Overview</h2>
              <InspectionSummary 
                criteria={criteria}
                onGenerateReport={() => setReportOpen(true)}
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

export default TesterDashboard;
