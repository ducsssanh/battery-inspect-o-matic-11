
import React from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { InspectionCriterion } from "@/data/inspectionData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, FileSpreadsheet } from "lucide-react";

interface InspectionSummaryProps {
  criteria: InspectionCriterion[];
  onGenerateReport: () => void;
}

const InspectionSummary: React.FC<InspectionSummaryProps> = ({ 
  criteria,
  onGenerateReport
}) => {
  const totalItems = criteria.length;
  const completedItems = criteria.filter(item => item.status !== null).length;
  const passedItems = criteria.filter(item => item.status === "P").length;
  const failedItems = criteria.filter(item => item.status === "F").length;
  const naItems = criteria.filter(item => item.status === "N/A").length;
  
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Inspection Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span className="font-medium">Overall Completion</span>
            <span>{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="flex justify-center mb-1">
              <CheckCircle2 className="text-green-600 h-5 w-5" />
            </div>
            <div className="text-xl font-bold text-green-700">{passedItems}</div>
            <div className="text-xs text-green-600">Passed</div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg text-center">
            <div className="flex justify-center mb-1">
              <AlertCircle className="text-red-600 h-5 w-5" />
            </div>
            <div className="text-xl font-bold text-red-700">{failedItems}</div>
            <div className="text-xs text-red-600">Failed</div>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg text-center">
            <div className="text-xl font-bold text-yellow-700">{naItems}</div>
            <div className="text-xs text-yellow-600">Not Applicable</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Status</div>
          <div className="flex flex-wrap gap-2">
            {completedItems < totalItems ? (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                Inspection in Progress
              </Badge>
            ) : failedItems > 0 ? (
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                Failed Inspection
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Passed Inspection
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onGenerateReport}
          disabled={completedItems < totalItems}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InspectionSummary;
