import { Outlet } from "react-router-dom";

import { Header } from "@components/ui/Header";
import { Sidebar } from "@components/sidebar";
import { lazy } from "react";

const MessageBar = lazy(() =>
  import("@/components/messages/MessageBar").then((module) => ({
    default: module.MessageBar,
  }))
);

export function Layout() {
  return (
    <div className='flex w-dvw h-dvh bg-lexy-bg-platform'>
      <Sidebar />

      <main className='flex-1 grid grid-rows-[auto_1fr]'>
        <Header />

        <section className='grid grid-cols-[1fr_auto]'>
          <div className='overflow-auto'>
            <Outlet />
          </div>
          <MessageBar />
        </section>
      </main>
    </div>
  );
}
