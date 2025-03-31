
import React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InspectionTable, determineTestTableStatus } from "@/data/inspectionData";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";

interface InspectionTableViewProps {
  table: InspectionTable;
  onResultChange: (tableId: string, sampleId: string, result: string) => void;
  onToggleVisibility: (tableId: string) => void;
}

const InspectionTableView: React.FC<InspectionTableViewProps> = ({ 
  table, 
  onResultChange,
  onToggleVisibility
}) => {
  // Calculate overall status for this table
  const tableStatus = determineTestTableStatus(table);

  return (
    <Card className={cn("mb-6", {
      "border-l-4 border-l-green-500": tableStatus === "P",
      "border-l-4 border-l-red-500": tableStatus === "F",
      "border-l-4 border-l-yellow-500": tableStatus === "N/A",
      "border-l-4 border-l-gray-300": tableStatus === null,
    })}>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle className="text-lg">{table.title}</CardTitle>
            <CardDescription>
              Regulation: {table.regulationNumber}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {tableStatus && (
              <Badge variant={
                tableStatus === "P" ? "default" : 
                tableStatus === "F" ? "destructive" : "outline"
              } 
              className={cn(
                tableStatus === "P" && "bg-green-600",
                tableStatus === "N/A" && "bg-yellow-600"
              )}>
                {tableStatus === "P" ? "Pass" : tableStatus === "F" ? "Fail" : "N/A"}
              </Badge>
            )}
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-blue-50 flex items-center gap-1"
              onClick={() => onToggleVisibility(table.id)}
            >
              {table.visible ? (
                <>
                  <ChevronUp size={16} />
                  <span>Hide</span>
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  <span>Show</span>
                </>
              )}
            </Badge>
          </div>
        </div>
      </CardHeader>
      {table.visible && (
        <CardContent className="pb-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {table.columns.map((column) => (
                  <TableHead key={column.id} className="whitespace-nowrap">
                    {column.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.samples.map((sample) => (
                <TableRow key={sample}>
                  {table.columns.map((column) => (
                    <TableCell key={`${sample}-${column.id}`} className="p-2">
                      {column.id === "model" || column.id === "sample" ? (
                        sample
                      ) : column.id.includes("results") ? (
                        <Select 
                          value={table.results[`${sample}-${column.id}`] || ""}
                          onValueChange={(value) => onResultChange(table.id, `${sample}-${column.id}`, value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="P">Pass (P)</SelectItem>
                            <SelectItem value="F">Fail (F)</SelectItem>
                            <SelectItem value="N/A">Not Applicable (N/A)</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input 
                          type="text" 
                          placeholder="Enter value"
                          value={table.results[`${sample}-${column.id}`] || ""}
                          onChange={(e) => onResultChange(table.id, `${sample}-${column.id}`, e.target.value)}
                          className="h-9"
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
};

export default InspectionTableView;
