import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { SidebarProvider } from './ui/sidebar'
import AppSidebar from './AppSidebar'
import { Toaster } from '@/components/ui/sonner'
import ScrollToTop from './ScrollToTop'

function AppLayout() {
  return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1">
            <ScrollToTop />
            <Toaster />
            <Outlet />
          </main>
        </SidebarProvider>
        <Footer />
      </div>
  )
}

export default AppLayout
