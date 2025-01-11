import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";

export default function AdminLayout() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
            {/* Sidebar */}
            <div className="lg:col-span-2 bg-gray-900">
                <SidebarAdmin />
            </div>

            {/* Main content */}
            <div className="lg:col-span-10 bg-gray-100 p-5">
                <Outlet />
            </div>
        </div>
    );
}
