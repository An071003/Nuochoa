import { API_URL } from "../../../../config/webpack.config";

export const getAnalytics = async () => {
    try {
        const response = await fetch(`${API_URL}/api/analytics`, {
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
        return data;
    } catch (error) {
        console.error("Error fetching analytics:", error.message);
        throw error;
    }
};
