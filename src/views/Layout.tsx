import { Header } from "@components/ui/Header";
import { MessageBar } from "@components/ui/messages/MessageBar";
import { Sidebar } from "@components/ui/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="flex w-dvw h-dvh bg-lexy-bg-platform">
      <Sidebar />

      <main className="flex-1 grid grid-rows-[auto_1fr]">
        <Header />

        <section className="grid grid-cols-[1fr_auto]">
          <div className="p-6 overflow-auto">
            <Outlet />
          </div>
          <MessageBar />
        </section>
      </main>
    </div>
  );
}
