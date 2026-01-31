import AssessmentFlow from '@/components/features/assessment/AssessmentFlow';

export default function AssessmentPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Simple Header for Assessment */}
            <header className="h-16 border-b flex items-center justify-center bg-white sticky top-0 z-10">
                <div className="font-semibold text-xl text-primary">Smile Türkiye <span className="font-light opacity-70">AI Analysis</span></div>
            </header>

            <AssessmentFlow />
        </main>
    );
}
