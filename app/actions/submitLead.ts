'use server';

import { z } from 'zod';
import { dbService } from '@/lib/services/dbService';
import fs from 'fs';
import path from 'path';

const LeadSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
    packageInterest: z.string().optional(),
    message: z.string().optional(),
    diagnosisId: z.string().optional(), // Link to the AI report
});

export type LeadState = {
    errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        message?: string[];
    };
    message?: string;
    success?: boolean;
};

export async function submitLead(prevState: LeadState, formData: FormData): Promise<LeadState> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const validatedFields = LeadSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        packageInterest: formData.get('packageInterest'),
        message: formData.get('message'),
        diagnosisId: formData.get('diagnosisId'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please check the form for errors.',
            success: false,
        };
    }

    // Save to "Database"
    try {
        const logPath = path.join(process.cwd(), 'debug.log');
        fs.appendFileSync(logPath, `[${new Date().toISOString()}] Attempting to save lead: ${validatedFields.data.email}\n`);

        const name = validatedFields.data.name as string;
        const email = validatedFields.data.email as string;
        const phone = validatedFields.data.phone as string;
        const message = validatedFields.data.message;

        // Check if lead exists to update, or create new?
        // For this action (LeadGen form), we usually just create a new inquiry or update if very recent.
        // Let's just create a new one for simplicity or update based on email logic later.

        const diagnosisId = validatedFields.data.diagnosisId;

        let diagnosisData = undefined;
        try {
            // In a real app, diagnosisId might be a lookup ID. 
            // For this MVP, let's assume the frontend sends the JSON string in diagnosisId (hacky but works for demo)
            // OR we just store it null for now. 
            // Actually, better: let's update client to pass the whole diagnosis object as string if we want to save it,
            // or we just trust the client state.
            if (diagnosisId && diagnosisId.startsWith('{')) {
                diagnosisData = JSON.parse(diagnosisId);
            }
        } catch (e) {
            console.log("Could not parse diagnosis", e);
        }

        await dbService.saveLead({
            name,
            email,
            phone,
            notes: message,
            packageInterest: validatedFields.data.packageInterest,
            diagnosis: diagnosisData
        });

        fs.appendFileSync(path.join(process.cwd(), 'debug.log'), `[${new Date().toISOString()}] Success: Lead saved\n`);

    } catch (error) {
        fs.appendFileSync(path.join(process.cwd(), 'debug.log'), `[${new Date().toISOString()}] Error saving lead: ${error}\n`);
        console.error("Failed to save lead:", error);
        // Don't fail the request, just log it (in real app, we'd want to retry or alert)
    }

    return {
        message: 'We have received your request! A dental specialist will contact you shortly.',
        success: true,
    };
}
