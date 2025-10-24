import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronRightIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Link } from "@inertiajs/react"
import { usePage } from '@inertiajs/react'
import { adminMenuItems } from "./admin-menu-items"
import { examineeMenuItems } from "./examinee-menu-items"

export default function Sidebar({ isOpen, isCollapsed, onCollapse }) {
  const [expandedItems, setExpandedItems] = useState([])
  const { props } = usePage()

  const menuMap = {
    admin: adminMenuItems,
    examinee: examineeMenuItems,
  };

  const menuItems = menuMap[props.role] || adminMenuItems;

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
                            <child.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
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
