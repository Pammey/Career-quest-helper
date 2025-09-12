import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isOnboarded = localStorage.getItem("onboardingComplete") === "true";
  
  if (!isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;