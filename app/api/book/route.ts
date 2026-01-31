import { NextResponse } from 'next/server';
import { dbService } from '@/lib/services/dbService';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, packageId } = body;

        if (!email || !packageId) {
            return NextResponse.json({ success: false, message: 'Missing email or packageId' }, { status: 400 });
        }

        const lead = await dbService.findLeadByContact(email);

        if (lead) {
            await dbService.updateLead(lead.id, {
                status: 'booked',
                packageInterest: packageId
            });
            return NextResponse.json({ success: true, message: 'Consultation booked successfully.' });
        }

        return NextResponse.json({ success: false, message: 'Lead not found.' }, { status: 404 });
    } catch (error) {
        console.error("Booking Error", error);
        return NextResponse.json({ success: false, error: 'Failed to book' }, { status: 500 });
    }
}
