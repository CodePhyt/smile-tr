'use client';

import { TextareaHTMLAttributes, useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface FloatingTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
    maxLength?: number;
    showCharacterCount?: boolean;
}

const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
    ({ label, error, maxLength, showCharacterCount = false, className = '', ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);
        const [hasValue, setHasValue] = useState(false);
        const [charCount, setCharCount] = useState(0);

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setHasValue(e.target.value !== '');
            setCharCount(e.target.value.length);
            props.onChange?.(e);
        };

        return (
            <div className="relative w-full">
                {/* Textarea Container */}
                <div className="relative">
                    <textarea
                        ref={ref}
                        {...props}
                        maxLength={maxLength}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={`
              peer w-full px-4 pt-6 pb-2 rounded-lg
              bg-slate-900/50 backdrop-blur-sm
              border-2 transition-all duration-300
              text-white placeholder-transparent
              ${error ? 'border-red-500/50' : 'border-slate-700'}
              ${isFocused ? 'border-sky-500 ring-2 ring-sky-500/20' : ''}
              hover:border-slate-600
              focus:outline-none
              resize-none
              min-h-[120px]
              ${className}
            `}
                        placeholder={label}
                    />

                    {/* Floating Label */}
                    <motion.label
                        initial={false}
                        animate={{
                            y: isFocused || hasValue || props.value ? -8 : 4,
                            scale: isFocused || hasValue || props.value ? 0.85 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                        className={`
              absolute left-4 top-4 pointer-events-none
              transition-colors duration-300 origin-left
              ${isFocused ? 'text-sky-400' : error ? 'text-red-400' : 'text-slate-400'}
            `}
                    >
                        {label}
                    </motion.label>
                </div>

                {/* Character Count / Error Message */}
                <div className="mt-2 flex items-center justify-between">
                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="text-sm text-red-400 flex items-center space-x-1"
                            >
                                <AlertCircle className="w-4 h-4" />
                                <span>{error}</span>
                            </motion.p>
                        )}
                    </AnimatePresence>

                    {/* Character Counter */}
                    {showCharacterCount && maxLength && (
                        <span
                            className={`text-sm ml-auto ${charCount > maxLength * 0.9 ? 'text-yellow-400' : 'text-slate-500'
                                }`}
                        >
                            {charCount} / {maxLength}
                        </span>
                    )}
                </div>
            </div>
        );
    }
);

FloatingTextarea.displayName = 'FloatingTextarea';

export default FloatingTextarea;
