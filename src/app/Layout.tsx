import { Outlet } from "react-router-dom";

import { Header } from "@features/header";
import { Sidebar } from "@features/sidebar";
import { lazy } from "react";
import { NotificationProvider } from "@features/notificaciones";

const MessageBar = lazy(() =>
  import("@features/mensajes/components/MessageBar").then((module) => ({
    default: module.MessageBar,
  }))
);

export function Layout() {
  return (
    <div className='flex w-dvw h-dvh bg-lexy-bg-platform scroll-smooth'>
      <Sidebar />

      <main className='flex-1 grid grid-rows-[auto_1fr] min-h-0'>
        <Header />

        <section className='grid grid-cols-[1fr_auto] min-h-0'>
          <div className='overflow-auto h-full pb-8 hide-scrollbar'>
            <NotificationProvider>
              <Outlet />
            </NotificationProvider>
          </div>
          <MessageBar />
        </section>
      </main>
    </div>
  );
}
