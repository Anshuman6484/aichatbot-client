import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'
import AppSidebar from './AppSidebar'
import { Toaster } from '@/components/ui/sonner'
import ScrollToTop from './ScrollToTop'

function AppLayout() {
  return (
    <div className="min-h-svh flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger className='fixed top-3 left-3 z-10' />
        </SidebarProvider>
        <main className="flex-1">
          <ScrollToTop />
          <Toaster />
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}


export default AppLayout
