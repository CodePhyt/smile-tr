'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollImageSequenceProps {
    frameCount?: number; // Default: 120 frames
    scrollRange?: number; // How many pixels of scroll to complete the sequence
    basePath?: string; // Path to frames folder
    fallbackMessage?: string;
}

export default function ScrollImageSequence({
    frameCount = 120,
    scrollRange = 1000,
    basePath = '/sequence',
    fallbackMessage = '🎬 Run Asset Generation Guide to see 3D Magic'
}: ScrollImageSequenceProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadError, setLoadError] = useState(false);

    // Track scroll progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    // Map scroll progress to frame index
    const frameIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [0, frameCount - 1]
    );

    // Preload all frames
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            let hasError = false;

            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                const frameNumber = String(i).padStart(3, '0');
                img.src = `${basePath}/frame_${frameNumber}.webp`;

                try {
                    await new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = reject;
                    });
                    loadedImages.push(img);
                } catch (error) {
                    console.error(`Failed to load frame ${frameNumber}:`, error);
                    hasError = true;
                    break;
                }
            }

            if (hasError || loadedImages.length === 0) {
                setLoadError(true);
            } else {
                setImages(loadedImages);
                setImagesLoaded(true);
            }
        };

        loadImages();
    }, [frameCount, basePath]);

    // Render current frame on canvas
    useEffect(() => {
        if (!imagesLoaded || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const unsubscribe = frameIndex.on('change', (latest) => {
            const index = Math.min(Math.floor(latest), images.length - 1);
            const img = images[index];

            if (img && img.complete) {
                // Set canvas size to match image
                canvas.width = img.width;
                canvas.height = img.height;

                // Clear and draw
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            }
        });

        return () => unsubscribe();
    }, [imagesLoaded, images, frameIndex]);

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: `${scrollRange + 100}vh` }}
        >
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {loadError ? (
                    // Fallback when frames are missing
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center px-6 py-12 max-w-2xl"
                    >
                        <div className="text-6xl mb-6">🎬</div>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            3D Animation Coming Soon
                        </h2>
                        <p className="text-lg text-white/80 mb-8">
                            {fallbackMessage}
                        </p>
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <p className="text-sm text-white/60 mb-2">
                                <strong>For Developers:</strong>
                            </p>
                            <code className="text-xs text-cyan-300 block">
                                Place 120 frames in <span className="text-yellow-300">/public{basePath}/</span>
                                <br />
                                Named as: frame_001.webp → frame_120.webp
                            </code>
                        </div>
                    </motion.div>
                ) : (
                    <div className="relative w-full max-w-4xl mx-auto px-6">
                        <canvas
                            ref={canvasRef}
                            className="w-full h-auto mx-auto"
                            style={{
                                filter: 'drop-shadow(0 25px 50px rgba(6, 182, 212, 0.3))',
                                maxHeight: '80vh',
                                objectFit: 'contain'
                            }}
                        />

                        {!imagesLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent mb-4" />
                                    <p className="text-white/80 text-lg">
                                        Loading 3D sequence...
                                    </p>
                                    <p className="text-white/60 text-sm mt-2">
                                        {Math.round((images.length / frameCount) * 100)}% loaded
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
