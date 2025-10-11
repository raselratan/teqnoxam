import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap } from "lucide-react"
import styles from "./HeroSection.module.css"

export default function HeroSection() {
    const handleScrollToFeatures = (e) => {
        e.preventDefault()
        const featuresSection = document.getElementById("features")
        if (featuresSection) {
            const navHeight = 80
            const targetPosition = featuresSection.offsetTop - navHeight
            window.scrollTo({ top: targetPosition, behavior: "smooth" })
        }
    }

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background blobs */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200">
                <div className={`${styles.floatBlob1} absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-full blur-3xl opacity-70`} />
                <div className={`${styles.floatBlob2} absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-full blur-3xl opacity-70`} />
                <div className={`${styles.floatBlob3} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-br from-pink-500 via-blue-500 to-purple-500 rounded-full blur-3xl opacity-60`} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                {/* Badge */}
                <div className={`${styles.badgeContainer} inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/90 backdrop-blur-md border-2 border-purple-300 mb-10 shadow-2xl`}>
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span className="text-base font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                        New: AI-Powered Question Analysis
                    </span>
                    <Zap className="w-5 h-5 text-pink-500" />
                </div>

                {/* Heading */}
                <h1 className={`${styles.heroTitle} text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8`}>
                    <span className="text-gray-900">Master Your Exams</span>
                    <br />
                    <span className={`${styles.gradientText} bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent`}>
                        with Confidence!
                    </span>
                </h1>

                {/* Subheading */}
                <p className={`${styles.heroSubtitle} text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium max-w-4xl mx-auto mb-12 leading-relaxed`}>
                    Practice with thousands of MCQs, track your progress, and compete with peers. Your journey to exam success starts here.
                </p>

                {/* Buttons */}
                <div className={`${styles.heroCta} flex flex-col sm:flex-row items-center justify-center gap-6`}>
                    <Button
                        size="lg"
                        onClick={handleScrollToFeatures}
                        className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white hover:shadow-2xl hover:shadow-purple-500/60 hover:scale-110 transition-all duration-300 text-xl px-12 py-8 group font-bold"
                    >
                        Start Practicing
                        <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={handleScrollToFeatures}
                        className="text-xl px-12 py-8 border-4 border-purple-400 hover:bg-purple-600 hover:text-white hover:border-purple-600 hover:scale-110 transition-all duration-300 bg-white/90 backdrop-blur-md font-bold"
                    >
                        Learn More
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 max-w-5xl mx-auto">
                    {[
                        { value: "50K+", label: "Active Students", color: "from-purple-600 to-purple-400", delay: "0.9s" },
                        { value: "10K+", label: "Practice Questions", color: "from-pink-600 to-pink-400", delay: "1s" },
                        { value: "95%", label: "Success Rate", color: "from-blue-600 to-blue-400", delay: "1.1s" },
                        { value: "24/7", label: "Support", color: "from-purple-600 to-blue-500", delay: "1.2s" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className={`${styles.statCard} p-8 rounded-3xl bg-white/90 backdrop-blur-md border-4 border-purple-200 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 cursor-pointer`}
                            style={{ animationDelay: stat.delay }}
                        >
                            <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}>
                                {stat.value}
                            </div>
                            <div className="text-base font-semibold text-gray-700">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
