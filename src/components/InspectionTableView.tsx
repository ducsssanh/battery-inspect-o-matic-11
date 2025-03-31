
import React, { useState } from "react";
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
import { InspectionTable } from "@/data/inspectionData";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface InspectionTableViewProps {
  table: InspectionTable;
  onResultChange: (tableId: string, sampleId: string, result: string) => void;
}

const InspectionTableView: React.FC<InspectionTableViewProps> = ({ table, onResultChange }) => {
  const [expandedView, setExpandedView] = useState(false);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle className="text-lg">{table.title}</CardTitle>
            <CardDescription>
              Regulation: {table.regulationNumber}
            </CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-blue-50"
            onClick={() => setExpandedView(!expandedView)}
          >
            {expandedView ? "Collapse" : "Expand"} Table
          </Badge>
        </div>
      </CardHeader>
      {expandedView && (
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
