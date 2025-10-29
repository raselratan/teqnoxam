import React, { useState } from "react"
import DataTable from "@/components/DataTable/DataTable"
import { router, usePage } from "@inertiajs/react"
import { Trash, SquarePen } from 'lucide-react';
import { route } from "ziggy-js"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Table } from 'antd';

const columns = [
    {
        title: "SL",
        key: "index",
        render: (text, record, index) => index + 1, // starts from 1
    },
    {
        title: 'Question',
        render: (_, record) => <QuestionView questionData={record} />,
        sortDirections: ['descend'],
    },
    {
        title: 'Added by',
        dataIndex: 'added_by',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    },
];

const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
};

const QuestionView = ({ questionData }) => {


    return (
        <>
            <p className="mb-2">
                {questionData?.question}
            </p>
            <ul className="flex flex-wrap gap-2 list-inside list-[upper-alpha]">
                {questionData?.options?.map((opt) => (
                    <li
                        key={opt.id}
                        className={`border rounded-lg px-4 py-2 ${opt?.is_correct
                            ? "bg-green-50 border-green-400"
                            : "bg-white border-gray-200"
                            }`}
                    >
                        {opt?.option_text}
                    </li>
                ))}
            </ul>

            <Explanation text={questionData?.explanation?.explanation_text} />

        </ >
    );
}

const Explanation = ({ text = "" }) => {
    const [expanded, setExpanded] = useState(false);

    const isLong = text.length > 100;
    const displayText = expanded ? text : text.slice(0, 100);

    return (
        <p className="mt-2 text-gray-700 leading-relaxed max-w-[50vw]">
            {displayText}
            {isLong && !expanded && "..."}
            {isLong && (
                <button
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    className="ml-2 text-blue-600 font-medium hover:underline focus:outline-none cursor-pointer"
                >
                    {expanded ? "Read less" : "Read more"}
                </button>
            )}
        </p>
    );
}

export default function Questions() {
    const { props } = usePage();
    const { questions, pagination, filters = {} } = props?.questions;
    console.log(questions)
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
                                <BreadcrumbLink href={route('admin.question')}>Questions</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            <div className="container mx-auto p-4">
                <Table
                    rowKey={'id'}
                    columns={columns}
                    dataSource={questions}
                    onChange={onChange}
                    showSorterTooltip={{ target: 'sorter-icon' }}
                    scroll={{ x: 'max-content' }}
                />
            </div>
        </div>
    )
}