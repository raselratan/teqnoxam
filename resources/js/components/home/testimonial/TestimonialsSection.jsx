import TestimonialCard from "./TestimonialCard"
import styles from "./TestimonialsSection.module.css"

export default function TestimonialsSection() {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Medical Student",
            image: "/female-student.jpg",
            content:
                "ExamMaster helped me improve my scores by 40%! The topic-wise practice and instant feedback are game-changers.",
            rating: 5,
        },
        {
            name: "Michael Chen",
            role: "Engineering Student",
            content:
                "The leaderboard feature keeps me motivated. Competing with peers makes studying fun and engaging!",
            rating: 5,
        },
        {
            name: "Priya Patel",
            role: "MBA Aspirant",
            content:
                "Best exam prep platform I've used. The progress tracking helps me identify weak areas and improve systematically.",
            rating: 5,
        },
    ]

    return (
        <section
            className={`py-24 md:py-40 bg-gradient-to-b from-purple-100 via-pink-100/60 to-blue-100 relative overflow-hidden`}
        >
            {/* Floating decorative blobs */}
            <div className={`${styles.floatingBlob} absolute top-20 left-10 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl`}></div>
            <div
                className={`${styles.floatingBlob} absolute bottom-20 right-10 w-56 h-56 bg-pink-500/30 rounded-full blur-3xl`}
                style={{ animationDelay: "1s" }}
            ></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className={`${styles.sectionHeader} text-center mb-20`}>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
                        <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                            Student Success Stories
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-700 font-semibold max-w-3xl mx-auto text-balance">
                        Join thousands of students who achieved their goals with ExamMaster
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`${styles.testimonialItem}`}
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <TestimonialCard {...testimonial} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
