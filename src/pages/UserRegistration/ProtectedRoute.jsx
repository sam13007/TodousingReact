import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem("email")) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
