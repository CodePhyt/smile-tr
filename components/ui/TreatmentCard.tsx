interface TreatmentCardProps {
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    slug: string;
    features?: string[];
}

export default function TreatmentCard({
    title,
    description,
    price,
    imageUrl,
    slug,
    features = [],
}: TreatmentCardProps) {
    return (
        <a
            href={`/treatments/${slug}`}
            className="group glass-card-hover overflow-hidden block transition-all duration-300 hover:scale-105"
        >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 px-4 py-2 glass-card rounded-full">
                    <p className="text-2xl font-bold gradient-text">{price}</p>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-white group-hover:gradient-text transition-all">
                    {title}
                </h3>
                <p className="text-slate-400 line-clamp-2">{description}</p>

                {/* Features */}
                {features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {features.slice(0, 3).map((feature, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 text-xs bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                )}

                {/* CTA */}
                <div className="flex items-center text-sky-400 font-semibold group-hover:text-cyan-400 transition-colors">
                    Learn More
                    <svg
                        className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>
            </div>
        </a>
    );
}
