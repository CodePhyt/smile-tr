import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock, DollarSign, Award } from 'lucide-react';

interface TreatmentPageProps {
    params: {
        slug: string;
    };
}

// Fallback data when database is not connected
const FALLBACK_TREATMENTS = {
    'dental-veneers': {
        name: 'Dental Veneers',
        slug: 'dental-veneers',
        description: 'Transform your smile with premium porcelain veneers. Our ultra-thin, custom-made shells are designed to perfectly match your natural teeth while correcting imperfections.',
        price: '€2,500',
        recoveryTime: '1-2 weeks',
        imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1920&auto=format&fit=crop',
        features: [
            'E-max Porcelain Materials',
            '10-Year Warranty',
            'Color-Matched to Your Teeth',
            'Stain-Resistant Surface',
            'Minimally Invasive Procedure',
            'Natural Light Reflection',
            'Free Digital Smile Design',
            '3-5 Day Treatment Time'
        ],
        faqs: [
            {
                question: 'How long do veneers last?',
                answer: 'With proper care, porcelain veneers can last 10-15 years or longer. We provide a 10-year warranty on all our veneer work.'
            },
            {
                question: 'Is the procedure painful?',
                answer: 'The procedure is minimally invasive and performed under local anesthesia. Most patients experience little to no discomfort.'
            },
            {
                question: 'How long does the process take?',
                answer: 'Typically 3-5 days including consultation, preparation, and final placement. We coordinate everything for you.'
            }
        ]
    },
    'dental-implants': {
        name: 'Dental Implants',
        slug: 'dental-implants',
        description: 'Restore missing teeth with permanent, natural-looking implants. We use premium Straumann and Nobel Biocare systems for the highest success rates.',
        price: '€1,200',
        recoveryTime: '3-6 months',
        imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1920&auto=format&fit=crop',
        features: [
            'Straumann/Nobel Biocare Systems',
            'Lifetime Warranty',
            '98% Success Rate',
            'Bone Grafting Available',
            'Same-Day Temporary Teeth',
            'CT Scan Included',
            'Follow-Up Care Package',
            'Premium Porcelain Crown'
        ],
        faqs: [
            {
                question: 'What is the success rate?',
                answer: 'Our implants have a 98% success rate using premium Straumann and Nobel Biocare systems with proper aftercare.'
            },
            {
                question: 'How long is recovery?',
                answer: 'Initial healing takes 1-2 weeks. Full osseo integration takes 3-6 months, after which the final crown is placed.'
            },
            {
                question: 'Are implants permanent?',
                answer: 'Yes! With proper care, dental implants can last a lifetime. We provide a lifetime warranty on the implant fixture.'
            }
        ]
    },
    'teeth-whitening': {
        name: 'Professional Teeth Whitening',
        slug: 'teeth-whitening',
        description: 'Achieve a brighter, whiter smile with our professional whitening treatments. Safe, effective, and clinically proven results up to 8 shades lighter.',
        price: '€400',
        recoveryTime: '24 hours',
        imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981857b665?q=80&w=1920&auto=format&fit=crop',
        features: [
            'Up to 8 Shades Lighter',
            'LED Light Activation',
            'Sensitivity-Free Formula',
            'Take-Home Kit Included',
            '1-Hour Treatment',
            'Long-Lasting Results',
            'Safe for Enamel',
            '2-Year Touch-Up Plan'
        ],
        faqs: [
            {
                question: 'How many shades lighter?',
                answer: 'Most patients see 6-8 shades improvement in a single session using our advanced LED whitening system.'
            },
            {
                question: 'Will it hurt?',
                answer: 'Our sensitivity-free formula means no pain during or after treatment. We use the latest technology to protect your enamel.'
            },
            {
                question: 'How long do results last?',
                answer: 'Results typically last 2-3 years with proper oral hygiene. We include a take-home maintenance kit.'
            }
        ]
    },
    'hollywood-smile': {
        name: 'Hollywood Smile Makeover',
        slug: 'hollywood-smile',
        description: 'Complete smile transformation with veneers, whitening, and contouring. Get the celebrity smile you\'ve always dreamed of in just one week.',
        price: '€5,500',
        recoveryTime: '1-2 weeks',
        imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=1920&auto=format&fit=crop',
        features: [
            'Full Smile Design (16-20 veneers)',
            'Digital Smile Preview',
            'Gum Contouring Included',
            'Professional Whitening',
            'Luxury Hotel Package',
            'VIP Airport Transfers',
            '24/7 Concierge Service',
            '5-Year Comprehensive Warranty'
        ],
        faqs: [
            {
                question: 'What\'s included in the package?',
                answer: 'Complete smile makeover with 16-20 veneers, whitening, gum contouring, luxury hotel stay, airport transfers, and all consultations.'
            },
            {
                question: 'How long do I need to stay?',
                answer: '7-10 days for the complete treatment. We coordinate everything including accommodation and transportation.'
            },
            {
                question: 'Can I see results before treatment?',
                answer: 'Yes! We create a digital smile design so you can preview and approve your new smile before we begin.'
            }
        ]
    },
    'full-mouth-restoration': {
        name: 'Full Mouth Restoration',
        slug: 'full-mouth-restoration',
        description: 'Complete dental rehabilitation combining implants, veneers, and crowns. Restore function and aesthetics with our comprehensive treatment plan.',
        price: '€12,000',
        recoveryTime: '6-12 months',
        imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1920&auto=format&fit=crop',
        features: [
            'Comprehensive Treatment Plan',
            'Implants + Veneers + Crowns',
            'All-on-4/All-on-6 Available',
            '3D CT Planning',
            'Temporary Teeth Immediately',
            'Lifetime Implant Warranty',
            'Extended Stay Package (2-3 weeks)',
            '5-Star Accommodation'
        ],
        faqs: [
            {
                question: 'What conditions can this treat?',
                answer: 'Full mouth restoration addresses severe decay, missing teeth, gum disease, bite problems, and worn teeth all at once.'
            },
            {
                question: 'How long does it take?',
                answer: 'Initial treatment takes 2-3 weeks. Healing period is 3-6 months before final restorations are placed.'
            },
            {
                question: 'Is it worth the investment?',
                answer: 'This represents a lifetime solution. Our comprehensive warranty and premium materials ensure decades of use.'
            }
        ]
    }
};

