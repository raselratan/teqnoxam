// resources/js/Data/menu-items.jsx

import {
    Home,
    BarChart3,
    Users,
    Package,
    FileText,
    Settings,
    CornerDownRight,
    BookOpenCheck,
    ChartBarStacked,
    Landmark,
    Milestone,
    Timer,
    NotebookPen,
}
    from "lucide-react"
import { route } from "ziggy-js"

export const adminMenuItems = [
    { icon: Home, label: "Dashboard", href: route('admin.dashboard') },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    {
        icon: NotebookPen,
        label: "Courses",
        href: "/courses",
        children: [
            { icon: CornerDownRight, label: "All Courses", href: route('admin.courses') },
            { icon: CornerDownRight, label: "Add Course", href: route('admin.courses.create') },
        ],
    },
    {
        icon: BookOpenCheck,
        label: "Questions",
        href: "/products",
        children: [
            { icon: CornerDownRight, label: "All Questions", href: "/products" },
            { icon: CornerDownRight, label: "Add Question", href: route('admin.question.create') },
        ],
    },
    {
        icon: ChartBarStacked,
        label: "Categories",
        href: "/categories",
        children: [
            { icon: CornerDownRight, label: "All Categories", href: route('admin.categories') },
            { icon: CornerDownRight, label: "Add Category", href: route('admin.categories.create') },
        ],
    },
    {
        icon: Timer,
        label: "Exam Years",
        href: "/examyears",
        children: [
            { icon: CornerDownRight, label: "All Exam Years", href: route('admin.exam_years') },
            { icon: CornerDownRight, label: "Add Exam Year", href: route('admin.exam_years.create') },
        ],
    },
    {
        icon: Landmark,
        label: "Institutions",
        href: "/categories",
        children: [
            { icon: CornerDownRight, label: "All Institutions", href: route('admin.institutes') },
            { icon: CornerDownRight, label: "Add Institution", href: route('admin.institute.create') },
        ],
    },
    {
        icon: Milestone,
        label: "Posts",
        href: "/categories",
        children: [
            { icon: CornerDownRight, label: "All Posts", href: route('admin.posts') },
            { icon: CornerDownRight, label: "Add Post", href: route('admin.post.create') },
        ],
    },
    {
        icon: Users,
        label: "Users",
        href: "/users",
        children: [
            { icon: CornerDownRight, label: "All Users", href: route('admin.users') },
            { icon: CornerDownRight, label: "Add User", href: route('admin.users.create') },
        ],
    },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
];
