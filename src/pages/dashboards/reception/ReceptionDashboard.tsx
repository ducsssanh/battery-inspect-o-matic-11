
import React from "react";

const ReceptionDashboard = () => {
  return (
    <div className="container px-4 py-6 mx-auto max-w-7xl">
      <div className="grid gap-6">
        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Reception Dashboard</h1>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-medium mb-2">Today's Appointments</h3>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-medium mb-2">Pending Check-ins</h3>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-medium mb-2">Available Testers</h3>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-medium mb-4">Today's Schedule</h3>
              <div className="space-y-2">
                <p className="text-sm">9:00 AM - ABC Corp Battery Inspection</p>
                <p className="text-sm">11:30 AM - XYZ Ltd Product Delivery</p>
                <p className="text-sm">2:00 PM - Client Meeting - Room 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionDashboard;
