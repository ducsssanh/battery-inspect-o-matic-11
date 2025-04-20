
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface InspectedProduct {
  id: string;
  name: string;
  type: string;
  inspectionDate: Date;
  status: "P" | "F" | "N/A";
}

export function ViewInspectedProducts() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [inspectedProducts, setInspectedProducts] = useState<InspectedProduct[]>([]);

  const handleDateFilter = async () => {
    if (!startDate || !endDate) return;
    
    // This is where you'll implement the database query
    // For now, we'll use mock data
    const mockData: InspectedProduct[] = [
      {
        id: "1",
        name: "MacBook Pro",
        type: "computers",
        inspectionDate: new Date(),
        status: "P",
      },
      {
        id: "2",
        name: "iPhone 15",
        type: "phones",
        inspectionDate: new Date(),
        status: "F",
      },
    ];
    
    setInspectedProducts(mockData);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">View Inspected Products</Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-3xl">
        <SheetHeader>
          <SheetTitle>Inspected Products</SheetTitle>
        </SheetHeader>
        
        <div className="flex items-center gap-4 my-4">
          <div className="grid gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Start date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>End date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <Button onClick={handleDateFilter}>Apply Filter</Button>
        </div>

        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Inspection Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inspectedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="capitalize">{product.type}</TableCell>
                  <TableCell>{format(product.inspectionDate, "PPP")}</TableCell>
                  <TableCell>
                    {product.status === "P" ? "Pass" : 
                     product.status === "F" ? "Fail" : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
              {inspectedProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                    No inspected products found in the selected date range
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </SheetContent>
    </Sheet>
  );
}
