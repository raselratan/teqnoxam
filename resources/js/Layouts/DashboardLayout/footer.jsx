export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 h-12 border-t bg-background shadow-md">
      <div className="flex h-full items-center justify-between px-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Version 1.0.0</span>
          <span>•</span>
          <span>© 2025 Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground cursor-pointer">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground cursor-pointer">
            Terms
          </a>
          <a href="#" className="hover:text-foreground cursor-pointer">
            Support
          </a>
        </div>
      </div>
    </footer>
  )
}
