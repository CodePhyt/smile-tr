export default function TermsPage() {
    return (
        <div className="min-h-screen pt-20">
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-5xl font-bold text-white mb-8">Terms of Service</h1>
                <div className="prose prose-invert max-w-none">
                    <div className="text-slate-400 leading-relaxed space-y-6">
                        <p className="text-lg">Last updated: {new Date().toLocaleDateString()}</p>

                        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Introduction</h2>
                        <p>By accessing and using Smile Turkey's website and services, you agree to be bound by these Terms of Service.</p>

                        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Medical Disclaimer</h2>
                        <p>All information provided is for informational purposes only. Individual results may vary. Consultations with licensed dentists are required before any treatment.</p>

                        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Services</h2>
                        <p>Smile Turkey provides dental tourism services including dental treatments, accommodation assistance, and travel coordination. All treatments are performed by licensed dental professionals.</p>

                        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Pricing</h2>
                        <p>Prices shown are estimates and may vary based on individual treatment needs. Final pricing will be confirmed after consultation.</p>

                        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Liability</h2>
                        <p>While we strive for excellent results, individual outcomes may vary. We maintain comprehensive insurance and warranties on our work.</p>

                        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Contact</h2>
                        <p>For questions regarding these terms, contact us at nnesipoglu@outlook.com</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
