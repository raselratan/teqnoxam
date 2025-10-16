import { Menu, Bell, Search, Sun, Moon, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePage } from '@inertiajs/react'
import { useForm } from "@inertiajs/react"

export default function Navbar({ onMenuClick, onSettingsClick, theme, onThemeToggle }) {
  const { post } = useForm();
  const { props } = usePage()
  const handleLogout = (e) => {
    e.preventDefault()
    post(route('auth.signout'))
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-background">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden cursor-pointer">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary" />
            <span className="text-xl font-bold">Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onThemeToggle} className="cursor-pointer">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onSettingsClick} className="cursor-pointer">
            <Settings className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 cursor-pointer">
                {props.username}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
