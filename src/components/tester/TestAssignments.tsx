
import React from "react";
import ProductSelection from "@/components/ProductSelection";

const TestAssignments = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <ProductSelection onSelectProduct={(productId, productType) => {
        // This will be connected to your database later
        console.log('Selected product:', productId, productType);
      }} />
    </div>
  );
};

export default TestAssignments;
