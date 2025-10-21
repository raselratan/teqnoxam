import { useForm, usePage } from "@inertiajs/react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileQuestionMark, ChartBarStacked, Trash, FileText } from "lucide-react"
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

export default function CreateQuestionPage() {
    const { data, setData, post, processing, errors, reset } = useForm({
        question: "",
        options: [
            { option_text: "", is_correct: false },
            { option_text: "", is_correct: false },
            { option_text: "", is_correct: false },
            { option_text: "", is_correct: false },
        ],
        description: "",
        category_id: [],
    })
    const [size, setSize] = useState('large');
    const { flash, categories } = usePage().props
    const options = categories.map(cat => ({
        value: cat.id,
        label: cat.title
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
        console.log(data)
        // post(route("admin.categories.store"), {
        //     onSuccess: () => reset(),
        // })
    }
    const addOption = () => {
        setData("options", [...data.options, { option_text: "", is_correct: false }]);
    };

    const updateOption = (index, field, value) => {
        const updated = [...data.options];
        updated[index][field] = value;
        setData("options", updated);
    };

    const removeOption = (index) => {
        const updated = data.options.filter((_, i) => i !== index);
        setData("options", updated);
    };

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
                                <BreadcrumbLink href={route('admin.question.create')}>Question</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={route('admin.question.create')}>Create</BreadcrumbLink>
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
                                    <Label htmlFor="question" className="text-gray-700 font-medium">
                                        Question
                                    </Label>
                                    <div className="relative">
                                        <FileQuestionMark className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            id="question"
                                            type="text"
                                            placeholder="Enter question"
                                            value={data.question}
                                            onChange={(e) => setData("question", e.target.value)}
                                            className="pl-10 h-12 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                        />
                                    </div>
                                    {errors.title && <p className="text-sm text-red-500">{errors.question}</p>}
                                </div>


                                {/* Options */}
                                <div className="space-y-2">
                                    <Label className="text-gray-700 font-medium">Options</Label>
                                    {data.options.map((opt, index) => (
                                        <div key={index} className="flex items-center gap-2 border border-gray-200 rounded-md p-2">
                                            <Input
                                                type="text"
                                                placeholder={`Option ${index + 1}`}
                                                value={opt.option_text}
                                                onChange={(e) => updateOption(index, "option_text", e.target.value)}
                                                className="flex-1 border-0 shadow-none focus-visible:ring-0"
                                            />
                                            <label className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={opt.is_correct}
                                                    onChange={(e) => updateOption(index, "is_correct", e.target.checked)}
                                                />
                                                Correct
                                            </label>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => removeOption(index)}
                                                className="h-8 px-2 cursor-pointer border-1 border-red-500 rounded-sm"
                                            >
                                                <Trash color="red" />
                                            </Button>
                                        </div>
                                    ))}

                                    <Button
                                        type="button"
                                        onClick={addOption}
                                        variant="secondary"
                                        className="w-full mt-2 cursor-pointer"
                                    >
                                        + Add Option
                                    </Button>

                                    {errors.options && <p className="text-sm text-red-500">{errors.options}</p>}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-gray-700 font-medium">
                                        Description
                                    </Label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <Textarea
                                            id="description"
                                            placeholder="Write question description or details here..."
                                            value={data.description}
                                            onChange={e => setData("description", e.target.value)}
                                            className="pl-10 min-h-[100px] border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                        />
                                    </div>
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>


                                {/* Category */}
                                <div className="space-y-2">
                                    <Label htmlFor="category_id" className="text-gray-700 font-medium">
                                        Categories
                                    </Label>
                                    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-2 py-[2px]">
                                        <ChartBarStacked className="w-5 h-5 text-gray-400" />
                                        <div className="flex-1">
                                            <Select
                                                mode="multiple"
                                                variant="borderless"
                                                size={size}
                                                value={data.category_id}
                                                onChange={(value) => setData("category_id", value)}
                                                options={options}
                                                allowClear
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                    {errors.category_id && <p className="text-sm text-red-500">{errors.category_id}</p>}
                                </div>

                                <CardFooter className="flex justify-end pt-4">
                                    <Button type="submit" disabled={processing} className="w-full cursor-pointer">
                                        {processing ? "Creating..." : "Create Question"}
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
