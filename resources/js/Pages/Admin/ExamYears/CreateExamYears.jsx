import { useForm, usePage } from "@inertiajs/react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChartBarStacked, MessageSquare } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"

export default function CreateExamYears() {
    const { data, setData, post, processing, errors, reset } = useForm({
        year: "",
        institute_id: "",
        post_id: "",
        comments: "",
    })
    const [size, setSize] = useState('large');
    const { flash, institutes, posts } = usePage().props

    const instituteOptions = institutes.map(institute => ({
        value: institute.id,
        label: institute.title
    }));

    const postOptions = posts.map(post => ({
        value: post.id,
        label: post.title
    }));

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 31 }, (_, i) => {
        const year = currentYear - i;
        return { label: year, value: year };
    });

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
        post(route("admin.exam_years.store"), {
            onSuccess: () => reset(),
        })
    }

    return (
        <div>
            <div className="border-b-1 w-full h-12 sticky top-[64px] bg-white z-50">
                <div className="w-full h-full px-4 flex justify-start items-center">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={route('admin.dashboard')}>Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={route('admin.exam_years')}>Exam Years</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={route('admin.exam_years.create')}>Create</BreadcrumbLink>
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
                                {/* Years */}
                                <div className="space-y-2">
                                    <Label htmlFor="year" className="text-gray-700 font-medium">
                                        Select Year
                                    </Label>
                                    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-2 py-[2px]">
                                        <ChartBarStacked className="w-5 h-5 text-gray-400" />
                                        <div className="flex-1">
                                            <Select
                                                variant="borderless"
                                                size={size}
                                                value={data.year}
                                                onChange={(value) => setData("year", value)}
                                                options={years}
                                                allowClear
                                                showSearch  // ✅ correct prop
                                                className="w-full"
                                                filterOption={(input, option) =>
                                                    option.label.toString().toLowerCase().includes(input.toLowerCase())
                                                }
                                            />
                                        </div>
                                    </div>
                                    {errors.parent_id && <p className="text-sm text-red-500">{errors.parent_id}</p>}
                                </div>

                                {/* Institute */}
                                <div className="space-y-2">
                                    <Label htmlFor="institute_id" className="text-gray-700 font-medium">
                                        Select Institute
                                    </Label>
                                    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-2 py-[2px]">
                                        <ChartBarStacked className="w-5 h-5 text-gray-400" />
                                        <div className="flex-1">
                                            <Select
                                                variant="borderless"
                                                size={size}
                                                value={data.institute_id}
                                                onChange={(value) => setData("institute_id", value)}
                                                options={instituteOptions}
                                                allowClear
                                                showSearch  // ✅ correct prop
                                                className="w-full"
                                                filterOption={(input, option) =>
                                                    option.label.toString().toLowerCase().includes(input.toLowerCase())
                                                }
                                            />
                                        </div>
                                    </div>
                                    {errors.parent_id && <p className="text-sm text-red-500">{errors.parent_id}</p>}
                                </div>

                                {/* Post */}
                                <div className="space-y-2">
                                    <Label htmlFor="post_id" className="text-gray-700 font-medium">
                                        Select Post
                                    </Label>
                                    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-2 py-[2px]">
                                        <ChartBarStacked className="w-5 h-5 text-gray-400" />
                                        <div className="flex-1">
                                            <Select
                                                variant="borderless"
                                                size={size}
                                                value={data.post_id}
                                                onChange={(value) => setData("post_id", value)}
                                                options={postOptions}
                                                allowClear
                                                showSearch  // ✅ correct prop
                                                className="w-full"
                                                filterOption={(input, option) =>
                                                    option.label.toString().toLowerCase().includes(input.toLowerCase())
                                                }
                                            />
                                        </div>
                                    </div>
                                    {errors.parent_id && <p className="text-sm text-red-500">{errors.parent_id}</p>}
                                </div>

                                {/* Comments */}
                                <div className="space-y-2">
                                    <Label htmlFor="comment" className="text-gray-700 font-medium">
                                        Comment
                                    </Label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <Textarea
                                            id="comment"
                                            placeholder="Write your comment..."
                                            value={data.comments}
                                            onChange={(e) => setData("comments", e.target.value)}
                                            className="pl-10 h-24 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 resize-none"
                                        />
                                    </div>
                                    {errors.comment && (
                                        <p className="text-sm text-red-500">{errors.comment}</p>
                                    )}
                                </div>

                                <CardFooter className="flex justify-end pt-4">
                                    <Button type="submit" disabled={processing} className="w-full cursor-pointer">
                                        {processing ? "Creating..." : "Create Exam Years"}
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
