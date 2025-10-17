import { useForm, usePage } from "@inertiajs/react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Phone } from "lucide-react"
import { useEffect } from "react"
import alert from "@/components/ui/sweet-alert"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { route } from "ziggy-js"

export default function CreateUser() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        mobile: "",
    })

    const { flash } = usePage().props

    useEffect(() => {
        if (flash?.success) {
            alert({
                icon: "success",
                title: flash.success,
            })
        }
        if (flash?.error) {
            alert({
                icon: "error",
                title: flash.error,
            })
        }
    }, [flash])

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route("admin.users.store"), {
            onSuccess: () => reset(),
        })
    }

    return (
        <div>
            <div className="border-b-1 w-full h-12">
                <div className="w-full h-full px-4 flex justify-start items-center">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={route('admin.dashboard')}>Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={route('admin.users')}>Users</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={route('admin.users.create')}>Create</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <div className="container mx-auto p-4">
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
                                        />
                                    </div>
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="mobile" className="text-gray-700 font-medium">
                                        Mobile
                                    </Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            id="mobile"
                                            type="text"
                                            placeholder="880XXXXXXXXX"
                                            value={data.mobile}
                                            onChange={(e) => setData("mobile", e.target.value)}
                                            className="pl-10 h-12 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                        />
                                    </div>
                                    {errors.mobile && <p className="text-sm text-red-500">{errors.mobile}</p>}
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
            </div>
        </div>
    )
}
