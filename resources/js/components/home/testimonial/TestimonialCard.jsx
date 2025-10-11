import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"
import styles from "./TestimonialCard.module.css"

export default function TestimonialCard({ name, role, image, content, rating }) {
    return (
        <Card
            className={`${styles.testimonialCard} group relative overflow-hidden border-4 border-purple-200 hover:border-purple-500 bg-white hover:shadow-2xl hover:shadow-purple-500/40`}
        >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Decorative quote icon */}
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Quote className={`${styles.quoteIcon} w-16 h-16 text-purple-600`} />
            </div>

            <CardContent className="p-8 md:p-10 relative z-10">
                {/* Rating Stars */}
                <div className="flex gap-2 mb-6">
                    {[...Array(rating)].map((_, i) => (
                        <Star
                            key={i}
                            className={`${styles.starIcon} w-6 h-6 fill-yellow-400 text-yellow-400`}
                            style={{
                                animation: `${styles.starPop} 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s backwards`,
                            }}
                        />
                    ))}
                </div>

                {/* Testimonial Content */}
                <p
                    className="text-gray-700 text-lg leading-relaxed mb-8 font-medium"
                    style={{
                        animation: `${styles.quoteSlide} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards`,
                    }}
                >
                    "{content}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                    <Avatar
                        className={`${styles.avatarContainer} w-16 h-16 border-4 border-purple-300 group-hover:border-purple-500 group-hover:scale-110 transition-all duration-300`}
                    >
                        <AvatarImage src={image || "/placeholder.svg"} alt={name} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 text-white font-bold text-xl">
                            {name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-bold text-xl text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                            {name}
                        </div>
                        <div className="text-base text-gray-600 font-medium">{role}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
