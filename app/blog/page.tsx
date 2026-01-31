'use client';

import { Calendar, Search, TrendingUp, Clock, User, ArrowRight, Shield, Heart } from 'lucide-react';
import { IMAGE_CATEGORIES } from '@/lib/image-sources';
import { useState } from 'react';

const ALL_POSTS = [
    {
        title: 'Veneers vs. Dental Crowns: Which Is Right for You?',
        excerpt: 'A detailed comparison of these two popular cosmetic dentistry options, including costs, procedures, longevity, and ideal use cases.',
        image: IMAGE_CATEGORIES.BLOG_COVERS.veneers_vs_crowns,
        author: 'Dr. Ayşe Demir',
        date: 'January 10, 2024',
        readTime: '8 min read',
        category: 'Treatment Guides',
        slug: 'veneers-vs-crowns-comparison'
    },
    {
        title: 'All-on-4 Dental Implants: Everything You Need to Know',
        excerpt: 'The revolutionary technique that replaces a full arch of teeth with just four implants. Learn about the procedure, recovery, and long-term success rates.',
        image: IMAGE_CATEGORIES.BLOG_COVERS.all_on_4_guide,
        author: 'Dr. Can Öztürk',
        date: 'January 5, 2024',
        readTime: '10 min read',
        category: 'Implant Solutions',
        slug: 'all-on-4-implants-guide'
    },
    {
        title: 'How to Choose the Right Dental Clinic in Turkey: 10 Essential Criteria',
        excerpt: 'Not all clinics are created equal. Discover the key factors to evaluate when selecting a dental provider for your treatment abroad.',
        image: IMAGE_CATEGORIES.BLOG_COVERS.choosing_clinic,
        author: 'Sarah Mitchell',
        date: 'December 28, 2023',
        readTime: '7 min read',
        category: 'Patient Resources',
        slug: 'choosing-dental-clinic-turkey'
    },
    {
        title: 'The Science Behind Teeth Whitening: Professional vs. At-Home Methods',
        excerpt: 'Understanding the chemistry of teeth whitening and why professional treatments deliver superior, longer-lasting results.',
        image: IMAGE_CATEGORIES.BLOG_COVERS.whitening_science,
        author: 'Dr. Elif Kara',
        date: 'December 20, 2023',
        readTime: '6 min read',
        category: 'Cosmetic Dentistry',
        slug: 'teeth-whitening-science-explained'
    },
    {
        title: 'Dental Implant Recovery: A Week-by-Week Timeline',
        excerpt: 'What to expect during the healing process, from surgery day through complete osseointegration. Includes tips for faster recovery.',
        image: IMAGE_CATEGORIES.BLOG_COVERS.implant_recovery,
        author: 'Dr. Mehmet Yılmaz',
        date: 'December 15, 2023',
        readTime: '9 min read',
        category: 'Recovery Guides',
        slug: 'dental-implant-recovery-timeline'
    },
    {
        title: '5 Common Misconceptions About Dental Tourism Debunked',
        excerpt: 'Separating fact from fiction when it comes to getting dental work abroad. The truth about quality, safety, and value.',
        image: IMAGE_CATEGORIES.BLOG_COVERS.tourism_myths,
        author: 'Emma Thompson',
        date: 'December 8, 2023',
        readTime: '5 min read',
        category: 'Dental Tourism',
        slug: 'dental-tourism-misconceptions'
    },
    {
        title: 'Digital Smile Design: How Technology Previews Your Perfect Smile',
        excerpt: 'Advanced software creates a virtual mockup of your future smile before any treatment begins. See how it works.',
        image: IMAGE_CATEGORIES.BLOG_COVERS.digital_smile_design,
        author: 'Dr. Ayşe Demir',
        date: 'December 1, 2023',
        readTime: '7 min read',
        category: 'Technology',
        slug: 'digital-smile-design-explained'
    },
    {
        title: 'Comparing Dental Tourism Destinations: Turkey vs. Mexico vs. Hungary',
        excerpt: 'An objective analysis of the top three dental tourism countries, covering quality standards, costs, travel logistics, and patient experiences.',
        image: IMAGE_CATEGORIES.BLOG_COVERS.destination_comparison,
        author: 'Michael Rodriguez',
        date: 'November 24, 2023',
        readTime: '11 min read',
        category: 'Dental Tourism',
        slug: 'comparing-dental-destinations'
    },
    {
        title: 'The Real Cost of Dental Veneers: US vs. UK vs. Turkey (2024 Price Breakdown)',
        excerpt: 'A transparent comparison of veneer costs across major markets, including material quality, warranties, and what\'s included in the price.',
        image: IMAGE_CATEGORIES.BLOG_COVERS.cost_breakdown,
        author: 'Dr. Can Öztürk',
        date: 'November 18, 2023',
        readTime: '8 min read',
        category: 'Cost Guides',
        slug: 'veneer-cost-comparison-2024'
    }
];

