export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen pt-20">
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-5xl font-bold text-white mb-8">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none">
                    <div className="text-slate-400 leading-relaxed space-y-6">
                        <p className="text-lg">Last updated: {new Date().toLocaleDateString()}</p>

                        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us when requesting consultations, booking appointments, or contacting us through our website forms.</p>

                        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. How We Use Your Information</h2>
                        <p>Your information is used to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide dental treatment consultations and services</li>
                            <li>Communicate about your treatment plans and appointments</li>
                            <li>Send you important updates about your treatment</li>
                            <li>Improve our services and customer experience</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Data Security</h2>
                        <p>We implement appropriate security measures to protect your personal information. All data is encrypted and stored securely.</p>

                        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Your Rights</h2>
                        <p>You have the right to access, correct, or delete your personal information at any time. Contact us at nnesipoglu@outlook.com for any privacy concerns.</p>

                        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Contact Us</h2>
                        <p>For questions about this Privacy Policy, please email nnesipoglu@outlook.com</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
