'use client';

import { useRef, useState } from 'react';
import { Image as ImageIcon, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
    onImageSelect: (file: File, preview: string) => void;
    onImageRemove?: () => void;
    currentImage?: string | null;
    disabled?: boolean;
}

export default function ImageUploader({ onImageSelect, onImageRemove, currentImage, disabled }: ImageUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        setIsProcessing(true);

        try {
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = e.target?.result as string;
                onImageSelect(file, preview);
                setIsProcessing(false);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Error processing image:', error);
            setIsProcessing(false);
        }
    };

    const handleRemove = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onImageRemove?.();
    };

    return (
        <div className="relative">
            {currentImage ? (
                <div className="relative inline-block">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-sky-400">
                        <Image
                            src={currentImage}
                            alt="Upload preview"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            ) : (
                <>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={disabled || isProcessing}
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={disabled || isProcessing}
                        className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Upload image"
                    >
                        {isProcessing ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <ImageIcon className="w-5 h-5" />
                        )}
                    </button>
                </>
            )}
        </div>
    );
}
