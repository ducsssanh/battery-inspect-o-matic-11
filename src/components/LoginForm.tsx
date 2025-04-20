
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleQuickAccess = (role: string) => {
    // For development purposes - quick access to role dashboards
    switch (role) {
      case 'tester':
        navigate('/tester/dashboard');
        break;
      case 'manager':
        navigate('/manager/dashboard');
        break;
      case 'customer':
        navigate('/customer/dashboard');
        break;
      case 'sales':
        navigate('/sales/dashboard');
        break;
      case 'reception':
        navigate('/reception/dashboard');
        break;
    }
    toast.success(`Accessing ${role} dashboard`);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="example@email.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <Button className="w-full" type="submit">
          Login
        </Button>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground text-center">Quick Access (Development Only)</p>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => handleQuickAccess('tester')}>
            Tester Dashboard
          </Button>
          <Button variant="outline" onClick={() => handleQuickAccess('manager')}>
            Manager Dashboard
          </Button>
          <Button variant="outline" onClick={() => handleQuickAccess('customer')}>
            Customer Dashboard
          </Button>
          <Button variant="outline" onClick={() => handleQuickAccess('reception')}>
            Reception Dashboard
          </Button>
          <Button variant="outline" onClick={() => handleQuickAccess('sales')}>
            Sales Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
