import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Beaker, 
  ClipboardList, 
  Download, 
  FileText, 
  Home, 
  MessagesSquare, 
  Package, 
  Settings, 
  UserCircle, 
  Users,
  DollarSign
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { currentUser } = useAuth();
  const role = currentUser?.role || 'tester';

  // Simplified menu items just for tester role
  const menuItems = [
    { name: 'My Assignments', icon: <ClipboardList size={18} />, path: '/assignments' },
    { name: 'Test Results', icon: <Beaker size={18} />, path: '/results' },
  ];

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 flex-col border-r bg-sidebar transition-transform duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full py-6">
        <div className="mb-6 px-6 text-lg font-semibold">
          Tester Portal
        </div>
        
        <nav className="flex-1 space-y-1 px-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "sidebar-item",
                isActive ? "sidebar-item-active" : "sidebar-item-inactive"
              )}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsOpen(false);
                }
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-auto px-3 space-y-1">
          <NavLink
            to="/profile"
            className={({ isActive }) => cn(
              "sidebar-item",
              isActive ? "sidebar-item-active" : "sidebar-item-inactive"
            )}
          >
            <UserCircle size={18} />
            <span>Profile</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => cn(
              "sidebar-item",
              isActive ? "sidebar-item-active" : "sidebar-item-inactive"
            )}
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
