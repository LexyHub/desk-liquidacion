import { Header } from "@/components/ui/Header";
import { Sidebar } from "@/components/ui/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <div className="flex w-dvw h-dvh bg-lexy-bg-platform">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                <Header />
                <Outlet />
            </main>
        </div>
    )
}