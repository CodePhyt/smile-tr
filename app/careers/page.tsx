export default function CareersPage() {
    return (
        <div className="min-h-screen pt-20">
            <section className="section-container">
                <h1 className="text-5xl font-bold text-white mb-6 text-center">
                    Join Our <span className="gradient-text">Team</span>
                </h1>
                <p className="text-xl text-slate-300 text-center mb-12 max-w-2xl mx-auto">
                    Be part of something special. Help transform smiles and lives.
                </p>

                <div className="max-w-2xl mx-auto crystal-card p-8">
                    <h2 className="text-2xl font-semibold text-white mb-6">Application Form</h2>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-slate-300 mb-2">Name</label>
                            <input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-sky-500" />
                        </div>
                        <div>
                            <label className="block text-slate-300 mb-2">Email</label>
                            <input type="email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-sky-500" />
                        </div>
                        <div>
                            <label className="block text-slate-300 mb-2">Message</label>
                            <textarea rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-sky-500"></textarea>
                        </div>
                        <button type="submit" className="btn-primary w-full">Submit Application</button>
                    </form>
                </div>
            </section>
        </div>
    );
}
