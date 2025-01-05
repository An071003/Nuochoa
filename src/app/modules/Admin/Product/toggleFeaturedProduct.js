import { API_URL } from "../../../../config/webpack.config";

export const toggleFeaturedProduct = async (id) => {
    try {
        const response = await fetch(`${API_URL}/api/products/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error toggling featured product:", error.message);
        throw error;
    }
};