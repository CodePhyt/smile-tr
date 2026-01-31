'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ExplodingImplant() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    // Transform scroll progress to different animations
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 1.2]);

    // Individual part transforms
    const crownY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, -150, -150, 0]);
    const crownRotate = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 15, 15, 0]);

    const abutmentY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, -50, -50, 0]);
    const abutmentRotate = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, -10, -10, 0]);

    const screwY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 50, 50, 0]);
    const screwRotate = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 360, 360, 0]);

    const [scrollText, setScrollText] = useState('Scroll to Explore');

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            if (latest < 0.2) {
                setScrollText('Scroll to Explore');
            } else if (latest < 0.5) {
                setScrollText('See Every Detail');
            } else if (latest < 0.8) {
                setScrollText('Perfect Engineering');
            } else {
                setScrollText('Your New Smile');
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-slate-950">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

                {/* Animated Background Grid */}
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />

                {/* Radial Gradient */}
                <div className="absolute inset-0 bg-gradient-radial from-sky-500/10 via-transparent to-transparent" />

                {/* Content */}
                <div className="relative z-10 text-center">

                    {/* Headline */}
                    <motion.div
                        style={{ opacity }}
                        className="mb-16"
                    >
                        <h1 className="text-6xl md:text-8xl font-bold mb-4">
                            <span className="gradient-text">Titanium Precision</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400">
                            {scrollText}
                        </p>
                    </motion.div>

                    {/* Exploding Implant Animation */}
                    <motion.div
                        className="relative w-[400px] h-[600px] mx-auto"
                        style={{ scale, opacity }}
                    >

                        {/* Crown (Top) */}
                        <motion.div
                            className="absolute inset-0 flex items-start justify-center"
                            style={{ y: crownY, rotate: crownRotate }}
                        >
                            <div className="relative w-48 h-64">
                                {/* Crown Image - Replace with actual asset */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-100 to-slate-300 rounded-t-full shadow-2xl">
                                    <div className="absolute inset-4 bg-gradient-to-b from-white/80 to-transparent rounded-t-full" />
                                </div>
                                <motion.p
                                    className="absolute -right-24 top-1/2 -translate-y-1/2 text-sm text-sky-400 whitespace-nowrap"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Zirconium Crown
                                </motion.p>
                            </div>
                        </motion.div>

                        {/* Abutment (Middle) */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ y: abutmentY, rotate: abutmentRotate }}
                        >
                            <div className="relative w-24 h-32">
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-400 via-slate-500 to-slate-600 shadow-2xl">
                                    <div className="absolute inset-2 bg-gradient-to-b from-white/30 to-transparent" />
                                </div>
                                <motion.p
                                    className="absolute -left-24 top-1/2 -translate-y-1/2 text-sm text-sky-400 whitespace-nowrap"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Abutment
                                </motion.p>
                            </div>
                        </motion.div>

                        {/* Titanium Screw (Bottom) */}
                        <motion.div
                            className="absolute inset-0 flex items-end justify-center"
                            style={{ y: screwY, rotate: screwRotate }}
                        >
                            <div className="relative w-16 h-48">
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800 rounded-b-full shadow-2xl">
                                    {/* Thread Details */}
                                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_8px,rgba(255,255,255,0.1)_8px,rgba(255,255,255,0.1)_10px)]" />
                                </div>
                                <motion.p
                                    className="absolute -right-28 top-1/2 -translate-y-1/2 text-sm text-sky-400 whitespace-nowrap"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    Titanium Screw
                                </motion.p>
                            </div>
                        </motion.div>

                        {/* Connection Lines (appear during explosion) */}
                        <motion.svg
                            className="absolute inset-0 pointer-events-none"
                            opacity={useTransform(scrollYProgress, [0.3, 0.5], [0, 1])}
                        >
                            <line x1="50%" y1="20%" x2="50%" y2="45%" stroke="rgb(56, 189, 248)" strokeWidth="1" strokeDasharray="5,5" />
                            <line x1="50%" y1="55%" x2="50%" y2="75%" stroke="rgb(56, 189, 248)" strokeWidth="1" strokeDasharray="5,5" />
                        </motion.svg>

                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-12 left-1/2 -translate-x-1/2"
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                    >
                        <div className="flex flex-col items-center">
                            <p className="text-slate-500 text-sm mb-2">Scroll to disassemble</p>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
