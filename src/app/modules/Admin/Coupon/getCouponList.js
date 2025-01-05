import { API_URL } from "../../../../config/webpack.config";

export const getCouponList = async () => {
    try {
        const response = await fetch(`${API_URL}/api/coupons`, {
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
        return data; // Trả về danh sách coupon
    } catch (error) {
        console.error("Error fetching coupon list:", error.message);
        throw error;
    }
};