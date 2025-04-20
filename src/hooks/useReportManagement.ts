
import { useState } from "react";

export const useReportManagement = () => {
  const [reportOpen, setReportOpen] = useState(false);

  return {
    reportOpen,
    setReportOpen,
  };
};
