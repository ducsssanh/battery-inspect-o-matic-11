
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Beaker, ClipboardList, FileText, Package } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await login(email, password);
      toast.success('Welcome to TestQuest');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error(error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleQuickLogin = async (role: string) => {
    setIsLoggingIn(true);
    try {
      await login(`${role}@example.com`, 'password');
      toast.success(`Logged in as ${role}`);
    } catch (error) {
      toast.error('Login failed.');
      console.error(error);
    } finally {
      setIsLoggingIn(false);
    }
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
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-8 md:gap-16">
        {/* Left Content */}
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

        {/* Right Content - Login Card */}
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold">Log In</h2>
              <p className="text-muted-foreground mt-1">Access your TestQuest dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? 'Logging in...' : 'Log In'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-background px-2 text-muted-foreground">
                    Quick Demo Access
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickLogin('sales')}
                  disabled={isLoggingIn}
                >
                  Sales
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickLogin('reception')}
                  disabled={isLoggingIn}
                >
                  Reception
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickLogin('tester')}
                  disabled={isLoggingIn}
                >
                  Tester
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickLogin('manager')}
                  disabled={isLoggingIn}
                >
                  Manager
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="col-span-2"
                  onClick={() => handleQuickLogin('customer')}
                  disabled={isLoggingIn}
                >
                  Customer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
