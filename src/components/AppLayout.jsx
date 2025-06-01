import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'
import AppSidebar from './AppSidebar'
import { Toaster } from '@/components/ui/sonner'

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <Toaster />
          <Outlet />
        </main>
      </SidebarProvider>
      <Footer />
    </div>
  )
}

export default AppLayout
