'use client';

import { motion } from 'framer-motion';
import { ReactNode, useRef, useState, MouseEvent } from 'react';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number; // Magnetic pull strength (0-1)
    onClick?: () => void;
}

export default function MagneticButton({
    children,
    className = '',
    strength = 0.5,
    onClick,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Apply magnetic effect (limited by strength)
        const maxDistance = 50 * strength;
        setPosition({
            x: Math.max(Math.min(distanceX * strength, maxDistance), -maxDistance),
            y: Math.max(Math.min(distanceY * strength, maxDistance), -maxDistance),
        });
    };

    const handleMouseLeave = () => {
        // Reset position with smooth animation
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            animate={{ x: position.x, y: position.y }}
            transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
                mass: 0.1,
            }}
            className={className}
        >
            {children}
        </motion.button>
    );
}
