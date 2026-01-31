'use client';

import { useEffect } from 'react';

/**
 * Diamond Protocol - Custom Smooth Scroll
 * Physics-based smooth scrolling using CSS and requestAnimationFrame
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Only run on desktop
        if (window.innerWidth < 1024) return;

        let scrollY = window.scrollY;
        let targetY = window.scrollY;
        const ease = 0.12; // Smooth easing factor (lower = smoother)

        function smoothScroll() {
            // Calculate difference
            const dy = targetY - scrollY;

            // Apply easing
            scrollY += dy * ease;

            // Apply transform
            if (document.body) {
                document.body.style.transform = `translateY(-${scrollY}px)`;
            }

            // Continue animation
            requestAnimationFrame(smoothScroll);
        }

        function updateTarget() {
            targetY = window.scrollY;
        }

        // Set up fixed body for transform
        document.documentElement.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = '0';
        document.body.style.left = '0';
        document.body.style.width = '100%';
        document.body.style.height = '100vh';
        document.body.style.overflow = 'visible';

        // Listen to scroll events
        window.addEventListener('scroll', updateTarget);

        // Start animation loop
        requestAnimationFrame(smoothScroll);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', updateTarget);
            document.documentElement.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.width = '';
            document.body.style.height = '';
            document.body.style.overflow = '';
            document.body.style.transform = '';
        };
    }, []);

    return <>{children}</>;
}
