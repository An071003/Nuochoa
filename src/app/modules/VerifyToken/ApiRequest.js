import { API_URL } from "../../../config/webpack.config";

export const ApiRequest = async (url = {}) => {
    let response = await fetch(url, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    if (response.status === 401) {
        const refreshResponse = await fetch(`${API_URL}/api/auth/refresh-token`, {
            method: "POST",
            credentials: "include",
        });

        if (refreshResponse.ok) {
            console.log(1)
            response = await fetch(url, {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } else {
            window.location.href = "/login";
            return;
        }
    }
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Có lỗi xảy ra");
    }
    const responseData = await response.json();

    return responseData;
};