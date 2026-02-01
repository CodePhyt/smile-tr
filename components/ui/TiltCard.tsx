'use client';

import { useState, useRef, MouseEvent as ReactMouseEvent } from 'react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    intensity?: number; // 0-1, how much the card tilts
    glareEffect?: boolean;
}

export default function TiltCard({
    children,
    className = '',
    intensity = 0.3,
    glareEffect = true,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();

        // Calculate mouse position relative to card center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Calculate rotation (limited by intensity)
        const maxRotation = 25 * intensity;
        const rotX = -(mouseY / (rect.height / 2)) * maxRotation;
        const rotY = (mouseX / (rect.width / 2)) * maxRotation;

        setRotateX(rotX);
        setRotateY(rotY);

        // Calculate glare position (percentage)
        if (glareEffect) {
            const glareX = ((e.clientX - rect.left) / rect.width) * 100;
            const glareY = ((e.clientY - rect.top) / rect.height) * 100;
            setGlarePosition({ x: glareX, y: glareY });
        }
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setGlarePosition({ x: 50, y: 50 });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX,
                rotateY,
            }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
            }}
            style={{
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
            className={`relative ${className}`}
        >
            {/* Content */}
            <div style={{ transform: 'translateZ(20px)' }}>
                {children}
            </div>

            {/* Glare Effect */}
            {glareEffect && (
                <div
                    className="absolute inset-0 pointer-events-none rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
                    }}
                />
            )}
        </motion.div>
    );
}
