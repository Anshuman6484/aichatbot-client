import { Link, NavLink } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { ThemeToogle } from './ThemeToggle'
import { BiLogIn } from 'react-icons/bi'
import { BiLogOut } from 'react-icons/bi'
import { MdMenu } from 'react-icons/md'
import { useRef, useState } from 'react'
import Ham from './Ham'
import { useAuth } from '@/hooks/useAuth'

function Navbar() {
  const [open, setOpen] = useState(false)
  const hamRef = useRef(null)

  const { isLoggedIn, handleLogOut } = useAuth()

  return (
    <>
      <nav className="w-full px-4 py-2 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            AI <span className="text-primary">CHATBOT</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-4">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink to="/about">About</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink to="/contact">Contact</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <ThemeToogle className="hidden md:flex" />

          {isLoggedIn ? (
            <Button onClick={handleLogOut}>
              <BiLogOut /> Log Out
            </Button>
          ) : (
            <Link to="/login" className=''>
              <Button>
                Log In <BiLogIn />
              </Button>
            </Link>
          )}
          {/* Mobile */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setOpen(!open)}
            ref={hamRef}
          >
            <MdMenu className="text-4xl" />
          </div>
        </div>
      </nav>
      {/* Mobile Menu Section */}
      <Ham open={open} setOpen={setOpen} hamRef={hamRef} />
    </>
  )
}

export default Navbar
