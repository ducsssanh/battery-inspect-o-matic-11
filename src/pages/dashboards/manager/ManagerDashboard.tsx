
import React from "react";

const ManagerDashboard = () => {
  return (
    <div className="container px-4 py-6 mx-auto max-w-7xl">
      <div className="grid gap-6">
        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Manager Dashboard</h1>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-medium mb-2">Total Tests</h3>
                <p className="text-2xl font-bold">256</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-medium mb-2">Pending Approvals</h3>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-medium mb-2">Active Testers</h3>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-medium mb-4">Recent Activities</h3>
              <div className="space-y-2">
                <p className="text-sm">New test report submitted by John</p>
                <p className="text-sm">Quality check completed for Battery A</p>
                <p className="text-sm">New tester assigned to Project X</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