export async function generateStaticParams() {
    return [
        { slug: 'dental-veneers' },
        { slug: 'dental-implants' },
        { slug: 'teeth-whitening' },
        { slug: 'hollywood-smile' },
        { slug: 'full-mouth-restoration' }
    ];
}

export default async function TreatmentPage({ params }: TreatmentPageProps) {
    // Await params in Next.js 15+
    const { slug } = await params;

    let treatment;

    // Try database first, fall back to static data
    try {
        treatment = await prisma.treatment.findUnique({
            where: { slug },
        });
    } catch (error) {
        // Using fallback data (database not connected)
    }

    // Use fallback data if database query failed or returned null
    if (!treatment) {
        treatment = FALLBACK_TREATMENTS[slug as keyof typeof FALLBACK_TREATMENTS];
    }

    if (!treatment) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-20">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href="/" className="inline-flex items-center text-slate-400 hover:text-sky-400 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
            </div>

            {/* Hero Section */}
            <section className="relative h-96 overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${treatment.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{treatment.name}</h1>
                        <p className="text-xl text-slate-300 mb-8">{treatment.description}</p>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2 crystal-card px-6 py-3">
                                <DollarSign className="w-6 h-6 text-sky-400" />
                                <div>
                                    <p className="text-sm text-slate-400">Starting at</p>
                                    <p className="text-2xl font-bold text-white">{treatment.price}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 crystal-card px-6 py-3">
                                <Clock className="w-6 h-6 text-cyan-400" />
                                <div>
                                    <p className="text-sm text-slate-400">Recovery</p>
                                    <p className="text-lg font-semibold text-white">{treatment.recoveryTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* What's Included */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">What's Included</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {treatment.features.map((feature: string, index: number) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <CheckCircle className="w-6 h-6 text-sky-500 flex-shrink-0 mt-1" />
                                        <span className="text-slate-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQs - TODO: Add faqs field to Treatment model in Prisma schema */}
                        {/* <div>
                            <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>
                            <div className="space-y-6">
                                {treatment.faqs?.map((faq: { question: string; answer: string }, index: number) => (
                                    <div key={index} className="crystal-card p-6">
                                        <h4 className="text-lg font-semibold text-white mb-3">{faq.question}</h4>
                                        <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </div>

                    {/* Right Column - CTA Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="crystal-card p-8 sticky top-24 space-y-6">
                            <div className="text-center">
                                <p className="text-slate-400 mb-2">Package Price</p>
                                <p className="text-4xl font-bold gradient-text mb-4">{treatment.price}</p>
                                <p className="text-sm text-slate-500">All-Inclusive Package</p>
                            </div>

                            <hr className="border-white/10" />

                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Award className="w-5 h-5 text-sky-400" />
                                    <span className="text-slate-300">Premium Materials</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span className="text-slate-300">Warranty Included</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Clock className="w-5 h-5 text-cyan-400" />
                                    <span className="text-slate-300">Fast Treatment</span>
                                </div>
                            </div>

                            <a href="#chatbot" className="btn-primary w-full block text-center">
                                Get Free Consultation
                            </a>

                            <p className="text-xs text-slate-500 text-center">
                                Free consultation • No obligation • 24/7 support
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
