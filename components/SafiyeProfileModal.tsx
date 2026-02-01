'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Briefcase, Phone, Mail, Languages, Heart, Camera, Waves, CheckCircle2 } from 'lucide-react';

interface SafiyeProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SafiyeProfileModal({ isOpen, onClose }: SafiyeProfileModalProps) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    return (
        <>
            {/* Profile Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
                        />

                        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                transition={{ type: 'spring', damping: 25 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-3xl shadow-2xl max-w-md w-full pointer-events-auto overflow-hidden max-h-[90vh] flex flex-col"
                            >
                                <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 p-6 pb-20">
                                    <button
                                        onClick={onClose}
                                        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>

                                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-16">
                                        <div className="relative">
                                            <div
                                                className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100 cursor-pointer hover:opacity-90 transition-opacity group"
                                                onClick={() => setIsLightboxOpen(true)}
                                                title="Click to view larger"
                                            >
                                                <img
                                                    src="/safiye_concierge_avatar.png"
                                                    alt="Safiye Yılmaz"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                    <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-1 right-1 bg-green-500 rounded-full p-1.5 border-2 border-white">
                                                <CheckCircle2 className="w-4 h-4 text-white" fill="currentColor" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-20 pb-6 px-6 overflow-y-auto flex-1">
                                    <div className="text-center mb-6">
                                        <h2 className="text-2xl font-bold text-slate-900 mb-1">Safiye Yılmaz</h2>
                                        <div className="flex items-center justify-center gap-1.5 text-blue-600 mb-2">
                                            <Briefcase className="w-4 h-4" />
                                            <p className="text-sm font-medium">Lead Patient Coordinator</p>
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                            Active Now
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 mb-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                            <span className="font-semibold text-slate-900">WhatsApp Business Account</span>
                                        </div>
                                        <div className="space-y-2.5 text-sm">
                                            <div className="flex items-center gap-2 text-slate-700">
                                                <Briefcase className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                                <span>Smile Türkiye - Dental Clinic</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-700">
                                                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                                <span>Konyaaltı, Antalya, Turkey</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-700">
                                                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                                <span>+90 530 287 6350</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-700">
                                                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                                <span>safiye@smileturkiye.com</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">About</h3>
                                        <p className="text-slate-700 text-sm leading-relaxed">
                                            Hi! I'm Safiye, 32, living in beautiful Konyaaltı for 8 years now.
                                            I help international patients transform their smiles with warmth and care.
                                            When I'm not coordinating treatments, you'll find me playing beach volleyball,
                                            capturing Mediterranean sunsets, or enjoying Turkish coffee at local cafes! ☕📸
                                        </p>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Languages className="w-4 h-4 text-slate-500" />
                                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Languages</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                🇹🇷 Turkish (Native)
                                            </span>
                                            <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                🇬🇧 English (Fluent)
                                            </span>
                                            <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                🇩🇪 German (Learning)
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Heart className="w-4 h-4 text-slate-500" />
                                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Hobbies</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl">
                                                <Waves className="w-4 h-4 text-cyan-600" />
                                                <span className="text-sm text-slate-700">Beach Volleyball</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl">
                                                <Camera className="w-4 h-4 text-purple-600" />
                                                <span className="text-sm text-slate-700">Photography</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl">
                                                <Waves className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm text-slate-700">Swimming</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl">
                                                <span className="text-base">☕</span>
                                                <span className="text-sm text-slate-700">Turkish Coffee</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 px-6 py-4 bg-slate-50">
                                    <p className="text-xs text-center text-slate-500">
                                        Verified Business Account • Smile Türkiye
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Image Lightbox */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsLightboxOpen(false)}
                            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm cursor-pointer"
                        />
                        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: 'spring', damping: 20 }}
                                className="relative pointer-events-auto"
                            >
                                <button
                                    onClick={() => setIsLightboxOpen(false)}
                                    className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <div className="w-[90vw] h-[90vw] max-w-md max-h-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                                    <img
                                        src="/safiye_concierge_avatar.png"
                                        alt="Safiye Yılmaz - Full View"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
