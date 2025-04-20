import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Beaker, ClipboardList, FileText, Package } from 'lucide-react';
import UserProfile from '@/components/UserProfile';
import AuthTabs from '@/components/AuthTabs';

const Index = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/50">
      {/* Header */}
      <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="font-semibold text-white">TQ</span>
          </div>
          <span className="font-bold">TestQuest</span>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <UserProfile user={user} onLogout={handleLogout} />
          ) : (
            <Button
              variant="outline"
              onClick={() => setUser({ name: 'Demo User', email: 'demo@example.com' })}
            >
              Demo Login
            </Button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-8 md:gap-16">
        {/* Left Content - Features */}
        <div className="w-full max-w-lg space-y-6 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Test Lab Process Management System
          </h1>
          <p className="text-xl text-muted-foreground">
            Streamline your laboratory testing workflows with our advanced process 
            management system for testing facilities.
          </p>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="flex items-start gap-2">
              <div className="mt-1 bg-primary/10 p-1 rounded-full">
                <ClipboardList size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Request Management</h3>
                <p className="text-sm text-muted-foreground">Manage customer requests with ease</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-1 bg-primary/10 p-1 rounded-full">
                <Package size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Item Tracking</h3>
                <p className="text-sm text-muted-foreground">Track test items throughout the process</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-1 bg-primary/10 p-1 rounded-full">
                <Beaker size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Test Results</h3>
                <p className="text-sm text-muted-foreground">Capture and manage test results</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-1 bg-primary/10 p-1 rounded-full">
                <FileText size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Report Generation</h3>
                <p className="text-sm text-muted-foreground">Generate and manage test reports</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Auth Card */}
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <AuthTabs />
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
