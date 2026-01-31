'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Loader2 } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    phone: string;
    age: string;
    treatment: string;
    budget: string;
    timeline: string;
    notes: string;
}

const treatments = [
    'Hollywood Smile',
    'Dental Implants',
    'All-on-4 Implants',
    'Veneers',
    'Teeth Whitening',
    'Not Sure / Need Consultation'
];

const budgets = [
    '€2,000 - €5,000',
    '€5,000 - €10,000',
    '€10,000 - €15,000',
    '€15,000+'
];

const timelines = [
    'Within 1 month',
    '1-3 months',
    '3-6 months',
    '6+ months',
    'Just exploring'
];

export default function AssessmentFlow() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        age: '',
        treatment: '',
        budget: '',
        timeline: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const totalSteps = 4;

    const updateField = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsComplete(true);
    };

    const canProceed = () => {
        switch (step) {
            case 1:
                return formData.name && formData.email && formData.phone;
            case 2:
                return formData.treatment;
            case 3:
                return formData.budget && formData.timeline;
            case 4:
                return true;
            default:
                return false;
        }
    };

    if (isComplete) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full text-center"
                >
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Assessment Complete!
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Thank you, {formData.name}! Our team will review your assessment and contact you within 24 hours with a personalized treatment plan.
                    </p>
                    <div className="bg-cyan-50 rounded-2xl p-6 mb-8">
                        <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
                        <ul className="text-left space-y-2 text-gray-700">
                            <li className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                                <span>Expert review of your case (1-2 hours)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                                <span>Personalized treatment plan with costs</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                                <span>Video consultation scheduling</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                                <span>Accommodation & flight assistance</span>
                            </li>
                        </ul>
                    </div>
                    <a
                        href="/"
                        className="inline-block px-8 py-3 bg-cyan-600 text-white font-semibold rounded-full hover:bg-cyan-700 transition-colors"
                    >
                        Return to Homepage
                    </a>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-medium text-gray-600">Step {step} of {totalSteps}</h2>
                    <span className="text-sm text-gray-500">{Math.round((step / totalSteps) * 100)}% Complete</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / totalSteps) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Step 1: Personal Info */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-900">Let's start with your details</h2>
                            <p className="text-gray-600">We'll use this information to create your personalized treatment plan.</p>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => updateField('name', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    placeholder="John Smith"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => updateField('phone', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    placeholder="+44 7123 456789"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Age (Optional)</label>
                                <input
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => updateField('age', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    placeholder="35"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Treatment Selection */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-900">What treatment are you interested in?</h2>
                            <p className="text-gray-600">Select the treatment that best matches your needs.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {treatments.map((treatment) => (
                                    <button
                                        key={treatment}
                                        onClick={() => updateField('treatment', treatment)}
                                        className={`p-4 border-2 rounded-xl text-left transition-all ${formData.treatment === treatment
                                                ? 'border-cyan-500 bg-cyan-50'
                                                : 'border-gray-200 hover:border-cyan-300'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-900">{treatment}</span>
                                            {formData.treatment === treatment && (
                                                <Check className="w-5 h-5 text-cyan-600" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Budget & Timeline */}
                    {step === 3 && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Budget & Timeline</h2>
                                <p className="text-gray-600">Help us understand your expectations.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">What's your budget range?</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {budgets.map((budget) => (
                                        <button
                                            key={budget}
                                            onClick={() => updateField('budget', budget)}
                                            className={`p-4 border-2 rounded-xl transition-all ${formData.budget === budget
                                                    ? 'border-cyan-500 bg-cyan-50'
                                                    : 'border-gray-200 hover:border-cyan-300'
                                                }`}
                                        >
                                            <span className="font-medium text-gray-900">{budget}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">When are you planning treatment?</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {timelines.map((timeline) => (
                                        <button
                                            key={timeline}
                                            onClick={() => updateField('timeline', timeline)}
                                            className={`p-4 border-2 rounded-xl transition-all ${formData.timeline === timeline
                                                    ? 'border-cyan-500 bg-cyan-50'
                                                    : 'border-gray-200 hover:border-cyan-300'
                                                }`}
                                        >
                                            <span className="font-medium text-gray-900">{timeline}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Additional Notes */}
                    {step === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-900">Almost done!</h2>
                            <p className="text-gray-600">Any additional information you'd like to share?</p>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => updateField('notes', e.target.value)}
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    placeholder="E.g., dental concerns, special requirements, previous treatments..."
                                />
                            </div>

                            {/* Summary */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Your Assessment Summary</h3>
                                <dl className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Name:</dt>
                                        <dd className="font-medium text-gray-900">{formData.name}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Treatment:</dt>
                                        <dd className="font-medium text-gray-900">{formData.treatment}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Budget:</dt>
                                        <dd className="font-medium text-gray-900">{formData.budget}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Timeline:</dt>
                                        <dd className="font-medium text-gray-900">{formData.timeline}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-12">
                <button
                    onClick={prevStep}
                    disabled={step === 1}
                    className="flex items-center gap-2 px-6 py-3 text-gray-700 font-medium rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                </button>

                {step < totalSteps ? (
                    <button
                        onClick={nextStep}
                        disabled={!canProceed()}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                        <ChevronRight className="w-5 h-5" />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                Submit Assessment
                                <Check className="w-5 h-5" />
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
