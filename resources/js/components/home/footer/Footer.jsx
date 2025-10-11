import { Facebook, Twitter, Instagram, Linkedin, Mail, Heart } from "lucide-react"
import styles from "./Footer.module.css"

export default function Footer() {
    const handleSmoothScroll = (e, href) => {
        e.preventDefault()
        const targetId = href.replace("#", "")
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
            const navHeight = 80
            const targetPosition = targetElement.offsetTop - navHeight
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            })
        }
    }

    const footerLinks = {
        Product: ["Features", "Pricing", "FAQ", "Support"],
        Company: ["About Us", "Careers", "Blog", "Press"],
        Resources: ["Documentation", "Tutorials", "Community", "Contact"],
        Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    }

    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
    ]

    return (
        <footer className="bg-gradient-to-b from-purple-100 via-pink-100/60 to-purple-200 border-t-4 border-purple-300 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className={`${styles.floatingBlob} absolute top-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl`}></div>
            <div
                className={`${styles.floatingBlob} absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl`}
                style={{ animationDelay: "2s" }}
            ></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
                    {/* Brand Column */}
                    <div className={`${styles.footerSection} lg:col-span-2`} style={{ animationDelay: "0s" }}>
                        <a
                            href="#home"
                            onClick={(e) => handleSmoothScroll(e, "#home")}
                            className="flex items-center gap-3 mb-6 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 flex items-center justify-center shadow-xl shadow-purple-500/50 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white font-bold text-2xl">E</span>
                            </div>
                            <span className="text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                                ExamMaster
                            </span>
                        </a>
                        <p className="text-gray-700 mb-8 leading-relaxed text-lg font-medium">
                            Empowering students to achieve their academic goals through smart practice and personalized learning.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className={`${styles.socialIcon} w-12 h-12 rounded-xl bg-white border-4 border-purple-300 hover:border-purple-500 flex items-center justify-center text-gray-600 hover:text-white hover:shadow-xl`}
                                    style={{ animationDelay: `${index * 0.2}s` }}
                                >
                                    <social.icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([category, links], colIndex) => (
                        <div
                            key={category}
                            className={`${styles.footerSection}`}
                            style={{ animationDelay: `${(colIndex + 1) * 0.1}s` }}
                        >
                            <h3 className="font-black text-xl text-gray-900 mb-6">{category}</h3>
                            <ul className="space-y-4">
                                {links.map((link, linkIndex) => (
                                    <li
                                        key={link}
                                        className={`${styles.linkItem}`}
                                        style={{ animationDelay: `${(colIndex + 1) * 0.1 + linkIndex * 0.05}s` }}
                                    >
                                        <a
                                            href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                                            onClick={(e) => handleSmoothScroll(e, `#${link.toLowerCase().replace(/\s+/g, "-")}`)}
                                            className="text-gray-700 hover:text-purple-600 font-semibold text-base"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter */}
                <div
                    className={`${styles.footerSection} border-t-4 border-purple-300 pt-10 mb-10`}
                    style={{ animationDelay: "0.5s" }}
                >
                    <div className="max-w-xl">
                        <h3 className="font-black text-2xl text-gray-900 mb-3">Stay Updated</h3>
                        <p className="text-gray-700 mb-6 text-lg font-medium">
                            Get the latest exam tips and updates delivered to your inbox.
                        </p>
                        <div className="flex gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-xl border-4 border-purple-300 bg-white text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                            />
                            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white hover:shadow-2xl hover:shadow-purple-500/60 hover:scale-110 transition-all duration-300 font-bold text-lg">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div
                    className={`${styles.footerSection} border-t-4 border-purple-300 pt-10 flex flex-col md:flex-row items-center justify-between gap-6`}
                    style={{ animationDelay: "0.7s" }}
                >
                    <p className="text-gray-700 text-base text-center md:text-left font-semibold flex items-center gap-2">
                        © 2025 ExamMaster. Made with{" "}
                        <Heart className={`${styles.heartIcon} w-5 h-5 text-red-500 fill-red-500`} /> for students
                    </p>
                    <div className="flex items-center gap-3 text-gray-700 text-base hover:text-purple-600 transition-colors duration-300 font-semibold">
                        <Mail className="w-5 h-5" />
                        <a href="mailto:support@exammaster.com">support@exammaster.com</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
