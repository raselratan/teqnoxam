import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import styles from "./Navbar.module.css"
import { Link } from "@inertiajs/react"
import { route } from 'ziggy-js';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleSmoothScroll = (e, href) => {
        e.preventDefault()
        const targetId = href.replace("#", "")
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
            const navHeight = 80
            const targetPosition = targetElement.offsetTop - navHeight
            window.scrollTo({ top: targetPosition, behavior: "smooth" })
            setIsMobileMenuOpen(false)
        }
    }

    const menuItems = [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Features", href: "#features" },
        { label: "Contact", href: "#contact" },
    ]

    return (
        <nav
            className={`${styles.navContainer} fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-white/95 backdrop-blur-2xl shadow-xl shadow-purple-500/10 border-b-2 border-purple-100"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link
                        href={route('landing')}
                        className="flex items-center gap-3 group"
                    >
                        <div
                            className={`${styles.logoIcon} w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 flex items-center justify-center`}
                        >
                            <span className="text-white font-bold text-2xl">E</span>
                        </div>
                        <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                            ExamMaster
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-10">
                        {menuItems.map((item, index) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleSmoothScroll(e, item.href)}
                                className={`${styles.menuItem} text-gray-700 hover:text-purple-600 font-semibold text-lg transition-all duration-300 relative`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {item.label}
                                <span className={styles.menuUnderline}></span>
                            </a>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button
                            variant="ghost"
                            className="text-gray-700 cursor-pointer hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 font-semibold text-lg transition-all duration-300"
                        >
                            <Link href={route('auth.login')}>Login</Link>
                        </Button>
                        <Button className="bg-gradient-to-r cursor-pointer from-purple-600 via-pink-500 to-blue-500 text-white font-semibold text-lg px-8 hover:shadow-2xl hover:shadow-purple-500/60 hover:scale-110 transition-all duration-300">
                            <Link href={route('auth.register')}>Register</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors duration-300"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className={`${styles.mobileMenu} md:hidden py-6 border-t-2 border-purple-200`}>
                        <div className="flex flex-col gap-5">
                            {menuItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => handleSmoothScroll(e, item.href)}
                                    className="text-gray-700 hover:text-purple-600 font-semibold text-lg transition-colors duration-300 py-2"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <div className="flex flex-col gap-3 pt-4 border-t-2 border-purple-200">
                                <Button
                                    variant="outline"
                                    className="w-full cursor-pointer border-2 border-purple-300 hover:bg-purple-50 hover:border-purple-500 font-semibold text-lg bg-transparent"
                                >
                                    <Link href={route('auth.login')}>Login</Link>
                                </Button>
                                <Button className="w-full cursor-pointer bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white font-semibold text-lg">
                                    <Link href={route('auth.register')}>Register</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
