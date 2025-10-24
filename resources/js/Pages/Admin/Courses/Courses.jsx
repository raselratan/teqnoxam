import React from "react"
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

// import { Breadcrumb } from 'antd';

export default function Courses() {
    const { props } = usePage();
    const { courses, pagination, filters = {} } = props;
    const handleDelete = (id) => {
        console.log('Delete', id)
    }

    const handleEdit = (id) => {
        console.log('Edit', id)
    }

    const columns = [
        {
            header: "SL.",
            accessorKey: "sl",
            cell: ({ row }) => {
                const currentPage = pagination?.current_page || 1;
                const perPage = pagination?.per_page || 10;
                const rowIndex = row.index;
                return (currentPage - 1) * perPage + (rowIndex + 1);
            },
        },
        {
            header: "Title",
            accessorKey: "title",
            cell: (info) => info.getValue(),
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: ({ row }) => <span className="capitalize">{row.original?.status}</span>,
        },
        {
            header: "price",
            accessorKey: "price",
            cell: (info) => info.getValue(),
        },
        {
            header: "Creator Name",
            accessorKey: "creator_name",
            cell: ({ row }) => row.original?.creator?.name,
        },
        {
            header: () => <div className="text-center">Actions</div>,
            id: "actions",
            cell: ({ row }) => {
                const course = row.original; // the raw user data for this row

                return (
                    <div className="flex justify-center items-center gap-2">
                        <button
                            className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 cursor-pointer"
                            onClick={() => handleEdit(course.id)}
                        >
                            <SquarePen />
                        </button>
                        <button
                            className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 cursor-pointer"
                            onClick={() => handleDelete(course.id)}
                        >
                            <Trash />
                        </button>
                    </div>
                );
            },
        },

    ]

    const handleSortingChange = (column) => {
        let newDirection;
        // If clicking the same column that's currently sorted
        if (filters.sort_by === column) {
            // Toggle: asc -> desc -> asc
            newDirection = filters.sort_direction === 'asc' ? 'desc' : 'asc';
        } else {
            // New column, always start with ascending
            newDirection = 'desc';
        }

        router.get(route('admin.courses'), {
            page: 1, // Reset to first page when sorting
            per_page: pagination?.per_page || 10,
            sort_by: column,
            sort_direction: newDirection,
            search: filters.search || '',
        }, {
            preserveState: true,
            replace: true,
        });
    }

    const handlePaginationChange = (pageIndex, pageSize) => {
        router.get(route('admin.courses'), {
            page: pageIndex + 1,
            per_page: pageSize,
            sort_by: filters.sort_by || 'id',
            sort_direction: filters.sort_direction || 'desc',
            search: filters.search || '',
        }, {
            preserveState: true,
            replace: true
        });
    }

    const handleGlobalFilterChange = (search) => {
        router.get(route('admin.courses'), {
            page: 1,
            per_page: pagination?.per_page || 10,
            sort_by: filters.sort_by || 'id',
            sort_direction: filters.sort_direction || 'desc',
            search: search,
        }, {
            preserveState: true,
            replace: true
        });
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
                                <BreadcrumbLink href={route('admin.courses')}>Courses</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            <div className="container mx-auto p-4">
                <DataTable
                    columns={columns}
                    data={courses}
                    total={pagination?.total || 0}
                    pageIndex={pagination ? pagination.current_page - 1 : 0}
                    pageSize={pagination?.per_page || 10}
                    onPaginationChange={handlePaginationChange}
                    onSortingChange={handleSortingChange}
                    onGlobalFilterChange={handleGlobalFilterChange}
                    sortingState={{
                        column: filters.sort_by || 'id',
                        direction: filters.sort_direction || 'asc'
                    }}
                    globalFilter={filters.search || ''}
                />
            </div>
        </div>
    )
}