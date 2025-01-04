import { API_URL } from "../../../config/webpack.config";

export const editProduct = async (id, updatedData) => {
    try {
        const response = await fetch(`${API_URL}/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(updatedData),
        });
        console.log(updatedData)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error editing product:", error.message);
        throw error;
    }
};
