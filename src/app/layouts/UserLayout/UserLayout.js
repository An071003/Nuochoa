import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer.js";

export default function UserLayout() {
    return (
        <>
            <Header />
            <main className="min-h-screen flex flex-col">
                {/* Content Area */}
                <div className="flex-grow px-4 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    );
};
