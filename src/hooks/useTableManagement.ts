
import { useState } from "react";
import { InspectionTable, InspectionCriterion, determineTestTableStatus } from "@/data/inspectionData";

export const useTableManagement = (
  tables: InspectionTable[],
  setTables: (tables: InspectionTable[]) => void,
  setCriteria: (criteria: InspectionCriterion[]) => void
) => {
  const [activeTab, setActiveTab] = useState<string>("tables");

  const handleTableResultChange = (tableId: string, sampleId: string, result: string) => {
    const updatedTables = tables.map(table => 
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
    
    setTables(updatedTables);
    
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
  };

  const handleToggleTableVisibility = (tableId: string) => {
    setTables(
      tables.map(table => 
        table.id === tableId 
          ? { ...table, visible: !table.visible } 
          : table
      )
    );
  };

  const handleShowTableForCriterion = (criterionId: string) => {
    const tableToShow = tables.find(table => table.criterionId === criterionId);
    if (tableToShow) {
      setTables(
        tables.map(table => 
          table.id === tableToShow.id
            ? { ...table, visible: true }
            : table
        )
      );
      
      setActiveTab("tables");
    }
  };

  return {
    activeTab,
    setActiveTab,
    handleTableResultChange,
    handleToggleTableVisibility,
    handleShowTableForCriterion,
  };
};
