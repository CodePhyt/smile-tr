'use client';

import { InputHTMLAttributes, useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    success?: boolean;
}

const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
    ({ label, error, success, className = '', ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);
        const [hasValue, setHasValue] = useState(false);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setHasValue(e.target.value !== '');
            props.onChange?.(e);
        };

        return (
            <div className="relative w-full">
                {/* Input Container */}
                <div className="relative">
                    <input
                        ref={ref}
                        {...props}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={`
              peer w-full px-4 pt-6 pb-2 rounded-lg
              bg-slate-900/50 backdrop-blur-sm
              border-2 transition-all duration-300
              text-white placeholder-transparent
              ${error ? 'border-red-500/50' : success ? 'border-green-500/50' : 'border-slate-700'}
              ${isFocused ? 'border-sky-500 ring-2 ring-sky-500/20' : ''}
              hover:border-slate-600
              focus:outline-none
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

                    {/* Status Icons */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <AnimatePresence mode="wait">
                            {success && !error && (
                                <motion.div
                                    key="success"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 180 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Check className="w-5 h-5 text-green-500" />
                                </motion.div>
                            )}
                            {error && (
                                <motion.div
                                    key="error"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 text-sm text-red-400 flex items-center space-x-1"
                        >
                            <AlertCircle className="w-4 h-4" />
                            <span>{error}</span>
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

FloatingInput.displayName = 'FloatingInput';

export default FloatingInput;
