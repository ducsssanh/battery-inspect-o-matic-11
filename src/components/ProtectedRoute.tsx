
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  const { user, isAuthenticated } = useAuth();

  // TEMPORARY: Authentication bypass for development
  // TODO: Remove this bypass when connecting to your backend
  // return <>{children}</>;

  // Original authentication logic - uncomment when ready to implement

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.map(r => r.toLowerCase()).includes(user.role.toLowerCase())) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
