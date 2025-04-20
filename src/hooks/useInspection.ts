
import { useEffect } from "react";
import { useProductTemplate } from "./useProductTemplate";
import { useStatusManagement } from "./useStatusManagement";
import { useTableManagement } from "./useTableManagement";
import { useReportManagement } from "./useReportManagement";
import { useStatusCalculation } from "./useStatusCalculation";

export const useInspection = () => {
  const {
    criteria,
    setCriteria,
    tables,
    setTables,
    isLoading,
    selectedProduct,
    loadProductTemplate,
    handleSelectProduct,
    handleBackToProducts,
  } = useProductTemplate();

  const { handleStatusChange } = useStatusManagement(criteria, setCriteria);
  
  const {
    activeTab,
    setActiveTab,
    handleTableResultChange,
    handleToggleTableVisibility,
    handleShowTableForCriterion,
  } = useTableManagement(tables, setTables, setCriteria);

  const { reportOpen, setReportOpen } = useReportManagement();

  useEffect(() => {
    if (selectedProduct) {
      loadProductTemplate(selectedProduct.type);
    }
  }, [selectedProduct]);

  // Use the new status calculation hook
  useStatusCalculation(tables, criteria, setCriteria);

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
