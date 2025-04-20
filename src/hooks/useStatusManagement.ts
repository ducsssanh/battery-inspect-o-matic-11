
import { useToast } from "@/components/ui/use-toast";
import { InspectionCriterion } from "@/data/inspectionData";

export const useStatusManagement = (
  criteria: InspectionCriterion[],
  setCriteria: (criteria: InspectionCriterion[]) => void
) => {
  const { toast } = useToast();

  const handleStatusChange = (id: string, status: "P" | "F" | "N/A") => {
    setCriteria(
      criteria.map(item => 
        item.id === id ? { ...item, status } : item
      )
    );

    toast({
      title: "Status updated",
      description: `Item ${id} marked as ${status === "P" ? "Pass" : status === "F" ? "Fail" : "Not Applicable"}`,
    });
  };

  return {
    handleStatusChange,
  };
};
