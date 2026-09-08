import { ReactNode } from 'react';

export interface BreadcrumbItem {
    label: string;
    href?: string;
    current?: boolean;
}

export interface AdminNavItem {
    name: string;
    href: string;
    icon: ReactNode;
    activeMatcher: string;
    minRole?: 'super_admin' | 'admin' | 'editor';
    badge?: string | number;
}

export interface AdminNavGroup {
    groupName: string;
    items: AdminNavItem[];
}
