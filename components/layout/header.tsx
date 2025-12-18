'use client';

import { useTheme } from 'next-themes';
import { useUIStore, useAuthStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Moon, Sun, Menu, Search, User, LogOut, Settings, FileText, Users as UsersIcon, GraduationCap, Building2, Bell, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';


// GraphQL Query for global search
const GLOBAL_SEARCH = gql`
    query GlobalSearch($query: String!) {
        searchUsers(query: $query) {
            id
            email
            role
        }
        searchStudents(query: $query) {
            id
            firstName
            lastName
            rollNumber
        }
        searchStaff(query: $query) {
            id
            firstName
            lastName
            employeeId
        }
        searchCourses(query: $query) {
            id
            name
            code
        }
    }
`;

// Sample notifications
const sampleNotifications = [
    {
        id: 1,
        title: 'New Student Enrollment',
        message: 'John Doe has been enrolled in Computer Science',
        time: '5 minutes ago',
        read: false,
    },
    {
        id: 2,
        title: 'Exam Schedule Updated',
        message: 'Mid-term exam schedule has been modified',
        time: '1 hour ago',
        read: false,
    },
    {
        id: 3,
        title: 'Fee Payment Received',
        message: 'Payment of $500 received from Jane Smith',
        time: '3 hours ago',
        read: true,
    },
    {
        id: 4,
        title: 'New Staff Member',
        message: 'Dr. Robert Johnson joined as Mathematics Professor',
        time: '1 day ago',
        read: true,
    },
];

export function Header() {
    const { theme, setTheme } = useTheme();
    const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu);
    const breadcrumbs = useUIStore((state) => state.breadcrumbs);
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();
    const [searchOpen, setSearchOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    // Get user initials for avatar fallback
    const getUserInitials = () => {
        if (!user?.email) return 'U';
        const parts = user.email.split('@')[0].split('.');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return user.email.substring(0, 2).toUpperCase();
    };

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Fetch search results
    const { data: searchResults, loading: searchLoading } = useQuery(GLOBAL_SEARCH, {
        variables: { query: debouncedQuery },
        skip: !debouncedQuery || debouncedQuery.length < 2,
    });

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl/Cmd + K for search focus
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(true);
            }
            // ESC to close
            if (e.key === 'Escape') {
                setSearchOpen(false);
                setNotificationsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleResultClick = (path: string) => {
        router.push(path);
        setSearchOpen(false);
        setSearchQuery('');
    };

    const hasResults = searchResults && (
        searchResults.searchUsers?.length > 0 ||
        searchResults.searchStudents?.length > 0 ||
        searchResults.searchStaff?.length > 0 ||
        searchResults.searchCourses?.length > 0
    );

    // Count unread notifications
    const unreadCount = sampleNotifications.filter(n => !n.read).length;

    return (
        <>
            <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-6 gap-4">
                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden flex-shrink-0"
                    onClick={toggleMobileMenu}
                >
                    <Menu className="h-5 w-5" />
                </Button>

                {/* Breadcrumbs */}
                <div className="hidden md:block flex-1">
                    {breadcrumbs.length > 0 && (
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumbs.map((crumb, index) => (
                                    <div key={index} className="flex items-center">
                                        <BreadcrumbItem>
                                            {crumb.href ? (
                                                <BreadcrumbLink href={crumb.href}>
                                                    {crumb.label}
                                                </BreadcrumbLink>
                                            ) : (
                                                <span className="text-gray-900 dark:text-white font-medium">
                                                    {crumb.label}
                                                </span>
                                            )}
                                        </BreadcrumbItem>
                                        {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                                    </div>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    )}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Search Trigger */}
                    {/* Mobile: Icon Only */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="sm:hidden"
                        onClick={() => setSearchOpen(true)}
                    >
                        <Search className="h-5 w-5" />
                    </Button>

                    {/* Desktop: Full Search Bar */}
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="hidden sm:flex h-10 px-4 items-center justify-between rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-w-[200px] lg:min-w-[300px]"
                    >
                        <div className="flex items-center gap-2">
                            <Search className="h-4 w-4" />
                            <span className="text-sm">Search...</span>
                        </div>
                        <kbd className="hidden md:inline-flex h-6 select-none items-center gap-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-1.5 font-mono text-[10px] font-medium text-gray-600 dark:text-gray-400">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </button>

                    {/* Notifications Bell */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                        onClick={() => setNotificationsOpen(true)}
                    >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-600 text-white text-xs">
                                {unreadCount}
                            </Badge>
                        )}
                    </Button>

                    {/* Theme Toggle */}
                    <Button variant="ghost" size="icon" onClick={toggleTheme}>
                        {theme === 'dark' ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>

                    {/* Profile Avatar Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                                <Avatar className="h-10 w-10 border-2 border-gray-200 dark:border-gray-700">
                                    <AvatarImage src={user?.email ? `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}` : undefined} alt={user?.email || 'User'} />
                                    <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-semibold">
                                        {getUserInitials()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user?.email}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user?.role}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push('/profile')}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push('/settings')}>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* Search Dialog */}
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
                <DialogContent className="max-w-2xl p-0 gap-0">
                    <DialogHeader className="px-4 pt-4 pb-0">
                        <DialogTitle className="sr-only">Global Search</DialogTitle>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                autoFocus
                                type="text"
                                placeholder="Search for users, students, staff, courses..."
                                className="pl-10 h-12 text-base border-0 border-b rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </DialogHeader>

                    <div className="max-h-[400px] overflow-y-auto p-4">
                        {!searchQuery && (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                <p className="text-sm">Start typing to search...</p>
                            </div>
                        )}

                        {searchQuery && searchQuery.length < 2 && (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                <p className="text-sm">Type at least 2 characters to search</p>
                            </div>
                        )}

                        {searchLoading && (
                            <div className="text-center py-8">
                                <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"></div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Searching...</p>
                            </div>
                        )}

                        {!searchLoading && debouncedQuery.length >= 2 && !hasResults && (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                <p className="text-sm">No results found for "{debouncedQuery}"</p>
                            </div>
                        )}

                        {!searchLoading && hasResults && (
                            <div className="space-y-4">
                                {/* Users */}
                                {searchResults.searchUsers?.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                            <UsersIcon className="h-3 w-3" />
                                            Users
                                        </div>
                                        <div className="space-y-1">
                                            {searchResults.searchUsers.map((item: any) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => handleResultClick(`/users/${item.id}`)}
                                                    className="w-full px-3 py-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.email}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.role}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Students */}
                                {searchResults.searchStudents?.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                            <GraduationCap className="h-3 w-3" />
                                            Students
                                        </div>
                                        <div className="space-y-1">
                                            {searchResults.searchStudents.map((item: any) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => handleResultClick(`/students/${item.id}`)}
                                                    className="w-full px-3 py-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {item.firstName} {item.lastName}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Roll: {item.rollNumber}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Staff */}
                                {searchResults.searchStaff?.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                            <UsersIcon className="h-3 w-3" />
                                            Staff
                                        </div>
                                        <div className="space-y-1">
                                            {searchResults.searchStaff.map((item: any) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => handleResultClick(`/staff/${item.id}`)}
                                                    className="w-full px-3 py-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {item.firstName} {item.lastName}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">ID: {item.employeeId}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Courses */}
                                {searchResults.searchCourses?.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                            <Building2 className="h-3 w-3" />
                                            Courses
                                        </div>
                                        <div className="space-y-1">
                                            {searchResults.searchCourses.map((item: any) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => handleResultClick(`/courses/${item.id}`)}
                                                    className="w-full px-3 py-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Code: {item.code}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Notifications Dialog */}
            <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center justify-between">
                            <span>Notifications</span>
                            {unreadCount > 0 && (
                                <Badge className="bg-red-600 text-white">{unreadCount} new</Badge>
                            )}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="max-h-[400px] overflow-y-auto space-y-2">
                        {sampleNotifications.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                <p className="text-sm">No notifications</p>
                            </div>
                        ) : (
                            sampleNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={cn(
                                        "p-4 rounded-lg border transition-colors cursor-pointer",
                                        notification.read
                                            ? "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                            : "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800"
                                    )}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                                {notification.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                {notification.message}
                                            </p>
                                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                                                <Clock className="h-3 w-3" />
                                                {notification.time}
                                            </div>
                                        </div>
                                        {!notification.read && (
                                            <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
