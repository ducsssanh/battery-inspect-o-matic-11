
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    role: string;
  } | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const { login, logout } = useAuth();

  if (!user) return null;

  const handleRoleSwitch = (newRole: string) => {
    // Mock login with new role
    login(`${newRole}@example.com`, 'password123');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground capitalize">
              Role: {user.role}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Demo: Switch Role</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleRoleSwitch('sales')}>Sales</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleSwitch('reception')}>Reception</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleSwitch('tester')}>Tester</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleSwitch('manager')}>Manager</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleSwitch('customer')}>Customer</DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
