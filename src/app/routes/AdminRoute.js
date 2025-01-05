import React from "react";
import PrivateRoute from "./PrivateRoute"; // Import lại PrivateRoute

const AdminRoute = ({ element }) => {
  // Wrapper cho route chỉ dành cho admin
  return <PrivateRoute element={element} roles={["admin"]} />;
};

export default AdminRoute;
