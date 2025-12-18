'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';

interface MobileCardProps<T> {
    item: T;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    renderContent: (item: T) => React.ReactNode;
    renderTitle: (item: T) => React.ReactNode;
    renderBadge?: (item: T) => React.ReactNode;
}

export function MobileCardDeck<T>({
    items,
    renderTitle,
    renderContent,
    renderBadge,
    onEdit,
    onDelete,
}: {
    items: T[];
    renderTitle: (item: T) => React.ReactNode;
    renderContent: (item: T) => React.ReactNode;
    renderBadge?: (item: T) => React.ReactNode;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
}) {
    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <CardTitle className="text-base">{renderTitle(item)}</CardTitle>
                                {renderBadge && (
                                    <div className="mt-2">{renderBadge(item)}</div>
                                )}
                            </div>
                            {(onEdit || onDelete) && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        {onEdit && (
                                            <DropdownMenuItem onClick={() => onEdit(item)}>
                                                <Edit className="h-4 w-4 mr-2" />
                                                Edit
                                            </DropdownMenuItem>
                                        )}
                                        {onDelete && (
                                            <DropdownMenuItem
                                                onClick={() => onDelete(item)}
                                                className="text-red-600 dark:text-red-400"
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>{renderContent(item)}</CardContent>
                </Card>
            ))}
        </div>
    );
}
