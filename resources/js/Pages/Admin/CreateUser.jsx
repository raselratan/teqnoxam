import { useForm } from "@inertiajs/react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Phone } from "lucide-react" // ✅ import icons

export default function CreateUser() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        phone: "",
        password: "",
        password_confirmation: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route("users.store"), {
            onSuccess: () => reset(),
        })
    }

    return (
        <div className="w-full h-full flex justify-center items-center p-4">
            <Card className="w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl shadow-lg h-auto">
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-700 font-medium">
                                Full Name
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="pl-10 h-12 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                    required
                                />
                            </div>
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-gray-700 font-medium">
                                Phone
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="phone"
                                    type="text"
                                    placeholder="880XXXXXXXXX"
                                    value={data.phone}
                                    onChange={(e) => setData("phone", e.target.value)}
                                    className="pl-10 h-12 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                    required
                                />
                            </div>
                            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                        </div>

                        <CardFooter className="flex justify-end pt-4">
                            <Button type="submit" disabled={processing} className="w-full cursor-pointer">
                                {processing ? "Creating..." : "Create User"}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
