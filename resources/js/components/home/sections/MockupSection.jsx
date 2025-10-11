import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, Sparkles } from "lucide-react"
import styles from "./MockupSection.module.css"

export default function MockupSection() {
    return (
        <section className="py-24 md:py-40 relative overflow-hidden bg-gradient-to-b from-white via-purple-100/50 to-pink-50/40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className={`${styles.sectionHeader} text-center mb-20`}>
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Sparkles className={`${styles.sparkleIcon} w-8 h-8 text-purple-600`} />
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black">
                            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                                Experience the Interface
                            </span>
                        </h2>
                        <Sparkles className={`${styles.sparkleIcon} w-8 h-8 text-pink-500`} />
                    </div>
                    <p className="text-xl md:text-2xl text-gray-700 font-semibold max-w-3xl mx-auto text-balance">
                        Clean, intuitive, and designed for focused learning
                    </p>
                </div>

                {/* Mockup */}
                <div className={`${styles.mockupContainer} max-w-6xl mx-auto`}>
                    <Card className="p-8 md:p-12 border-4 border-purple-300 shadow-2xl shadow-purple-500/30 bg-gradient-to-br from-white via-purple-50/50 to-pink-50/50">
                        {/* Mock Exam Header */}
                        <div className="flex items-center justify-between mb-10 pb-8 border-b-4 border-purple-300">
                            <div>
                                <h3 className="text-3xl font-black text-gray-900 mb-2">Physics - Chapter 5</h3>
                                <p className="text-gray-600 text-lg font-semibold">Question 15 of 50</p>
                            </div>
                            <div className={`${styles.timerBadge} flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-200 to-pink-200 border-4 border-purple-400`}>
                                <Clock className="w-6 h-6 text-purple-700" />
                                <span className="font-black text-2xl text-purple-700">12:45</span>
                            </div>
                        </div>

                        {/* Mock Question */}
                        <div className="mb-10">
                            <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-relaxed">
                                What is the SI unit of electric current?
                            </p>

                            {/* Mock Options */}
                            <div className="space-y-4">
                                {[
                                    { label: "A", text: "Volt", correct: false },
                                    { label: "B", text: "Ampere", correct: true },
                                    { label: "C", text: "Ohm", correct: false },
                                    { label: "D", text: "Watt", correct: false },
                                ].map((option, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.optionButton} w-full text-left p-6 rounded-2xl border-4 ${option.correct
                                            ? "border-green-500 bg-gradient-to-r from-green-100 to-green-200 shadow-xl shadow-green-500/40"
                                            : "border-purple-300 hover:border-purple-500 bg-white hover:shadow-xl hover:shadow-purple-500/30"
                                            }`}
                                        style={{
                                            animation: `optionSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s backwards`,
                                        }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl transition-all duration-300 ${option.correct
                                                    ? "bg-green-500 text-white shadow-lg shadow-green-500/60"
                                                    : "bg-gradient-to-br from-purple-200 to-pink-200 text-purple-700"
                                                    }`}
                                            >
                                                {option.label}
                                            </div>
                                            <span className="text-gray-900 text-xl font-semibold">{option.text}</span>
                                            {option.correct && (
                                                <CheckCircle2 className={`${styles.checkIcon} w-7 h-7 text-green-600 ml-auto`} />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mock Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t-4 border-purple-300">
                            {[
                                { value: "32", label: "Correct", color: "from-green-600 to-green-400", delay: "0s" },
                                { value: "8", label: "Wrong", color: "from-red-600 to-red-400", delay: "0.15s" },
                                { value: "10", label: "Skipped", color: "from-purple-600 to-pink-500", delay: "0.3s" },
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="text-center p-6 rounded-2xl bg-white border-4 border-purple-200 hover:border-purple-400 hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer"
                                    style={{
                                        animation: `statPop 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${stat.delay} backwards`,
                                    }}
                                >
                                    <div
                                        className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                                    >
                                        {stat.value}
                                    </div>
                                    <div className="text-base font-bold text-gray-700">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}
