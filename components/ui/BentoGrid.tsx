'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    size?: 'small' | 'medium' | 'large' | 'tall' | 'wide';
    hoverable?: boolean;
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 ${className}`}>
            {children}
        </div>
    );
}

export function BentoCard({
    children,
    className = '',
    size = 'medium',
    hoverable = true
}: BentoCardProps) {

    const sizeClasses = {
        small: 'md:col-span-2 lg:col-span-2 md:row-span-1',
        medium: 'md:col-span-2 lg:col-span-2 md:row-span-2',
        large: 'md:col-span-4 lg:col-span-4 md:row-span-2',
        tall: 'md:col-span-2 lg:col-span-2 md:row-span-3',
        wide: 'md:col-span-4 lg:col-span-3 md:row-span-1',
    };

    return (
        <motion.div
            className={`
        glass-card overflow-hidden
        ${sizeClasses[size]}
        ${hoverable ? 'glass-card-hover cursor-pointer' : ''}
        ${className}
      `}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={hoverable ? { scale: 1.02, transition: { duration: 0.2 } } : {}}
        >
            {children}
        </motion.div>
    );
}

// Specialized Bento Cards

interface VideoCardProps {
    videoUrl: string;
    thumbnail: string;
    title: string;
    description?: string;
}

export function BentoVideoCard({ videoUrl, thumbnail, title, description }: VideoCardProps) {
    return (
        <div className="relative h-full group" role="article" aria-label={`Video: ${title}`}>
            {/* Thumbnail */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 group-hover:opacity-0"
                style={{ backgroundImage: `url(${thumbnail})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            </div>

            {/* Video (plays on hover) */}
            <video
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full mb-4 group-hover:bg-sky-500 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                {description && <p className="text-slate-400 text-sm">{description}</p>}
            </div>
        </div>
    );
}

interface TrustBadgeCardProps {
    rating: number;
    reviews: number;
    platform: string;
}

export function BentoTrustBadge({ rating, reviews, platform }: TrustBadgeCardProps) {
    // Fixed star positions to prevent hydration mismatch
    const starPositions = [
        { left: 15, top: 20, delay: 0, duration: 3 },
        { left: 85, top: 15, delay: 0.5, duration: 2.5 },
        { left: 45, top: 80, delay: 1, duration: 3.5 },
        { left: 70, top: 60, delay: 0.3, duration: 2.8 },
        { left: 25, top: 45, delay: 0.8, duration: 3.2 },
        { left: 60, top: 25, delay: 0.2, duration: 2.7 },
        { left: 10, top: 70, delay: 1.2, duration: 3.3 },
        { left: 90, top: 50, delay: 0.6, duration: 2.9 },
        { left: 40, top: 10, delay: 0.4, duration: 3.1 },
        { left: 75, top: 85, delay: 1.5, duration: 2.6 },
        { left: 50, top: 40, delay: 0.9, duration: 3.4 },
        { left: 20, top: 90, delay: 1.1, duration: 2.4 },
    ];

    return (
        <div
            className="h-full flex flex-col items-center justify-center p-8 text-center relative overflow-hidden"
            role="region"
            aria-label={`${rating} out of 5 stars from ${reviews} reviews on ${platform}`}
        >
            {/* Floating Stars Animation */}
            <div className="absolute inset-0">
                {starPositions.map((pos, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-yellow-500"
                        style={{
                            left: `${pos.left}%`,
                            top: `${pos.top}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 1, 0.3],
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: pos.duration,
                            repeat: Infinity,
                            delay: pos.delay,
                        }}
                    >
                        ⭐
                    </motion.div>
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            className={`w-8 h-8 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-600'}`}
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
                <p className="text-4xl font-bold gradient-text mb-2">{rating}/5</p>
                <p className="text-slate-300 mb-1">{reviews.toLocaleString()} Reviews</p>
                <p className="text-sm text-slate-500">{platform}</p>
            </div>
        </div>
    );
}

interface MapCardProps {
    location: string;
    coordinates?: { lat: number; lng: number };
}

export function BentoMapCard({ location }: MapCardProps) {
    return (
        <div className="relative h-full overflow-hidden" role="region" aria-label={`Location: ${location}`}>
            {/* Map Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1569163139394-de4798aa62b6?q=80&w=1920&auto=format&fit=crop)',
                }}
            >
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"></div>
            </div>

            {/* Pulsing Location Dot */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="relative"
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                >
                    <div className="w-4 h-4 bg-sky-500 rounded-full"></div>
                    <motion.div
                        className="absolute inset-0 bg-sky-500 rounded-full"
                        animate={{
                            scale: [1, 2.5, 1],
                            opacity: [1, 0, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    />
                </motion.div>
            </div>

            {/* Location Label */}
            <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-card p-4">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-white font-semibold">{location}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface WarrantyCardProps {
    years: string;
    type: string;
}

export function BentoWarrantyCard({ years, type }: WarrantyCardProps) {
    return (
        <div
            className="h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-yellow-600/10 to-amber-900/10"
            role="region"
            aria-label={`${years} years ${type} warranty coverage`}
        >
            {/* Gold Seal */}
            <motion.div
                className="relative mb-4"
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <svg className="w-24 h-24 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-slate-950">{years}</p>
                        <p className="text-xs text-slate-950 font-semibold">YEARS</p>
                    </div>
                </div>
            </motion.div>

            <h3 className="text-xl font-bold text-white mb-2">{type} Warranty</h3>
            <p className="text-slate-400 text-sm">Industry-Leading Coverage</p>
        </div>
    );
}
