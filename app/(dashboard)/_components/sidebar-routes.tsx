"use client";

import { Layout, Compass, List, BarChart, Users, Shield } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";
import { SafeProfile } from "@/types";

const studentRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        icon: Compass,
        label: "Browse Courses",
        href: "/search",
    }
]

const teacherRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        icon: List,
        label: "My Courses",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    }
]

const adminRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        icon: Shield,
        label: "User Management",
        href: "/teacher/users",
    },
    {
        icon: List,
        label: "All Courses",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    }
]

interface SidebarRoutesProps {
    currentProfile?: SafeProfile | null;
}

export const SidebarRoutes: React.FC<SidebarRoutesProps> = ({ currentProfile }) => {
    const pathname = usePathname();
    
    // Determine routes based on user role
    let routes = studentRoutes;
    
    if (currentProfile?.role === "ADMIN") {
        routes = adminRoutes;
    } else if (currentProfile?.role === "TEACHER") {
        routes = teacherRoutes;
    }

    return (
        <div className="flex flex-col w-full">
            {routes.map((route, index) => (
                <SidebarItem 
                    key={index}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}            
        </div>
    )
}