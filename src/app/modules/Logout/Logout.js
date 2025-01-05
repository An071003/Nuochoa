import { message } from "antd";
import { API_URL } from "../../../config/webpack.config";

export const Logout = async () => {
    try {
        const response = await fetch(`${API_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include", 
        });
        if (response.ok) {
            message.success("Đăng xuất thành công!");
        } else {
            message.error("Đã có lỗi xảy ra khi đăng xuất!");
        }
    } catch (error) {
        console.error("Lỗi đăng xuất: ", error);
        message.error("Đã có lỗi xảy ra khi đăng xuất!");
    }
};