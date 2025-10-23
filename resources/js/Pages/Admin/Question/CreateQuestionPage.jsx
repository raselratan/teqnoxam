import { useForm, usePage } from "@inertiajs/react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileQuestionMark, ChartBarStacked, Trash, FileText, MessageSquare } from "lucide-react"
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
        explanation_text: "",
        category_ids: [],
        exam_year_ids: [],
    })
    const [size, setSize] = useState('large');
    const { flash, categories, exam_years } = usePage().props

    const categoriesOptions = categories.map(cat => ({
        value: cat.id,
        label: cat.title
    }));

    const examYearOptions = exam_years.map(year => ({
        value: year.id,
        label: year.combined_title_bangla ?? year.combined_title_english
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
        post(route("admin.question.store"), {
            onSuccess: () => reset(),
        })
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
                                {/* Question */}
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
                                    {errors.question && <p className="text-sm text-red-500">{errors.question}</p>}
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

                                {/* Explanation */}
                                <div className="space-y-2">
                                    <Label htmlFor="explanation_text" className="text-gray-700 font-medium">
                                        Explanation
                                    </Label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <Textarea
                                            id="explanation_text"
                                            placeholder="Write explanation"
                                            value={data.explanation_text}
                                            onChange={(e) => setData("explanation_text", e.target.value)}
                                            className="pl-10 h-24 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 resize-none"
                                        />
                                    </div>
                                    {errors.explanation_text && (
                                        <p className="text-sm text-red-500">{errors.explanation_text}</p>
                                    )}
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <Label htmlFor="category_ids" className="text-gray-700 font-medium">
                                        Categories
                                    </Label>
                                    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-2 py-[2px]">
                                        <ChartBarStacked className="w-5 h-5 text-gray-400" />
                                        <div className="flex-1">
                                            <Select
                                                mode="multiple"
                                                variant="borderless"
                                                size={size}
                                                value={data.category_ids}
                                                onChange={(value) => setData("category_ids", value)}
                                                options={categoriesOptions}
                                                allowClear
                                                showSearch     // ✅ correct prop
                                                className="w-full"
                                                filterOption={(input, option) =>
                                                    option.label.toLowerCase().includes(input.toLowerCase())
                                                }
                                            />
                                        </div>
                                    </div>
                                    {errors.category_ids && <p className="text-sm text-red-500">{errors.category_ids}</p>}
                                </div>

                                {/* Exam Years */}
                                <div className="space-y-2">
                                    <Label htmlFor="exam_year_ids" className="text-gray-700 font-medium">
                                        Exam Years
                                    </Label>
                                    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-2 py-[2px]">
                                        <ChartBarStacked className="w-5 h-5 text-gray-400" />
                                        <div className="flex-1">
                                            <Select
                                                mode="multiple"
                                                variant="borderless"
                                                size={size}
                                                value={data.exam_year_ids}
                                                onChange={(value) => setData("exam_year_ids", value)}
                                                options={examYearOptions}
                                                allowClear
                                                showSearch     // ✅ correct prop
                                                className="w-full"
                                                filterOption={(input, option) =>
                                                    option.label.toLowerCase().includes(input.toLowerCase())
                                                }
                                            />
                                        </div>
                                    </div>
                                    {errors.exam_year_ids && <p className="text-sm text-red-500">{errors.exam_year_ids}</p>}
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