export default function BlogPage() {
    const [visiblePosts, setVisiblePosts] = useState(6);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredPosts = selectedCategory === 'All'
        ? ALL_POSTS
        : ALL_POSTS.filter(post => post.category === selectedCategory);

    const displayedPosts = filteredPosts.slice(0, visiblePosts);
    const hasMore = visiblePosts < filteredPosts.length;

    const loadMore = () => {
        setVisiblePosts(prev => Math.min(prev + 6, filteredPosts.length));
    };

    const featuredPost = {
        title: 'The Complete Guide to Dental Tourism in Turkey: What You Need to Know in 2024',
        excerpt: 'Comprehensive insights into why Turkey has become the world\'s leading destination for dental treatments, combining exceptional quality with unbeatable value.',
        image: IMAGE_CATEGORIES.BLOG_COVERS.dental_tourism_guide,
        author: 'Dr. Mehmet Yılmaz',
        date: 'January 15, 2024',
        readTime: '12 min read',
        category: 'Dental Tourism',
        slug: 'complete-guide-dental-tourism-turkey-2024'
    };

    const categories = [
        { name: 'All Articles', count: 42, icon: TrendingUp },
        { name: 'Dental Tourism', count: 12, icon: Shield },
        { name: 'Treatment Guides', count: 15, icon: Heart },
        { name: 'Patient Resources', count: 8, icon: User },
        { name: 'Cost Guides', count: 7, icon: TrendingUp }
    ];

    return (
        <div className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="section-container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Dental Tourism <span className="gradient-text">Insights</span>
                    </h1>
                    <p className="text-xl text-slate-400">
                        Expert guidance, treatment comparisons, and real patient stories to help you make informed decisions about your dental care.
                    </p>
                </div>

                {/* Featured Article */}
                <div className="mb-16 crystal-card overflow-hidden hover:glow transition-all duration-300 group">
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Image */}
                        <div className="relative h-96 md:h-auto overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url(${featuredPost.image})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent md:from-transparent md:via-transparent md:to-transparent"></div>
                            </div>
                            <div className="absolute top-4 left-4">
                                <span className="px-4 py-2 bg-sky-500 rounded-full text-white font-semibold text-sm">
                                    Featured
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="mb-4">
                                <span className="px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400 text-sm">
                                    {featuredPost.category}
                                </span>
                            </div>

                            <h2 className="text-3xl font-bold text-white mb-4 group-hover:gradient-text transition-all">
                                {featuredPost.title}
                            </h2>

                            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                                {featuredPost.excerpt}
                            </p>

                            <div className="flex items-center text-slate-500 text-sm mb-6 space-x-4">
                                <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2" />
                                    {featuredPost.author}
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {featuredPost.readTime}
                                </div>
                            </div>

                            <div>
                                <a
                                    href={`/blog/${featuredPost.slug}`}
                                    className="inline-flex items-center text-sky-400 font-semibold hover:text-cyan-400 transition-colors group"
                                >
                                    Read Full Article
                                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories Filter */}
                <div className="mb-12">
                    <h3 className="text-xl font-semibold text-white mb-4">Browse by Category</h3>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setSelectedCategory(category.name === 'All Articles' ? 'All' : category.name);
                                    setVisiblePosts(6);
                                }}
                                className={`crystal-card px-6 py-3 rounded-lg flex items-center space-x-2 transition-all hover:bg-white/10 ${(selectedCategory === 'All' && category.name === 'All Articles') ||
                                    selectedCategory === category.name
                                    ? 'border-sky-500 bg-sky-500/20'
                                    : ''
                                    }`}
                            >
                                <category.icon className="w-5 h-5 text-sky-400" />
                                <span className="text-white">{category.name}</span>
                                <span className="px-2 py-0.5 bg-sky-500/20 rounded-full text-sky-400 text-xs">
                                    {category.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Articles Grid */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-white">Latest Articles</h3>
                        <select className="crystal-card px-4 py-2 text-white rounded-lg border border-white/10 bg-slate-900/50 focus:outline-none focus:border-sky-500 transition-colors">
                            <option>Most Recent</option>
                            <option>Most Popular</option>
                            <option>Longest</option>
                        </select>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedPosts.map((post, index) => (
                            <a
                                key={index}
                                href={`/blog/${post.slug}`}
                                className="glass-card-hover group overflow-hidden flex flex-col transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${post.image})` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-3 py-1 bg-sky-500/80 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-slate-400 mb-4 flex-1 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    {/* Meta */}
                                    <div className="flex items-center justify-between text-slate-500 text-sm pt-4 border-t border-white/5">
                                        <div className="flex items-center">
                                            <User className="w-4 h-4 mr-1" />
                                            <span className="truncate">{post.author.split(' ')[0]}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                </div>

                                {/* Read More Link */}
                                <div className="px-6 pb-6">
                                    <div className="flex items-center text-sky-400 font-semibold group-hover:text-cyan-400 transition-colors">
                                        Read Article
                                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Load More */}
                    {hasMore && (
                        <div className="mt-12 text-center">
                            <button
                                onClick={loadMore}
                                className="btn-primary"
                            >
                                Load More Articles
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="section-container">
                <div className="crystal-card p-12 text-center rounded-3xl">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Stay Informed About Dental Tourism
                    </h2>
                    <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                        Get expert guides, treatment updates, and exclusive patient stories delivered to your inbox monthly.
                    </p>
                    <div className="max-w-md mx-auto flex gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                        />
                        <button className="btn-primary px-8">
                            Subscribe
                        </button>
                    </div>
                    <p className="text-slate-500 text-sm mt-4">
                        No spam, unsubscribe anytime. Read our privacy policy.
                    </p>
                </div>
            </section>
        </div>
    );
}
