'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when page is scrolled past 500px
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 group"
                    aria-label="Scroll to top"
                >
                    {/* Crystal card button */}
                    <div className="crystal-card p-4 hover:scale-110 transition-transform duration-300">
                        {/* Gradient background on hover */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-500/0 to-cyan-500/0 group-hover:from-sky-500/20 group-hover:to-cyan-500/20 transition-all duration-300"></div>

                        {/* Icon */}
                        <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                            className="relative"
                        >
                            <ArrowUp className="w-6 h-6 text-sky-400 group-hover:text-sky-300 transition-colors" />
                        </motion.div>
                    </div>

                    {/* Pulse ring effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-sky-500/50 animate-ping opacity-0 group-hover:opacity-100"></div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
