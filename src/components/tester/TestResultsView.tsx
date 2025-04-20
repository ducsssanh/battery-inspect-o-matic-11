
import React from "react";
import { ViewInspectedProducts } from "@/components/ViewInspectedProducts";

const TestResultsView = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Test Results</h1>
        <ViewInspectedProducts />
      </div>
    </div>
  );
};

export default TestResultsView;
