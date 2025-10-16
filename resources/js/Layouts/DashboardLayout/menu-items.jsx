// resources/js/Data/menu-items.jsx

import { Home, BarChart3, Users, Package, FileText, Settings, CornerDownRight, BookOpenCheck } from "lucide-react"
import { route } from "ziggy-js"

export const adminMenuItems = [
    { icon: Home, label: "Dashboard", href: route('admin.dashboard') },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    {
        icon: Users,
        label: "Users",
        href: "/users",
        children: [
            { icon: CornerDownRight, label: "All Users", href: route('admin.users') },
            { icon: CornerDownRight, label: "Add User", href: route('admin.users.create') },
        ],
    },
    {
        icon: BookOpenCheck,
        label: "Questions",
        href: "/products",
        children: [
            { icon: CornerDownRight, label: "All Questions", href: "/products" },
            { icon: CornerDownRight, label: "Add Question", href: "/products/add" },
        ],
    },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
];

export const userMenuItems = [
    { icon: Home, label: "Dashboard", href: route('admin.dashboard') },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    {
        icon: Users,
        label: "Users",
        href: "/users",
        children: [
            { icon: CornerDownRight, label: "All Users", href: route('admin.users') },
            { icon: CornerDownRight, label: "Add User", href: route('admin.users') },
            { icon: CornerDownRight, label: "User Roles", href: route('admin.users') },
        ],
    },
    {
        icon: Package,
        label: "Products",
        href: "/products",
        children: [
            { icon: CornerDownRight, label: "All Products", href: "/products" },
            { icon: CornerDownRight, label: "Add Product", href: "/products/add" },
            { icon: CornerDownRight, label: "Categories", href: "/products/categories" },
        ],
    },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
]
