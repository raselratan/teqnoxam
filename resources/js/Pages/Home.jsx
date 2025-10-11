import Footer from "@/components/home/footer/Footer.jsx"
import HeroSection from "@/components/home/hero/Hero.jsx"
import Navbar from "@/components/home/navbar/Navbar.jsx"
import MockupSection from "@/components/home/sections/MockupSection.jsx"
import TestimonialsSection from "@/components/home/testimonial/TestimonialsSection.jsx"
import { useEffect, useState } from "react"


function Home() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <HeroSection />
            <MockupSection />
            <TestimonialsSection />
            <Footer />
        </div>
    )
}

Home.layout = null;
export default Home;
