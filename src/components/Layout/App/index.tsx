import React from "react"
import Footer from "../Footer"
import Header from "../Header"
import { useLocation } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const availablePaths = ["/", "/about", "/contact", "/recipes"]
  const pathname = availablePaths.includes(location.pathname)
  const isAdminRoute = location.pathname.startsWith("/admin")
  const isUserRoute = ["/auth/login", "/auth/register", "/recipes"].includes(location.pathname)
  const mainWidth = isAdminRoute || isUserRoute ? "w-full" : "w-3/4"
  return (
    <div className="flex w-full flex-col items-center justify-center border font-inter">
      <div className="w-full">
        {pathname && <Header />}
        <Toaster />
        <main className="flex w-full items-center justify-center">
          <div className={mainWidth}>{children}</div>
        </main>
        {pathname && <Footer />}
      </div>
    </div>
  )
}
