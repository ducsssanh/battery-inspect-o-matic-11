
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import InspectionHeader from "@/components/InspectionHeader";
import InspectionCriteriaList from "@/components/InspectionCriteriaList";
import InspectionTableView from "@/components/InspectionTableView";
import InspectionSummary from "@/components/InspectionSummary";
import ReportPreview from "@/components/ReportPreview";
import { cellInspectionCriteria, inspectionTables, InspectionCriterion } from "@/data/inspectionData";

const Index = () => {
  const { toast } = useToast();
  const [criteria, setCriteria] = useState<InspectionCriterion[]>(cellInspectionCriteria);
  const [tables, setTables] = useState(inspectionTables);
  const [reportOpen, setReportOpen] = useState(false);

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
    setTables(prevTables => 
      prevTables.map(table => 
        table.id === tableId 
          ? { 
              ...table, 
              results: { 
                ...table.results, 
                [sampleId]: result 
              } 
            } 
          : table
      )
    );
  };

  const handleGenerateReport = () => {
    setReportOpen(true);
    toast({
      title: "Report Generated",
      description: "Your inspection report has been generated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-6 mx-auto max-w-7xl">
        <InspectionHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="criteria" className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="criteria">Inspection Criteria</TabsTrigger>
                <TabsTrigger value="tables">Test Tables</TabsTrigger>
              </TabsList>
              <TabsContent value="criteria" className="mt-0">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <InspectionCriteriaList 
                    criteria={criteria} 
                    onStatusChange={handleStatusChange}
                  />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="tables" className="mt-0">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  {tables.map(table => (
                    <InspectionTableView 
                      key={table.id} 
                      table={table} 
                      onResultChange={handleTableResultChange}
                    />
                  ))}
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
                  <li>• Mark each item as Pass (P), Fail (F), or Not Applicable (N/A)</li>
                  <li>• Complete all relevant test tables</li>
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
