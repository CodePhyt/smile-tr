'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ParallaxProps {
    children: ReactNode;
    speed?: number; // 0 = no movement, 1 = natural scroll, -1 = opposite direction
    className?: string;
}

export default function Parallax({
    children,
    speed = 0.5,
    className = '',
}: ParallaxProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // Transform scroll progress to Y position
    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </div>
    );
}

// Parallax specifically for images
interface ParallaxImageProps {
    src: string;
    alt: string;
    speed?: number;
    className?: string;
}

export function ParallaxImage({
    src,
    alt,
    speed = 0.3,
    className = '',
}: ParallaxImageProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.img
                src={src}
                alt={alt}
                style={{ y, scale }}
                className="w-full h-full object-cover"
            />
        </div>
    );
}
