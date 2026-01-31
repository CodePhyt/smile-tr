'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const treatments = [
    { name: 'Dental Veneers', slug: 'dental-veneers' },
    { name: 'Dental Implants', slug: 'dental-implants' },
    { name: 'Teeth Whitening', slug: 'teeth-whitening' },
    { name: 'Hollywood Smile', slug: 'hollywood-smile' },
    { name: 'Full Mouth Restoration', slug: 'full-mouth-restoration' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'glass-card border-b border-white/10 backdrop-blur-xl'
                    : 'bg-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center glow-sm group-hover:glow transition-all duration-300">
                            <span className="text-2xl font-bold">S</span>
                        </div>
                        <span className="text-xl font-bold gradient-text">Smile Turkey</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link href="/" className="nav-link">
                            Home
                        </Link>
                        <Link href="/about" className="nav-link">
                            About
                        </Link>

                        {/* Treatments Dropdown */}
                        <div className="relative group">
                            <button
                                className="nav-link flex items-center space-x-1"
                                onMouseEnter={() => setIsTreatmentsOpen(true)}
                                onMouseLeave={() => setIsTreatmentsOpen(false)}
                            >
                                <span>Treatments</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            <AnimatePresence>
                                {isTreatmentsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 mt-2 w-64 glass-card p-4 space-y-2"
                                        onMouseEnter={() => setIsTreatmentsOpen(true)}
                                        onMouseLeave={() => setIsTreatmentsOpen(false)}
                                    >
                                        {treatments.map((treatment) => (
                                            <Link
                                                key={treatment.slug}
                                                href={`/treatments/${treatment.slug}`}
                                                className="block px-4 py-3 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200"
                                            >
                                                {treatment.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/stories" className="nav-link">
                            Success Stories
                        </Link>
                        <Link href="/blog" className="nav-link">
                            Blog
                        </Link>
                        <Link href="/clinics" className="nav-link">
                            Our Clinics
                        </Link>
                        <Link href="/contact" className="nav-link">
                            Contact
                        </Link>

                        {/* CTA Button */}
                        <Link href="/contact" className="btn-primary text-sm px-6 py-2">
                            Get Free Quote
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className="py-4 space-y-4">
                                <Link href="/" className="block px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">
                                    Home
                                </Link>
                                <Link href="/about" className="block px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">
                                    About
                                </Link>

                                {/* Mobile Treatments */}
                                <div>
                                    <button
                                        onClick={() => setIsTreatmentsOpen(!isTreatmentsOpen)}
                                        className="w-full flex items-center justify-between px-4 py-2 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <span>Treatments</span>
                                        <ChevronDown className={`w-4 h-4 transition-transform ${isTreatmentsOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isTreatmentsOpen && (
                                        <div className="pl-6 mt-2 space-y-2">
                                            {treatments.map((treatment) => (
                                                <Link
                                                    key={treatment.slug}
                                                    href={`/treatments/${treatment.slug}`}
                                                    className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                >
                                                    {treatment.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <Link href="/stories" className="block px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">
                                    Success Stories
                                </Link>
                                <Link href="/blog" className="block px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">
                                    Blog
                                </Link>
                                <Link href="/clinics" className="block px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">
                                    Our Clinics
                                </Link>
                                <Link href="/contact" className="block px-4 py-2 hover:bg-white/10 rounded-lg transition-colors">
                                    Contact
                                </Link>

                                <Link href="/contact" className="block btn-primary text-center mx-4">
                                    Get Free Quote
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <style jsx>{`
        .nav-link {
          @apply text-slate-300 hover:text-white transition-colors duration-200 relative;
        }
        .nav-link::after {
          content: '';
          @apply absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-500 to-cyan-500 transition-all duration-300;
        }
        .nav-link:hover::after {
          @apply w-full;
        }
      `}</style>
        </header>
    );
}
