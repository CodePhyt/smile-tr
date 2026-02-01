'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Send, Loader2, Mic, Check, CheckCheck, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SafiyeProfileModal from './SafiyeProfileModal';
import ImageLightbox from './ImageLightbox';
import TypingIndicator from './TypingIndicator';

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    status?: 'sent' | 'delivered' | 'read';
}

export default function ChatWidget() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: 'Hello! 👋 I\'m Sarah, your personal Smile Turkey concierge.\n\nI can help you with:\n• Treatment Plans & Costs 💰\n• Hotel & Flight Packages ✈️\n• Free Consultation Bookings 📅\n\nHow can I assist you today?',
            timestamp: new Date(),
            status: 'read'
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false); // Visual typing indicator
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [hasUnread, setHasUnread] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen) {
            setHasUnread(false);
        }
    }, [isOpen]);

    // Handle URL hash and Assessment events
    useEffect(() => {
        const checkHash = () => {
            if (window.location.hash === '#chat') {
                setIsOpen(true);
                window.history.replaceState(null, '', window.location.pathname);
            }
        };

        // Auto-open chat after 3 seconds for engagement (Homepage only)
        if (pathname === '/') {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 3000);
            return () => clearTimeout(timer);
        }

        const checkForAssessment = () => {
            const assessmentData = sessionStorage.getItem('smile_assessment_data');
            if (assessmentData) {
                try {
                    const data = JSON.parse(assessmentData);
                    setMessages(prev => {
                        const hasAssessmentMsg = prev.some(m => m.content.includes("I see you've completed your assessment"));
                        if (hasAssessmentMsg) return prev;

                        return [
                            ...prev,
                            {
                                role: 'assistant',
                                content: `Hello ${data.name}! 🌟\n\nI see you've completed your assessment for **${data.treatment}**. I have your details ready.\n\nWould you like me to prepare a personalized package with pricing for you?`,
                                timestamp: new Date(),
                                status: 'read'
                            }
                        ];
                    });
                    setIsOpen(true);
                    setHasUnread(true);
                } catch (e) {
                    console.error('Error parsing assessment data', e);
                }
            }
        };

        checkHash();
        window.addEventListener('hashchange', checkHash);
        window.addEventListener('assessmentCompleted', checkForAssessment);

        return () => {
            window.removeEventListener('hashchange', checkHash);
            window.removeEventListener('assessmentCompleted', checkForAssessment);
        };
    }, [pathname]);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: 'user',
            content: input,
            timestamp: new Date(),
            status: 'sent'
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setIsTyping(true);

        // Simulate "Delivered" status shortly after
        setTimeout(() => {
            setMessages(prev => prev.map(m => m === userMessage ? { ...m, status: 'delivered' } : m));
        }, 1000);

        try {
            // Include assessment context if available
            const assessmentData = sessionStorage.getItem('smile_assessment_data');
            let contextMessage = null;
            if (assessmentData) {
                contextMessage = { role: 'system', content: `[SYSTEM_CONTEXT] User Assessment Data: ${assessmentData}` };
            }

            const apiMessages = messages.map(({ role, content }) => ({ role, content }));
            if (contextMessage) apiMessages.unshift(contextMessage as any);
            apiMessages.push({ role: 'user', content: userMessage.content });


            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: apiMessages,
                }),
            });

            if (!response.ok) throw new Error('Failed to get response');

            const data = await response.json();

            // Check for Special Actions (e.g. WhatsApp Link)
            // Expecting backend to return special format or structured data ideally, 
            // but for now we parse the text for a specific tag if needed or just display rich text.

            // Artificial delay for "Reading/Typing" feel based on response length
            const delay = Math.min(data.message.length * 30 + 800, 5000);

            // Mark user message as read right before replying
            setTimeout(() => {
                setMessages(prev => prev.map(m => m.role === 'user' ? { ...m, status: 'read' } : m));
            }, delay - 500);

            setTimeout(() => {
                const assistantMessage: Message = {
                    role: 'assistant',
                    content: data.message,
                    timestamp: new Date(),
                    status: 'read'
                };
                setMessages((prev) => [...prev, assistantMessage]);
                setIsLoading(false);
                setIsTyping(false);
                if (!isOpen) setHasUnread(true); // Notify if closed
            }, delay);

        } catch (error) {
            console.error('Chat error:', error);
            setIsTyping(false);
            setIsLoading(false);
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: 'I apologize, but I\'m having trouble connecting right now. 😓\n\nPlease message us directly on WhatsApp for immediate help.',
                    timestamp: new Date(),
                    status: 'read'
                },
            ]);
        }
    };

    // Render WhatsApp Button if detected in content
    const renderContent = (content: string) => {
        // Simple parser for [ACTION:WHATSAPP:message]
        // This allows the LLM to trigger a button render
        // Format: Normal text... [WHATSAPP_LINK:Hello I need help:Send to Dr. Nesip]

        const whatsappRegex = /\[WHATSAPP_LINK:(.*):([^\]]+)\]/;
        const match = content.match(whatsappRegex);

        if (match) {
            const [_, preFillMsg, btnText] = match;
            const cleanContent = content.replace(match[0], '').trim();
            const phone = "905302876350"; // Nesip's number
            const link = `https://wa.me/${phone}?text=${encodeURIComponent(preFillMsg)}`;

            return (
                <div className="space-y-3">
                    <p className="whitespace-pre-wrap">{cleanContent}</p>
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <MessageCircle className="w-5 h-5 fill-current" />
                        <span>{btnText}</span>
                    </a>
                </div>
            );
        }

        return <p className="whitespace-pre-wrap">{content}</p>;
    };

    if (!isOpen) {
        return (
            <motion.div
                className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2 pointer-events-none"
            >
                {/* Notification Bubble */}
                <AnimatePresence>
                    {hasUnread && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-white text-slate-900 px-4 py-2 rounded-2xl rounded-tr-none shadow-xl border border-slate-100 mb-2 pointer-events-auto cursor-pointer"
                            onClick={() => setIsOpen(true)}
                        >
                            <p className="text-sm font-medium">Hello! Safiye here 👋</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full shadow-2xl flex items-center justify-center glow pointer-events-auto relative"
                    aria-label="Open chat"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white">
                        {/* Fallback to icon if image fails, but ideally use image */}
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                            <img
                                src="/safiye_concierge_avatar.png" // Assuming generated asset name
                                alt="Safiye"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-sky-500', 'to-cyan-500');
                                }}
                            />
                            <MessageCircle className="w-8 h-8 text-white absolute" style={{ display: 'none' }} />
                        </div>
                    </div>
                    {hasUnread && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full border-2 border-white font-bold">1</span>
                    )}
                </motion.button>
            </motion.div>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 w-full sm:w-[400px] h-[600px] max-h-[85vh] overflow-hidden flex flex-col shadow-2xl rounded-2xl ring-1 ring-white/10" style={{ backgroundColor: '#0B141A' }}>
            {/* Header - WhatsApp Business Style */}
            <div className="bg-[#128C7E] p-4 flex items-center justify-between shadow-md">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <div
                            className="w-11 h-11 rounded-full border-2 border-white/30 overflow-hidden relative cursor-pointer hover:border-white/50 transition-colors"
                            onClick={() => setIsProfileOpen(true)}
                            title="View Safiye's Profile"
                        >
                            <img
                                src="/safiye_concierge_avatar.png"
                                alt="Safiye"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <motion.div
                            className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-[#128C7E]"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                    <div>
                        <div className="font-semibold text-white flex items-center text-[15px]">
                            Safiye
                            <span className="ml-2 px-1.5 py-0.5 bg-white/20 text-white text-[9px] rounded uppercase font-bold tracking-wider">AI</span>
                        </div>
                        <div className="text-[12px] text-white/80 font-normal">Online now</div>
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                        aria-label="Close chat"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Messages Area - WhatsApp Style with Pattern Background */}
            <div
                className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                style={{
                    background: '#0B141A',
                    backgroundImage: `
                        radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.03) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.03) 0%, transparent 50%)
                    `
                }}
            >
                {/* Encryption Notice */}
                <div className="flex justify-center my-4">
                    <div className="bg-[#1F2C34] text-[#FFD279] text-[10px] px-3 py-1.5 rounded-lg text-center shadow-sm max-w-[280px]">
                        🔒 Messages are end-to-end encrypted. Safiye is an AI powered assistant.
                    </div>
                </div>

                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {message.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0 mt-1">
                                <img src="/safiye_concierge_avatar.png" className="w-full h-full object-cover" alt="S" />
                            </div>
                        )}

                        <div
                            className={`relative max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${message.role === 'user'
                                ? 'bg-[#005C4B] text-white rounded-tr-none'
                                : 'bg-[#202C33] text-slate-100 rounded-tl-none'
                                }`}
                        >
                            <div className="text-[15px] leading-relaxed">
                                {renderContent(message.content)}
                            </div>

                            {/* Metadata */}
                            <div className={`text-[10px] mt-1 flex items-center justify-end space-x-1 ${message.role === 'user' ? 'text-white/60' : 'text-slate-400'}`}>
                                <span>{formatTime(message.timestamp)}</span>
                                {message.role === 'user' && (
                                    <span>
                                        {message.status === 'sent' && <Check className="w-3 h-3" />}
                                        {message.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                                        {message.status === 'read' && <CheckCheck className="w-3 h-3 text-sky-400" />}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start items-center space-x-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                            <img src="/safiye_concierge_avatar.png" className="w-full h-full object-cover" alt="S" />
                        </div>
                        <div className="bg-[#202C33] p-3 rounded-2xl rounded-tl-none flex space-x-1">
                            <motion.div
                                className="w-2 h-2 bg-slate-400 rounded-full"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div
                                className="w-2 h-2 bg-slate-400 rounded-full"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                                className="w-2 h-2 bg-slate-400 rounded-full"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-[#202C33] p-3 flex items-center space-x-2">
                <button className="text-slate-400 hover:text-slate-300 p-2">
                    <Paperclip className="w-6 h-6" />
                </button>
                <form onSubmit={handleSubmit} className="flex-1 flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Message"
                        className="flex-1 bg-[#2A3942] rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        disabled={isLoading}
                    />
                    {input.trim() ? (
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#005C4B] text-white p-2.5 rounded-full hover:bg-[#00a884] transition-colors"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="bg-[#2A3942] text-slate-400 p-2.5 rounded-full"
                        >
                            <Mic className="w-5 h-5" />
                        </button>
                    )}
                </form>
            </div>

            {/* Modals */}
            <SafiyeProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
            <ImageLightbox
                src={lightboxImage?.src || ''}
                alt={lightboxImage?.alt || ''}
                isOpen={!!lightboxImage}
                onClose={() => setLightboxImage(null)}
            />
        </div>
    );
}
