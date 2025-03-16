import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem("token"); // Get the JWT token from localStorage

  return token ? children : <Navigate to="/login" />; // Redirects to login if no token is found
};

export default AuthGuard;
