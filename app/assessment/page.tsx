import AssessmentFlow from '@/components/features/assessment/AssessmentFlow';

export default function AssessmentPage() {
    return (
        <main className="min-h-screen bg-slate-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

            {/* Header */}
            <header className="relative z-10 h-20 border-b border-white/5 flex items-center justify-center bg-slate-950/50 backdrop-blur-md sticky top-0">
                <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-white">Smile Türkiye</span>
                    <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold border border-sky-500/20">AI Analysis</span>
                </div>
            </header>

            <div className="relative z-10">
                <AssessmentFlow />
            </div>
        </main>
    );
}
