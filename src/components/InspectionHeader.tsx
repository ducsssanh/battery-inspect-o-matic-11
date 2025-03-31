
import React from "react";
import { cn } from "@/lib/utils";
import { BatteryMedium, ClipboardCheck } from "lucide-react";

interface InspectionHeaderProps {
  className?: string;
}

const InspectionHeader: React.FC<InspectionHeaderProps> = ({ className }) => {
  return (
    <header className={cn("flex items-center justify-between mb-6", className)}>
      <div className="flex items-center">
        <div className="bg-blue-600 p-3 rounded-lg mr-4">
          <BatteryMedium size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Battery Inspect-O-Matic</h1>
          <p className="text-gray-500">Cell Inspection Module</p>
        </div>
      </div>
      <div className="flex items-center bg-blue-50 p-2 rounded-lg">
        <ClipboardCheck className="text-blue-600 mr-2" size={20} />
        <span className="text-blue-700 font-medium">PSI-BATT Inspection</span>
      </div>
    </header>
  );
};

export default InspectionHeader;
