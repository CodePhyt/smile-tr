'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Users, MapPin, CheckCircle } from 'lucide-react';

interface Notification {
    id: string;
    name: string;
    country: string;
    treatment: string;
    timestamp: Date;
}

// Example real-time booking notifications
const MOCK_NOTIFICATIONS: Notification[] = [
    { id: '1', name: 'John M.', country: 'UK', treatment: 'Dental Implants', timestamp: new Date() },
    { id: '2', name: 'Maria G.', country: 'Spain', treatment: 'Hollywood Smile', timestamp: new Date() },
    { id: '3', name: 'Ahmed H.', country: 'UAE', treatment: 'Veneers', timestamp: new Date() },
    { id: '4', name: 'Sarah W.', country: 'USA', treatment: 'Teeth Whitening', timestamp: new Date() },
    { id: '5', name: 'Michael C.', country: 'Canada', treatment: 'All-on-4', timestamp: new Date() },
];

export default function LiveNotifications() {
    const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
    const [notificationIndex, setNotificationIndex] = useState(0);

    useEffect(() => {
        // Show first notification after 5 seconds
        const initialDelay = setTimeout(() => {
            setCurrentNotification(MOCK_NOTIFICATIONS[0]);
        }, 5000);

        return () => clearTimeout(initialDelay);
    }, []);

    useEffect(() => {
        if (currentNotification === null) return;

        // Auto-hide after 5 seconds
        const hideTimer = setTimeout(() => {
            setCurrentNotification(null);
        }, 5000);

        // Show next notification after 15 seconds
        const showTimer = setTimeout(() => {
            const nextIndex = (notificationIndex + 1) % MOCK_NOTIFICATIONS.length;
            setNotificationIndex(nextIndex);
            setCurrentNotification(MOCK_NOTIFICATIONS[nextIndex]);
        }, 15000);

        return () => {
            clearTimeout(hideTimer);
            clearTimeout(showTimer);
        };
    }, [currentNotification, notificationIndex]);

    return (
        <AnimatePresence>
            {currentNotification && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    className="fixed bottom-24 left-8 z-40 max-w-sm"
                >
                    <div className="crystal-card p-4">
                        {/* Icon & Close button */}
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                            </div>

                            <div className="flex-1 min-w-0">
                                {/* Name & Time */}
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm font-semibold text-white">
                                        {currentNotification.name}
                                    </p>
                                    <span className="text-xs text-slate-400">Just now</span>
                                </div>

                                {/* Location */}
                                <div className="flex items-center space-x-1 text-xs text-slate-400 mb-2">
                                    <MapPin className="w-3 h-3" />
                                    <span>{currentNotification.country}</span>
                                </div>

                                {/* Treatment */}
                                <p className="text-sm text-slate-300">
                                    Booked <span className="text-sky-400 font-medium">{currentNotification.treatment}</span>
                                </p>
                            </div>

                            {/* Close button */}
                            <button
                                onClick={() => setCurrentNotification(null)}
                                className="text-slate-500 hover:text-white transition-colors"
                                aria-label="Dismiss"
                            >
                                ×
                            </button>
                        </div>

                        {/* Users count indicator */}
                        <div className="mt-3 pt-3 border-t border-white/10 flex items-center space-x-2 text-xs text-slate-400">
                            <Users className="w-4 h-4" />
                            <span>12 patients looking at this treatment</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
