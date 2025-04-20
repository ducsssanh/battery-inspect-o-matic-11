
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      toast.error('Failed to login');
    }
  };

  const handleQuickAccess = (role: string) => {
    // Mock login with role-specific email
    login(`${role}@example.com`, 'password123');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required 
          />
        </div>
        <Button className="w-full" type="submit">
          Login
        </Button>
      </form>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground text-center">Quick Demo Access</p>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => handleQuickAccess('tester')}>
            Tester
          </Button>
          <Button variant="outline" onClick={() => handleQuickAccess('manager')}>
            Manager
          </Button>
          <Button variant="outline" onClick={() => handleQuickAccess('customer')}>
            Customer
          </Button>
          <Button variant="outline" onClick={() => handleQuickAccess('reception')}>
            Reception
          </Button>
          <Button variant="outline" onClick={() => handleQuickAccess('sales')} className="col-span-2">
            Sales
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
