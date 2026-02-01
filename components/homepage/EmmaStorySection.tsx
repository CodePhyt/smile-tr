'use client';

import { useState } from 'react';
import { Play, Star, Quote, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import VideoModal from '@/components/ui/VideoModal';

export default function EmmaStorySection() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <section className="relative py-24 overflow-hidden bg-[#0B1215]">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Visual Side */}
                    <div className="relative group">
                        {/* Before/After Card */}
                        <div className="relative z-10 transform transition-transform duration-500 group-hover:scale-[1.02]">
                            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />

                            <div className="relative h-[600px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                                {/* Split Image Layout */}
                                <div className="absolute inset-0 flex flex-col">
                                    <div className="h-1/2 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                                            <span className="bg-black/60 px-4 py-1 rounded-full text-sm font-bold text-white/80 backdrop-blur-sm border border-white/10">BEFORE</span>
                                        </div>
                                        {/* Fallback image if emma-before doesn't exist, but user says it does */}
                                        <img
                                            src="/assets/stories/emma-before.png"
                                            alt="Emma Before"
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.currentTarget.src = '/placeholder-before.jpg' }}
                                        />
                                    </div>
                                    <div className="h-1/2 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center">
                                            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1 rounded-full text-sm font-bold text-white shadow-lg">AFTER</span>
                                        </div>
                                        <img
                                            src="/assets/stories/emma-after.png"
                                            alt="Emma After"
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.currentTarget.src = '/placeholder-after.jpg' }}
                                        />
                                    </div>
                                </div>

                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                    <button
                                        onClick={() => setIsVideoOpen(true)}
                                        className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white hover:scale-110 hover:bg-white/20 transition-all cursor-pointer pointer-events-auto shadow-2xl group-hover:shadow-cyan-500/20"
                                    >
                                        <Play className="w-8 h-8 ml-1 fill-white" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Profile Badge */}
                        <div className="absolute -bottom-6 -right-6 z-20 bg-[#1A2329] p-4 rounded-xl border border-white/10 shadow-xl flex items-center gap-4 max-w-xs">
                            <img
                                src="/assets/stories/emma-profile.png"
                                alt="Emma Profile"
                                className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500"
                            />
                            <div>
                                <h4 className="text-white font-bold">Emma's Journey</h4>
                                <div className="flex text-yellow-500 text-xs">
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div>
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-cyan-400 font-semibold text-sm mb-6">
                            <Play className="w-4 h-4 fill-current" />
                            <span>Real Patient Story</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            "I finally feel like <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Myself</span> again."
                        </h2>

                        <div className="relative mb-8">
                            <Quote className="absolute -top-4 -left-4 w-12 h-12 text-slate-700/50 transform -scale-x-100" />
                            <p className="text-xl text-slate-300 leading-relaxed pl-6 relative z-10">
                                My smile held me back for years. The team at Smile Turkey didn't just fix my teeth—they gave me my confidence back. The VIP transfer, the beachfront hotel... it felt like a holiday, not a dental trip.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <div className="text-3xl font-bold text-white mb-1">24</div>
                                <div className="text-sm text-slate-400">Zirconia Crowns</div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <div className="text-3xl font-bold text-white mb-1">5</div>
                                <div className="text-sm text-slate-400">Days in Antalya</div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <div className="text-3xl font-bold text-white mb-1">70%</div>
                                <div className="text-sm text-slate-400">Cost Savings</div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <div className="text-3xl font-bold text-cyan-400 mb-1">Lifetime</div>
                                <div className="text-sm text-slate-400">Warranty</div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsVideoOpen(true)}
                            className="btn-primary w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-3 text-lg group"
                        >
                            <Play className="w-5 h-5 fill-current" />
                            Watch Emma's Transformation
                        </button>
                    </div>
                </div>
            </div>

            <VideoModal
                isOpen={isVideoOpen}
                onClose={() => setIsVideoOpen(false)}
                videoId="R-NB3J3QIiA" // Verified ID for Smile Transformation
            />
        </section>
    );
}
