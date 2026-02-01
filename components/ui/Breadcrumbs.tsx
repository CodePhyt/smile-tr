'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Breadcrumb {
    label: string;
    href: string;
}

export default function Breadcrumbs() {
    const pathname = usePathname();

    // Don't show breadcrumbs on homepage
    if (pathname === '/') return null;

    const generateBreadcrumbs = (): Breadcrumb[] => {
        const paths = pathname.split('/').filter(Boolean);
        const breadcrumbs: Breadcrumb[] = [
            { label: 'Home', href: '/' }
        ];

        let currentPath = '';
        paths.forEach((path, index) => {
            currentPath += `/${path}`;

            // Format label (capitalize, replace hyphens)
            let label = path
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            // Special cases for better labels
            if (path === 'blog') label = 'Blog';
            if (path === 'treatments') label = 'Treatments';
            if (path === 'stories') label = 'Success Stories';
            if (path === 'about') label = 'About Us';
            if (path === 'contact') label = 'Contact';
            if (path === 'clinics') label = 'Our Clinics';
            if (path === 'careers') label = 'Careers';

            breadcrumbs.push({
                label,
                href: currentPath
            });
        });

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    return (
        <nav aria-label="Breadcrumb" className="w-full">
            <div className="crystal-card px-6 py-3 inline-flex items-center space-x-2">
                {breadcrumbs.map((crumb, index) => (
                    <div key={crumb.href} className="flex items-center space-x-2">
                        {/* Home icon for first item */}
                        {index === 0 && (
                            <Home className="w-4 h-4 text-sky-400" />
                        )}

                        {/* Breadcrumb link or text */}
                        {index === breadcrumbs.length - 1 ? (
                            // Current page (not a link)
                            <span className="text-white font-medium text-sm">
                                {crumb.label}
                            </span>
                        ) : (
                            // Previous pages (links)
                            <Link
                                href={crumb.href}
                                className="text-slate-400 hover:text-sky-400 transition-colors text-sm font-medium"
                            >
                                {index === 0 ? '' : crumb.label}
                            </Link>
                        )}

                        {/* Separator (not for last item) */}
                        {index < breadcrumbs.length - 1 && (
                            <ChevronRight className="w-4 h-4 text-slate-600" />
                        )}
                    </div>
                ))}
            </div>
        </nav>
    );
}
