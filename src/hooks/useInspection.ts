
import { useEffect } from "react";
import { determineTestTableStatus, determineParentStatus } from "@/data/inspectionData";
import { useProductTemplate } from "./useProductTemplate";
import { useStatusManagement } from "./useStatusManagement";
import { useTableManagement } from "./useTableManagement";
import { useReportManagement } from "./useReportManagement";

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
