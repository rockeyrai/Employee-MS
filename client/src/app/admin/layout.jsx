import { Inter } from 'next/font/google'
import "../globals.css"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { SidebarProvider } from "@/components/ui/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Admin Dashboard",
  description: "A full-featured admin dashboard",
}

export default function RootLayout({
  children
}) {
  console.log("Inter className:", inter.className);
  return (
    (<html lang="en">
      <body >
        <SidebarProvider>
          <div className="flex w-full h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>)
  );
}

