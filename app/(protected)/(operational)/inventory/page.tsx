'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/lib/store';
import { Package, Archive, TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function InventoryPage() {
    const setBreadcrumbs = useUIStore((state) => state.setBreadcrumbs);

    useEffect(() => {
        setBreadcrumbs([{ label: 'Dashboard', href: '/dashboard' }, { label: 'Inventory' }]);
    }, [setBreadcrumbs]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Inventory Management</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Manage school inventory and resources</p>
            </div>

            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Backend API Required</AlertTitle>
                <AlertDescription>
                    The inventory management system requires backend models and APIs to be implemented first. This includes item tracking, categories, stock levels, and transaction history.
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                        <Package className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">Awaiting backend</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                        <TrendingDown className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">Awaiting backend</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">In Stock</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">Awaiting backend</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Categories</CardTitle>
                        <Archive className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">Awaiting backend</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Planned Features</CardTitle>
                    <CardDescription>What will be available in the inventory system</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                            <span>Item catalog with categories and subcategories</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                            <span>Stock tracking with minimum quantity alerts</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                            <span>Purchase order management</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                            <span>Issue and return tracking for borrowed items</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                            <span>Barcode/QR code support for quick scanning</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                            <span>Vendor management and purchase history</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                            <span>Inventory reports and analytics</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                            <span>Asset depreciation tracking</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
