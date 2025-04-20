
import React from "react";

const CustomerDashboard = () => {
  return (
    <div className="container px-4 py-6 mx-auto max-w-7xl">
      <div className="grid gap-6">
        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Customer Dashboard</h1>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-medium mb-2">Active Orders</h3>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-medium mb-2">Completed Tests</h3>
                <p className="text-2xl font-bold">15</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-medium mb-2">Pending Reports</h3>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-medium mb-4">Recent Orders</h3>
              <div className="space-y-2">
                <p className="text-sm">Battery Pack Test - In Progress</p>
                <p className="text-sm">Cell Performance Analysis - Completed</p>
                <p className="text-sm">Quality Inspection - Scheduled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
