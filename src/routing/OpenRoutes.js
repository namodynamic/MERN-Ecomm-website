import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
  const token = localStorage.getItem("token");

  return token === null ? children : <Navigate to="/" replace={true} />;
};
