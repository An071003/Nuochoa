import { API_URL } from "../../../../config/webpack.config";

export const getProductList = async () => {
    try {
        const response = await fetch(API_URL+"/api/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (Array.isArray(data.products)) {
            return data.products;
        } else {
            throw new Error("Invalid data format: products is not an array");
        }
    } catch (error) {
        console.error("Error fetching product list:", error.message);
        throw error;
    }
};
