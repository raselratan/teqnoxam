import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  Home,
  BarChart3,
  Users,
  Settings,
  FileText,
  Package,
  ChevronLeft,
  ChevronRightIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { route } from "ziggy-js"
import { Link } from "@inertiajs/react"

const menuItems = [
  { icon: Home, label: "Dashboard", href: `${route('admin.dashboard')}` },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  {
    icon: Users,
    label: "Users",
    href: "/users",
    children: [
      { label: "All Users", href: `${route('admin.users')}` },
      { label: "Add User", href: `${route('admin.users')}` },
      { label: "User Roles", href: `${route('admin.users')}` },
    ],
  },
  {
    icon: Package,
    label: "Products",
    href: "/products",
    children: [
      { label: "All Products", href: "/products" },
      { label: "Add Product", href: "/products/add" },
      { label: "Categories", href: "/products/categories" },
    ],
  },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export default function Sidebar({ isOpen, isCollapsed, onCollapse }) {
  const [expandedItems, setExpandedItems] = useState([])

  const toggleExpand = (label) => {
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={onCollapse} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex h-12 shrink-0 items-center justify-between border-b px-4">
            {!isCollapsed && <span className="text-sm font-semibold">Navigation</span>}
            <Button variant="ghost" size="icon" onClick={onCollapse} className="cursor-pointer">
              {isCollapsed ? <ChevronRightIcon className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* Scrollable Menu */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <nav className="space-y-1 p-2">
                {menuItems.map((item) => (
                  <div key={item.label}>
                    <Button
                      variant="ghost"
                      className={cn("w-full justify-start cursor-pointer", isCollapsed ? "px-2" : "px-3")}
                      onClick={() => item.children && toggleExpand(item.label)}
                    >
                      <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-left">
                            {
                              item.children ? item.label : <Link href={item.href}>{item.label}</Link>
                            }
                            {/* <Link href={item.href}>{item.label}</Link>{item.label} */}
                          </span>
                          {item.children &&
                            (expandedItems.includes(item.label) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            ))}
                        </>
                      )}
                    </Button>
                    {item.children && expandedItems.includes(item.label) && !isCollapsed && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Button
                            key={child.label}
                            variant="ghost"
                            className="w-full justify-start text-sm cursor-pointer"
                          >
                            <Link href={child.href}>{child.label}</Link>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </ScrollArea>
          </div>

          {/* Sidebar Footer */}
          {/* <div className="flex h-12 shrink-0 items-center justify-center border-t px-4">
            {!isCollapsed && <span className="text-xs text-muted-foreground">v1.0.0</span>}
          </div> */}
        </div>
      </aside>
    </>
  )
}
