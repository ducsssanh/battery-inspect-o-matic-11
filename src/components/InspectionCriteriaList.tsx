
import React from "react";
import { cn } from "@/lib/utils";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InspectionCriterion, InspectionTable } from "@/data/inspectionData";
import { Button } from "@/components/ui/button";
import { Check, X, Minus, ClipboardList } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface InspectionCriteriaListProps {
  criteria: InspectionCriterion[];
  tables: InspectionTable[];
  onStatusChange: (id: string, status: "P" | "F" | "N/A") => void;
  onShowTable: (criterionId: string) => void;
}

const InspectionCriteriaList: React.FC<InspectionCriteriaListProps> = ({ 
  criteria,
  tables,
  onStatusChange,
  onShowTable
}) => {
  // Function to find associated table for a criterion
  const findTableForCriterion = (criterionId: string): InspectionTable | undefined => {
    return tables.find(table => table.criterionId === criterionId);
  };

  // Render criteria with proper indentation based on level
  const renderCriterion = (item: InspectionCriterion) => {
    const associatedTable = findTableForCriterion(item.id);
    
    return (
      <Card 
        key={item.id} 
        className={cn(
          "border-l-4 mb-3",
          !item.status ? "border-l-gray-300" :
          item.status === "P" ? "border-l-green-500" :
          item.status === "F" ? "border-l-red-500" :
          "border-l-yellow-500",
          // Add left margin based on level for visual hierarchy
          item.level === 1 ? "ml-0" : 
          item.level === 2 ? "ml-4" : 
          item.level === 3 ? "ml-8" : 
          "ml-12"
        )}
      >
        <CardHeader className="py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                {item.regulationNumber} / {item.iecNumber}
              </Badge>
              {item.tableReference && (
                <Badge variant="secondary" className="text-xs">
                  {item.tableReference}
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              {associatedTable && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => onShowTable(item.id)}
                  title="Show/hide test table"
                >
                  <ClipboardList className="h-4 w-4" />
                  <span className="sr-only">View Test Table</span>
                </Button>
              )}
              <Button
                size="sm" 
                variant={item.status === "P" ? "default" : "outline"} 
                className={cn(
                  "h-8 w-8 p-0",
                  item.status === "P" && "bg-green-600 hover:bg-green-700"
                )}
                onClick={() => onStatusChange(item.id, "P")}
              >
                <Check className="h-4 w-4" />
                <span className="sr-only">Pass</span>
              </Button>
              <Button 
                size="sm" 
                variant={item.status === "F" ? "default" : "outline"} 
                className={cn(
                  "h-8 w-8 p-0",
                  item.status === "F" && "bg-red-600 hover:bg-red-700"
                )}
                onClick={() => onStatusChange(item.id, "F")}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Fail</span>
              </Button>
              <Button 
                size="sm" 
                variant={item.status === "N/A" ? "default" : "outline"} 
                className={cn(
                  "h-8 w-8 p-0",
                  item.status === "N/A" && "bg-yellow-600 hover:bg-yellow-700"
                )}
                onClick={() => onStatusChange(item.id, "N/A")}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Not Applicable</span>
              </Button>
            </div>
          </div>
          <CardTitle className="text-base font-medium mt-2">{item.description}</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-sm text-blue-600">{item.requirement}</p>
          {item.remarks && (
            <>
              <Separator className="my-2" />
              <div className="text-xs text-gray-500">
                <span className="font-semibold">Remarks:</span> {item.remarks}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-1">
      {criteria
        .sort((a, b) => {
          // First sort by the numeric part of regulationNumber
          const aNum = a.regulationNumber.split(' ')[0];
          const bNum = b.regulationNumber.split(' ')[0];
          return aNum.localeCompare(bNum, undefined, { numeric: true });
        })
        .map(renderCriterion)}
    </div>
  );
};

export default InspectionCriteriaList;
