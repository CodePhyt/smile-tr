'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    className?: string;
}

export default function ScrollReveal({
    children,
    delay = 0,
    duration = 0.6,
    direction = 'up',
    className = '',
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,  // Only animate once
        margin: '-100px', // Start animation 100px before element is in view
    });

    // Direction-based initial positions
    const directionOffset = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
    };

    const offset = directionOffset[direction];

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                ...offset,
            }}
            animate={
                isInView
                    ? {
                        opacity: 1,
                        x: 0,
                        y: 0,
                    }
                    : {}
            }
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1], // Custom easing
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Stagger container for animating multiple children in sequence
interface ScrollRevealStaggerProps {
    children: ReactNode;
    staggerDelay?: number;
    className?: string;
}

export function ScrollRevealStagger({
    children,
    staggerDelay = 0.1,
    className = '',
}: ScrollRevealStaggerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        margin: '-100px',
    });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Child component for stagger animations
export function ScrollRevealItem({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
