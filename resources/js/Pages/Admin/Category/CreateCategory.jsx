import { useForm, usePage } from "@inertiajs/react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, ChartBarStacked } from "lucide-react"
import { useEffect, useState } from "react"
import alert from "@/components/ui/sweet-alert"
import { Select } from 'antd';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { route } from "ziggy-js"

export default function CreateCategory() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        parent_id: ""
    })
    const [size, setSize] = useState('large');
    const { flash, categories } = usePage().props
    const options = categories.map(cat => ({
        value: cat.id,
        label: <span className="ml-6">{cat.title}</span>
    }));

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
                                <BreadcrumbLink href={route('admin.categories')}>Categories</BreadcrumbLink>
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
                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-gray-700 font-medium">
                                        Category Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            id="title"
                                            type="text"
                                            placeholder="Bangla"
                                            value={data.title}
                                            onChange={(e) => setData("title", e.target.value)}
                                            className="pl-10 h-12 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                        />
                                    </div>
                                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <Label htmlFor="parent" className="text-gray-700 font-medium">
                                        Parent Category
                                    </Label>
                                    <div className="relative">
                                        <Select
                                            prefix={<ChartBarStacked className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />}
                                            size={size}
                                            onChange={(value) => setData("parent_id", value)}
                                            options={options}
                                            className="w-full"
                                            allowClear
                                        />
                                    </div>
                                    {errors.parent_id && <p className="text-sm text-red-500">{errors.parent_id}</p>}
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
