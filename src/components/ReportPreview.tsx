
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InspectionCriterion } from "@/data/inspectionData";

interface ReportPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  criteria: InspectionCriterion[];
}

const ReportPreview: React.FC<ReportPreviewProps> = ({ open, onOpenChange, criteria }) => {
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
              {criteria.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono">{item.regulationNumber}</TableCell>
                  <TableCell className="font-mono">{item.iecNumber}</TableCell>
                  <TableCell>
                    <div className="font-medium">{item.description}</div>
                    <div className="text-blue-600 text-sm">{item.requirement}</div>
                    {item.tableReference && (
                      <div className="text-xs text-gray-500 mt-1">
                        see {item.tableReference}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{item.remarks}</TableCell>
                  <TableCell className="text-center font-bold">
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
