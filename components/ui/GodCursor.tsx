'use client';

import { useEffect, useState } from 'react';

/**
 * Diamond Protocol - God Cursor
 * Fluid follower cursor with magnetic interactions
 */
export default function GodCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        // Only show on desktop
        if (window.innerWidth < 1024) return;

        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        const ease = 0.15; // Smooth lerp factor

        function lerp(start: number, end: number, factor: number) {
            return start + (end - start) * factor;
        }

        function animate() {
            currentX = lerp(currentX, targetX, ease);
            currentY = lerp(currentY, targetY, ease);

            setPosition({ x: currentX, y: currentY });
            requestAnimationFrame(animate);
        }

        function handleMouseMove(e: MouseEvent) {
            targetX = e.clientX;
            targetY = e.clientY;

            // Check if hovering over interactive elements
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                target.classList.contains('cursor-interactive');

            setIsExpanded(!!isInteractive);
            setIsVisible(true);
        }

        function handleMouseLeave() {
            setIsVisible(false);
        }

        // Event listeners
        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        // Start animation loop
        const rafId = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(rafId);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={`cursor-trail ${isExpanded ? 'expand' : ''}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-50%, -50%)',
            }}
        />
    );
}
