
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import InspectionCriteriaList from "@/components/InspectionCriteriaList";
import InspectionTableView from "@/components/InspectionTableView";
import { InspectionCriterion, InspectionTable } from "@/data/inspectionData";

interface InspectionContentProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  criteria: InspectionCriterion[];
  tables: InspectionTable[];
  onStatusChange: (id: string, status: "P" | "F" | "N/A") => void;
  onShowTable: (criterionId: string) => void;
  onTableResultChange: (tableId: string, sampleId: string, result: string) => void;
  onToggleTableVisibility: (tableId: string) => void;
}

const InspectionContent: React.FC<InspectionContentProps> = ({
  activeTab,
  setActiveTab,
  criteria,
  tables,
  onStatusChange,
  onShowTable,
  onTableResultChange,
  onToggleTableVisibility
}) => {
  return (
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
              onStatusChange={onStatusChange}
              onShowTable={onShowTable}
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
                  onResultChange={onTableResultChange}
                  onToggleVisibility={onToggleTableVisibility}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InspectionContent;
