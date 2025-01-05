import { API_URL } from "../../../../config/webpack.config";

export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${API_URL}/api/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error deleting product:", error.message);
        throw error;
    }
};