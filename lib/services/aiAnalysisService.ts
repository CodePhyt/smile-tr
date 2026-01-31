import { AssessmentState } from "@/lib/store/assessmentStore";

export interface AnalysisResult {
    cosmeticScore: number;
    issues: {
        id: string;
        type: 'discoloration' | 'alignment' | 'missing' | 'shape' | 'gum';
        titleKey: string;
        descriptionKey: string;
        severity: 'low' | 'medium' | 'high';
        confidence: number;
        position?: string; // e.g., "Upper Left"
    }[];
    recommendations: {
        packageId: string;
        reason: string;
    }[];
}

export const analyzeSmile = async (
    photos: AssessmentState['photos'],
    concerns: string[]
): Promise<AnalysisResult> => {
    // Simulate network delay for "AI Processing"
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Heuristic-based mock generation
    // We use the user's selected concerns to seed the "AI findings" so it feels personalized/accurate
    const issues: AnalysisResult['issues'] = [];
    let deduction = 0;

    if (concerns.includes('discolored')) {
        issues.push({
            id: 'disc-1',
            type: 'discoloration',
            titleKey: 'analysis_results.discoloration.title',
            descriptionKey: 'analysis_results.discoloration.description',
            severity: 'medium',
            confidence: 0.92,
            position: 'Global'
        });
        deduction += 15;
    }

    if (concerns.includes('crooked')) {
        issues.push({
            id: 'align-1',
            type: 'alignment',
            titleKey: 'analysis_results.alignment.title',
            descriptionKey: 'analysis_results.alignment.description',
            severity: 'medium',
            confidence: 0.88,
            position: 'Lower Arch'
        });
        deduction += 10;
    }

    if (concerns.includes('missing')) {
        issues.push({
            id: 'miss-1',
            type: 'missing',
            titleKey: 'analysis_results.missing.title',
            descriptionKey: 'analysis_results.missing.description',
            severity: 'high',
            confidence: 0.95,
            position: 'Upper Right'
        });
        deduction += 20;
    }

    // Default issue if nothing selected
    if (issues.length === 0) {
        issues.push({
            id: 'shape-1',
            type: 'shape',
            titleKey: 'analysis_results.shape.title',
            descriptionKey: 'analysis_results.shape.description',
            severity: 'low',
            confidence: 0.75,
            position: 'Upper Anterior'
        });
        deduction += 5;
    }

    const cosmeticScore = Math.max(100 - deduction - Math.floor(Math.random() * 10), 45);

    return {
        cosmeticScore,
        issues,
        recommendations: [
            { packageId: 'premium', reason: 'Best suited for full smile correction.' }
        ]
    };
};
