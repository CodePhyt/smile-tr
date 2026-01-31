import { NextResponse } from 'next/server';
import { dbService } from '@/lib/services/dbService';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        // Debug logging
        // const logPath = path.join(process.cwd(), 'debug-api.log');
        // fs.appendFileSync(logPath, `[API] Received submission\n`);

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const message = formData.get('message') as string;
        const diagnosisStr = formData.get('diagnosisId') as string;

        let diagnosis = undefined;
        if (diagnosisStr) {
            try {
                diagnosis = JSON.parse(diagnosisStr);
            } catch (e) {
                console.error("Parse error", e);
            }
        }

        const saved = await dbService.saveLead({
            name,
            email,
            phone,
            notes: message,
            diagnosis
        });

        // Debug logging
        // fs.appendFileSync(logPath, `[API] Success\n`);

        return NextResponse.json({ success: true, message: 'Lead saved', id: saved.id });
    } catch (error) {
        console.error("API Error", error);
        return NextResponse.json({ success: false, error: `Failed to save: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) {
            return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
        }

        const updated = await dbService.updateLead(id, updates);

        if (!updated) {
            return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Lead updated', lead: updated });
    } catch (error) {
        console.error("API Error", error);
        return NextResponse.json({ success: false, error: `Failed to update: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 });
    }
}
