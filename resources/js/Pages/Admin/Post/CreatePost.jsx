import { useForm, usePage } from "@inertiajs/react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Captions } from "lucide-react"
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

export default function CreatePost() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title_in_english: "",
        title_in_bangla: ""
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
        post(route("admin.categories.store"), {
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
                                <BreadcrumbLink href={route('admin.categories')}>Posts</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={route('admin.categories.create')}>Create</BreadcrumbLink>
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
                                {/* English Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-gray-700 font-medium">
                                        Post Title (in english)
                                    </Label>
                                    <div className="relative">
                                        <Captions className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            id="title"
                                            type="text"
                                            placeholder="Title ( in english)"
                                            value={data.title_in_english}
                                            onChange={(e) => setData("title_in_english", e.target.value)}
                                            className="pl-10 h-12 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                        />
                                    </div>
                                    {errors.title_in_english && <p className="text-sm text-red-500">{errors.title_in_english}</p>}
                                </div>

                                {/* Bangla Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title_in_bangla" className="text-gray-700 font-medium">
                                        Post Title (in bangla)
                                    </Label>
                                    <div className="relative">
                                        <Captions className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            id="title_in_bangla"
                                            type="text"
                                            placeholder="Title ( in bangla)"
                                            value={data.title_in_bangla}
                                            onChange={(e) => setData("title_in_bangla", e.target.value)}
                                            className="pl-10 h-12 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                        />
                                    </div>
                                    {errors.title_in_bangla && <p className="text-sm text-red-500">{errors.title_in_bangla}</p>}
                                </div>
                                <CardFooter className="flex justify-end pt-4">
                                    <Button type="submit" disabled={processing} className="w-full cursor-pointer">
                                        {processing ? "Creating..." : "Create Post"}
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
