
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import UserProfile from './UserProfile';

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center bg-background border-b">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <span className="font-semibold text-white">TQ</span>
        </div>
        <span className="font-bold">TestQuest</span>
      </div>
      <div className="flex items-center gap-4">
        {user && <UserProfile user={user} />}
      </div>
    </header>
  );
};

export default DashboardHeader;
