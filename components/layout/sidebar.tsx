'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUIStore, useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    School,
    LayoutDashboard,
    Building2,
    Users,
    GraduationCap,
    ClipboardList,
    ChevronLeft,
    LogOut,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/lib/types';
import { RoutePermissions } from '@/lib/permissions';
import { hasAnyPermission } from '@/lib/role-permissions';

// Define navigation structure with permissions
const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    {
        name: 'Structure',
        icon: Building2,
        children: [
            { name: 'Tenants', href: '/tenants' },
            { name: 'Organizations', href: '/organizations' },
            { name: 'Branches', href: '/branches' },
            { name: 'Departments', href: '/departments' },
            { name: 'Categories', href: '/categories' },
        ],
    },
    {
        name: 'People',
        icon: Users,
        children: [
            { name: 'Users', href: '/users' },
            { name: 'Staff', href: '/staff' },
            { name: 'Students', href: '/students' },
        ],
    },
    {
        name: 'Academics',
        icon: GraduationCap,
        children: [
            { name: 'Academic Years', href: '/academic-years' },
            { name: 'Courses', href: '/courses' },
            { name: 'Subjects', href: '/subjects' },
            { name: 'Classes', href: '/classes' },
        ],
    },
    {
        name: 'Operations',
        icon: ClipboardList,
        children: [
            { name: 'Timetable', href: '/timetable' },
            { name: 'Attendance', href: '/attendance' },
            { name: 'Exams', href: '/exams' },
            { name: 'Inventory', href: '/inventory' },
        ],
    },
];

/**
 * Check if user has access to a route based on their role permissions
 */
function checkRouteAccess(role: UserRole, route: string): boolean {
    const requiredPermissions = RoutePermissions[route];

    // If no permissions required, allow access
    if (!requiredPermissions || requiredPermissions.length === 0) {
        return true;
    }

    // Check if user has any of the required permissions
    return hasAnyPermission(role, requiredPermissions);
}

/**
 * Filter navigation based on user role and permissions
 */
function getNavigationForRole(role: UserRole) {
    return navigation
        .map((item) => {
            // If item has direct href, check access
            if (item.href) {
                return checkRouteAccess(role, item.href) ? item : null;
            }

            // If item has children, filter children
            if (item.children) {
                const filteredChildren = item.children.filter((child) =>
                    checkRouteAccess(role, child.href)
                );

                // Only include parent if it has visible children
                if (filteredChildren.length > 0) {
                    return { ...item, children: filteredChildren };
                }
            }

            return null;
        })
        .filter((item) => item !== null);
}

export function Sidebar({ isMobile = false }: { isMobile?: boolean }) {
    const pathname = usePathname();
    const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
    const toggleSidebar = useUIStore((state) => state.toggleSidebar);
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);
    const router = useRouter();
    const [openPopover, setOpenPopover] = React.useState<string | null>(null);
    const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Get filtered navigation based on user role
    const filteredNavigation = user ? getNavigationForRole(user.role) : [];

    // Helper function to close popover with delay
    const scheduleClose = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setOpenPopover(null);
        }, 200); // 200ms delay allows smooth transition
    };

    // Helper function to cancel scheduled close
    const cancelClose = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <div
            className={cn(
                'flex flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300',
                !isMobile && 'hidden md:flex',
                isMobile ? 'w-64' : (sidebarCollapsed ? 'w-16' : 'w-64')
            )}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
                {(!sidebarCollapsed || isMobile) && (
                    <div className="flex items-center space-x-2">
                        <School className="h-8 w-8 text-fuchsia-600 dark:text-fuchsia-400" />
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            SchoolMS
                        </span>
                    </div>
                )}
                {sidebarCollapsed && !isMobile && (
                    <School className="h-8 w-8 text-fuchsia-600 dark:text-fuchsia-400" />
                )}
                {!isMobile && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className="h-8 w-8"
                    >
                        <ChevronLeft
                            className={cn(
                                'h-4 w-4 transition-transform',
                                sidebarCollapsed && 'rotate-180'
                            )}
                        />
                    </Button>
                )}
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full px-3 py-4">
                    <nav className="space-y-1">
                        {filteredNavigation.map((item) => (
                            <div key={item.name}>
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                                            pathname === item.href
                                                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'
                                                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                        )}
                                    >
                                        <item.icon className="h-5 w-5 flex-shrink-0" />
                                        {(!sidebarCollapsed || isMobile) && <span className="ml-3">{item.name}</span>}
                                    </Link>
                                ) : (
                                    <>
                                        {(!sidebarCollapsed || isMobile) && (
                                            <>
                                                <div className="flex items-center px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-4">
                                                    <item.icon className="h-4 w-4 mr-2" />
                                                    {item.name}
                                                </div>
                                                {item.children?.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        className={cn(
                                                            'block pl-11 pr-3 py-2 text-sm font-medium rounded-md transition-colors',
                                                            pathname === child.href
                                                                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'
                                                                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                                        )}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </>
                                        )}
                                        {sidebarCollapsed && !isMobile && item.children && (
                                            <Popover open={openPopover === item.name} onOpenChange={(open) => !open && setOpenPopover(null)}>
                                                <PopoverTrigger asChild>
                                                    <button
                                                        className="w-full flex items-center justify-center py-2 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                        onMouseEnter={() => {
                                                            cancelClose();
                                                            setOpenPopover(item.name);
                                                        }}
                                                        onMouseLeave={scheduleClose}
                                                    >
                                                        <item.icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    side="right"
                                                    align="start"
                                                    className="w-56 p-2"
                                                    sideOffset={8}
                                                    onMouseEnter={() => {
                                                        cancelClose();
                                                        setOpenPopover(item.name);
                                                    }}
                                                    onMouseLeave={scheduleClose}
                                                >
                                                    <div className="space-y-1">
                                                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                            {item.name}
                                                        </div>
                                                        {item.children.map((child) => (
                                                            <Link
                                                                key={child.name}
                                                                href={child.href}
                                                                onClick={() => {
                                                                    cancelClose();
                                                                    setOpenPopover(null);
                                                                }}
                                                                className={cn(
                                                                    'block px-3 py-2 text-sm font-medium rounded-md transition-colors',
                                                                    pathname === child.href
                                                                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'
                                                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                                                )}
                                                            >
                                                                {child.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </nav>
                </ScrollArea>
            </div>

            {/* User Section */}
            <div className="border-t border-gray-200 dark:border-gray-800 p-4">
                {(!sidebarCollapsed || isMobile) && (
                    <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {user?.email}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user?.role}
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleLogout}
                            className="h-8 w-8"
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                )}
                {sidebarCollapsed && !isMobile && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLogout}
                        className="w-full"
                    >
                        <LogOut className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
