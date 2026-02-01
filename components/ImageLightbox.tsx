'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

interface ImageLightboxProps {
    src: string;
    alt: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function ImageLightbox({ src, alt, isOpen, onClose }: ImageLightboxProps) {
    const [zoom, setZoom] = useState(1);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.3, 3));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.3, 0.5));

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = src;
        link.download = alt || 'image';
        link.click();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                >
                    {/* Header Controls */}
                    <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/50 to-transparent">
                        <p className="text-white text-sm font-medium">{alt}</p>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDownload();
                                }}
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                                title="Download"
                            >
                                <Download className="w-5 h-5" />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                                title="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Image */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-lg"
                    >
                        <motion.img
                            src={src}
                            alt={alt}
                            style={{ scale: zoom }}
                            transition={{ type: 'spring', damping: 20 }}
                            className="w-full h-full object-contain select-none"
                            draggable={false}
                        />
                    </motion.div>

                    {/* Zoom Controls */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleZoomOut();
                            }}
                            disabled={zoom <= 0.5}
                            className="p-2 rounded-full hover:bg-white/20 transition-colors text-white disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Zoom Out"
                        >
                            <ZoomOut className="w-4 h-4" />
                        </button>
                        <span className="text-white text-sm font-medium min-w-[50px] text-center">
                            {Math.round(zoom * 100)}%
                        </span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleZoomIn();
                            }}
                            disabled={zoom >= 3}
                            className="p-2 rounded-full hover:bg-white/20 transition-colors text-white disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Zoom In"
                        >
                            <ZoomIn className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
