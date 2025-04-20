
import React from "react";

const SalesDashboard = () => {
  return (
    <div className="container px-4 py-6 mx-auto max-w-7xl">
      <div className="grid gap-6">
        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Sales Dashboard</h1>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-medium mb-2">Monthly Revenue</h3>
                <p className="text-2xl font-bold">$45,250</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-medium mb-2">Active Leads</h3>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-medium mb-2">Pending Quotes</h3>
                <p className="text-2xl font-bold">7</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-medium mb-4">Recent Activities</h3>
              <div className="space-y-2">
                <p className="text-sm">New quote sent to ABC Corp</p>
                <p className="text-sm">Follow-up call with XYZ Ltd</p>
                <p className="text-sm">Contract signed with 123 Industries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
