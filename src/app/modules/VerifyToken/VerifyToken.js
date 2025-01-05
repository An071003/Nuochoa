import { API_URL } from "../../../config/webpack.config";
import { ApiRequest } from "./ApiRequest";

export const checkAuth = async (setUserRole) => {
  try {
    const data = await ApiRequest(`${API_URL}/api/auth/verify-token`);
    setUserRole(data.role);
  } catch (error) {
    console.error("Lỗi xác thực:", error.message);
    setUserRole(null);
  }
};

