import { useState, useEffect } from "react"
import Navbar from "./navbar"
import Sidebar from "./sidebar"
import SettingsSidebar from "./settings-sidebar"
import Footer from "./footer"
import DefaultSettings from "./default-settings"

export default function DashboardLayout({ children, settingsContent }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark"
    setTheme(savedTheme)
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onSettingsClick={() => setSettingsOpen(true)}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onCollapse={() => {
          setSidebarCollapsed(!sidebarCollapsed)
          setSidebarOpen(false)
        }}
      />
      <SettingsSidebar isOpen={settingsOpen} onClose={() => setSettingsOpen(false)}>
        {settingsContent || <DefaultSettings />}
      </SettingsSidebar>
      <main className={`pt-16 pb-12 transition-all duration-300 ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"}`}>
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  )
}
