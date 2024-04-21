import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo?.role === "admin" || userInfo?.role === "delivery" ? (
    <Outlet />
  ) : (
    <Navigate to="/admin" replace />
  );
}

export default AdminRoute;
