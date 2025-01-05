import { API_URL } from "../../../config/webpack.config";

const logoutAcc = async () => {
  try {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Logout failed: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Logout successful:", data);
    return data;
  } catch (error) {
    console.error("Error during logout:", error.message);
    throw error;
  }
};

export default logoutAcc;