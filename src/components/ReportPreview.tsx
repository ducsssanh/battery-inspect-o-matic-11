
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InspectionCriterion } from "@/data/inspectionData";
import { cn } from "@/lib/utils";

interface ReportPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  criteria: InspectionCriterion[];
}

const ReportPreview: React.FC<ReportPreviewProps> = ({ open, onOpenChange, criteria }) => {
  // Sort criteria by regulation number for proper display
  const sortedCriteria = [...criteria].sort((a, b) => {
    const aNum = a.regulationNumber.split(' ')[0];
    const bNum = b.regulationNumber.split(' ')[0];
    return aNum.localeCompare(bNum, undefined, { numeric: true });
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Inspection Report</DialogTitle>
        </DialogHeader>
        <div className="mb-4">
          <div className="text-2xl font-bold mb-1">Report No.: BATT-24xxxyzz/PSI</div>
          <div className="text-lg font-semibold text-center my-3">
            QCVN 101:2020/BTTTT & IEC 62133-2:2017
          </div>
        </div>
        <ScrollArea className="h-[calc(80vh-180px)]">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead className="w-24">Clause</TableHead>
                <TableHead className="w-24">IEC 62133-2:2017</TableHead>
                <TableHead>Requirement + Test</TableHead>
                <TableHead className="w-40">Result - Remark</TableHead>
                <TableHead className="w-20">Verdict</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCriteria.map((item) => (
                <TableRow 
                  key={item.id}
                  className={cn({
                    "bg-gray-50": item.level === 1,
                    "": item.level === 2,
                    "pl-4": item.level === 3
                  })}
                >
                  <TableCell className={cn("font-mono", {
                    "font-bold": item.level === 1,
                    "pl-4": item.level === 2,
                    "pl-8": item.level === 3
                  })}>
                    {item.regulationNumber}
                  </TableCell>
                  <TableCell className="font-mono">{item.iecNumber}</TableCell>
                  <TableCell>
                    <div className={cn("font-medium", {
                      "font-bold": item.level === 1,
                    })}>
                      {item.description}
                    </div>
                    <div className="text-blue-600 text-sm">{item.requirement}</div>
                    {item.tableReference && (
                      <div className="text-xs text-gray-500 mt-1">
                        see {item.tableReference}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{item.remarks}</TableCell>
                  <TableCell className={cn("text-center font-bold", {
                    "bg-green-100": item.status === "P",
                    "bg-red-100": item.status === "F",
                    "bg-yellow-100": item.status === "N/A"
                  })}>
                    {item.status || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ReportPreview;
