// DESIGN.md Constitution: Scroll Animation Rules
// Using ScrollImageSequence for 60fps cinematic scroll on Hero

'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface ScrollImageSequenceProps {
    /** Total number of frames in the sequence */
    totalFrames: number;
    /** Base path to frames directory (e.g., '/sequence/implant/') */
    framePath: string;
    /** Image format (e.g., '.jpg', '.png') */
    frameFormat?: string;
    /** Width of the canvas */
    canvasWidth?: number;
    /** Height of the canvas */
    canvasHeight?: number;
    /** Number of frames to preload at once */
    preloadBatchSize?: number;
    /** Fallback video for mobile */
    mobileVideoSrc?: string;
    /** Custom className for the container */
    className?: string;
}

export default function ScrollImageSequence({
    totalFrames,
    framePath,
    frameFormat = '.jpg',
    canvasWidth = 1920,
    canvasHeight = 1080,
    preloadBatchSize = 10,
    mobileVideoSrc,
    className = '',
}: ScrollImageSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || /Mobile|Android/i.test(navigator.userAgent));
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Track scroll progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    // Map scroll progress to frame number
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

    // Preload images in batches
    useEffect(() => {
        if (isMobile && mobileVideoSrc) return; // Skip preloading on mobile if video fallback exists

        const loadImages = async () => {
            const images: HTMLImageElement[] = [];
            let loadedCount = 0;

            // Helper to get frame filename with zero-padding
            const getFramePath = (index: number): string => {
                const paddedIndex = String(index + 1).padStart(3, '0');
                return `${framePath}${paddedIndex}${frameFormat}`;
            };

            // Preload in batches for progressive loading
            for (let batch = 0; batch < totalFrames; batch += preloadBatchSize) {
                const batchPromises = [];

                for (let i = batch; i < Math.min(batch + preloadBatchSize, totalFrames); i++) {
                    const img = new Image();
                    img.src = getFramePath(i);

                    const loadPromise = new Promise<void>((resolve) => {
                        img.onload = () => {
                            loadedCount++;
                            resolve();
                        };
                        img.onerror = () => {
                            // Fallback: use placeholder or first frame
                            img.src = getFramePath(0);
                            resolve();
                        };
                    });

                    images[i] = img;
                    batchPromises.push(loadPromise);
                }

                // Wait for current batch to load before moving to next
                await Promise.all(batchPromises);

                // Update loading progress
                if (loadedCount >= preloadBatchSize) {
                    setImagesLoaded(true); // Show canvas after first batch loads
                }
            }

            imagesRef.current = images;
        };

        loadImages();
    }, [totalFrames, framePath, frameFormat, preloadBatchSize, isMobile, mobileVideoSrc]);

    // Render current frame to canvas based on scroll
    useEffect(() => {
        if (!imagesLoaded || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const unsubscribe = frameIndex.on('change', (latest) => {
            const index = Math.round(latest);
            const img = imagesRef.current[index];

            if (img && img.complete) {
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw image centered and scaled to fit
                const scale = Math.min(
                    canvas.width / img.width,
                    canvas.height / img.height
                );
                const x = (canvas.width - img.width * scale) / 2;
                const y = (canvas.height - img.height * scale) / 2;

                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        });

        // Draw first frame immediately
        const firstImg = imagesRef.current[0];
        if (firstImg && firstImg.complete) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const scale = Math.min(
                canvas.width / firstImg.width,
                canvas.height / firstImg.height
            );
            const x = (canvas.width - firstImg.width * scale) / 2;
            const y = (canvas.height - firstImg.height * scale) / 2;
            ctx.drawImage(firstImg, x, y, firstImg.width * scale, firstImg.height * scale);
        }

        return () => unsubscribe();
    }, [frameIndex, imagesLoaded]);

    // Mobile fallback: show video instead
    if (isMobile && mobileVideoSrc) {
        return (
            <div ref={containerRef} className={`relative ${className}`}>
                <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        src={mobileVideoSrc}
                    />
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-midnight-slate">
                {!imagesLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="w-16 h-16 border-4 border-antalya-turquoise border-t-transparent rounded-full"
                        />
                    </div>
                )}

                <canvas
                    ref={canvasRef}
                    width={canvasWidth}
                    height={canvasHeight}
                    className={`max-w-full max-h-full object-contain ${imagesLoaded ? 'opacity-100' : 'opacity-0'
                        } transition-opacity duration-1000`}
                />
            </div>
        </div>
    );
}
