import { API_URL } from "../../../config/webpack.config";

export const addProduct = async (product) => {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(product), 
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error.message);
    throw error;
  }
};
