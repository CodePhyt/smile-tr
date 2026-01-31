'use server';

import { dbService } from '@/lib/services/dbService';

export async function bookConsultation(email: string, packageId: string) {
    // Simulate network
    await new Promise(resolve => setTimeout(resolve, 800));

    const lead = await dbService.findLeadByContact(email);

    if (lead) {
        await dbService.updateLead(lead.id, {
            status: 'booked',
            packageInterest: packageId
        });
        return { success: true, message: 'Consultation booked successfully.' };
    }

    return { success: false, message: 'Lead not found. Please complete assessment first.' };
}
