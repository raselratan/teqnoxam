import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Phone, Lock, Eye, EyeOff } from "lucide-react"
import { Link } from "@inertiajs/react"
import { route } from 'ziggy-js'
import { useState } from "react"

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)

    const { data, setData, post, processing, errors } = useForm({
        mobile: "",
        password: "",
        remember: false,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('auth.signin'))
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
            {/* Background Floating Effects */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />

            {/* Back Button */}
            <Link
                href={route('landing')}
                className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
            </Link>

            {/* Card */}
            <Card className="w-full max-w-md border-0 shadow-lg bg-white/90 backdrop-blur-md rounded-xl">
                <CardHeader className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-500 flex items-center justify-center mb-2 shadow-md">
                        <span className="text-white font-bold text-2xl">E</span>
                    </div>
                    <CardTitle className="text-3xl font-bold text-gray-800">Welcome Back</CardTitle>
                    <CardDescription className="text-gray-600">
                        Login to continue your learning journey
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Mobile Number */}
                        <div className="space-y-2">
                            <Label htmlFor="mobile" className="text-gray-700 font-medium">
                                Mobile Number
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="mobile"
                                    type="text"
                                    placeholder="880XXXXXXXXX"
                                    value={data.mobile}
                                    onChange={(e) => setData('mobile', e.target.value)}
                                    className="pl-10 h-12 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                    required
                                />
                            </div>
                            {errors.mobile && <div className="text-sm text-red-500">{errors.mobile}</div>}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700 font-medium">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="pl-10 pr-10 h-12 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <div className="text-sm text-red-500">{errors.password}</div>}
                        </div>

                        {/* Remember Me + Forgot */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="remember"
                                    checked={data.remember}
                                    onCheckedChange={(checked) => setData('remember', checked)}
                                    className="border-gray-400 checked:bg-purple-500"
                                />
                                <Label htmlFor="remember" className="text-gray-700 text-sm cursor-pointer">
                                    Remember me
                                </Label>
                            </div>
                            <a href="#" className="text-purple-500 text-sm hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full h-12 cursor-pointer bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform duration-300"
                        >
                            {processing ? "Logging in..." : "Login"}
                        </Button>

                        {/* Register */}
                        <p className="text-center text-gray-600 text-sm">
                            Don't have an account?{" "}
                            <Link href={route('auth.register')} className="text-purple-500 hover:underline font-medium cursor-pointer">
                                Register here
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>

            {/* Floating animation */}
            <style jsx>{`
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
        </div>
    )
}

LoginPage.layout = null
export default LoginPage
